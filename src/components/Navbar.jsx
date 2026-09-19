import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { company, navLinks } from '../data/site.js';
import { Button, cn } from './ui.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Collapse the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const linkClass = ({ isActive }) =>
    cn(
      'px-3 py-2 text-sm font-medium transition-colors',
      isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
    );

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex flex-shrink-0 items-center">
            <img src="/brand/logo.png" alt={company.name} className="h-10 w-auto" />
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              ))}
              <Button to="/contact">Get Started</Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-green-600"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t bg-white md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'block rounded-md px-3 py-2 text-base font-medium',
                    isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" className="mt-2 w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
