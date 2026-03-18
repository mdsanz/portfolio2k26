import { PresentationLayout } from '@/src/components/layout/PresentationLayout';
import { HeroSection } from '@/src/components/sections/hero';
import { AboutSection } from '@/src/components/sections/about';
import { TechStackSection } from '@/src/components/sections/tech-stack';
import { ProjectsSection } from '@/src/components/sections/projects';
import ExperienceSection from '@/src/components/sections/experience/ExperienceSection';
import CertificationsSection from '@/src/components/sections/certifications/CertificationsSection';
import BlogSection from '@/src/components/sections/blog/BlogSection';
import ContactSection from '@/src/components/sections/contact/ContactSection';
import { DeferredMount } from '@/src/components/layout/DeferredMount';

export default function Home() {
  return (
    <PresentationLayout>
      <HeroSection />
      <AboutSection />

      {/* Secciones pesadas — retrasar montado hasta que la animación de entrada termine */}
      <DeferredMount delay={400}>
        <TechStackSection />
      </DeferredMount>

      <DeferredMount delay={400}>
        <ProjectsSection />
      </DeferredMount>

      <ExperienceSection />
      <CertificationsSection />
      <BlogSection />
      <ContactSection />
    </PresentationLayout>
  );
}
