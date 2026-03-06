import Navigation from '@/components/Navigation';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const cats = new Set<string>();
  posts.forEach(p => {
    (p.categories || []).forEach(c => cats.add(c));
  });
  const arr = Array.from(cats);
  if (arr.length === 0) {
    // ensure at least one param so static export can validate this route
    return [{ category: 'uncategorized' }];
  }
  return arr.map(c => ({ category: c }));
}

// Force static rendering for export builds
export const dynamic = 'force-static';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const posts = await getSortedPostsData();
  const filtered = posts.filter(p => (p.categories || []).includes(category));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-6">
        <section className="py-20">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-primary">Category: {category}</h1>
            <div className="space-y-6">
              {filtered.map(post => (
                <article key={post.id} className="p-6 bg-background rounded-lg border border-primary/20">
                  <Link href={`/writing/${post.id}`}>
                    <h2 className="text-2xl font-semibold mb-2 text-secondary hover:text-primary">{post.title}</h2>
                  </Link>
                  <p className="text-foreground/80 mb-2">{post.excerpt}</p>
                  <p className="text-sm text-foreground/60">{post.date}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
