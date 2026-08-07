---
title: "現代化 Python 非同步後端架構設計指南 (FastAPI + pgvector + uv)"
date: "2026-08-07"
category: "後端"
tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Docker", "Architecture"]
summary: "分享生產級非同步 Python 後端系統架構範本：結合 FastAPI、pgvector 原生向量搜尋、uv 套件管理與 Structlog JSON 日誌設計。"
---

在開發生成式 AI 應用與高併發 Web 系統時，打造一個**兼具高擴展性、維護性與低延遲**的後端架構至關重要。

本文以生產級專案 **`Boldcare Core Engine`** 為例，解析現代化 Python 非同步後端架構的最佳實踐。

---

### 🏗️ 專案目錄架構 (Modular Domain-Driven Architecture)

採用**「功能模組化 (Domain-Driven Modules)」**導向設計，將系統核心組件與獨立業務邏輯解耦：

```text
├── .github/workflows/      # GitHub Actions CI/CD 自動化流程
├── alembic/                # 資料庫 Schema 版本遷移腳本 (Tracking & Rollback)
├── app/
│   ├── api/                # Network Transport Layer (網路傳輸層)
│   │   ├── socket/         # WebSocket Server Setup (Namespaces, Registry)
│   │   └── v1/             # RESTful API Endpoints 路由分發
│   ├── core/               # 系統核心組件 (全域靜態配置)
│   │   ├── database/       # ORM Master Definitions, Async Engines & Repositories
│   │   ├── exceptions.py   # 全域例外攔截器 (Global Exception Interceptors)
│   │   ├── logging_config.py # 高效能 Structlog JSON 日誌引擎
│   │   ├── rate_limiter.py # 網路流量速率限制器 (Slowapi)
│   │   └── settings.py     # 統一環境變數配置 (Pydantic BaseSettings)
│   ├── integrations/       # 外部第三方服務封裝 (Redis Stack, Cloud SQL Proxy)
│   └── modules/            # 獨立領域業務邏輯 (Domain-Specific Modules)
│       └── doctors/        # 範例功能模組 (Schemas, Services, Business Logic)
│   ├── main.py             # ASGI 應用程式進入點與生命週期 Hook (Lifespan)
├── docker-compose.yml      # 多容器本地開發編排引擎
├── Dockerfile              # 多階段瘦身生產環境 Python 容器
├── Dockerfile.postgres     # 原生 PostgreSQL 18 + 編譯 pgvector 向量資料庫鏡像
├── entrypoint.sh           # 容器啟動同步控制流程
├── pyproject.toml          # 專案套件聲明 (由超高速 uv 管理)
└── uv.lock                 # 嚴格依賴鎖定檔
```

---

### 🚀 核心技術選型與優勢

1. **極速開發與依賴管理：`uv`**
   - 採用下一代超高速 Python 套件管理器 `uv`，替代傳統 pip / poetry，安裝與解析依賴快達 10-100 倍。

2. **原生 AI 向量搜尋：`PostgreSQL 18 + pgvector`**
   - 內建 HNSW / IVFFlat 向量索引，無需額外維護維運複雜的獨立 Vector DB，輕鬆達成 RAG 與語意搜尋。

3. **上下文感知結構化日誌：`structlog`**
   - 拋棄傳統文字 Log，全面改用單行高效能 JSON 串流，自動捕捉 `(filename, func_name, lineno)`，無縫對接 Grafana Loki / Cloud Logging。

4. **安全隔離的資料庫遷移：`Alembic`**
   - 嚴格遵守「本地資料庫規則」，透過 `alembic revision --autogenerate` 與 `alembic upgrade head` 進行版本控制。

---

### 💻 模組開發三步曲 (Adding a New Domain Module)

新增一個獨立業務模組（例如 `patients`）時，遵守乾淨的三層式設計流程：

```python
# Step 1: 定義 Domain Model (app/modules/patients/model.py)
from app.core.database.base_model import Base
from sqlalchemy.orm import Mapped, mapped_column

class Patient(Base):
    __tablename__ = "patients"
    name: Mapped[str] = mapped_column(nullable=False)
```

```python
# Step 2: 建立 API Router (app/api/v1/patients.py)
from fastapi import APIRouter

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("/")
async def list_patients():
    return {"patients": []}
```

---

### ⚙️ 本地快速啟動 (Local Development)

```bash
# 1. 複製環境變數範本
cp env.example .env

# 2. 自動編排並啟動 Docker 容器 stack (含自動執行 Alembic 遷移)
docker compose up --build
```

服務啟動後即可存取：
- **Interactive Swagger UI**: `http://localhost:8000/docs`
- **Health Check Boundary**: `http://localhost:8000/health`
