// Applies the visitor's saved colour mode before the first paint so a dark-mode
// visitor never sees a light flash. Mirrors useColorMode (same storage key and
// system-preference fallback); React takes over after hydration.
;(function () {
  try {
    var mode = window.localStorage.getItem('okwe-mode')
    if (mode !== 'light' && mode !== 'dark') {
      mode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    }
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  } catch {
    /* storage unavailable: stay in light mode */
  }
})()
