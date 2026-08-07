import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Calendar, Tag, ArrowLeft, Image as ImageIcon, Globe, Terminal, 
  Drum, Utensils, Cpu, Code2, User, Sparkles, Folder, ArrowRight,
  Briefcase, Mail, ExternalLink, Download, GraduationCap, Award, CheckCircle2, Phone, MapPin
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const markdownFiles = import.meta.glob('/src/content/posts/*/index.{zh,en}.md', { query: '?raw', import: 'default', eager: true });
const imageFiles = import.meta.glob('/src/content/posts/*/*.{png,jpg,jpeg,webp,svg}', { eager: true });

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const NAV_ITEMS = [
  { id: 'home', zh: '首頁', en: 'Home' },
  { id: 'blog', zh: '文章', en: 'Blog' },
  { id: 'projects', zh: '專案', en: 'Projects' },
  { id: 'resume', zh: '履歷', en: 'Resume' },
  { id: 'contact', zh: '聯絡', en: 'Contact' },
];

const CATEGORIES = [
  { id: 'all', zh: '全部文章', en: 'All', icon: Sparkles },
  { id: '個人', zh: '個人', en: 'Personal', icon: User },
  { id: 'AI', zh: 'AI', en: 'AI', icon: Cpu },
  { id: '前端', zh: '前端', en: 'Frontend', icon: Code2 },
  { id: '後端', zh: '後端', en: 'Backend', icon: Terminal },
  { id: '爵士鼓', zh: '爵士鼓', en: 'Jazz Drums', icon: Drum },
  { id: '甜點', zh: '甜點', en: 'Desserts', icon: Utensils },
];

// 個人履歷資料庫 (RenderCV 權威數據)
const CV_DATA = {
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

const UI_TEXT = {
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

const parsePosts = () => {
  const postsMap = { zh: [], en: [] };

  Object.entries(markdownFiles).forEach(([path, rawContent]) => {
    const pathParts = path.split('/');
    const slug = pathParts[pathParts.length - 2];
    const fileName = pathParts[pathParts.length - 1];
    const lang = fileName.includes('.en.md') ? 'en' : 'zh';

    const parsed = fm(typeof rawContent === 'string' ? rawContent : '');
    const data = parsed.attributes || {};
    const content = parsed.body || '';

    const coverPath = Object.keys(imageFiles).find(img => img.includes(`/posts/${slug}/`));
    const coverUrl = coverPath ? imageFiles[coverPath].default : null;

    const postObj = {
      slug,
      lang,
      coverUrl,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || '個人',
      tags: data.tags || [],
      summary: data.summary || '',
      content,
    };

    postsMap[lang].push(postObj);
  });

  postsMap.zh.sort((a, b) => new Date(b.date) - new Date(a.date));
  postsMap.en.sort((a, b) => new Date(b.date) - new Date(a.date));

  return postsMap;
};

const allPostsMap = parsePosts();

export default function App() {
  const [lang, setLang] = useState('zh');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSlug, setSelectedSlug] = useState(null);

  const t = UI_TEXT[lang];
  const currentPosts = allPostsMap[lang].length > 0 ? allPostsMap[lang] : allPostsMap.zh;

  const filteredPosts = selectedCategory === 'all'
    ? currentPosts
    : currentPosts.filter(p => {
        if (lang === 'en') {
          const catObj = CATEGORIES.find(c => c.id === p.category || c.en === p.category);
          const targetCat = CATEGORIES.find(c => c.id === selectedCategory);
          return catObj && targetCat && catObj.id === targetCat.id;
        }
        return p.category === selectedCategory;
      });

  const selectedPost = currentPosts.find(p => p.slug === selectedSlug);

  return (
    <div className="min-h-screen bg-[#0d1117] text-zinc-200 font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* Navigation Header */}
      <header className="border-b border-zinc-800/60 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => { setActiveTab('home'); setSelectedSlug(null); setSelectedCategory('all'); }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 p-[1px] shadow-sm">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center font-mono font-bold text-xs text-amber-400">
                JY
              </div>
            </div>
            <span className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors tracking-tight">
              {t.blogTitle}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 p-1 rounded-full text-xs font-medium">
            {NAV_ITEMS.map(item => {
              const isActive = activeTab === item.id && !selectedSlug;
              const label = lang === 'en' ? item.en : item.zh;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSelectedSlug(null); }}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${
                    isActive 
                      ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm' 
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800/80 p-1 rounded-full text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-zinc-400 ml-2 mr-1" />
            <Button
              variant={lang === 'zh' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setLang('zh')}
              className={`h-7 px-2.5 text-xs rounded-full ${lang === 'zh' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-400'}`}
            >
              繁中
            </Button>
            <Button
              variant={lang === 'en' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setLang('en')}
              className={`h-7 px-2.5 text-xs rounded-full ${lang === 'en' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-400'}`}
            >
              EN
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-around border-t border-zinc-800/60 px-4 py-2 bg-zinc-950/40 text-xs">
          {NAV_ITEMS.map(item => {
            const isActive = activeTab === item.id && !selectedSlug;
            const label = lang === 'en' ? item.en : item.zh;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedSlug(null); }}
                className={`py-1 px-2 rounded-md transition-colors ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-zinc-400'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {selectedSlug ? (
          /* 文章內文頁面 */
          <div className="max-w-3xl mx-auto space-y-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSlug(null)}
              className="text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors gap-2 group p-0 hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t.backToList}
            </Button>

            {selectedPost && (
              <article className="space-y-8">
                <header className="space-y-4 border-b border-zinc-800/80 pb-8">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <Badge variant="amber">{selectedPost.category}</Badge>
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedPost.date}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight leading-tight">
                    {selectedPost.title}
                  </h1>

                  {selectedPost.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedPost.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1 font-normal">
                          <Tag className="w-3 h-3 text-zinc-500" /> {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </header>

                {selectedPost.coverUrl && (
                  <div className="rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/50 shadow-2xl">
                    <img src={selectedPost.coverUrl} alt="Cover" className="w-full max-h-[420px] object-cover" />
                  </div>
                )}

                <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed text-base space-y-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-2xl font-semibold text-zinc-100 mt-8 mb-4 border-b border-zinc-800 pb-2" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-zinc-100 mt-6 mb-3" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-amber-400 mt-5 mb-2" {...props} />,
                      p: ({ node, ...props }) => <p className="text-zinc-300 leading-relaxed text-base my-4" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 text-zinc-300 my-4 pl-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 text-zinc-300 my-4 pl-2" {...props} />,
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-2 border-amber-500/80 bg-amber-500/5 pl-4 py-3 my-6 rounded-r-md text-zinc-300 italic" {...props} />
                      ),
                      img: ({ node, src, alt, ...props }) => {
                        // 解析相對路徑 (例如 ./pgvector.jpg)
                        let resolvedSrc = src;
                        if (src && (src.startsWith('./') || !src.startsWith('http'))) {
                          const cleanSrc = src.replace(/^\.\//, '');
                          const matchedImgKey = Object.keys(imageFiles).find(key => 
                            key.includes(`/posts/${selectedPost.slug}/${cleanSrc}`)
                          );
                          if (matchedImgKey && imageFiles[matchedImgKey]) {
                            resolvedSrc = imageFiles[matchedImgKey].default;
                          }
                        }
                        return (
                          <span className="block my-6 rounded-xl overflow-hidden border border-zinc-800/80 shadow-xl bg-zinc-950">
                            <img src={resolvedSrc} alt={alt} className="w-full object-cover max-h-[460px]" {...props} />
                            {alt && <span className="block text-center text-xs font-mono text-zinc-500 py-2 border-t border-zinc-800/60 bg-zinc-900/40">{alt}</span>}
                          </span>
                        );
                      },
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        return !inline && language ? (
                          <div className="my-6 rounded-xl overflow-hidden border border-zinc-800/90 shadow-xl bg-[#090d16]">
                            <div className="bg-zinc-900/80 px-4 py-2 text-xs font-mono text-zinc-400 border-b border-zinc-800/80 flex justify-between items-center">
                              <span className="text-amber-400/90 font-semibold">{language.toLowerCase()}</span>
                            </div>
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={language}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                padding: '1.25rem',
                                background: 'transparent',
                                fontSize: '0.875rem',
                                lineHeight: '1.6',
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-zinc-800/80 text-amber-300/90 px-1.5 py-0.5 rounded font-mono text-sm border border-zinc-700/60" {...props}>
                            {children}
                          </code>
                        );
                      },
                      hr: () => <hr className="border-zinc-800/80 my-8" />
                    }}
                  >
                    {selectedPost.content}
                  </ReactMarkdown>
                </div>
              </article>
            )}
          </div>
        ) : (
          <>
            {/* 1. HOME 頁面 */}
            {activeTab === 'home' && (
              <div className="space-y-16">
                <div className="space-y-6 pt-4 border-b border-zinc-800/60 pb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.heroRole}
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
                    {t.heroTitle}
                  </h1>
                  <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
                    {t.heroBio}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button 
                      onClick={() => setActiveTab('projects')}
                      className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold gap-2 rounded-full px-6"
                    >
                      {t.viewProjects} <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('resume')}
                      className="border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-full px-6"
                    >
                      {t.resumeTitle}
                    </Button>
                  </div>
                </div>

                {/* 精選最新文章 */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      {t.featuredPosts}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('blog')}
                      className="text-xs font-mono text-zinc-400 hover:text-amber-400 gap-1 p-0 hover:bg-transparent"
                    >
                      {t.viewAllPosts} &rarr;
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {currentPosts.slice(0, 2).map(post => (
                      <Card
                        key={post.slug}
                        onClick={() => setSelectedSlug(post.slug)}
                        className="group cursor-pointer flex flex-col justify-between"
                      >
                        <CardHeader className="p-5 space-y-4">
                          {post.coverUrl ? (
                            <div className="h-44 overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800/60 relative">
                              <img 
                                src={post.coverUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                              />
                              <div className="absolute top-3 left-3">
                                <Badge variant="amber" className="bg-zinc-950/80 backdrop-blur border-zinc-800">
                                  {post.category}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <div className="h-28 bg-zinc-950/40 rounded-xl border border-zinc-800/40 flex flex-col items-center justify-center text-zinc-600 gap-1">
                              <ImageIcon className="w-5 h-5 text-zinc-600" />
                              <span className="text-xs font-mono">{t.noCover}</span>
                            </div>
                          )}

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{post.date}</span>
                            </div>

                            <CardTitle className="text-lg group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </CardTitle>

                            <CardDescription className="text-zinc-400 line-clamp-2">
                              {post.summary}
                            </CardDescription>
                          </div>
                        </CardHeader>

                        <CardFooter className="px-5 py-3 text-zinc-500 flex justify-between items-center font-mono text-xs">
                          <span>{post.slug}</span>
                          <span className="text-amber-400/90 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            {t.readMore} &rarr;
                          </span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 精選專案 */}
                <div className="space-y-6 pt-4 border-t border-zinc-800/60">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-amber-400" />
                      {t.featuredProjects}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-mono text-zinc-400 hover:text-amber-400 gap-1 p-0 hover:bg-transparent"
                    >
                      {t.viewAllProjects} &rarr;
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-1">
                    {CV_DATA.projects.map(project => (
                      <Card key={project.title} className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="amber">{project.period}</Badge>
                          <a href={CV_DATA.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white flex items-center gap-1 text-xs font-mono">
                            <GithubIcon className="w-4 h-4" /> GitHub
                          </a>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {lang === 'en' ? project.enDesc : project.zhDesc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. BLOG 頁面 */}
            {activeTab === 'blog' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <Folder className="w-6 h-6 text-amber-400" />
                    {t.allPosts}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    {lang === 'en' ? 'Sharing thoughts on AI, Fullstack Dev, Jazz Drums, and Desserts.' : '分享 AI 技術、前後端開發、爵士鼓手隨筆與甜點探索。'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-800/80">
                  {CATEGORIES.map(cat => {
                    const IconComp = cat.icon;
                    const catLabel = lang === 'en' ? cat.en : cat.zh;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <Button
                        key={cat.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`h-8 rounded-full text-xs font-medium gap-1.5 ${
                          isSelected
                            ? 'bg-zinc-100 text-zinc-950 hover:bg-white font-semibold'
                            : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800/80'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        {catLabel}
                      </Button>
                    );
                  })}
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredPosts.map(post => (
                      <Card
                        key={post.slug}
                        onClick={() => setSelectedSlug(post.slug)}
                        className="group cursor-pointer flex flex-col justify-between"
                      >
                        <CardHeader className="p-5 space-y-4">
                          {post.coverUrl ? (
                            <div className="h-44 overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800/60 relative">
                              <img 
                                src={post.coverUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                              />
                              <div className="absolute top-3 left-3">
                                <Badge variant="amber" className="bg-zinc-950/80 backdrop-blur border-zinc-800">
                                  {post.category}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <div className="h-28 bg-zinc-950/40 rounded-xl border border-zinc-800/40 flex flex-col items-center justify-center text-zinc-600 gap-1">
                              <ImageIcon className="w-5 h-5 text-zinc-600" />
                              <span className="text-xs font-mono">{t.noCover}</span>
                            </div>
                          )}

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{post.date}</span>
                            </div>

                            <CardTitle className="text-lg group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </CardTitle>

                            <CardDescription className="text-zinc-400 line-clamp-2">
                              {post.summary}
                            </CardDescription>
                          </div>
                        </CardHeader>

                        <CardFooter className="px-5 py-3 text-zinc-500 flex justify-between items-center font-mono text-xs">
                          <span>{post.slug}</span>
                          <span className="text-amber-400/90 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            {t.readMore} &rarr;
                          </span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/60 text-zinc-500 text-sm font-mono">
                    <p>{t.noPostsCategory}</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. PROJECTS 頁面 */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-amber-400" />
                    {t.projectsTitle}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    {lang === 'en' ? 'Showcasing AI Agents, Multi-modal RAG systems, and Cloud architecture.' : '展示 AI Agent 系統、多模態 RAG 架構與雲端開發實績。'}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-1">
                  {CV_DATA.projects.map(project => (
                    <Card key={project.title} className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="amber">{project.period}</Badge>
                        <a href={CV_DATA.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white flex items-center gap-1 text-xs font-mono">
                          <GithubIcon className="w-4 h-4" /> GitHub
                        </a>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {lang === 'en' ? project.enDesc : project.zhDesc}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 4. RESUME 頁面 (根據 RenderCV 完整呈現) */}
            {activeTab === 'resume' && (
              <div className="space-y-12 max-w-4xl mx-auto">
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800/80 pb-6 gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-zinc-100">{CV_DATA.name}</h1>
                    <p className="text-amber-400 font-mono text-sm mt-1">{CV_DATA.title}</p>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 mt-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-zinc-500" /> {CV_DATA.location}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-zinc-500" /> {CV_DATA.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-zinc-500" /> {CV_DATA.email}</span>
                    </div>
                  </div>
                  <a href="/Jonah_Yen_CV.pdf" download="Jonah_Yen_CV.pdf">
                    <Button variant="outline" className="rounded-full gap-2 border-zinc-700 hover:border-amber-500/60 hover:text-amber-400">
                      <Download className="w-4 h-4" /> {t.downloadCv}
                    </Button>
                  </a>
                </div>

                {/* Summary */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
                    <User className="w-5 h-5 text-amber-400" /> Summary
                  </h2>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {lang === 'en' ? CV_DATA.summaryEn : CV_DATA.summaryZh}
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
                    <Briefcase className="w-5 h-5 text-amber-400" /> Experience
                  </h2>

                  <div className="space-y-8 border-l border-zinc-800/80 pl-6 ml-2">
                    {CV_DATA.experiences.map((exp, idx) => (
                      <div key={idx} className="relative space-y-3">
                        <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-zinc-950" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-zinc-100">
                              {lang === 'en' ? exp.roleEn : exp.roleZh}
                            </h3>
                            <span className="text-amber-400/90 text-sm font-medium">{exp.company}</span>
                          </div>
                          <div className="text-xs font-mono text-zinc-500 mt-1 sm:mt-0">
                            <span>{exp.period}</span> | <span>{exp.location}</span>
                          </div>
                        </div>

                        <ul className="space-y-2 text-zinc-300 text-xs sm:text-sm leading-relaxed list-disc list-inside">
                          {(lang === 'en' ? exp.bulletsEn : exp.bulletsZh).map((bullet, i) => (
                            <li key={i} className="text-zinc-300">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
                    <Cpu className="w-5 h-5 text-amber-400" /> Technical Skills
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2 text-xs font-mono">
                    <Card className="p-4 space-y-2">
                      <span className="text-amber-400 font-semibold">AI Agents & LLMs</span>
                      <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.ai}</p>
                    </Card>
                    <Card className="p-4 space-y-2">
                      <span className="text-amber-400 font-semibold">Multi-modal & Vision</span>
                      <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.vision}</p>
                    </Card>
                    <Card className="p-4 space-y-2">
                      <span className="text-amber-400 font-semibold">LLMOps & Cloud</span>
                      <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.cloud}</p>
                    </Card>
                    <Card className="p-4 space-y-2">
                      <span className="text-amber-400 font-semibold">Data & Search</span>
                      <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.data}</p>
                    </Card>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" /> Education
                  </h2>

                  <div className="space-y-6">
                    {CV_DATA.education.map((edu, idx) => (
                      <Card key={idx} className="p-5 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h3 className="text-base font-bold text-zinc-100">
                              {lang === 'en' ? edu.schoolEn : edu.schoolZh}
                            </h3>
                            <span className="text-amber-400 text-xs font-mono">
                              {lang === 'en' ? edu.degreeEn : edu.degreeZh}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-zinc-500 mt-1 sm:mt-0">{edu.period}</span>
                        </div>

                        <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
                          {(lang === 'en' ? edu.detailsEn : edu.detailsZh).map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. CONTACT 頁面 */}
            {activeTab === 'contact' && (
              <div className="space-y-8 max-w-2xl mx-auto">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <Mail className="w-6 h-6 text-amber-400" />
                    {t.contactTitle}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    {t.contactDesc}
                  </p>
                </div>

                <Card className="p-6 space-y-4">
                  <a 
                    href={`mailto:${CV_DATA.email}`} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-amber-500/50 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-500">Email</span>
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-amber-400">{CV_DATA.email}</p>
                    </div>
                  </a>

                  <a 
                    href={CV_DATA.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-amber-500/50 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-zinc-800 text-zinc-200">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-500">GitHub</span>
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-amber-400">github.com/a94763075</p>
                    </div>
                  </a>
                </Card>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-zinc-800/60 mt-20 py-8 text-center text-xs font-mono text-zinc-600">
        <p>© 2026 Jonah Yen (顏苙峰). Built with React, Vite, RenderCV Data & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
