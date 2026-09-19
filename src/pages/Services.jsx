import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';
import Seo from '../components/Seo.jsx';
import { CtaSection, ServicesSection } from '../components/sections.jsx';

export default function Services() {
  return (
    <>
      <Seo
        title={`Services | ${company.name}`}
        description="App development, web development, WordPress, Salesforce, Gen AI, UI/UX design, database security and cybersecurity services from VINFOTECH SOLUTION LLC."
      />
      <PageHero
        title="Our"
        highlight="Services"
        subtitle="Comprehensive technology solutions designed to drive your business forward"
      />
      <ServicesSection />
      <CtaSection
        title="Not Sure Which Service You Need?"
        subtitle="Tell us about your goals and we'll map out the right approach."
        action="Book a Free Consultation"
      />
    </>
  );
}
