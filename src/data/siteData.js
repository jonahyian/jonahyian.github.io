import { Sparkles, User, Cpu, Code2, Terminal, Drum, Utensils } from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'home', zh: '首頁', en: 'Home' },
  { id: 'blog', zh: '文章', en: 'Blog' },
  { id: 'projects', zh: '專案', en: 'Projects' },
  { id: 'resume', zh: '履歷', en: 'Resume' },
  { id: 'contact', zh: '聯絡', en: 'Contact' },
];

export const CATEGORIES = [
  { id: 'all', zh: '全部文章', en: 'All', icon: Sparkles },
  { id: '個人', zh: '個人', en: 'Personal', icon: User },
  { id: 'AI', zh: 'AI', en: 'AI', icon: Cpu },
  { id: '前端', zh: '前端', en: 'Frontend', icon: Code2 },
  { id: '後端', zh: '後端', en: 'Backend', icon: Terminal },
  { id: '爵士鼓', zh: '爵士鼓', en: 'Jazz Drums', icon: Drum },
  { id: '甜點', zh: '甜點', en: 'Desserts', icon: Utensils },
];

export const UI_TEXT = {
  zh: {
    blogTitle: "Jonah Yen",
    blogSubtitle: "AI Engineer & Jazz Drummer",
    heroTitle: "嗨，我是 顏苙峰 (Jonah) 👋",
    heroRole: "AI 工程師 (GenAI & 雲端架構) / 爵士鼓手",
    heroBio: "擁有 5 年以上實戰經驗的 AI 工程師，專精於 AI Agent (MCP / RAG) 與多模態系統開發。對程式碼秉持「可讀性高於一切」，生活離不開爵士鼓與法式甜點。",
    viewProjects: "查看專案作品",
    readBlog: "閱讀技術隨筆",
    featuredPosts: "精選文章",
    featuredProjects: "亮點專案",
    viewAllPosts: "查看所有文章",
    viewAllProjects: "查看所有專案",
    allPosts: "文章列表",
    projectsTitle: "專案作品集",
    resumeTitle: "專業履歷與經歷 (Curriculum Vitae)",
    contactTitle: "保持聯繫",
    backToList: "返回文章列表",
    noCover: "無封面圖",
    readMore: "閱讀內文",
    noPostsCategory: "這個分類還沒有寫文章，敬請期待！",
    downloadCv: "下載 PDF 履歷",
    contactDesc: "不論是 AI Agent 合作、雲端架構討論或是爵士鼓交流，都歡迎隨時與我聯繫！",
  },
  en: {
    blogTitle: "Jonah Yen",
    blogSubtitle: "AI Engineer & Jazz Drummer",
    heroTitle: "Hi, I'm Jonah Yen 👋",
    heroRole: "AI Engineer (GenAI & Cloud Architecture) / Jazz Drummer",
    heroBio: "AI Engineer with 4+ yrs experience building production AI Agents (MCP/RAG) and multi-modal systems. Passionate about readable code, jazz drum grooves, and French pastries.",
    viewProjects: "View Projects",
    readBlog: "Read Blog",
    featuredPosts: "Featured Posts",
    featuredProjects: "Featured Projects",
    viewAllPosts: "View All Posts",
    viewAllProjects: "View All Projects",
    allPosts: "Articles",
    projectsTitle: "Projects",
    resumeTitle: "Curriculum Vitae",
    contactTitle: "Get In Touch",
    backToList: "Back to Articles",
    noCover: "No Cover",
    readMore: "Read Article",
    noPostsCategory: "No posts in this category yet. Stay tuned!",
    downloadCv: "Download PDF CV",
    contactDesc: "Whether it's about AI Agents, cloud architecture, or jazz drumming, feel free to reach out!",
  }
};
