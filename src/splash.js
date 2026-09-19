// Dismisses the splash screen inlined in index.html.
//
// The splash is shown for a short minimum so it reads as intentional rather
// than as a flicker, but it is never allowed to hold the page hostage: a hard
// timeout dismisses it even if an image never loads.

const MIN_VISIBLE_MS = 650;
const MAX_VISIBLE_MS = 4000;

/** Resolves when the image is decoded, or immediately if it fails. */
function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function dismissSplash() {
  const splash = document.getElementById('app-splash');
  if (!splash) return;

  const start = Number(window.__splashStart || Date.now());

  const remove = () => {
    splash.classList.add('is-hidden');
    // Drop it from the DOM once the fade finishes so it cannot trap focus.
    setTimeout(() => splash.remove(), 700);
    document.documentElement.classList.add('app-ready');
  };

  const ready = Promise.all([
    preload('/images/hero-tech.jpg'),
    document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve(),
  ]);

  Promise.race([
    ready.then(() => wait(Math.max(0, MIN_VISIBLE_MS - (Date.now() - start)))),
    wait(MAX_VISIBLE_MS),
  ]).then(remove);
}
