import '../styles/index.scss'

import { update_greeting } from './components/greeting'
import { register_analytics_events } from './components/analytics'

update_greeting()
register_analytics_events({
  scroll_start: true,
})

// (function () {

// const spoilers = document.querySelectorAll('.spoiler');
// for (const spoiler of spoilers) {
//   const button = spoiler.querySelector('button.toggle-collapse');
//   button.addEventListener('click', function (e) {
//     spoiler.classList.toggle('is-collapsed');
//   });
// }

// })()
