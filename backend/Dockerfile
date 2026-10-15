
# Use a lightweight Python Linux image.
FROM python:3.13-slim

# Prevent Python from writing .pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Show Python output immediately in Docker logs.
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container.
WORKDIR /app

# Copy dependencies first to benefit from Docker caching.
COPY requirements.txt .

# Install Python dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source files.
COPY database.py .
COPY main.py .

# Document the port used by FastAPI.
EXPOSE 8000

# Start the FastAPI application.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
