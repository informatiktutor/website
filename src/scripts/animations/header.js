export function register_sticky_header() {
  window.addEventListener('load', function () {
    register()
  })
}

function register() {
  const header = document.querySelector('#sticky-header')
  const start = document.querySelector('*[data-mark="sticky-header-in"]')
  const stop = document.querySelector('*[data-mark="sticky-header-out"]')
  header.classList.add('is-block')

  const header_rect = header.getBoundingClientRect()
  const header_style = getComputedStyle(header)
  const header_height =
    header_rect.height +
    Number(header_style.borderBottomWidth.replace('px', ''))

  header.style.top = -header_height + 'px'

  let start_offset = 0
  let stop_offset = 0

  function update_offsets() {
    const start_rect = start.getBoundingClientRect()
    const stop_rect = stop.getBoundingClientRect()
    start_offset = window.scrollY + start_rect.top + start_rect.height
    stop_offset =
      window.scrollY + stop_rect.top + stop_rect.height - header_height

    const body_rect = document.body.getBoundingClientRect()
    const window_height = window.innerHeight
    const body_height = body_rect.height

    if (stop_offset + window_height + header_height >= body_height) {
      // Do not hide the header if it wouldn't be completely hidden
      // when the user has fully scrolled down.
      stop_offset = body_height
    }
  }

  function update_header() {
    let scroll = window.scrollY
    let middle = (start_offset + stop_offset) / 2
    let offset = 0

    if (scroll < middle) {
      scroll = Math.min(
        Math.max(start_offset, scroll),
        start_offset + header_height
      )
      offset = scroll - start_offset
    } else {
      scroll =
        Math.min(Math.max(stop_offset, scroll), stop_offset + header_height) -
        stop_offset
      offset = header_height - scroll
    }

    header.style.top = -header_height + offset + 'px'
  }

  function update_offsets_header() {
    update_offsets()
    update_header()
  }

  window.addEventListener('scroll', update_header)
  window.addEventListener('resize', update_offsets_header)
  new ResizeObserver(update_offsets_header).observe(document.body)

  update_offsets()
  update_header()

  header.classList.add('is-animated')
}
