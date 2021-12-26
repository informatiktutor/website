export function register_spoilers() {
  window.addEventListener('load', function () {
    const spoilers = document.querySelectorAll('.action .spoiler')
    for (const spoiler of spoilers) {
      register_spoiler(spoiler)
    }
  })
}

function register_spoiler(spoiler) {
  const checkbox = spoiler.querySelector('.spoiler__checkbox')
  const action_content = spoiler.querySelector('.action__content')
  const spoiler_content = action_content.querySelector('.spoiler__content')

  action_content.classList.add('is-animated')

  // Keep the height at 0px for the transition to work.
  if (!checkbox.checked) {
    action_content.style.height = '0px'
  }

  action_content.style.display = 'inherit'

  const rect = spoiler_content.getBoundingClientRect()
  const height = rect.height

  action_content.style.display = null

  checkbox.addEventListener('input', function () {
    update_spoiler(checkbox, action_content, height)
  })
}

const ANIMATE_TIME_MS = 250

function update_spoiler(checkbox, content, height) {
  content.style.display = 'inherit'
  if (checkbox.checked) {
    content.style.height = '0px'
    setTimeout(() => {
      content.style.height = height + 'px'
      setTimeout(() => {
        content.style.height = null
        content.style.display = null
      }, ANIMATE_TIME_MS)
    }, 0)
  } else {
    content.style.height = height + 'px'
    setTimeout(() => {
      content.style.height = '0px'
      setTimeout(() => {
        content.style.height = null
        content.style.display = null
      }, ANIMATE_TIME_MS)
    }, 0)
  }
}
