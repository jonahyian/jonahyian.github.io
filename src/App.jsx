import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/home/HomePage';
import PostList from '@/components/blog/PostList';
import MarkdownArticle from '@/components/blog/MarkdownArticle';
import ProjectsPage from '@/components/projects/ProjectsPage';
import ResumePage from '@/components/resume/ResumePage';
import ContactPage from '@/components/contact/ContactPage';

import { parseAllPosts } from '@/content/postsLoader';
import { CATEGORIES, UI_TEXT } from '@/data/siteData';

const allPostsMap = parseAllPosts();

export default function App() {
  const [lang, setLang] = useState('zh');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSlug, setSelectedSlug] = useState(null);

  const t = UI_TEXT[lang];

  const currentPosts = useMemo(() => {
    return allPostsMap[lang].length > 0 ? allPostsMap[lang] : allPostsMap.zh;
  }, [lang]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return currentPosts;

    return currentPosts.filter(p => {
      if (lang === 'en') {
        const catObj = CATEGORIES.find(c => c.id === p.category || c.en === p.category);
        const targetCat = CATEGORIES.find(c => c.id === selectedCategory);
        return catObj && targetCat && catObj.id === targetCat.id;
      }
      return p.category === selectedCategory;
    });
  }, [currentPosts, selectedCategory, lang]);

  const selectedPost = useMemo(() => {
    return currentPosts.find(p => p.slug === selectedSlug);
  }, [currentPosts, selectedSlug]);

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    setSelectedSlug(null);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-zinc-200 font-sans selection:bg-amber-500 selection:text-zinc-950">
      <Header
        lang={lang}
        activeTab={activeTab}
        selectedSlug={selectedSlug}
        onNavigate={handleNavigate}
        onLanguageChange={setLang}
      />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {selectedSlug && selectedPost ? (
          <MarkdownArticle
            post={selectedPost}
            backLabel={t.backToList}
            onBack={() => setSelectedSlug(null)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomePage
                lang={lang}
                posts={currentPosts}
                onNavigate={handleNavigate}
                onSelectPost={setSelectedSlug}
              />
            )}

            {activeTab === 'blog' && (
              <PostList
                lang={lang}
                posts={filteredPosts}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectPost={setSelectedSlug}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsPage lang={lang} />
            )}

            {activeTab === 'resume' && (
              <ResumePage lang={lang} />
            )}

            {activeTab === 'contact' && (
              <ContactPage lang={lang} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
