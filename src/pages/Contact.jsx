import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';
import Seo from '../components/Seo.jsx';
import ContactSection from '../components/ContactSection.jsx';
import { CtaSection } from '../components/sections.jsx';

export default function Contact() {
  return (
    <>
      <Seo
        title={`Contact | ${company.name}`}
        description={`Get in touch with VINFOTECH SOLUTION LLC. Call ${company.phone} or email ${company.email}. Based in Alpharetta, Georgia.`}
      />
      <PageHero
        title="Get in"
        highlight="Touch"
        subtitle="Ready to start your next project? Let's discuss how we can help transform your business"
      />
      <ContactSection />
    </>
  );
}
