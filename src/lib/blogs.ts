export interface BlogPost {
  Content: any;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  slug: string;
  title: string;
}

interface BlogModule {
  Content: any;
  frontmatter: {
    category?: string;
    date?: string;
    excerpt?: string;
    readTime?: string;
    title?: string;
  };
}

const blogModules = import.meta.glob<BlogModule>('/src/blogs/*/*.md', { eager: true });

function slugFromPath(path: string) {
  const normalized = path.replaceAll('\\', '/');
  const parts = normalized.split('/');
  const blogsIndex = parts.lastIndexOf('blogs');
  return blogsIndex >= 0 ? parts[blogsIndex + 1] : normalized.split('/').at(-2) ?? '';
}

export function getBlogPosts(): BlogPost[] {
  return Object.entries(blogModules)
    .map(([path, module]) => ({
      Content: module.Content,
      category: module.frontmatter.category ?? '',
      date: module.frontmatter.date ?? '',
      excerpt: module.frontmatter.excerpt ?? '',
      readTime: module.frontmatter.readTime ?? '',
      slug: slugFromPath(path),
      title: module.frontmatter.title ?? '',
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
