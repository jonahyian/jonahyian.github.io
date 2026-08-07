import React from 'react';
import { Mail } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { CV_DATA } from '@/data/cvData';
import { UI_TEXT } from '@/data/siteData';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export default function ContactPage({ lang }) {
  const t = UI_TEXT[lang];

  return (
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
  );
}
