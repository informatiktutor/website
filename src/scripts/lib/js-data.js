export function get(name) {
  const element = document.querySelector('.js-data-' + name)
  const raw = element.getAttribute('data-' + name)
  return JSON.parse(raw)
}
