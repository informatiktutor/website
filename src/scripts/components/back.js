const TIMEOUT_DELAY_MS = 200

// Instead of opening the root URL we go back in history,
// in case the user came from the root page.
// This will preserve the scroll location at which they left.
export function register_back_navigation() {
  const origin = window.location.origin
  const referrer = document.referrer.replace(/\/$/g, '')
  if (origin === referrer) {
    const element = document.querySelector('#back-link')
    element.addEventListener('click', function (e) {
      e.preventDefault()
      history.back()
      setTimeout(() => {
        // Make sure we're actually navigating,
        // in case there is no page in the history.
        // This should only happen when the user opened this page
        // in a new tab from within the root page, which is negligible
        window.location.href = element.href
      }, TIMEOUT_DELAY_MS)
    })
  }
}
