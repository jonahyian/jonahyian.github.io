import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BookOpen, Calendar, Tag, ArrowLeft, Folder, Image as ImageIcon, Globe, Layers } from 'lucide-react';

// 使用 Vite 載入所有 .zh.md 與 .en.md 檔案的原始內容
const markdownFiles = import.meta.glob('/src/content/posts/*/index.{zh,en}.md', { query: '?raw', import: 'default', eager: true });
const imageFiles = import.meta.glob('/src/content/posts/*/*.{png,jpg,jpeg,webp,svg}', { eager: true });

// 分類定義與對應名稱
const CATEGORIES = [
  { id: 'all', zh: '全部文章', en: 'All' },
  { id: '個人', zh: '個人', en: 'Personal' },
  { id: 'AI', zh: 'AI', en: 'AI' },
  { id: '前端', zh: '前端', en: 'Frontend' },
  { id: '爵士鼓', zh: '爵士鼓', en: 'Jazz Drums' },
  { id: '甜點', zh: '甜點', en: 'Desserts' },
];

// UI 常數與多語言對應表
const UI_TEXT = {
  zh: {
    blogTitle: "Jonah's Blog",
    allPosts: "文章列表",
    backToList: "返回文章列表",
    noCover: "無封面圖",
    readMore: "閱讀全文",
    subtitle: "分享 AI 技術、前端開發、爵士鼓手隨筆與甜點探索。",
    badge: "i18n & Category Enabled",
    noPostsCategory: "此分類下暫無文章",
  },
  en: {
    blogTitle: "Jonah's Blog",
    allPosts: "Posts",
    backToList: "Back to Posts",
    noCover: "No Cover Image",
    readMore: "Read More",
    subtitle: "Sharing thoughts on AI, Frontend, Jazz Drums, and Desserts.",
    badge: "i18n & Category Enabled",
    noPostsCategory: "No posts in this category yet",
  }
};

// 剖析 Markdown 與 Frontmatter
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
      folderPath: `src/content/posts/${slug}/index.${lang}.md`,
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
  const [lang, setLang] = useState('zh'); // 當前語言: 'zh' 或 'en'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 選擇的分類
  const [selectedSlug, setSelectedSlug] = useState(null);

  const t = UI_TEXT[lang];

  // 取得當前語言的文章列表
  const currentPosts = allPostsMap[lang].length > 0 ? allPostsMap[lang] : allPostsMap.zh;

  // 依分類過濾文章
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedSlug(null); setSelectedCategory('all'); }}>
            <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Folder className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">{t.blogTitle}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* 語言切換按鈕 (i18n Switcher) */}
            <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
              <button
                onClick={() => setLang('zh')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  lang === 'zh' ? 'bg-indigo-600 text-white font-medium shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  lang === 'en' ? 'bg-indigo-600 text-white font-medium shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {selectedPost ? (
          /* 單篇文章頁 */
          <div className="space-y-6">
            <button
              onClick={() => setSelectedSlug(null)}
              className="inline-flex items-center text-sm text-slate-400 hover:text-indigo-400 transition-colors gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t.backToList}
            </button>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 px-2.5 py-1 rounded-md font-medium">
                    <Layers className="w-3.5 h-3.5" />
                    {selectedPost.category}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {selectedPost.date}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{selectedPost.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-slate-800/80 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3 text-indigo-400" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPost.coverUrl && (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <img src={selectedPost.coverUrl} alt="Cover" className="w-full max-h-96 object-cover" />
                </div>
              )}

              {/* 使用 react-markdown + SyntaxHighlighter 渲染正文 */}
              <article className="prose prose-invert max-w-none border-t border-slate-800/80 pt-6 space-y-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-white mt-6 mb-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-slate-100 mt-5 mb-3 border-b border-slate-800 pb-2" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-indigo-300 mt-4 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="text-slate-300 leading-relaxed text-base my-3" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1.5 text-slate-300 my-3" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1.5 text-slate-300 my-3" {...props} />,
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-indigo-500 bg-indigo-950/20 pl-4 py-2 my-4 rounded-r text-slate-300 italic" {...props} />
                    ),
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      return !inline && language ? (
                        <div className="my-4 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                          <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-400 border-b border-slate-800 font-mono flex justify-between items-center">
                            <span>{language.toUpperCase()}</span>
                          </div>
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={language}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              padding: '1.25rem',
                              background: '#090d16',
                              fontSize: '0.9rem',
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-sm border border-slate-700" {...props}>
                          {children}
                        </code>
                      );
                    },
                    hr: () => <hr className="border-slate-800 my-6" />
                  }}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        ) : (
          /* 文章列表頁 (含分類過濾器) */
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                {t.allPosts}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {t.subtitle}
              </p>
            </div>

            {/* 分類按鈕 Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800/80">
              {CATEGORIES.map(cat => {
                const catLabel = lang === 'en' ? cat.en : cat.zh;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 text-xs rounded-lg transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20 font-medium'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {catLabel}
                  </button>
                );
              })}
            </div>

            {/* 文章列表 */}
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredPosts.map(post => (
                  <div
                    key={post.slug}
                    onClick={() => setSelectedSlug(post.slug)}
                    className="bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/5 group"
                  >
                    <div className="space-y-3">
                      {post.coverUrl ? (
                        <div className="h-44 overflow-hidden rounded-lg border border-slate-800/80 relative">
                          <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur text-indigo-300 text-xs px-2.5 py-0.5 rounded-md border border-slate-700/80 font-medium">
                            {post.category}
                          </span>
                        </div>
                      ) : (
                        <div className="h-28 bg-slate-950/60 rounded-lg border border-slate-800/50 flex flex-col items-center justify-center text-slate-600 gap-1">
                          <ImageIcon className="w-6 h-6" />
                          <span className="text-xs">{t.noCover}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{post.date}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono text-slate-400 flex items-center gap-1">
                        <Folder className="w-3 h-3 text-indigo-400" />
                        {post.slug}
                      </span>
                      <span className="text-indigo-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {t.readMore} &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/40 rounded-xl border border-slate-800/60 text-slate-500">
                <p>{t.noPostsCategory}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
