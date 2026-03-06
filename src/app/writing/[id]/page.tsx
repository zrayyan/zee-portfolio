import Navigation from "@/components/Navigation";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CodeHighlighter from '@/components/CodeHighlighter';
import CodeCopy from '@/components/CodeCopy';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostData(id);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostData(id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 px-6">
        <article className="py-20">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/writing"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Writing</span>
            </Link>

            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{post.title}</h1>
              <p className="text-lg text-foreground/80 mb-4">{post.excerpt}</p>
              <p className="text-sm text-foreground/60">{post.date}</p>
            </header>

            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
            {/* syntax highlighting for code blocks */}
            <CodeHighlighter />
            <CodeCopy />
          </div>
        </article>
      </main>
    </div>
  );
}