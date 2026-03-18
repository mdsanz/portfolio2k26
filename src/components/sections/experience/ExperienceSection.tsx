import { ExperienceBackground } from '@/src/components/backgrounds';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative min-h-screen flex items-center justify-center bg-bg-base border-b border-border overflow-hidden">
      <ExperienceBackground />
      <div className="relative z-10">
        <h2 className="text-4xl font-display text-text-primary">Experience Section</h2>
      </div>
    </section>
  );
}
