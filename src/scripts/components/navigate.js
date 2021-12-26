export function register_navigation() {
  const spoiler_labels = document.querySelectorAll('label.action__button')
  for (const label of spoiler_labels) {
    label.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 || e.key === 'Enter' || e.code === 'Enter') {
        label.click()
      }
    })
  }
}
