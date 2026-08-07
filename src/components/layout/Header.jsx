import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, UI_TEXT } from '@/data/siteData';

export default function Header({ lang, activeTab, selectedSlug, onNavigate, onLanguageChange }) {
  const t = UI_TEXT[lang];

  return (
    <header className="border-b border-zinc-800/60 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate('home')}
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
                onClick={() => onNavigate(item.id)}
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
            onClick={() => onLanguageChange('zh')}
            className={`h-7 px-2.5 text-xs rounded-full ${lang === 'zh' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-400'}`}
          >
            繁中
          </Button>
          <Button
            variant={lang === 'en' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onLanguageChange('en')}
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
              onClick={() => onNavigate(item.id)}
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
  );
}
