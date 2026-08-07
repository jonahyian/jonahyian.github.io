---
title: "從 0 到 1 打造異步 Python 後端：FastAPI + pgvector + uv 實戰架構心得"
date: "2026-08-07"
category: "後端"
tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Docker", "Architecture"]
summary: "這不是官方 Doc 翻譯，而是我在實際打造生產級非同步後端時，整理出的一套乾淨、好維護且高擴展性的架構心得與踩坑紀錄。"
---

寫後端寫久了，最怕遇到兩件事：
1. 專案規模一變大，程式碼變成亂糟糟的「義大利麵（Spaghetti Code）」。
2. 套件裝一堆、環境動不動就壞掉，本地能跑部署卻炸掉。

最近在設計一套支援 GenAI 與高併發的生產級服務時，我重新梳理了一套相當順手的非同步 Python 架構模式（`Async Core Engine`），這篇文章記錄了我個人非常推薦的目錄設計與踩坑心得。

---

### 💡 為什麼要這樣設計目錄？

很多教學範例喜歡把所有的 API 都塞在 `main.py` 或簡單的 `routers/` 裡面，但當功能一多，維護起來簡直是災難。

我習慣採用**「功能模組化 (Domain-Driven Modules)」**的思考方式：

```text
├── .github/workflows/      # CI/CD 自動化流程
├── alembic/                # 資料庫 Schema 版本控制 (Migration)
├── app/
│   ├── api/                # 傳輸層：負責接 HTTP / WebSocket 請求
│   │   ├── socket/         # WebSocket 即時通訊事件處理
│   │   └── v1/             # RESTful API 各領域 Router
│   ├── core/               # 全域核心組件 (只放全專案通用的邏輯)
│   │   ├── database/       # ORM 設定、Async Engine 實體
│   │   ├── exceptions.py   # 統一捕捉全域 Error 的 Handler
│   │   ├── logging_config.py # 使用 structlog 印出高讀取性 JSON Log
│   │   ├── rate_limiter.py # 防刷 Rate Limiter
│   │   └── settings.py     # 統一由 Pydantic 管理 .env
│   ├── integrations/       # 第三方服務 (Redis、外部 API 封裝)
│   ├── modules/            # 💡 真正的業務核心 (高內聚獨立模組)
│   │   └── posts/          # 例如文章/隨筆模組 (Schemas, Services, DB Models)
│   └── main.py             # 應用程式進入點與 Lifespan 機制
├── docker-compose.yml      # 一鍵拉起本地測試環境
├── pyproject.toml          # 採用超高速 uv 管理依賴
└── uv.lock                 # 嚴格的依賴版本鎖定檔
```

> **個人心得**：將業務邏輯（如 `modules/posts/`）跟傳輸層（`api/v1/`）拆開，最大的好處是未來要換框架或者加背景 Worker（如 Celery）時，核心商業邏輯完全不用動！

---

### 🔥 幾點我覺得極度提升開發體驗的選型

#### 1. 徹底放棄 `pip`，改用 `uv`
以前光是用 `pip install` 或 `poetry` 解依賴就要等半天。換成 Rust 寫的 `uv` 後，安裝套件基本都是**秒級完成**，而且 `uv.lock` 在跨團隊協作時極度穩定。

#### 2. 不需要獨立向量資料庫，PostgreSQL + `pgvector` 就夠好用
很多 AI 專案動不動就引入全新的 Vector DB，增加了維運成本。其實直接在 PostgreSQL 18 掛載原生 `pgvector` 擴充，配合 HNSW 索引，在千萬級資料量下的語意搜尋與 RAG 檢索就已經快得驚人，還能直接跟傳統 SQL 做 Join！

#### 3. Log 不要印純文字，用 `structlog` 輸出 JSON
不要再用 standard logging 印一些隨便的 text 了。改用 `structlog` 輸出單行 JSON，除了本地在 Console 看得很舒服，上雲端 (Grafana Loki 或 GCP Logging) 搜尋特定 `transaction_id` 或追蹤 line number 更是救命神器。

---

### 🛠️ 實戰：新增一個 Feature 的流暢體驗

在這個架構下，每當我要新增一個功能（比如 `posts` 文章隨筆模組），流程非常清晰：

1. 在 `app/modules/posts/` 寫 SQLAlchemy Model 與 Pydantic Schema。
2. 終端機跑 `alembic revision --autogenerate -m "add posts table"` 自動產生 Migration 檔並檢查。
3. 在 `app/api/v1/posts.py` 寫 Router 丟給前端。

就這麼簡單，完全不需要在無關的檔案之間折返跑。

希望能給正在挑選 Python 後端架構的工程師朋友一些啟發！
