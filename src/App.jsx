import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BookOpen, Calendar, Tag, ArrowLeft, Folder, Image as ImageIcon } from 'lucide-react';

// 使用 Vite 載入所有 .md 檔案的原始字串內容 (raw)
const markdownFiles = import.meta.glob('/src/content/posts/*/index.md', { query: '?raw', import: 'default', eager: true });
const imageFiles = import.meta.glob('/src/content/posts/*/*.{png,jpg,jpeg,webp,svg}', { eager: true });

// 剖析 Markdown 與 Frontmatter
const postsList = Object.entries(markdownFiles).map(([path, rawContent]) => {
  const pathParts = path.split('/');
  const slug = pathParts[pathParts.length - 2];
  
  const parsed = fm(typeof rawContent === 'string' ? rawContent : '');
  const data = parsed.attributes || {};
  const content = parsed.body || '';

  const coverPath = Object.keys(imageFiles).find(img => img.includes(`/posts/${slug}/`));
  const coverUrl = coverPath ? imageFiles[coverPath].default : null;

  return {
    slug,
    folderPath: `src/content/posts/${slug}/`,
    coverUrl,
    title: data.title || slug,
    date: data.date || '',
    tags: data.tags || [],
    summary: data.summary || '',
    content,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

export default function App() {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const selectedPost = postsList.find(p => p.slug === selectedSlug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedSlug(null)}>
            <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Folder className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">Jonah's Blog</span>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Prism Syntax Highlighting Enabled
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {selectedPost ? (
          /* 單篇文章頁 (Markdown 渲染) */
          <div className="space-y-6">
            <button
              onClick={() => setSelectedSlug(null)}
              className="inline-flex items-center text-sm text-slate-400 hover:text-indigo-400 transition-colors gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              返回文章列表
            </button>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md font-mono text-indigo-300">
                    <Folder className="w-3.5 h-3.5 text-indigo-400" />
                    {selectedPost.folderPath}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{selectedPost.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {tag}
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
          /* 文章列表頁 */
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                所有文章 (Posts)
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                文章採用 Markdown 格式編寫（<code className="text-indigo-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">index.md</code>），支援語法高亮。
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {postsList.map(post => (
                <div
                  key={post.slug}
                  onClick={() => setSelectedSlug(post.slug)}
                  className="bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/5 group"
                >
                  <div className="space-y-3">
                    {post.coverUrl ? (
                      <div className="h-44 overflow-hidden rounded-lg border border-slate-800/80 relative">
                        <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    ) : (
                      <div className="h-28 bg-slate-950/60 rounded-lg border border-slate-800/50 flex flex-col items-center justify-center text-slate-600 gap-1">
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-xs">無封面圖</span>
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
                      閱讀全文 &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
