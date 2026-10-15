
from collections.abc import Generator

import pytest

from fastapi.testclient import TestClient

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from database import Base, ProjectDB

from main import app, get_db


# ============================================================
# 1. TEST CONFIGURATION
# ============================================================

TEST_ADMIN_TOKEN = "local-pytest-admin-token"


@pytest.fixture
def client(
    monkeypatch: pytest.MonkeyPatch,
) -> Generator[TestClient, None, None]:
    """
    Creates a fresh, isolated database for every test.

    The real PostgreSQL database is never modified.
    """

    # Enable write operations for this test only.
    monkeypatch.setenv("WRITE_API_ENABLED", "true")

    # Set an admin token for authentication tests.
    monkeypatch.setenv(
        "PORTFOLIO_ADMIN_TOKEN",
        TEST_ADMIN_TOKEN,
    )

    # Use an in-memory SQLite database.
    test_engine = create_engine(
        "sqlite+pysqlite://",
        connect_args={
            "check_same_thread": False,
        },
        poolclass=StaticPool,
    )

    TestSessionLocal = sessionmaker(
        bind=test_engine,
        autoflush=False,
        expire_on_commit=False,
    )

    # Create tables in the test database.
    Base.metadata.create_all(bind=test_engine)

    # Insert three sample projects.
    with TestSessionLocal() as session:
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

    # Replace the application's database dependency.
    def override_get_db() -> Generator[
        Session, None, None
    ]:
        with TestSessionLocal() as session:
            yield session

    app.dependency_overrides[get_db] = override_get_db

    # Instantiate without the context manager so the
    # application's PostgreSQL startup seeding does not run.
    test_client = TestClient(app)

    try:
        yield test_client

    finally:
        test_client.close()
        app.dependency_overrides.clear()
        test_engine.dispose()


# ============================================================
# 2. HELPER: ADMIN AUTHENTICATION HEADER
# ============================================================

def admin_headers() -> dict[str, str]:
    return {
        "Authorization": (
            f"Bearer {TEST_ADMIN_TOKEN}"
        )
    }


# ============================================================
# 3. TEST HEALTH CHECK
# ============================================================

def test_health_check(client: TestClient):
    response = client.get("/api/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "ok"
    assert data["service"] == "drxs69-portfolio-api"


# ============================================================
# 4. TEST READ ALL PROJECTS
# ============================================================

def test_get_projects(client: TestClient):
    response = client.get("/api/projects")

    assert response.status_code == 200

    projects = response.json()

    assert len(projects) == 3

    assert projects[0]["id"] == 1

    assert projects[2]["title"] == "Train Survival"


# ============================================================
# 5. TEST READ SINGLE PROJECT
# ============================================================

def test_get_single_project(client: TestClient):
    response = client.get("/api/projects/3")

    assert response.status_code == 200

    project = response.json()

    assert project["id"] == 3
    assert project["title"] == "Train Survival"


# ============================================================
# 6. TEST PROJECT NOT FOUND
# ============================================================

def test_project_not_found(client: TestClient):
    response = client.get("/api/projects/999")

    assert response.status_code == 404

    assert response.json()["detail"] == (
        "Project not found"
    )


# ============================================================
# 7. TEST CREATE PROJECT WITH ADMIN TOKEN
# ============================================================

def test_create_project(client: TestClient):
    response = client.post(
        "/api/projects",
        headers=admin_headers(),
        json={
            "title": "Backend API Practice",
            "category": "Backend Development",
        },
    )

    assert response.status_code == 201

    created = response.json()

    assert created["title"] == "Backend API Practice"
    assert created["category"] == "Backend Development"

    project_id = created["id"]

    # Verify the project was actually saved.
    get_response = client.get(
        f"/api/projects/{project_id}"
    )

    assert get_response.status_code == 200

    assert get_response.json()["title"] == (
        "Backend API Practice"
    )


# ============================================================
# 8. TEST CREATE WITHOUT AUTHENTICATION
# ============================================================

def test_create_without_token(client: TestClient):
    response = client.post(
        "/api/projects",
        json={
            "title": "Unauthorized Project",
            "category": "Security Test",
        },
    )

    assert response.status_code == 401

    # Confirm the request didn't create a record.
    projects = client.get("/api/projects").json()

    assert len(projects) == 3


# ============================================================
# 9. TEST INVALID ADMIN TOKEN
# ============================================================

def test_invalid_admin_token(client: TestClient):
    response = client.post(
        "/api/projects",
        headers={
            "Authorization": "Bearer invalid-token"
        },
        json={
            "title": "Invalid Token Project",
            "category": "Security Test",
        },
    )

    assert response.status_code == 401


# ============================================================
# 10. TEST UPDATE PROJECT
# ============================================================

def test_update_project(client: TestClient):
    response = client.patch(
        "/api/projects/3",
        headers=admin_headers(),
        json={
            "category": "Roblox Game Development",
        },
    )

    assert response.status_code == 200

    updated = response.json()

    assert updated["title"] == "Train Survival"

    assert updated["category"] == (
        "Roblox Game Development"
    )

    # Verify the database now returns the new value.
    get_response = client.get("/api/projects/3")

    assert get_response.json()["category"] == (
        "Roblox Game Development"
    )


# ============================================================
# 11. TEST DELETE PROJECT
# ============================================================

def test_delete_project(client: TestClient):
    response = client.delete(
        "/api/projects/3",
        headers=admin_headers(),
    )

    assert response.status_code == 204

    # The project should no longer exist
    # in this test's temporary database.
    get_response = client.get("/api/projects/3")

    assert get_response.status_code == 404


# ============================================================
# 12. TEST INVALID INPUT
# ============================================================

def test_invalid_project_data(client: TestClient):
    response = client.post(
        "/api/projects",
        headers=admin_headers(),
        json={
            "title": "",
            "category": "Testing",
        },
    )

    assert response.status_code == 422


# ============================================================
# 13. TEST WRITE SWITCH DISABLED
# ============================================================

def test_write_operations_disabled(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
):
    monkeypatch.setenv(
        "WRITE_API_ENABLED",
        "false",
    )

    response = client.delete(
        "/api/projects/3",
        headers=admin_headers(),
    )

    assert response.status_code == 403

    # The existing project should remain intact.
    get_response = client.get("/api/projects/3")

    assert get_response.status_code == 200
