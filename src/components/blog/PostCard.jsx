import React from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PostCard({ post, readMoreLabel, noCoverLabel, onClick }) {
  return (
    <Card
      onClick={onClick}
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
            <span className="text-xs font-mono">{noCoverLabel}</span>
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
          {readMoreLabel} &rarr;
        </span>
      </CardFooter>
    </Card>
  );
}
