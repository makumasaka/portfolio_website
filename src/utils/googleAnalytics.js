const MEASUREMENT_ID = 'G-4516LY22E2'

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
