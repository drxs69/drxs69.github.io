
import os
import secrets

from collections.abc import Generator
from contextlib import asynccontextmanager

from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
    Response,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)

from pydantic import BaseModel, ConfigDict, Field

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from database import (
    Base,
    ProjectDB,
    SessionLocal,
    engine,
)


# ============================================================
# 1. API DATA SCHEMAS
# ============================================================

class Project(BaseModel):
    id: int
    title: str
    category: str

    model_config = ConfigDict(from_attributes=True)


class ProjectCreate(BaseModel):
    title: str = Field(
        min_length=1,
        max_length=200,
    )

    category: str = Field(
        min_length=1,
        max_length=100,
    )


class ProjectUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=1,
        max_length=200,
    )

    category: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )


# ============================================================
# 2. DATABASE DEPENDENCY
# ============================================================

def get_db() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session


# ============================================================
# 3. AUTHENTICATION AND AUTHORIZATION
# ============================================================

# Creates the Bearer security scheme in Swagger.
# auto_error=False lets us return consistent 401 errors.
bearer_scheme = HTTPBearer(
    auto_error=False,
    scheme_name="AdminBearerToken",
    description=(
        "Admin-only API token for modifying portfolio "
        "projects. Do not put this token in frontend code."
    ),
)


def require_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        bearer_scheme
    ),
) -> None:
    # Retain the existing local-development write switch.
    write_enabled = (
        os.getenv("WRITE_API_ENABLED", "false").lower()
        == "true"
    )

    if not write_enabled:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Write operations are disabled",
        )

    expected_token = os.getenv("PORTFOLIO_ADMIN_TOKEN")

    if not expected_token:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin authentication is not configured",
        )

    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin token required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not secrets.compare_digest(
        credentials.credentials,
        expected_token,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin token",
            headers={"WWW-Authenticate": "Bearer"},
        )


# ============================================================
# 4. DATABASE INITIALIZATION
# ============================================================

def initialize_database() -> None:
    # Creates missing tables for this learning project.
    # A production system should use schema migrations.
    Base.metadata.create_all(bind=engine)

    with SessionLocal() as session:
        count = session.scalar(
            select(func.count()).select_from(ProjectDB)
        )

        if count == 0:
            session.add_all(
                [
                    ProjectDB(
                        id=1,
                        title="AI-Powered Defect Detection",
                        category="Artificial Intelligence",
                    ),
                    ProjectDB(
                        id=2,
                        title="ElderGuard Analytics",
                        category="Machine Learning",
                    ),
                    ProjectDB(
                        id=3,
                        title="Train Survival",
                        category="Game Development",
                    ),
                ]
            )

            session.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_database()
    yield


# ============================================================
# 5. FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="drxs69 Portfolio API",
    description=(
        "Portfolio backend with PostgreSQL, CRUD, "
        "and admin-only write access"
    ),
    version="4.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=[
        "GET",
        "POST",
        "PATCH",
        "DELETE",
    ],
    allow_headers=[
        "Accept",
        "Content-Type",
        "Authorization",
    ],
)


# ============================================================
# 6. HEALTH CHECK
# ============================================================

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "drxs69-portfolio-api",
        "database": "postgresql",
    }


# ============================================================
# 7. READ ALL PROJECTS
# PUBLIC
# ============================================================

@app.get(
    "/api/projects",
    response_model=list[Project],
)
def get_projects(
    db: Session = Depends(get_db),
):
    statement = select(ProjectDB).order_by(
        ProjectDB.id
    )

    return db.scalars(statement).all()


# ============================================================
# 8. READ ONE PROJECT
# PUBLIC
# ============================================================

@app.get(
    "/api/projects/{project_id}",
    response_model=Project,
)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = db.get(ProjectDB, project_id)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    return project


# ============================================================
# 9. CREATE PROJECT
# ADMIN ONLY
# ============================================================

@app.post(
    "/api/projects",
    response_model=Project,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin)],
)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
):
    title = project_data.title.strip()
    category = project_data.category.strip()

    if not title or not category:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Title and category cannot be blank",
        )

    project = ProjectDB(
        title=title,
        category=category,
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


# ============================================================
# 10. UPDATE PROJECT
# ADMIN ONLY
# ============================================================

@app.patch(
    "/api/projects/{project_id}",
    response_model=Project,
    dependencies=[Depends(require_admin)],
)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
):
    project = db.get(ProjectDB, project_id)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    updates = project_data.model_dump(
        exclude_unset=True,
    )

    if not updates:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Provide at least one field to update",
        )

    for field_name, value in updates.items():
        if value is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail=f"{field_name} cannot be null",
            )

        cleaned_value = value.strip()

        if not cleaned_value:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail=f"{field_name} cannot be blank",
            )

        setattr(project, field_name, cleaned_value)

    db.commit()
    db.refresh(project)

    return project


# ============================================================
# 11. DELETE PROJECT
# ADMIN ONLY
# ============================================================

@app.delete(
    "/api/projects/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin)],
)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = db.get(ProjectDB, project_id)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    db.delete(project)
    db.commit()

    return Response(
        status_code=status.HTTP_204_NO_CONTENT
    )
