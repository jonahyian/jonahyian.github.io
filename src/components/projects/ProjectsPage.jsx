import React from 'react';
import { Code2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CV_DATA } from '@/data/cvData';
import { UI_TEXT } from '@/data/siteData';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export default function ProjectsPage({ lang }) {
  const t = UI_TEXT[lang];

  return (
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
  );
}
