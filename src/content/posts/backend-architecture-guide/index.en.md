---
title: "Modern Asynchronous Python Backend Architecture Guide (FastAPI + pgvector + uv)"
date: "2026-08-07"
category: "Backend"
tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Docker", "Architecture"]
summary: "A production-grade, highly performant asynchronous backend boilerplate leveraging FastAPI, pgvector, uv package manager, and structlog JSON logging."
---

When building Generative AI applications and high-concurrency web systems, designing a **scalable, maintainable, and low-latency** backend architecture is essential.

This article explores the production-grade architecture design using **`Boldcare Core Engine`** as a reference guide.

---

### 🏗️ Domain-Driven Modular Layout

The codebase adheres to a modular layout grouped by functional capability domains alongside centralized system core components:

```text
├── .github/workflows/      # GitHub Actions CI/CD pipelines
├── alembic/                # Database migration scripts and environment tracks
├── app/
│   ├── api/                # Network Transport Layer
│   │   ├── socket/         # WebSocket Server Setup (Namespaces, Registry)
│   │   └── v1/             # RESTful API Endpoints split by Domain Routers
│   ├── core/               # Centralized System Components
│   │   ├── database/       # ORM Master Definitions, Engines, and Repositories
│   │   ├── exceptions.py   # Global Exception Interceptors
│   │   ├── logging_config.py # High-Performance Structlog Engine Pipelines
│   │   ├── rate_limiter.py # Network Rate Limiting Filters (Slowapi)
│   │   └── settings.py     # Unified Environment Configurations via Pydantic
│   ├── integrations/       # External Subsystem Wrappers (Redis, Cloud SQL Proxy)
│   └── modules/            # Domain-Specific Core Logic (Independent Blocks)
│       └── doctors/        # Example Feature Module (Schemas, Services, Logic)
│   ├── main.py             # ASGI Application Entrypoint and Lifecycle Hooks
├── docker-compose.yml      # Multi-Container Development Orchestration Engine
├── Dockerfile              # Multi-Stage, Slim Production Python Engine
├── Dockerfile.postgres     # Custom PostgreSQL 18 + Compiled pgvector Image
├── entrypoint.sh           # Container Startup Synchronization Gatekeeper
├── pyproject.toml          # Project Manifest Managed by UV
└── uv.lock                 # Strict Dependency Lockfile
```

---

### 🚀 Key Stack Highlights

1. **Lightning-fast Dependency Management: `uv`**
   - Managed with `uv` for 10-100x faster package resolution and deterministic builds.

2. **Native Vector Search: `PostgreSQL 18 + pgvector`**
   - Native HNSW / IVFFlat vector indexing inside PostgreSQL for seamless RAG and semantic retrieval.

3. **Context-aware Structlog Pipeline: `structlog`**
   - Contextual JSON streaming with automatic filename and line number tracing, optimized for Grafana Loki or GCP Logging.

4. **Isolated Migration Workflow: `Alembic`**
   - Version-controlled schema migrations with `alembic revision --autogenerate` and `alembic upgrade head`.

---

### ⚙️ Quick Start

```bash
# 1. Configure environment variables
cp env.example .env

# 2. Launch container stack
docker compose up --build
```

Access the interactive API docs at `http://localhost:8000/docs`.
