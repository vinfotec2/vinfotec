import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Building2 } from 'lucide-react';
import { company, projects } from '../data/site.js';
import { projectDetails } from '../data/projects.js';
import { Button, Card, cn } from '../components/ui.jsx';
import { ACCENTS, CtaSection } from '../components/sections.jsx';
import Reveal from '../components/Reveal.jsx';
import Seo from '../components/Seo.jsx';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const detail = projectDetails[slug];

  if (!project || !detail) return <Navigate to="/portfolio" replace />;

  const accent = ACCENTS[project.accent] || ACCENTS.blue;
  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${project.title} | ${company.name}`}
        description={`${detail.tagline}. ${project.description}.`}
      />

      <section className={cn('bg-gradient-to-br py-16 text-white', accent.gradient)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li>
                <Link to="/portfolio" className="hover:text-white">
                  Portfolio
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li aria-current="page" className="text-white">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="animate-fade-up">
              <span
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.18em]',
                  accent.labelDark
                )}
              >
                {project.industry}
              </span>
              <h1 className="mt-3 text-4xl font-bold lg:text-5xl">{project.title}</h1>
              <p className={cn('mt-3 text-xl', accent.linkDark)}>{detail.tagline}</p>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-sm">
                <div>
                  <dt className="flex items-center gap-1.5 text-slate-400">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    Client
                  </dt>
                  <dd className="mt-1 font-semibold text-white">{detail.client}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Duration
                  </dt>
                  <dd className="mt-1 font-semibold text-white">{detail.duration}</dd>
                </div>
              </dl>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                fetchpriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-5 text-3xl font-bold text-slate-900">Overview</h2>
              <div className="space-y-4">
                {detail.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h2 className="mb-4 mt-12 text-3xl font-bold text-slate-900">The Challenge</h2>
              <p className="leading-relaxed text-slate-600">{detail.challenge}</p>

              <h2 className="mb-4 mt-12 text-3xl font-bold text-slate-900">Our Solution</h2>
              <p className="leading-relaxed text-slate-600">{detail.solution}</p>

              <h2 className="mb-6 mt-12 text-3xl font-bold text-slate-900">What We Built</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {detail.features.map((feature, i) => (
                  <Reveal
                    key={feature.title}
                    delay={(i % 2) * 100}
                    className="rounded-lg bg-white p-6 shadow-lg ring-1 ring-slate-100"
                  >
                    <h3 className="mb-2 text-lg font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Results</h3>
                <dl className="space-y-4">
                  {detail.results.map((result) => (
                    <div key={result.label}>
                      <dt className="sr-only">{result.label}</dt>
                      <dd className={cn('text-2xl font-bold', accent.link)}>{result.value}</dd>
                      <dd className="text-sm text-slate-600">{result.label}</dd>
                    </div>
                  ))}
                </dl>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Services Used</h3>
                <ul className="space-y-3">
                  {detail.services.map((service) => (
                    <li key={service} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check
                        className={cn('mt-0.5 h-4 w-4 flex-shrink-0', accent.link)}
                        aria-hidden="true"
                      />
                      {service}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {detail.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-slate-900">More Projects</h2>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/portfolio/${item.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {item.industry}
                  </span>
                  <h3 className="mb-2 mt-1 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/portfolio" variant="outline" size="lg" className="group">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Have a project like this in mind?"
        subtitle="Tell us what you're trying to achieve and we'll come back with a plan and a price."
        action="Start a Conversation"
      />
    </>
  );
}
