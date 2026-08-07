import fm from 'front-matter';

const markdownFiles = import.meta.glob('/src/content/posts/*/index.{zh,en}.md', { query: '?raw', import: 'default', eager: true });
const imageFiles = import.meta.glob('/src/content/posts/*/*.{png,jpg,jpeg,webp,svg}', { eager: true });

export const getPostImage = (slug, filename) => {
  if (!filename) return null;
  const cleanFilename = filename.replace(/^\.\//, '');
  const matchedKey = Object.keys(imageFiles).find(key => key.includes(`/posts/${slug}/${cleanFilename}`));
  return matchedKey && imageFiles[matchedKey] ? imageFiles[matchedKey].default : null;
};

export const parseAllPosts = () => {
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
