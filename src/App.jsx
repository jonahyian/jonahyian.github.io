import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Calendar, Tag, ArrowLeft, Image as ImageIcon, Globe, Terminal, 
  Drum, Utensils, Cpu, Code2, User, Sparkles, Folder, ArrowRight,
  Briefcase, Mail, ExternalLink, Download, Clock
} from 'lucide-react';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Vite 動態載入文章
const markdownFiles = import.meta.glob('/src/content/posts/*/index.{zh,en}.md', { query: '?raw', import: 'default', eager: true });
const imageFiles = import.meta.glob('/src/content/posts/*/*.{png,jpg,jpeg,webp,svg}', { eager: true });

// 導覽頁籤
const NAV_ITEMS = [
  { id: 'home', zh: '首頁', en: 'Home' },
  { id: 'blog', zh: '文章', en: 'Blog' },
  { id: 'projects', zh: '專案', en: 'Projects' },
  { id: 'resume', zh: '履歷', en: 'Resume' },
  { id: 'contact', zh: '聯絡', en: 'Contact' },
];

// 分類定義
const CATEGORIES = [
  { id: 'all', zh: '全部文章', en: 'All', icon: Sparkles },
  { id: '個人', zh: '個人', en: 'Personal', icon: User },
  { id: 'AI', zh: 'AI', en: 'AI', icon: Cpu },
  { id: '前端', zh: '前端', en: 'Frontend', icon: Code2 },
  { id: '後端', zh: '後端', en: 'Backend', icon: Terminal },
  { id: '爵士鼓', zh: '爵士鼓', en: 'Jazz Drums', icon: Drum },
  { id: '甜點', zh: '甜點', en: 'Desserts', icon: Utensils },
];

// 示範專案列表
const DUMMY_PROJECTS = [
  {
    id: 'ai-agent-framework',
    title: 'Autonomous AI Agent Framework',
    zhSummary: '基於 LLM 的多 Agent 協同架構，支援自動任務分解、工具呼叫與記憶檢索。',
    enSummary: 'LLM-based multi-agent collaboration framework with task decomposition, tool use, and memory retrieval.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'LLM'],
    category: 'AI',
    github: 'https://github.com/jonahyian',
    demo: 'https://github.com/jonahyian',
  },
  {
    id: 'bilingual-markdown-blog',
    title: 'Personal Folder-per-Post Blog',
    zhSummary: '採用 Vite + React 與「資料夾即 Post」雙語模組化架構打造的極簡風格部落格。',
    enSummary: 'A minimalist personal blog powered by Vite, React, and a folder-per-post bilingual architecture.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'shadcn/ui'],
    category: '前端',
    github: 'https://github.com/jonahyian/jonahyian.github.io',
    demo: 'https://jonahyian.github.io',
  }
];

// UI 文字對應
const UI_TEXT = {
  zh: {
    blogTitle: "Jonah Yian",
    blogSubtitle: "AI Engineer & Jazz Drummer",
    heroTitle: "嗨，我是 Jonah 👋",
    heroRole: "AI 工程師 / 全棧開發者 / 爵士鼓手",
    heroBio: "專注於 AI 模型與現代 Web 應用開發。堅持「程式碼可讀性高於一切」，生活離不開爵士鼓的切分音與法式甜點。",
    viewProjects: "查看專案作品",
    readBlog: "閱讀最新隨筆",
    featuredPosts: "精選文章",
    featuredProjects: "亮點專案",
    viewAllPosts: "查看所有文章",
    viewAllProjects: "查看所有專案",
    allPosts: "文章列表",
    projectsTitle: "專案作品集",
    resumeTitle: "個人履歷與經歷",
    contactTitle: "保持聯繫",
    backToList: "返回文章列表",
    noCover: "無封面圖",
    readMore: "閱讀內文",
    noPostsCategory: "這個分類還沒有寫文章，敬請期待！",
    downloadCv: "下載 PDF 履歷",
    contactDesc: "不論是 AI 技術討論、專案合作或是爵士鼓交流，都歡迎隨時與我聯繫！",
  },
  en: {
    blogTitle: "Jonah Yian",
    blogSubtitle: "AI Engineer & Jazz Drummer",
    heroTitle: "Hi, I'm Jonah 👋",
    heroRole: "AI Engineer / Fullstack Developer / Jazz Drummer",
    heroBio: "Focused on AI models and modern web engineering. Passionate about readable code, jazz drum grooves, and French pastries.",
    viewProjects: "View Projects",
    readBlog: "Read Blog",
    featuredPosts: "Featured Posts",
    featuredProjects: "Featured Projects",
    viewAllPosts: "View All Posts",
    viewAllProjects: "View All Projects",
    allPosts: "Articles",
    projectsTitle: "Projects",
    resumeTitle: "Resume & Experience",
    contactTitle: "Get In Touch",
    backToList: "Back to Articles",
    noCover: "No Cover",
    readMore: "Read Article",
    noPostsCategory: "No posts in this category yet. Stay tuned!",
    downloadCv: "Download CV",
    contactDesc: "Whether it's about AI, fullstack collaboration, or jazz drumming, feel free to reach out!",
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
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'blog' | 'projects' | 'resume' | 'contact'
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
      {/* Header / Navigation Bar */}
      <header className="border-b border-zinc-800/60 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
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

          {/* Navigation Links */}
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

          {/* i18n Switcher */}
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

        {/* Mobile Navigation Bar */}
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
          /* 文章內文閱讀頁 */
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
          /* 根據 Active Tab 渲染對應主分頁 */
          <>
            {/* 1. HOME 頁面 */}
            {activeTab === 'home' && (
              <div className="space-y-16">
                {/* Hero Section */}
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
                      onClick={() => setActiveTab('blog')}
                      className="border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-full px-6"
                    >
                      {t.readBlog}
                    </Button>
                  </div>
                </div>

                {/* Featured Posts (精選最新文章) */}
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

                {/* Featured Projects (精選專案展示) */}
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

                  <div className="grid gap-6 md:grid-cols-2">
                    {DUMMY_PROJECTS.map(project => (
                      <Card key={project.id} className="flex flex-col justify-between p-5 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="amber">{project.category}</Badge>
                            <div className="flex gap-2">
                              <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                                <GithubIcon className="w-4 h-4" />
                              </a>
                              <a href={project.demo} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-400">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-zinc-100">{project.title}</h3>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            {lang === 'en' ? project.enSummary : project.zhSummary}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/60">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. BLOG 文章列表頁 */}
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

                {/* 分類篩選 Bar */}
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

                {/* 文章列表 */}
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

            {/* 3. PROJECTS 專案頁面 */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-amber-400" />
                    {t.projectsTitle}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    {lang === 'en' ? 'Showcasing AI models, Fullstack applications, and open source projects.' : '展示 AI 模型開發、全棧網頁應用與開源專案。'}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {DUMMY_PROJECTS.map(project => (
                    <Card key={project.id} className="flex flex-col justify-between p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="amber">{project.category}</Badge>
                          <div className="flex gap-2">
                            <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white p-1">
                              <GithubIcon className="w-4 h-4" />
                            </a>
                            <a href={project.demo} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-400 p-1">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {lang === 'en' ? project.enSummary : project.zhSummary}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/60">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 4. RESUME 履歷經歷頁面 */}
            {activeTab === 'resume' && (
              <div className="space-y-10 max-w-3xl">
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-amber-400" />
                      {t.resumeTitle}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      {t.heroRole}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-zinc-800">
                    <Download className="w-4 h-4" /> {t.downloadCv}
                  </Button>
                </div>

                {/* Timeline */}
                <div className="space-y-8 border-l border-zinc-800/80 pl-6 ml-2">
                  <div className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-zinc-950" />
                    <span className="text-xs font-mono text-amber-400 font-semibold">2024 — Present</span>
                    <h3 className="text-lg font-bold text-zinc-100">Senior AI Engineer</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {lang === 'en' 
                        ? 'Leading LLM Agent framework architecture, fine-tuning domain models, and deploying scalable inference pipelines.'
                        : '主導 LLM Agent 框架架構設計、領域大模型微調，並負責高吞吐推論流水線部署。'}
                    </p>
                  </div>

                  <div className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-600 ring-4 ring-zinc-950" />
                    <span className="text-xs font-mono text-zinc-500">2022 — 2024</span>
                    <h3 className="text-lg font-bold text-zinc-100">Fullstack Engineer</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {lang === 'en' 
                        ? 'Built high-performance React dashboard, integrated WebSocket live streams, and maintained microservice APIs.'
                        : '開發高效能 React 儀表板、整合 WebSocket 即時數據流，並維護後端微服務 API。'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CONTACT 聯絡頁面 */}
            {activeTab === 'contact' && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <Mail className="w-6 h-6 text-amber-400" />
                    {t.contactTitle}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    {t.contactDesc}
                  </p>
                </div>

                <Card className="p-6 space-y-6">
                  <div className="space-y-4">
                    <a 
                      href="mailto:a94763075@163.com" 
                      className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-amber-500/50 transition-colors group"
                    >
                      <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-zinc-500">Email</span>
                        <p className="text-sm font-medium text-zinc-200 group-hover:text-amber-400">a94763075@163.com</p>
                      </div>
                    </a>

                    <a 
                      href="https://github.com/jonahyian" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-amber-500/50 transition-colors group"
                    >
                      <div className="p-3 rounded-lg bg-zinc-800 text-zinc-200">
                        <GithubIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-zinc-500">GitHub</span>
                        <p className="text-sm font-medium text-zinc-200 group-hover:text-amber-400">github.com/jonahyian</p>
                      </div>
                    </a>
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </main>

      {/* 頁腳 Footer */}
      <footer className="border-t border-zinc-800/60 mt-20 py-8 text-center text-xs font-mono text-zinc-600">
        <p>© 2026 Jonah Yian. Built with React, Vite, shadcn/ui & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
