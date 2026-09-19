import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { company } from '../data/site.js';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const FALLBACK_EMAIL = company.email;
const FALLBACK_EMAIL_HREF = company.emailHref;

/** Resolves once the Turnstile script has finished loading. */
function whenReady() {
  return new Promise((resolve) => {
    if (window.turnstile) return resolve(window.turnstile);

    const started = Date.now();
    const id = setInterval(() => {
      if (window.turnstile) {
        clearInterval(id);
        resolve(window.turnstile);
      } else if (Date.now() - started > 15000) {
        clearInterval(id);
        resolve(null);
      }
    }, 100);
  });
}

/**
 * Cloudflare Turnstile widget.
 *
 * Renders explicitly rather than via the script's auto-scan, because the SPA
 * mounts long after the script parses. Parent components read the token
 * through `onVerify` and call `reset()` on the ref after each submission,
 * since Turnstile tokens are single-use.
 */
// If the challenge has not produced a token by now, something upstream is
// wrong (blocked subdomain, corporate proxy, offline) and the visitor needs a
// way out rather than a permanently disabled button.
const STALL_AFTER_MS = 20000;

const Turnstile = forwardRef(function Turnstile({ action, onVerify, onError }, ref) {
  const container = useRef(null);
  const widgetId = useRef(null);
  const [status, setStatus] = useState('loading');
  const [solved, setSolved] = useState(false);
  const [stalled, setStalled] = useState(false);

  // Held in refs so the effect below does not re-run (and re-render the
  // widget) every time the parent passes new callback identities.
  const handlers = useRef({ onVerify, onError });
  handlers.current = { onVerify, onError };

  useImperativeHandle(ref, () => ({
    reset() {
      if (window.turnstile && widgetId.current !== null) {
        window.turnstile.reset(widgetId.current);
        setSolved(false);
        handlers.current.onVerify?.('');
      }
    },
  }));

  useEffect(() => {
    if (!SITE_KEY) {
      // Logged in production too, so this is diagnosable from a live site.
      console.error(
        'Turnstile: VITE_TURNSTILE_SITE_KEY is missing from this build. ' +
          'Vite inlines VITE_* variables at build time, so setting it in the ' +
          'hosting dashboard requires a redeploy to take effect.'
      );
      setStatus('unconfigured');
      return undefined;
    }

    let cancelled = false;

    whenReady().then((turnstile) => {
      if (cancelled || !container.current) return;

      if (!turnstile) {
        setStatus('blocked');
        handlers.current.onError?.('blocked');
        return;
      }

      widgetId.current = turnstile.render(container.current, {
        sitekey: SITE_KEY,
        action,
        callback: (token) => {
          setStatus('ready');
          setSolved(true);
          setStalled(false);
          handlers.current.onVerify?.(token);
        },
        'expired-callback': () => {
          handlers.current.onVerify?.('');
        },
        'timeout-callback': () => {
          handlers.current.onVerify?.('');
        },
        'error-callback': () => {
          handlers.current.onVerify?.('');
          handlers.current.onError?.('error');
          // Returning true lets Turnstile handle its own retry UI.
          return true;
        },
      });

      setStatus('ready');
    });

    return () => {
      cancelled = true;
      if (window.turnstile && widgetId.current !== null) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [action]);

  // Watch for a challenge that starts but never finishes.
  useEffect(() => {
    if (solved || status === 'unconfigured') return undefined;
    const id = setTimeout(() => setStalled(true), STALL_AFTER_MS);
    return () => clearTimeout(id);
  }, [solved, status]);

  // A missing site key is a build-time configuration problem. Never render
  // nothing here: the submit button stays disabled without a token, so a
  // silent return leaves the visitor with a dead form and no explanation.
  if (status === 'unconfigured') {
    return (
      <div className="rounded-md bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
        {import.meta.env.DEV ? (
          <>
            <strong>VITE_TURNSTILE_SITE_KEY is not set.</strong> Add it to{' '}
            <code>.env.local</code> and restart the dev server.
          </>
        ) : (
          <>
            The bot-protection check is unavailable, so this form cannot be submitted right now.
            Please email us at{' '}
            <a href={FALLBACK_EMAIL_HREF} className="font-medium underline">
              {FALLBACK_EMAIL}
            </a>
            .
          </>
        )}
      </div>
    );
  }

  const failed = status === 'blocked' || (stalled && !solved);

  return (
    <div>
      <div ref={container} />
      {failed && (
        <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          The bot-protection check could not complete. Try refreshing or disabling any script
          blocker — or just email us at{' '}
          <a href={FALLBACK_EMAIL_HREF} className="font-medium underline">
            {FALLBACK_EMAIL}
          </a>
          .
        </p>
      )}
    </div>
  );
});

export default Turnstile;
