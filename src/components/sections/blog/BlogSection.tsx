import { BlogBackground } from '@/src/components/backgrounds';

export default function BlogSection() {
  return (
    <section id="blog" className="relative min-h-screen flex items-center justify-center bg-bg-base border-b border-border overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <h2 className="text-4xl font-display text-text-primary">Blog Section</h2>
      </div>
    </section>
  );
}
