import { CertificationsBackground } from '@/src/components/backgrounds';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative min-h-screen flex items-center justify-center bg-bg-surface border-b border-border overflow-hidden">
      <CertificationsBackground />
      <div className="relative z-10">
        <h2 className="text-4xl font-display text-text-primary">Certifications Section</h2>
      </div>
    </section>
  );
}
