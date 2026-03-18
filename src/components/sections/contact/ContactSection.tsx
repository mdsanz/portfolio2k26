import { ContactBackground } from '@/src/components/backgrounds';

export default function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-bg-surface overflow-hidden">
      <ContactBackground />
      <div className="relative z-10">
        <h2 className="text-4xl font-display text-text-primary">Contact Section</h2>
      </div>
    </section>
  );
}
