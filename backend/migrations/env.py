
"""
Alembic migration environment for the drxs69 Portfolio API.

Uses the existing SQLAlchemy engine and model metadata
defined in backend/database.py.
"""

import sys

from logging.config import fileConfig
from pathlib import Path

from alembic import context

from sqlalchemy import pool

from database import Base, engine


# ============================================================
# 1. ALEMBIC CONFIGURATION
# ============================================================

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# ============================================================
# 2. IMPORT DATABASE METADATA
# ============================================================

# Alembic uses this metadata to understand our tables.
target_metadata = Base.metadata


# ============================================================
# 3. OFFLINE MIGRATIONS
# ============================================================

def run_migrations_offline() -> None:
    """
    Generate SQL migration statements without
    directly connecting to PostgreSQL.
    """

    database_url = engine.url.render_as_string(
        hide_password=False
    )

    context.configure(
        url=database_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={
            "paramstyle": "named",
        },
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


# ============================================================
# 4. ONLINE MIGRATIONS
# ============================================================

def run_migrations_online() -> None:
    """
    Apply migrations using the existing
    SQLAlchemy database engine.
    """

    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


# ============================================================
# 5. EXECUTION MODE
# ============================================================

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
