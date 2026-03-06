import Navigation from "@/components/Navigation";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Writing() {
  const posts = await getSortedPostsData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-6">
        <section className="py-20">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold mb-12 text-center text-primary">Writing</h1>
            <p className="text-lg text-center mb-16 text-foreground/80">
              Thoughts, insights, and technical explorations.
            </p>

            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="p-8 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
                >
                  <Link href={`/writing/${post.id}`}>
                    <h2 className="text-2xl font-semibold mb-4 text-secondary hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-foreground/80 mb-4">{post.excerpt}</p>
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