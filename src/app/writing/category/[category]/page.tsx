import Navigation from "@/components/Navigation";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

// this route may have no categories at build time; force dynamic to satisfy export
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const cats = new Set<string>();
  posts.forEach((p) => p.categories?.forEach((c) => cats.add(c)));
  const arr = Array.from(cats).map((category) => ({ category }));
  // If there are no real categories yet, provide a dummy slug so the
  // dynamic route can be exported. the page will simply render a "nothing
  // here" message instead of 404.
  return arr.length > 0 ? arr : [{ category: "none" }];
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const posts = await getSortedPostsData();
  const filtered = posts.filter((p) => p.categories?.includes(params.category));
  // if no posts match we show a friendly message rather than throw a 404;
  // this handles our placeholder slug or genuinely empty categories.
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-6">
        <section className="py-20">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-primary">Category: {params.category}</h1>
            <ul className="space-y-6">
              {filtered.map((post) => (
                <li key={post.id}>
                  <Link href={`/writing/${post.id}`} className="text-primary hover:underline">
                    {post.title}
                  </Link>
                  <p className="text-foreground/80 text-sm">{post.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}