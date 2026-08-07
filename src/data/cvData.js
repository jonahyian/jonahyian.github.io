export const CV_DATA = {
  name: "Jonah Yen (顏苙峰)",
  title: "AI Engineer (GenAI & Cloud Architecture)",
  phone: "+886 917 515 581",
  email: "a94763075@gmail.com",
  location: "Taipei, Taiwan",
  github: "https://github.com/a94763075",
  summaryZh: "擁有 5 年以上實戰經驗的 AI 工程師，專精於 AI Agent 與多模態系統開發。擅長運用 MCP、RAG 及電腦視覺技術建構生產級應用。熟悉 LLMOps，能精準權衡成本與延遲，並運用 Kubernetes 於 GCP/AWS 部署高擴展性服務。",
  summaryEn: "AI Engineer (4+ yrs) building production AI agents and multi-modal systems. Specialized in Agentic RAG + tool calling (MCP), retrieval at scale, and CV/ASR integrations. Shipped high-concurrency services over 10M+ corpora on GCP (Docker/Kubernetes).",
  experiences: [
    {
      company: "Boldtek - Enterprise AI Solutions",
      roleZh: "AI 工程師 (生成式 AI 與雲端架構)",
      roleEn: "AI Engineer (GenAI & Cloud Architecture)",
      period: "Sept 2025 – Present",
      location: "Taipei, Taiwan",
      bulletsZh: [
        "主導架構基於 Model Context Protocol (MCP) 的 Agentic RAG 系統，實現支援多步推理與外部工具調用的企業級工作流。",
        "於 GCP 環境透過 Kubernetes 導入完整 LLMOps 流程 (CI/CD、自動化評估)，大幅提升模型迭代效率。",
        "優化 Contextual Retrieval 機制，結合 Knowledge Graphs 與混合搜尋策略，將問答準確率大幅提升至 94%。",
        "導入 Prompt Caching 策略，成功降低 40% 推論延遲，顯著改善生產環境的使用者體驗。",
        "建立工程文檔標準化流程，並透過 Code Review 制度指導團隊成員，提升整體程式碼品質。"
      ],
      bulletsEn: [
        "Architected Agentic RAG with MCP + Google A2A for enterprise workflows; enabled multi-step tool calling.",
        "Achieved 94% ExactMatch via multi-tenant RAG isolation + KG-powered hybrid retrieval (Vertex AI).",
        "Reduced inference latency 40% via prompt caching for high-concurrency serving.",
        "Orchestrated Multi-Agent MCPs on GKE with LLMOps pipelines for automated eval and scaling.",
        "Mentored team through Code Reviews, established Documentation System to standardize engineering workflows."
      ]
    },
    {
      company: "Yourator - HR Tech Platform",
      roleZh: "資料工程師 (Data Engineer)",
      roleEn: "Data Engineer",
      period: "Jan 2023 – Sept 2025",
      location: "Taipei, Taiwan",
      bulletsZh: [
        "於 GCP Vertex AI 打造企業級 NER 履歷解析系統，導入完整 MLOps，在高流量負載下仍將營運成本降低 95%。",
        "開發結合 Elasticsearch 與 Vector Embeddings 的混合推薦引擎，提升 20% 媒合精準度；並建置集中式 Feature Store，減少 70% 重複運算。",
        "運用 ASR 技術與 Gemini API 實作自動化音訊分析管線，將面試數據轉化為具商業價值的 BI 洞察。"
      ],
      bulletsEn: [
        "Owned end-to-end AI across Teamdoor & Yourator product lines (pipelines, serving, evaluation).",
        "Cut serving costs 95% by shipping an enterprise NER resume parser on Vertex AI with full MLOps.",
        "Improved job-matching accuracy 20% with a hybrid recommender (Elasticsearch + vector embeddings).",
        "Built audio analysis pipelines with ASR + Gemini API to turn interview data into BI signals."
      ]
    },
    {
      company: "1111 人力銀行 (Global Chinese Group)",
      roleZh: "資料科學家 (Data Scientist)",
      roleEn: "Data Scientist",
      period: "Sept 2022 – Jan 2023",
      location: "Taipei, Taiwan",
      bulletsZh: [
        "運用 AWS (ECS/ALB) 與 Faiss 重構高流量推薦架構，將記憶體需求從 8GB 銳減至 400MB，並將延遲壓低至 200ms 以下。",
        "部署 BERT-based NER 模型以優化搜尋系統，每日處理 2 萬次以上查詢，準確率達 89%。"
      ],
      bulletsEn: [
        "Reduced memory 8GB → 400MB and P95 <200ms by refactoring recommendation serving on production.",
        "Served 20k+ daily queries with 89% accuracy finetuning BERT-based NER for query understanding."
      ]
    },
    {
      company: "Renthop (US Real Estate Platform)",
      roleZh: "資料工程師 (Data Engineer)",
      roleEn: "Data Engineer (Remote)",
      period: "May 2021 – June 2022",
      location: "New York, US (Remote)",
      bulletsZh: [
        "將電腦視覺模型 (ResNet) 整合至資料管線，實現房產圖片分類與內容理解自動化。",
        "使用 Airflow 設計並維運 20+ 條 ETL 流程，確保跨來源資料擷取的穩定性。"
      ],
      bulletsEn: [
        "Integrated ResNet image classification into data pipelines to enable property content understanding features.",
        "Designed and maintained 20+ Airflow ETL workflows for reliable ingestion from external sources."
      ]
    }
  ],
  education: [
    {
      schoolZh: "國立臺灣科技大學 (NTUST)",
      schoolEn: "National Taiwan University of Science and Technology",
      degreeZh: "資訊工程碩士 (GPA 4.08 / 4.3)",
      degreeEn: "M.S. in Computer Science (GPA 4.08/4.3)",
      period: "2017 – 2020",
      detailsZh: [
        "研究領域：專注於 Neural Retrieval (神經檢索) 與語言模型 (現代 RAG 技術基石)。",
        "IEEE ICASSP 2020 論文發表: A Neural Document Language Modeling Framework (獲 IEEE 補助)",
        "IEEE ICASSP 2019 論文發表: Generating Pseudo-relevant Representations for Spoken Document Retrieval"
      ],
      detailsEn: [
        "Research: Neural Retrieval & Language Modeling (foundations of modern RAG).",
        "IEEE ICASSP 2020 Paper: A Neural Document Language Modeling Framework (Awarded IEEE Grant)",
        "IEEE ICASSP 2019 Paper: Generating Pseudo-relevant Representations for Spoken Document Retrieval"
      ]
    },
    {
      schoolZh: "天主教輔仁大學 (FJU)",
      schoolEn: "Fu Jen Catholic University",
      degreeZh: "資訊工程學士 (平均 85.6)",
      degreeEn: "B.S. in Computer Science",
      period: "2013 – 2017",
      detailsZh: [
        "獲獎紀錄：ACM-ICPC 亞洲區賽 (解出 2 題) & 全國大專程式競賽榮譽獎 (National Honorable Mention)"
      ],
      detailsEn: [
        "Awards: ACM-ICPC Asia Regional Contest & National Programming Contest Honorable Mention"
      ]
    }
  ],
  projects: [
    {
      title: "Taiwan Legal MCP Server (Agent System)",
      period: "2025",
      zhDesc: "AI 驅動法律知識系統：開發符合 Model Context Protocol (MCP) 標準的 Multi-Agent 系統，整合 LangGraph 與 Elasticsearch RAG，解決跨 12+ 個法規資料庫的複雜法律推理難題。",
      enDesc: "AI-Powered Legal Knowledge System: Built a Multi-Agent System implementing MCP to standardize tool interfaces. Orchestrated LangGraph with Elasticsearch RAG across 12+ law collections.",
      tags: ["MCP", "LangGraph", "Elasticsearch", "RAG", "Python"]
    }
  ],
  skills: {
    ai: "Agentic RAG, MCP, Tool Calling, LangChain, Semantic Kernel, Prompt Engineering",
    vision: "Computer Vision (ResNet/ViT), Image Classification, Multi-modal RAG, ASR integration",
    cloud: "GCP (Vertex AI, BigQuery, Cloud Run), AWS, Docker, Kubernetes, CI/CD, MLflow",
    data: "Vector DBs (Faiss, Weaviate), Elasticsearch, Knowledge Graphs (Neo4j), Python, SQL"
  }
};
