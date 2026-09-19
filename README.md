# VINFOTECH SOLUTION LLC — Website

React + Vite rebuild of vinfotec.com, deployable to Vercel.

## Quick start (Windows)

Double-click one of these:

| File | What it does |
| --- | --- |
| `start.bat` | Installs dependencies if needed, starts the dev server, opens http://localhost:5173 |
| `build.bat` | Builds `dist/` and serves it at http://localhost:4173 so you can check the production output |
| `deploy.bat` | Deploys to Vercel production via `npx vercel --prod` |
| `start-with-email.bat` | Optional: runs `vercel dev` instead, matching Vercel's runtime exactly |

**The contact form works under `start.bat`.** A small plugin in
`vite.config.js` serves `api/contact.js` during development, so `/api/contact`
behaves the same locally as it does on Vercel — no Vercel login needed. Note
that it sends **real email** to whatever `CONTACT_TO` points at.

`start-with-email.bat` is only needed if you want to test against Vercel's
actual serverless runtime rather than the local stand-in.

Or from a terminal:

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the built output
```

## Stack

- **React 18** with **react-router-dom** for client-side routing
- **Vite 5** for dev/build
- **Tailwind CSS 3** for styling
- **lucide-react** for icons

## Load & motion design

The site has a staged entrance rather than a single pop-in:

1. **Splash screen.** Markup and CSS are inlined directly in `index.html`, so it
   paints on the first frame — before the CSS bundle or any JS downloads — and
   the visitor never sees a white flash. `src/splash.js` fades it out once React
   has mounted and the hero image has decoded.
2. **Hero entrance.** Headline, body copy, buttons and stats stagger in on a
   cubic-bezier ease, with the hero image scaling up alongside them.
3. **Scroll reveals.** `<Reveal>` (`src/components/Reveal.jsx`) fades and slides
   sections in via IntersectionObserver as they enter the viewport, with a small
   per-card stagger so grids cascade rather than appearing all at once.
4. **Animated counters.** `<CountUp>` counts the stat figures up from zero the
   first time they scroll into view, parsing `300+`, `98%` and `$1.6M+` so the
   prefix and suffix stay put while the number animates.
5. **Route transitions.** `<PageTransition>` fades page content in on navigation.
6. **Scroll progress bar.** A thin green bar across the top tracks scroll depth,
   throttled with `requestAnimationFrame`.

### Safeguards

Load effects are the easiest thing to get wrong in a way that hides content, so:

- **`prefers-reduced-motion` is honoured throughout.** Reveals and counters
  render at their final state immediately; splash animations stop.
- **Reveals fail open.** If `IntersectionObserver` is unavailable, content
  starts visible rather than staying hidden.
- **The splash can never trap the page.** It dismisses after a 4s cap even if an
  image never loads, an inline 8s fallback in `index.html` removes it if the JS
  bundle fails outright, and a `<noscript>` block hides it when scripts are off.

Verified with a headless Chrome pass over all 11 routes: no console or page
errors, splash dismissed, scroll lock released, and no content left stranded at
zero opacity after scrolling.

### Turning effects down

- Splash timing: `MIN_VISIBLE_MS` / `MAX_VISIBLE_MS` in `src/splash.js`.
- Reveal speed and distance: `duration`, `delay` and `direction` props on
  `<Reveal>`, defaults in `src/components/Reveal.jsx`.
- Counter speed: the `duration` prop on `<CountUp>` (default 1600ms).
- To drop an effect entirely, remove its component from `src/App.jsx`
  (`ScrollProgress`, `PageTransition`) or the `dismissSplash()` call and splash
  markup for the preloader.

## Project layout

```
api/contact.js          Vercel serverless function behind the contact form
public/brand/           Logo and E-Verify badge
public/images/          Hero, portfolio and testimonial images
public/images/services/ Service card illustrations (WebP, generated — see below)
public/images/projects/ Portfolio card images (WebP, generated — see below)
scripts/                One-off maintenance scripts
src/splash.js           Dismisses the preloader inlined in index.html
src/data/site.js        Company details, services, projects, testimonials
src/data/services.js    Long-form copy for each service detail page
src/data/faq.js         FAQ questions and answers
src/components/         Navbar, Footer, shared UI, page sections, motion helpers
src/pages/              One component per route
vercel.json             Build config, SPA rewrites, cache and security headers
```

### Card imagery

Two generated image sets, both WebP:

| Set | Location | Referenced by | Framing |
| --- | --- | --- | --- |
| Services | `public/images/services/<slug>.webp` | `art` field in `services` | 16:9, subject right, **icon badge baked in** |
| Projects | `public/images/projects/<name>.webp` | `image` field in `projects` | 3:2, cropped to roughly square by the card |

The service illustrations include their circular icon badge as part of the
artwork — the card does not draw one — so replacements must include it and keep
the subject on the right, clear of the badge.

Project images are cropped horizontally by `object-cover`, so keep anything
important (logos, overlay text) away from the left and right edges.

To regenerate from full-size source PNGs named `1.png`, `2.png`, … in the same
order as the matching array in `src/data/site.js`:

```bash
npm run optimize:images -- "C:/path/to/folder" services   # 8 files, 800px wide
npm run optimize:images -- "C:/path/to/folder" projects   # 6 files, 900px wide
```

This matters: the originals were 8.6 MB and 10.3 MB. After conversion the whole
`dist/images` folder is 652 KB. Always run sources through this rather than
dropping them into `public/` directly.

### Editing content

Most copy lives in `src/data/site.js` and `src/data/faq.js`. Changing a phone
number, adding a service, or adding a portfolio project is a data edit — no
component changes needed. The footer, navbar and every page read from there.

## Routes

`/` `/about` `/services` `/portfolio` `/contact` `/faq` `/privacy` `/terms`,
plus a 404 page for anything else.

Each project has a case-study page at `/portfolio/<slug>`:

`ecommerce-platform` · `fitness-tracker-app` · `banking-dashboard` ·
`healthcare-portal` · `restaurant-ordering-system` · `travel-companion-app`

Each shows an accent-tinted hero with the client and duration, an overview,
the challenge, the solution, what was built, a results panel, the services used,
the tech stack, and three related projects. "View Project" on every portfolio
card links here. Copy lives in `src/data/projects.js`.

> **The `results` figures are illustrative placeholders.** Replace them with
> real, agreed numbers before publishing, and only quote metrics the client is
> happy to have public.

Each service also has its own page at `/services/<slug>`:

`app-development` · `web-development` · `wordpress-development` ·
`salesforce-development` · `gen-ai-solutions` · `ui-ux-design` ·
`database-security` · `cybersecurity`

The service cards on the home and services pages, and the Services list in the
footer, all link through to these. Each page shows an overview, what the service
delivers, the typical stack, expected outcomes, the six-phase delivery process
and three related services.

### Adding a project

1. Add an entry to `projects` in `src/data/site.js` with a `slug`, `image`,
   `title`, `industry`, `accent`, `description` and `tags`.
2. Add a matching key to `projectDetails` in `src/data/projects.js`.
3. Add the optimised image (see **Card imagery**).
4. Add the URL to `public/sitemap.xml`.

A slug with no `projectDetails` entry redirects to `/portfolio` rather than
erroring.

### Adding a service

1. Add an entry to `services` in `src/data/site.js` with a `slug`, a lucide
   `icon` name, title, description and three features.
2. Add a matching key to `serviceDetails` in `src/data/services.js`.
3. Add the icon to the `ICONS` map in `src/components/ui.jsx` if it is new.
4. Add the URL to `public/sitemap.xml`.

The route, the navigation, the footer list and the related-services block all
pick it up automatically. A slug with no `serviceDetails` entry redirects to
`/services` rather than erroring.

## Deploying to Vercel

1. Push this folder to a Git repository, then import it at
   [vercel.com/new](https://vercel.com/new). Vercel detects Vite automatically
   and `vercel.json` supplies the rest. (Or just run `deploy.bat`.)
2. Add the contact-form environment variables (see below). Without them the
   form returns a clear error rather than silently dropping messages.

## Contact form email

`api/contact.js` sends through **Gmail SMTP** using [nodemailer]. Enquiries are
delivered to `hr@vinfotec.com`, with `Reply-To` set to the person who submitted
the form, so hitting reply in your mail client answers them directly.

[nodemailer]: https://nodemailer.com

### Configuration

Credentials live in environment variables and are **never committed**. Locally
they come from `.env.local` (gitignored; `.env.example` is the template):

| Variable | Required | Notes |
| --- | --- | --- |
| `SMTP_USER` | yes | Gmail account doing the sending, e.g. `vinfotec2@gmail.com` |
| `SMTP_PASS` | yes | A Google **App Password** (16 chars), not the account password |
| `CONTACT_TO` | no | Destination inbox. Defaults to `hr@vinfotec.com` |
| `CONTACT_FROM` | no | From header. Keep it matching `SMTP_USER` |

For the deployed site, set the same four under **Vercel → Project Settings →
Environment Variables**, or from a terminal:

```bash
vercel env add SMTP_USER production
vercel env add SMTP_PASS production
vercel env add CONTACT_TO production
vercel env add CONTACT_FROM production
vercel env add VITE_TURNSTILE_SITE_KEY production
vercel env add TURNSTILE_SECRET_KEY production
```

Environment variables are only picked up on a new deployment, so redeploy after
adding them.

### App passwords

`SMTP_PASS` must be a Google App Password, which requires 2-Step Verification on
the account. Create or revoke them at
[myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
A normal account password will be rejected with an `EAUTH` error.

**Rotate the app password if it has ever been pasted into a chat, ticket or
email.** Revoking one at the link above and putting the new value in
`.env.local` plus the Vercel variable is the whole job — no code changes.

### Troubleshooting

**"Something went wrong. Please try again."** — the browser got a non-2xx
response from `/api/contact`. Check the terminal running the dev server: the
route logs the underlying error there, and never leaks SMTP detail to the page.
Common causes:

| Symptom | Cause | Fix |
| --- | --- | --- |
| 404 on `/api/contact` | Serving `dist/` with a plain static server, or an old checkout without the Vite API plugin | Use `start.bat`, or deploy to Vercel |
| "not configured to send mail yet" (503) | `SMTP_USER` / `SMTP_PASS` missing | Check `.env.local` locally, or the Vercel env vars in production |
| "mail account rejected our credentials" (502) | Wrong or revoked app password, or 2-Step Verification turned off | Generate a fresh app password |
| Works locally, fails on the live site | Env vars not set in Vercel, or set but not redeployed | Add them, then redeploy |
| "bot-protection check did not pass" (403) | Token invalid/expired/reused, or wrong action or hostname | Check the server log, which names the exact reason |
| Widget never appears, submit stays disabled | `localhost` missing from the widget's Domains list, or a blocked network | Add the domain in the Cloudflare dashboard |
| "not fully configured yet" (503) | `TURNSTILE_SECRET_KEY` missing | Set it; the endpoint refuses unverified submissions by design |

To check the credentials without sending anything, `transporter.verify()`
authenticates against Gmail and reports `EAUTH` if the password is bad.

### Bot protection (Cloudflare Turnstile)

The contact form is gated by [Cloudflare Turnstile]. The widget renders below
the message box, the token is posted as `turnstileToken`, and `api/contact.js`
validates it against Cloudflare's siteverify API **before** touching SMTP.

[Cloudflare Turnstile]: https://developers.cloudflare.com/turnstile/

| Variable | Secret? | Notes |
| --- | --- | --- |
| `VITE_TURNSTILE_SITE_KEY` | No | Public by design. The `VITE_` prefix is what ships it to the browser |
| `TURNSTILE_SECRET_KEY` | **Yes** | Server only. **Never** give this a `VITE_` prefix or it lands in the public bundle |
| `TURNSTILE_HOSTNAMES` | No | Comma-separated allowlist. Defaults to `vinfotec.com,www.vinfotec.com,localhost,127.0.0.1` |

Server-side validation requires all three of Cloudflare's recommended checks,
not just `success`:

1. `success === true`
2. `action === 'contact'` — so a token minted for a different form is rejected
3. `hostname` in `TURNSTILE_HOSTNAMES` — so a token minted on an attacker's
   page is rejected

Tokens are single-use, so the widget is reset after every submission, whether
it succeeded or failed. A failed send also rolls back the duplicate-guard hash
so the retry is not blocked.

If the challenge cannot complete (blocked subdomain, script blocker, corporate
proxy) the widget shows a fallback after 20 seconds pointing the visitor at the
email address, rather than leaving the submit button disabled with no
explanation.

**Local development:** add `localhost` to the widget's **Domains** list in the
Cloudflare Turnstile dashboard, or the challenge will not run off the live
domain.

### Spam protection and rate limiting

| Guard | Where | Behaviour |
| --- | --- | --- |
| Honeypot | Both | A hidden field real users never see. Filled → accepted and discarded, so bots get no signal |
| In-flight lock | Client | A ref blocks a second submit before React re-renders the disabled button |
| Cooldown | Client | 60s after a successful send, tracked in `sessionStorage`, shown as a countdown |
| Duplicate guard | Server | Same email + subject + message from one IP inside 30 min → `409`, no second email |
| Send ceiling | Server | 3 delivered messages per IP per 10 min → `429` with `Retry-After` |
| Attempt ceiling | Server | 8 send attempts per IP per 10 min, successful or not → `429` |

Two ceilings exist because they stop different things: the send ceiling caps how
much mail one sender can put in your inbox, the attempt ceiling caps how many
times they can make the server open an SMTP connection at all.

Tuning: the constants at the top of `api/contact.js` (`SEND_MAX`,
`ATTEMPT_MAX`, `RATE_WINDOW_MS`, `DUPLICATE_WINDOW_MS`) and `COOLDOWN_MS` in
`src/components/ContactSection.jsx`.

**A limitation worth knowing.** The counters live in the function's memory, so
they persist across warm invocations but Vercel may run several instances at
once, each with its own copy. Someone spreading requests across instances gets
a higher effective ceiling. This reliably stops double-posts and casual spam,
which is what a contact form actually faces. For a hard global limit, back the
maps with Vercel KV or Upstash Redis — the logic stays as it is, only the
storage moves.

Failed sends roll back the duplicate hash, so a genuine retry after an outage
is never rejected as a duplicate, and a 503 from missing configuration is
checked before anything is recorded — a misconfigured server never consumes a
visitor's quota.

### Switching providers

`api/contact.js` is a single `sendMail` call. To move to Google Workspace, swap
`SMTP_USER`/`SMTP_PASS` for the Workspace account. To move to a transactional
provider (SendGrid, Postmark, Resend), replace the transport config — the
validation, escaping and honeypot logic stay as they are.

Gmail's sending limits (roughly 500 messages/day for a free account) are far
above typical contact-form volume, but a transactional provider is the better
choice if this ever sends bulk mail.

## Notes on the rebuild

The original site was a static capture of a Lovable-built React app. Content was
recovered from the saved HTML, and the FAQ answers (collapsed in the capture)
were recovered from the original JS bundle. A few things were changed
deliberately:

- **Phone number.** The FAQ page listed `+1 304-316-9092`; every other page
  listed `304-216-9092`. The latter is used everywhere now. Change
  `company.phone` in `src/data/site.js` if the FAQ number was the correct one.
- **Legal pages.** Privacy and Terms referred to "VS Tech Inc" and
  `info@vstechinc.com` / `legal@vstechinc.com`, inconsistent with the rest of
  the site. They now use VINFOTECH SOLUTION LLC and `hr@vinfotec.com`. **Have
  these reviewed** before publishing if the VS Tech references were intentional.
- **Testimonials** still name "VS Tech Inc" inside the quoted text, since
  altering a client quotation is a decision for you, not a find-and-replace.
- **One testimonial avatar** (Vanita Bethu) was missing from the capture, so
  that card falls back to initials. Drop a JPG into `public/images/` and set
  `avatar` in `src/data/site.js` to restore it.
- **Portfolio "View Full Portfolio"** now links to `/portfolio`; previously both
  the home and portfolio pages showed the same six projects with a button that
  went nowhere new. The portfolio page drops that button.
- **Accessibility and SEO** additions: skip link, keyboard-operable FAQ
  accordion with ARIA, per-route titles/descriptions/canonicals, `robots.txt`
  and `sitemap.xml`. Update the domain in those two files if it is not
  `www.vinfotec.com`.
