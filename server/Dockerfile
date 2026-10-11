# Add things into a base image containing things for python
FROM python:3.11-slim

WORKDIR /app

# The base image contains pip but not uv
RUN pip install uv

# Copy the list of dependencies
COPY pyproject.toml uv.lock ./
COPY src ./src

# Install all the dependencies
RUN uv sync --frozen --no-dev

EXPOSE 8000

# Executed when creating a container
# Docker image has everything installed from the instructions above
# Plus this set up command
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "src"]