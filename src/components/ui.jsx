import { Link } from 'react-router-dom';
import {
  Bot,
  CircleCheckBig,
  Clock,
  Code,
  Database,
  Globe,
  Monitor,
  Palette,
  Shield,
  Smartphone,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Named explicitly rather than `import * as` so the bundler can tree-shake the
// ~1500 icons lucide ships that this site never renders.
const ICONS = {
  Bot,
  CircleCheckBig,
  Clock,
  Code,
  Database,
  Globe,
  Monitor,
  Palette,
  Shield,
  Smartphone,
  Trophy,
  Users,
  Zap,
};

/** Renders a lucide icon by name, e.g. <Icon name="Shield" />. */
export function Icon({ name, className }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden="true" />;
}

const BUTTON_VARIANTS = {
  primary: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
  outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
  ghostLight: 'border border-white text-white hover:bg-white hover:text-gray-900',
};

const BUTTON_SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 py-2 text-sm',
  lg: 'h-11 px-8 text-base',
};

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

/**
 * One button surface for the whole site. Renders as a router <Link> when `to`
 * is given, an <a> for `href`, and a <button> otherwise.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  children,
  ...props
}) {
  const classes = cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function Card({ className, children }) {
  return (
    <div className={cn('rounded-lg bg-white text-gray-900 shadow-lg', className)}>{children}</div>
  );
}

/** Page banner used by every route other than the home page. */
export function PageHero({ title, highlight, subtitle }) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="animate-fade-up text-4xl font-bold lg:text-5xl">
          {title} {highlight && <span className="text-green-400">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 lg:text-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, note }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 lg:text-xl">{subtitle}</p>}
      {note && <p className="mt-2 text-gray-500">{note}</p>}
    </div>
  );
}

/** Avatar that degrades to coloured initials when no photo is available. */
export function Avatar({ src, name, className }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  if (!src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700',
          className
        )}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }
  return <img src={src} alt={name} loading="lazy" className={cn('rounded-full object-cover', className)} />;
}

export function EVerifyBadge({ className }) {
  return (
    <a
      href="https://www.e-verify.gov/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`VINFOTECH SOLUTION LLC participates in E-Verify`}
      className={cn('inline-flex items-center', className)}
    >
      <img
        src="/brand/everify.svg"
        alt="E-Verify Employer logo - VINFOTECH SOLUTION LLC participates in E-Verify"
        className="h-8 w-auto"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}
