import QRCode from 'qrcode'
import MobileDetect from 'mobile-detect'

import {
  get_analytics_children,
  get_analytics_id,
  set_analytics_id,
  register_click_event,
} from './analytics'

const CLASS = 'js-qr'
const ANALYTICS_SUFFIX = 'qr'

const LINK_TEXT = 'Stattdessen hier öffnen'

// Checks if an intermediary popup with a QR code is desirable.
// This is the case when the user is not on a phone.
// False positives are ok, because the popup still allows opening the app.
function is_popup_desirable() {
  const md = new MobileDetect(window.navigator.userAgent)
  const is_phone = md.phone() !== null
  return !is_phone
}

export function register_qr_popup_hooks() {
  if (!is_popup_desirable()) {
    return
  }

  const overlay = document.querySelector('.overlay')

  const buttons = document.querySelectorAll(`.contact-button.${CLASS}`)
  for (const button of buttons) {
    register_qr_popup_hook(overlay, button)
  }

  // register close handlers
  const close_button = overlay.querySelector(`.${CLASS}-close`)
  close_button.addEventListener('click', function (e) {
    destroy_overlay()
  })
  overlay.addEventListener('click', function (e) {
    if (e.target === this) {
      // The user clicked outside of the overlay.
      destroy_overlay()
    }
  })
}

function get_analytics_child(element) {
  const children = get_analytics_children(element)
  return children[0]
}

function get_link_name_element(element) {
  return element.querySelector('.name span')
}

function clone_button_for_popup(button) {
  const original = button.cloneNode(true)
  const link = get_analytics_child(original)
  const remove = link.querySelectorAll('.svg-icon')
  for (const child of remove) {
    link.removeChild(child)
  }
  const title = get_link_name_element(link)
  title.innerText = LINK_TEXT
  return original
}

function register_qr_popup_hook(overlay, element) {
  const link = get_analytics_child(element)
  const clone = clone_button_for_popup(element)
  const name = get_link_name_element(link).innerText

  // Update the analytics id to label this a qr code button.
  set_analytics_id(link, get_analytics_id(link) + '-' + ANALYTICS_SUFFIX)

  link.addEventListener('click', function (e) {
    e.preventDefault()
    populate_overlay(overlay, clone, name)

    // 1. create overlay element structure
    //    and add the .has-overlay class to the body
    // 2. clone the original button to the bottom,
    //    remove its .svg-icon elements and change the name
    // 3. draw the qr code for the href of that button
    // 4. create event listeners for the closing button
    //    and when the user clicks outside of the overlay
    //    to close the overlay again.
  })
}

function populate_overlay(overlay, cloned_contact_button, name) {
  // Add cloned button to the overlay
  const button_container = document.querySelector(`.${CLASS}-button-container`)
  button_container.appendChild(cloned_contact_button)

  // Set the app name in the popup's description
  const app_name = overlay.querySelector(`.${CLASS}-app-name`)
  app_name.innerText = name

  const canvas = document.querySelector(`.${CLASS}-canvas`)
  const link = get_analytics_child(cloned_contact_button)

  // Register the analytics event for this cloned link element.
  register_click_event(link)

  // Show the overlay now to get the correct clientWidth
  show_overlay()

  const width = canvas.clientWidth
  draw_qr_code(canvas, width, link.href)
}

function destroy_overlay() {
  // Remove all appended contact buttons
  const button_container = document.querySelector(`.${CLASS}-button-container`)
  for (const child of button_container.children) {
    button_container.removeChild(child)
  }
  hide_overlay()
}

function draw_qr_code(canvas, size, content) {
  QRCode.toCanvas(
    canvas,
    content,
    {
      errorCorrectionLevel: 'medium',
      type: 'image/jpeg',
      width: size,
      height: size,
      margin: 5,
    },
    function (err) {
      if (err) {
        console.error(error)
        return
      }
    }
  )
}

function show_overlay() {
  const overlay = document.querySelector('.overlay')
  overlay.classList.remove('is-hidden')
  overlay.setAttribute('aria-hidden', 'false')
}

function hide_overlay() {
  const overlay = document.querySelector('.overlay')
  overlay.classList.add('is-hidden')
  overlay.setAttribute('aria-hidden', 'true')
}
