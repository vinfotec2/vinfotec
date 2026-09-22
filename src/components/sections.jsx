import { Link } from 'react-router-dom';
import { ArrowRight, Check, Quote, Star } from 'lucide-react';
import { glanceStats, projects, services, testimonials } from '../data/site.js';
import { Avatar, Button, Icon, SectionHeading, cn } from './ui.jsx';
import Reveal from './Reveal.jsx';
import CountUp from './CountUp.jsx';

export function GlanceSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title="At a Glance"
            subtitle="Numbers that speak to our commitment and expertise"
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {glanceStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 110} className="group text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <Icon name={stat.icon} className={`h-8 w-8 ${stat.color}`} />
              </div>
              <CountUp
                value={stat.value}
                className="mb-2 block text-3xl font-bold text-gray-900"
              />
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Faint dotted texture used in the section corners.
const DOT_PATTERN = {
  backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
  backgroundSize: '16px 16px',
};

// Service card colour schemes. Spelled out in full so Tailwind can see every
// class literally, the same reason ACCENTS below is written this way.
const SERVICE_ACCENTS = {
  emerald: {
    panel: 'from-emerald-50 via-emerald-100/70 to-teal-50',
    check: 'bg-emerald-500',
    link: 'text-emerald-600',
    arrow: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500',
  },
  blue: {
    panel: 'from-blue-50 via-sky-100/70 to-blue-50',
    check: 'bg-blue-600',
    link: 'text-blue-600',
    arrow: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
  },
  violet: {
    panel: 'from-violet-50 via-purple-100/70 to-indigo-50',
    check: 'bg-violet-600',
    link: 'text-violet-600',
    arrow: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600',
  },
  orange: {
    panel: 'from-orange-50 via-amber-100/70 to-orange-50',
    check: 'bg-orange-500',
    link: 'text-orange-600',
    arrow: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500',
  },
  rose: {
    panel: 'from-rose-50 via-red-100/70 to-pink-50',
    check: 'bg-rose-500',
    link: 'text-rose-600',
    arrow: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500',
  },
  purple: {
    panel: 'from-purple-50 via-fuchsia-100/60 to-violet-50',
    check: 'bg-purple-600',
    link: 'text-purple-600',
    arrow: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600',
  },
};

function ServiceCard({ service, eager }) {
  const accent = SERVICE_ACCENTS[service.accent] || SERVICE_ACCENTS.blue;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
    >
      {/* The illustrations already include the service's icon badge, so the
          card does not draw one over the top. */}
      <div className={cn('relative aspect-[16/9] overflow-hidden bg-gradient-to-br', accent.panel)}>
        <img
          src={service.art}
          alt=""
          aria-hidden="true"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6" style={{"paddingTop":"0px","position":"relative", "top":"-35px"}}>
        <h3 className="mb-2 text-lg font-bold text-slate-900">{service.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{service.description}</p>

        <ul className="mb-6 space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
              <span
                className={cn(
                  'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                  accent.check
                )}
              >
                <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between">
          <span
            className={cn('inline-flex items-center gap-1.5 text-sm font-semibold', accent.link)}
          >
            Learn more
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full transition-colors group-hover:text-white',
              accent.arrow
            )}
            aria-hidden="true"
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <span
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-50/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-8 top-8 h-24 w-24 text-slate-300 opacity-70"
        style={DOT_PATTERN}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-8 h-24 w-24 text-slate-300 opacity-70"
        style={DOT_PATTERN}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-green-400" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-green-600">
              Featured Services
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-green-400" />
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Technology Solutions That <span className="text-green-600">Work for You</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            We build digital tools that solve real business problems—securely, efficiently, and at
            scale.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 4) * 90} className="h-full">
              {/* The first row is likely above the fold on desktop. */}
              <ServiceCard service={service} eager={i < 4} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Button to="/contact" size="lg" className="group">
            Talk to an Expert
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

// Per-project colour schemes. Written out in full rather than composed from
// the accent name, because Tailwind only keeps classes it can see as literals.
// Also used by the project detail pages, so it is exported.
export const ACCENTS = {
  teal: {
    chip: 'bg-teal-50 text-teal-700',
    chipDark: 'bg-teal-400/20 text-teal-200',
    tag: 'bg-teal-50 text-teal-700',
    link: 'text-teal-600',
    linkDark: 'text-teal-300',
    labelDark: 'text-teal-300',
    gradient: 'from-slate-900 via-slate-900 to-teal-900',
  },
  blue: {
    chip: 'bg-blue-50 text-blue-700',
    chipDark: 'bg-blue-400/20 text-blue-200',
    tag: 'bg-blue-50 text-blue-700',
    link: 'text-blue-600',
    linkDark: 'text-blue-300',
    labelDark: 'text-blue-300',
    gradient: 'from-slate-900 via-blue-950 to-indigo-900',
  },
  navy: {
    chip: 'bg-slate-100 text-slate-700',
    chipDark: 'bg-blue-400/20 text-blue-200',
    tag: 'bg-slate-100 text-slate-700',
    link: 'text-blue-600',
    linkDark: 'text-blue-300',
    labelDark: 'text-blue-300',
    gradient: 'from-slate-950 via-slate-900 to-slate-800',
  },
  indigo: {
    chip: 'bg-indigo-50 text-indigo-700',
    chipDark: 'bg-indigo-400/20 text-indigo-200',
    tag: 'bg-indigo-50 text-indigo-700',
    link: 'text-indigo-600',
    linkDark: 'text-indigo-300',
    labelDark: 'text-indigo-300',
    gradient: 'from-slate-900 via-indigo-950 to-slate-900',
  },
  amber: {
    chip: 'bg-amber-50 text-amber-700',
    chipDark: 'bg-amber-400/20 text-amber-200',
    tag: 'bg-amber-50 text-amber-700',
    link: 'text-amber-600',
    linkDark: 'text-amber-300',
    labelDark: 'text-amber-300',
    gradient: 'from-slate-900 via-amber-950 to-slate-900',
  },
  emerald: {
    chip: 'bg-emerald-50 text-emerald-700',
    chipDark: 'bg-emerald-400/20 text-emerald-200',
    tag: 'bg-emerald-50 text-emerald-700',
    link: 'text-emerald-600',
    linkDark: 'text-emerald-300',
    labelDark: 'text-emerald-300',
    gradient: 'from-emerald-950 via-emerald-900 to-green-900',
  },
};

function ProjectCard({ project, index }) {
  const accent = ACCENTS[project.accent] || ACCENTS.blue;

  // Checkerboard: dark when the row and column indices differ in parity, so
  // the light and dark cards alternate in both directions on a 2-up grid.
  const dark = (Math.floor(index / 2) + (index % 2)) % 2 === 1;

  // Dark cards lead with the image, light cards lead with the copy.
  const imageFirst = dark;

  return (
    <div
      className={cn(
        'group h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1',
        dark
          ? `bg-gradient-to-br ${accent.gradient} text-white shadow-xl hover:shadow-2xl`
          : 'bg-white shadow-lg ring-1 ring-slate-100 hover:shadow-xl'
      )}
    >
      {/* The image column is given slightly more than half so the wide (3:2)
          artwork is cropped less by object-cover. The fractions swap with the
          column order so the image is always the wider side. */}
      <div
        className={cn(
          'grid h-full',
          imageFirst ? 'sm:grid-cols-[1.15fr_1fr]' : 'sm:grid-cols-[1fr_1.15fr]'
        )}
      >
        <div
          className={cn(
            'flex flex-col justify-center gap-3.5 p-6',
            imageFirst && 'sm:order-2'
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold',
                dark ? accent.chipDark : accent.chip
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'text-xs font-semibold uppercase tracking-[0.16em]',
                dark ? accent.labelDark : 'text-slate-500'
              )}
            >
              {project.industry}
            </span>
          </div>

          <h3
            className={cn(
              'text-2xl font-bold leading-snug',
              dark ? 'text-white' : 'text-slate-900'
            )}
          >
            {project.title}
          </h3>

          <p className={cn('text-[15px] leading-relaxed', dark ? 'text-slate-300' : 'text-slate-600')}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium',
                  dark ? 'bg-white/10 text-slate-200' : accent.tag
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            to={`/portfolio/${project.slug}`}
            className={cn(
              'mt-1 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors',
              dark ? accent.linkDark : accent.link
            )}
          >
            View Project
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className={cn('relative min-h-[220px] overflow-hidden', imageFirst && 'sm:order-1')}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection({ showCta = true }) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <div
        className="pointer-events-none absolute bottom-8 left-6 h-28 w-28 text-slate-300 opacity-60"
        style={DOT_PATTERN}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-8 right-6 h-28 w-28 text-slate-300 opacity-60"
        style={DOT_PATTERN}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-blue-300" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Portfolio
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-blue-300" />
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Real Projects.{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Real Impact.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Explore how we&apos;ve helped clients across industries with smart, secure, and scalable
            tech solutions
          </p>
        </Reveal>

        <div className="grid gap-7 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 110} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20" style={{"display":"none"}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Client Testimonials" title="What Our Clients Are Saying" />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, i) => (
            <Reveal
              key={item.name}
              delay={(i % 4) * 100}
              className="flex h-full flex-col rounded-lg bg-white p-6 shadow-lg hover:shadow-xl"
            >
              <Quote className="mb-4 h-8 w-8 text-green-500/70" aria-hidden="true" />
              <div className="mb-3 flex gap-0.5" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                {item.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar src={item.avatar} name={item.name} className="h-12 w-12" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection({
  title = 'Ready to Get Started?',
  subtitle = 'Transform your digital future with VINFOTECH SOLUTION LLC',
  action = 'Schedule a Consultation',
  to = '/contact',
}) {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 text-white">
      <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{title}</h2>
        <p className="mb-8 text-lg text-green-50">{subtitle}</p>
        <Button
          to={to}
          size="lg"
          variant="outline"
          className="group border-0 bg-white text-green-700 hover:bg-green-50"
        >
          {action}
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Reveal>
    </section>
  );
}
