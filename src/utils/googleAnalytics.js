const MEASUREMENT_ID = 'G-453GLY22CZ'

function isEnabled() {
  return import.meta.env.PROD && typeof window.gtag === 'function'
}

export function trackPageView(path) {
  if (!isEnabled()) return
  window.gtag('config', MEASUREMENT_ID, { page_path: path })
}

export function trackEvent(name, params = {}) {
  if (!isEnabled()) return
  window.gtag('event', name, params)
}
