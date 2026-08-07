# Jonah Yian's Personal Website & Blog 🚀

> **AI Engineer | Fullstack Developer | Jazz Drummer | Dessert Lover**

歡迎來到 Jonah 的個人網站與技術部落格。本專案採用 **Vite + React + Tailwind CSS** 打造，並實作「資料夾即 POST」的模組化文章管理架構與多國語言（i18n）切換。

---

## 🌟 網站特色

- 📁 **資料夾即 POST (Folder-per-Post Architecture)**：每篇文章專屬獨立資料夾（含 Markdown 內容與共享圖片資源）。
- 🌐 **多國語言 (i18n)**：支援 `index.zh.md` 與 `index.en.md` 雙語切換。
- 🏷️ **六大文章主題分類**：個人 (`Personal`)、AI (`AI`)、前端 (`Frontend`)、後端 (`Backend`)、爵士鼓 (`Jazz Drums`)、甜點 (`Desserts`)。
- 🎨 **語法高亮 (Syntax Highlighting)**：整合 VS Code Dark Plus 主題高亮程式碼。
- ⚡ **極速打包與部署**：透過 GitHub Actions 自動構建與部署至 GitHub Pages。

---

## 💻 快速開始 (Quick Start)

### 安裝依賴
```bash
pnpm install
```

### 啟動開發伺服器
```bash
pnpm dev
```

### 生產環境打包驗證
```bash
pnpm run build
```

---

## 📝 新增文章方式

只要在 `src/content/posts/` 下新增一個資料夾（例：`src/content/posts/my-new-post/`）：

1. 新增 `index.zh.md`（中文版）與 `index.en.md`（英文版）。
2. 在頂部填寫 Frontmatter：
   ```markdown
   ---
   title: "文章標題"
   date: "2026-08-07"
   category: "AI"
   tags: ["Machine Learning", "Python"]
   summary: "文章簡短摘要..."
   ---
   ```
3. 直接在同一資料夾內放入 `cover.jpg` 即可自動呈現為封面圖！
