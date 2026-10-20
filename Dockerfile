FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HF_HOME=/opt/huggingface \
    SENTENCE_TRANSFORMERS_HOME=/opt/huggingface

WORKDIR /app

COPY requirements-cloud-run.txt ./requirements-cloud-run.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements-cloud-run.txt

# Cache the embedding model in the image so Cloud Run does not need to download
# it during startup.
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

COPY src ./src
COPY models ./models

EXPOSE 8080
CMD ["sh", "-c", "exec uvicorn src.api.server:app --host 0.0.0.0 --port ${PORT:-8080} --workers 1"]
