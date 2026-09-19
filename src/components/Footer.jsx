import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { company, navLinks, services } from '../data/site.js';
import { EVerifyBadge } from './ui.jsx';

const socials = [
  { label: 'LinkedIn', href: company.social.linkedin, Icon: Linkedin },
  { label: 'Twitter', href: company.social.twitter, Icon: Twitter },
  { label: 'Facebook', href: company.social.facebook, Icon: Facebook },
  { label: 'Instagram', href: company.social.instagram, Icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <img
              src="/brand/logo.png"
              alt={company.name}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-gray-400">{company.blurb}</p>
            <EVerifyBadge className="rounded bg-white/95 p-1.5" />
            <div className="flex gap-3 pt-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${company.name} on ${label}`}
                  className="rounded-md bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-green-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-green-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="transition-colors hover:text-green-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-white">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" aria-hidden="true" />
                <a href={company.phoneHref} className="hover:text-green-400">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" aria-hidden="true" />
                <a href={company.emailHref} className="hover:text-green-400">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" aria-hidden="true" />
                <address className="not-italic">
                  {company.address.street}
                  <br />
                  {company.address.city}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 text-sm text-gray-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {company.name}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-green-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-green-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
