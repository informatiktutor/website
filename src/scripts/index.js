import '../styles/index.scss'

import { register_spoilers } from './animations/spoiler'
import { register_sticky_header } from './animations/header'
import { register_navigation } from './components/navigate'
import { update_greeting } from './components/greeting'
import { register_analytics_events } from './components/analytics'

update_greeting()
register_sticky_header()
register_spoilers()

register_navigation()
register_analytics_events({
  scroll_start: true,
})
