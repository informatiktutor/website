import { get } from '../lib/js-data'

function update_greeting() {
  const greetings = get('greetings')
  const element = document.querySelector('.js-greeting')

  const now = new Date()
  const currentHour = now.getHours()

  for (const greeting of greetings.time_based) {
    const [start_inclusive, end_exclusive] = greeting.hour_range
    if (currentHour >= start_inclusive && currentHour < end_exclusive) {
      element.innerText = greeting.value
      break
    }
  }
}

export { update_greeting }
