import { company } from '../data/site.js';
import { PageHero } from '../components/ui.jsx';
import Seo from '../components/Seo.jsx';
import { CtaSection, PortfolioSection } from '../components/sections.jsx';

export default function Portfolio() {
  return (
    <>
      <Seo
        title={`Portfolio | ${company.name}`}
        description="Explore projects delivered by VINFOTECH SOLUTION LLC across e-commerce, healthcare, finance, travel and hospitality."
      />
      <PageHero
        title="Our"
        highlight="Portfolio"
        subtitle="Explore our successful projects and see how we've helped businesses transform digitally"
      />
      <PortfolioSection showCta={false} />
      <CtaSection
        title="Have a Project in Mind?"
        subtitle="Let's turn your idea into the next case study on this page."
        action="Start Your Project"
      />
    </>
  );
}
