import React from 'react';
import { Folder } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PostCard from '@/components/blog/PostCard';
import { CATEGORIES, UI_TEXT } from '@/data/siteData';

export default function PostList({ lang, posts, selectedCategory, onSelectCategory, onSelectPost }) {
  const t = UI_TEXT[lang];

  return (
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
              onClick={() => onSelectCategory(cat.id)}
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

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map(post => (
            <PostCard
              key={post.slug}
              post={post}
              readMoreLabel={t.readMore}
              noCoverLabel={t.noCover}
              onClick={() => onSelectPost(post.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/60 text-zinc-500 text-sm font-mono">
          <p>{t.noPostsCategory}</p>
        </div>
      )}
    </div>
  );
}
