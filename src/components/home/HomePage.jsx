import React from 'react';
import { Sparkles, Code2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PostCard from '@/components/blog/PostCard';
import { CV_DATA } from '@/data/cvData';
import { UI_TEXT } from '@/data/siteData';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export default function HomePage({ lang, posts, onNavigate, onSelectPost }) {
  const t = UI_TEXT[lang];

  return (
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
            onClick={() => onNavigate('projects')}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold gap-2 rounded-full px-6"
          >
            {t.viewProjects} <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('resume')}
            className="border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-full px-6"
          >
            {t.resumeTitle}
          </Button>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {t.featuredPosts}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('blog')}
            className="text-xs font-mono text-zinc-400 hover:text-amber-400 gap-1 p-0 hover:bg-transparent"
          >
            {t.viewAllPosts} &rarr;
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.slice(0, 2).map(post => (
            <PostCard
              key={post.slug}
              post={post}
              readMoreLabel={t.readMore}
              noCoverLabel={t.noCover}
              onClick={() => onSelectPost(post.slug)}
            />
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-6 pt-4 border-t border-zinc-800/60">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            {t.featuredProjects}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('projects')}
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
  );
}
