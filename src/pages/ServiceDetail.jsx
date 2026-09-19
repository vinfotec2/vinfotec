import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { company, getService, services } from '../data/site.js';
import { deliveryProcess, serviceDetails } from '../data/services.js';
import { Button, Card, Icon } from '../components/ui.jsx';
import Reveal from '../components/Reveal.jsx';
import Seo from '../components/Seo.jsx';
import { CtaSection } from '../components/sections.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  const detail = serviceDetails[slug];

  if (!service || !detail) return <Navigate to="/services" replace />;

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${service.title} | ${company.name}`}
        description={`${detail.tagline}. ${service.description}`}
      />

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-green-400">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li>
                <Link to="/services" className="hover:text-green-400">
                  Services
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li aria-current="page" className="text-white">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="animate-fade-up max-w-3xl">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600">
              <Icon name={service.icon} className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold lg:text-5xl">{service.title}</h1>
            <p className="mt-4 text-xl text-green-400">{detail.tagline}</p>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">{service.description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button to="/contact" size="lg" className="group">
                Discuss Your Project
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href={company.phoneHref} size="lg" variant="ghostLight">
                Call {company.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-5 text-3xl font-bold text-gray-900">Overview</h2>
              <div className="space-y-4">
                {detail.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h2 className="mb-6 mt-12 text-3xl font-bold text-gray-900">What We Deliver</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {detail.capabilities.map((capability, i) => (
                  <Reveal
                    key={capability.title}
                    delay={(i % 2) * 110}
                    className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl"
                  >
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{capability.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{capability.description}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Key Strengths</h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Typical Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {detail.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="bg-green-50 p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">What You Get</h3>
                <ul className="space-y-3">
                  {detail.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">How We Work</h2>
            <p className="text-lg text-gray-600">
              The same six phases on every engagement, so you always know where things stand
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveryProcess.map((phase, i) => (
              <Reveal
                key={phase.step}
                delay={(i % 3) * 100}
                className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl"
              >
                <span className="text-sm font-bold text-green-600">{phase.step}</span>
                <h3 className="mb-2 mt-1 text-lg font-bold text-gray-900">{phase.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{phase.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-gray-900">Related Services</h2>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
            >
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="group rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600">
                  <Icon name={item.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-green-700">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`Ready to start with ${service.title}?`}
        subtitle="Tell us what you're trying to achieve and we'll come back with a plan and a price."
        action="Get in Touch"
      />
    </>
  );
}
