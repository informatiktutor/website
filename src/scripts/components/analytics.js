const DATA_NAME = 'sa'
const LINK_MAX_DELAY_MS = 250
const SCROLL_REGISTER_DELAY_MS = 500

function trigger_event(name, callback) {
  if (window.hasOwnProperty('is_development')) {
    console.debug('event', name)
  }
  if (window.hasOwnProperty('sa_event')) {
    window.sa_event(name, callback)
  } else if (typeof callback === 'function') {
    callback()
  }
}

function predicate_for_trigger(name) {
  return (element) => {
    return element.getAttribute(`data-${DATA_NAME}-trigger`) === name
  }
}

export function set_analytics_id(element, id) {
  return element.setAttribute(`data-${DATA_NAME}-id`, id)
}

export function get_analytics_id(element) {
  return element.getAttribute(`data-${DATA_NAME}-id`)
}

function opens_link_here(element) {
  return (
    element.nodeName.toLowerCase() === 'a' &&
    (!element.target || element.target === '_self')
  )
}

export function register_click_event(element) {
  ;(function () {
    // Only trigger the event once per page view.
    let was_clicked = false
    const id = get_analytics_id(element)
    element.addEventListener('click', function (e) {
      if (was_clicked) return
      was_clicked = true
      if (opens_link_here(element)) {
        e.preventDefault()
        const callback = () => {
          window.location.href = element.href
        }
        // Make sure the callback is called after the maximum delay.
        // Otherwise it might end up not working
        // because of problems with SimpleAnalytics.
        setTimeout(callback, LINK_MAX_DELAY_MS)
        trigger_event(id, callback)
      } else {
        trigger_event(id)
      }
    })
  })()
}

function register_click_events(elements) {
  for (const element of elements) {
    register_click_event(element)
  }
}

function register_scroll_start_event() {
  // Add a delay to accomodate for browser-initiated scrolling
  // when e.g. the user navigates back.
  setTimeout(function () {
    let has_scrolled = false
    window.addEventListener('scroll', function () {
      if (!has_scrolled) {
        has_scrolled = true
        trigger_event('scroll_start')
        return
      }
    })
  }, SCROLL_REGISTER_DELAY_MS)
}

export function get_analytics_children(element) {
  let elements = element.querySelectorAll(`*[data-${DATA_NAME}-id]`)
  return [...elements]
}

// TODO register scroll start event.
function register_analytics_events(options) {
  if (!sa_event) {
    // Do not register event listeners if analytics are disabled.
    return
  }
  const elements = get_analytics_children(document)
  // let elements = document.querySelectorAll(`*[data-${DATA_NAME}-id]`)
  // elements = [...elements]

  register_click_events(elements.filter(predicate_for_trigger('click')))

  if (options.scroll_start) {
    register_scroll_start_event()
  }
}

export { register_analytics_events }
