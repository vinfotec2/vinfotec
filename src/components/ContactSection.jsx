import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { company } from '../data/site.js';
import { Button, Card, EVerifyBadge, SectionHeading, cn } from './ui.jsx';
import Turnstile from './Turnstile.jsx';

// Must match the action the server asserts on the siteverify result.
const TURNSTILE_ACTION = 'contact';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  // Honeypot: hidden from real users, so anything here means a bot.
  company: '',
};

// Client-side cooldown after a successful send. The server enforces the real
// limit; this just stops the obvious repeat before a request is even made.
const COOLDOWN_MS = 60 * 1000;
const COOLDOWN_KEY = 'vinfotec:contact:lastSent';

function readCooldownRemaining() {
  try {
    const last = Number(sessionStorage.getItem(COOLDOWN_KEY));
    if (!last) return 0;
    return Math.max(0, COOLDOWN_MS - (Date.now() - last));
  } catch {
    // Private mode or blocked storage: fall back to no cooldown.
    return 0;
  }
}

function Field({ label, id, className, ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
        {...props}
      />
    </div>
  );
}

const infoCards = [
  {
    icon: Phone,
    title: 'Call Us',
    value: company.phone,
    href: company.phoneHref,
    note: 'Mon-Fri from 8am to 5pm',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: company.email,
    href: company.emailHref,
    note: 'We usually reply within a day',
  },
];

/** Replaces the whole form once a message has gone through. */
function SuccessPanel({ name, onReset, cooldown }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center sm:px-10">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
      </div>

      <h3 className="mb-3 text-2xl font-bold text-gray-900">Message sent</h3>
      <p className="mb-8 max-w-md leading-relaxed text-gray-600">
        Thanks{name ? `, ${name}` : ''} — your message is on its way to our team. We usually reply
        within one business day.
      </p>

      <div className="mb-8 w-full max-w-sm rounded-lg bg-gray-50 p-5 text-left">
        <p className="mb-3 text-sm font-semibold text-gray-900">Need an answer sooner?</p>
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
            <a href={company.phoneHref} className="text-gray-700 hover:text-green-700 hover:underline">
              {company.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
            <a href={company.emailHref} className="text-gray-700 hover:text-green-700 hover:underline">
              {company.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Clock className="h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
            <span className="text-gray-700">{company.hours.weekdays}</span>
          </li>
        </ul>
      </div>

      <Button variant="outline" onClick={onReset} disabled={cooldown > 0}>
        {cooldown > 0 ? `Send another in ${Math.ceil(cooldown / 1000)}s` : 'Send another message'}
      </Button>
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [sentTo, setSentTo] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [captchaToken, setCaptchaToken] = useState('');

  // Guards against a second submit slipping through before React has
  // re-rendered with the disabled button (double-click, Enter key repeat).
  const inFlight = useRef(false);
  const captcha = useRef(null);

  const sending = status.state === 'sending';
  const succeeded = status.state === 'success';

  // Tick the cooldown down while it is running.
  useEffect(() => {
    setCooldown(readCooldownRemaining());
    const id = setInterval(() => {
      const remaining = readCooldownRemaining();
      setCooldown(remaining);
      if (remaining === 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [succeeded]);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (inFlight.current) return;

    const remaining = readCooldownRemaining();
    if (remaining > 0) {
      setStatus({
        state: 'error',
        message: `Please wait ${Math.ceil(remaining / 1000)} seconds before sending another message.`,
      });
      return;
    }

    if (!captchaToken) {
      setStatus({
        state: 'error',
        message: 'Please complete the bot-protection check below the message box.',
      });
      return;
    }

    inFlight.current = true;
    setStatus({ state: 'sending', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: captchaToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      try {
        sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      } catch {
        // Storage unavailable; the server-side limit still applies.
      }

      setSentTo(form.firstName);
      setForm(EMPTY_FORM);
      setStatus({ state: 'success', message: '' });
    } catch (err) {
      setStatus({
        state: 'error',
        message: `${err.message} You can also email us directly at ${company.email}.`,
      });
    } finally {
      inFlight.current = false;
      // Turnstile tokens are single-use, so a fresh one is needed whether the
      // submission succeeded or failed.
      setCaptchaToken('');
      captcha.current?.reset();
    }
  }

  function handleReset() {
    setStatus({ state: 'idle', message: '' });
    setSentTo('');
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's Build Something Great Together"
          subtitle="Have a project in mind or just exploring options? Get in touch—we'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <Card className="overflow-hidden lg:col-span-3">
            {succeeded ? (
              <div className="animate-fade-in">
                <SuccessPanel name={sentTo} onReset={handleReset} cooldown={cooldown} />
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <h3 className="mb-6 text-xl font-bold text-gray-900">Send us a message</h3>
                <form onSubmit={handleSubmit}>
                  <fieldset disabled={sending} className="contents">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="First Name"
                        id="firstName"
                        placeholder="John"
                        required
                        value={form.firstName}
                        onChange={update}
                        autoComplete="given-name"
                      />
                      <Field
                        label="Last Name"
                        id="lastName"
                        placeholder="Doe"
                        required
                        value={form.lastName}
                        onChange={update}
                        autoComplete="family-name"
                      />
                      <Field
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={form.email}
                        onChange={update}
                        autoComplete="email"
                        className="sm:col-span-2"
                      />
                      <Field
                        label="Subject"
                        id="subject"
                        placeholder="Project Inquiry"
                        required
                        value={form.subject}
                        onChange={update}
                        className="sm:col-span-2"
                      />
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={10}
                          required
                          placeholder="Tell us about your project..."
                          value={form.message}
                          onChange={update}
                          className="min-h-[220px] w-full resize-y rounded-md border border-gray-300 px-3 py-2.5 text-sm leading-relaxed text-gray-900 placeholder-gray-400 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <Turnstile
                        ref={captcha}
                        action={TURNSTILE_ACTION}
                        onVerify={setCaptchaToken}
                        onError={() =>
                          setStatus({
                            state: 'error',
                            message: `The bot-protection check failed to load. Please refresh, or email us at ${company.email}.`,
                          })
                        }
                      />
                    </div>

                    <div className="absolute left-[-9999px] top-0" aria-hidden="true">
                      <label htmlFor="company">Company (leave blank)</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={update}
                      />
                    </div>
                  </fieldset>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={sending || cooldown > 0 || !captchaToken}
                    className="mt-6 w-full"
                  >
                    {sending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                    {sending
                      ? 'Sending…'
                      : cooldown > 0
                        ? `Please wait ${Math.ceil(cooldown / 1000)}s`
                        : 'Send Message'}
                  </Button>

                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      'mt-3 text-center text-sm',
                      status.state === 'error' ? 'text-red-600' : 'text-gray-500'
                    )}
                  >
                    {status.message || 'We usually reply within one business day.'}
                  </p>
                </form>
              </div>
            )}
          </Card>

          <div className="space-y-4 lg:col-span-2">
            {infoCards.map(({ icon: Ico, title, value, href, note }) => (
              <Card key={title} className="flex items-start gap-4 p-6">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Ico className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{title}</h4>
                  <a href={href} className="text-green-600 hover:text-green-700 hover:underline">
                    {value}
                  </a>
                  <p className="mt-1 text-sm text-gray-500">{note}</p>
                </div>
              </Card>
            ))}

            <Card className="flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <MapPin className="h-5 w-5 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Visit Us</h4>
                <address className="text-sm not-italic text-gray-600">
                  {company.address.street}
                  <br />
                  {company.address.city}
                  <br />
                  {company.address.country}
                </address>
              </div>
            </Card>

            <Card className="flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <Clock className="h-5 w-5 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Business Hours</h4>
                <p className="text-sm text-gray-600">{company.hours.weekdays}</p>
                <p className="text-sm text-gray-600">{company.hours.weekend}</p>
              </div>
            </Card>

            <div className="flex justify-center pt-2">
              <EVerifyBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
