import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Calendar, Tag, ArrowLeft, Image as ImageIcon, Globe, Terminal, Drum, Utensils, Cpu, Code2, User, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const markdownFiles = import.meta.glob('/src/content/posts/*/index.{zh,en}.md', { query: '?raw', import: 'default', eager: true });
const imageFiles = import.meta.glob('/src/content/posts/*/*.{png,jpg,jpeg,webp,svg}', { eager: true });

// 分類與圖示搭配
const CATEGORIES = [
  { id: 'all', zh: '全部文章', en: 'All', icon: Sparkles },
  { id: '個人', zh: '個人', en: 'Personal', icon: User },
  { id: 'AI', zh: 'AI', en: 'AI', icon: Cpu },
  { id: '前端', zh: '前端', en: 'Frontend', icon: Code2 },
  { id: '後端', zh: '後端', en: 'Backend', icon: Terminal },
  { id: '爵士鼓', zh: '爵士鼓', en: 'Jazz Drums', icon: Drum },
  { id: '甜點', zh: '甜點', en: 'Desserts', icon: Utensils },
];

const UI_TEXT = {
  zh: {
    blogTitle: "Jonah Yian",
    blogSubtitle: "AI Engineer & Jazz Drummer",
    allPosts: "最新文章",
    backToList: "返回文章列表",
    noCover: "無封面圖",
    readMore: "閱讀內文",
    bio: "專注於 AI / 機器學習與前後端開發。寫程式講求可讀性，生活離不開爵士鼓的切分音與法式甜點。",
    noPostsCategory: "這個分類還沒有寫文章，敬請期待！",
  },
  en: {
    blogTitle: "Jonah Yian",
    blogSubtitle: "AI Engineer & Jazz Drummer",
    allPosts: "Articles",
    backToList: "Back to Articles",
    noCover: "No Cover",
    readMore: "Read Article",
    bio: "Focused on AI/ML and fullstack engineering. Passionate about clean readable code, jazz drum grooves, and French pastry exploration.",
    noPostsCategory: "No posts in this category yet. Stay tuned!",
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
      {/* Header */}
      <header className="border-b border-zinc-800/60 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => { setSelectedSlug(null); setSelectedCategory('all'); }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 p-[1px] shadow-sm">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center font-mono font-bold text-xs text-amber-400">
                JY
              </div>
            </div>
            <div>
              <span className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors tracking-tight">
                {t.blogTitle}
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-zinc-500 font-mono">
                / {t.blogSubtitle}
              </span>
            </div>
          </div>

          {/* 語言切換選單 - 使用 Button 組件 */}
          <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800/80 p-1 rounded-full text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-zinc-400 ml-2 mr-1" />
            <Button
              variant={lang === 'zh' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setLang('zh')}
              className={`h-7 px-3 text-xs rounded-full ${lang === 'zh' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-400'}`}
            >
              繁體中文
            </Button>
            <Button
              variant={lang === 'en' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setLang('en')}
              className={`h-7 px-3 text-xs rounded-full ${lang === 'en' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-400'}`}
            >
              EN
            </Button>
          </div>
        </div>
      </header>

      {/* 主要內容區域 */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {selectedPost ? (
          /* 單篇文章頁面 */
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
          </div>
        ) : (
          /* 文章列表 - 使用 shadcn/ui Card, Badge, Button 元件組裝 */
          <div className="space-y-12">
            <div className="border-b border-zinc-800/60 pb-10 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                Jonah Yian
              </h1>
              <p className="text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                {t.bio}
              </p>
            </div>

            <div className="space-y-6">
              {/* 分類按鈕 - 使用 shadcn/ui Button */}
              <div className="flex flex-wrap gap-2">
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

              {/* 文章列表網格 - 使用 shadcn/ui Card 元件 */}
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

                      <CardFooter className="px-5 py-3 text-zinc-500 flex justify-between items-center">
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
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-800/60 mt-20 py-8 text-center text-xs font-mono text-zinc-600">
        <p>© 2026 Jonah Yian. Built with React, Vite, shadcn/ui & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
