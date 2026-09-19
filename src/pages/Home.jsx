import { ArrowRight, Play } from 'lucide-react';
import { company, stats } from '../data/site.js';
import { Button, EVerifyBadge } from '../components/ui.jsx';
import CountUp from '../components/CountUp.jsx';
import Seo from '../components/Seo.jsx';
import {
  CtaSection,
  GlanceSection,
  PortfolioSection,
  ServicesSection,
  TestimonialsSection,
} from '../components/sections.jsx';
import ContactSection from '../components/ContactSection.jsx';

export default function Home() {
  return (
    <>
      <Seo
        title={`${company.name} - Innovative Technology Solutions`}
        description="VINFOTECH SOLUTION LLC delivers cutting-edge software solutions, cybersecurity, and digital transformation services. 25+ years of experience, 300+ projects delivered."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 py-24 text-white">
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1
                  className="animate-hero-in text-4xl font-bold leading-tight lg:text-6xl"
                  style={{ animationDelay: '120ms' }}
                >
                  Innovative Solutions to<span className="text-green-400"> Transform</span> Your{' '}
                  <span className="text-green-400">Digital Future</span>
                </h1>
                <p
                  className="animate-hero-in text-xl leading-relaxed text-gray-300"
                  style={{ animationDelay: '260ms' }}
                >
                  At {company.name}, we deliver cutting-edge, customized software solutions that
                  boost operational efficiency, reinforce security, and accelerate your business
                  transformation.
                </p>
              </div>

              <div
                className="animate-hero-in flex flex-col gap-4 sm:flex-row"
                style={{ animationDelay: '400ms' }}
              >
                <Button to="/contact" size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button to="/about" size="lg" variant="ghostLight">
                  <Play className="mr-1 h-4 w-4" aria-hidden="true" />
                  Learn More
                </Button>
              </div>

              <dl className="flex flex-wrap gap-8 border-t border-gray-700 pt-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="animate-hero-in text-center"
                    style={{ animationDelay: `${540 + i * 90}ms` }}
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <CountUp value={stat.value} className="text-2xl font-bold text-green-400" />
                    </dd>
                    <dd className="text-sm text-gray-400">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div
                className="animate-hero-image-in relative z-10"
                style={{ animationDelay: '300ms' }}
              >
                <img
                  src="/images/projects/banking.webp"
                  alt="Technology Solutions"
                  fetchpriority="high"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <EVerifyBadge className="absolute bottom-4 left-4 z-20 rounded bg-white/95 p-1.5" />
              <div
                className="absolute -right-4 -top-4 h-24 w-24 animate-float rounded-full bg-green-500 opacity-20 blur-sm"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 -left-4 h-32 w-32 animate-float-slow rounded-full bg-blue-500 opacity-10 blur-sm"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <GlanceSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <CtaSection />
    </>
  );
}
