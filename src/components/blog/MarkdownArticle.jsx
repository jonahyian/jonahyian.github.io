import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPostImage } from '@/content/postsLoader';

export default function MarkdownArticle({ post, backLabel, onBack }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors gap-2 group p-0 hover:bg-transparent"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {backLabel}
      </Button>

      <article className="space-y-8">
        <header className="space-y-4 border-b border-zinc-800/80 pb-8">
          <div className="flex items-center gap-3 text-xs font-mono">
            <Badge variant="amber">{post.category}</Badge>
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1 font-normal">
                  <Tag className="w-3 h-3 text-zinc-500" /> {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {post.coverUrl && (
          <div className="rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/50 shadow-2xl">
            <img src={post.coverUrl} alt="Cover" className="w-full max-h-[420px] object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed text-base space-y-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ _node, ...props }) => <h1 className="text-2xl font-semibold text-zinc-100 mt-8 mb-4 border-b border-zinc-800 pb-2" {...props} />,
              h2: ({ _node, ...props }) => <h2 className="text-xl font-semibold text-zinc-100 mt-6 mb-3" {...props} />,
              h3: ({ _node, ...props }) => <h3 className="text-lg font-semibold text-amber-400 mt-5 mb-2" {...props} />,
              p: ({ _node, ...props }) => <p className="text-zinc-300 leading-relaxed text-base my-4" {...props} />,
              ul: ({ _node, ...props }) => <ul className="list-disc list-inside space-y-2 text-zinc-300 my-4 pl-2" {...props} />,
              ol: ({ _node, ...props }) => <ol className="list-decimal list-inside space-y-2 text-zinc-300 my-4 pl-2" {...props} />,
              blockquote: ({ _node, ...props }) => (
                <blockquote className="border-l-2 border-amber-500/80 bg-amber-500/5 pl-4 py-3 my-6 rounded-r-md text-zinc-300 italic" {...props} />
              ),
              img: ({ _node, src, alt, ...props }) => {
                let resolvedSrc = src;
                if (src && (src.startsWith('./') || !src.startsWith('http'))) {
                  const mapped = getPostImage(post.slug, src);
                  if (mapped) resolvedSrc = mapped;
                }
                return (
                  <span className="block my-6 rounded-xl overflow-hidden border border-zinc-800/80 shadow-xl bg-zinc-950">
                    <img src={resolvedSrc} alt={alt} className="w-full object-cover max-h-[460px]" {...props} />
                    {alt && <span className="block text-center text-xs font-mono text-zinc-500 py-2 border-t border-zinc-800/60 bg-zinc-900/40">{alt}</span>}
                  </span>
                );
              },
              code({ _node, inline, className, children, ...props }) {
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
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
