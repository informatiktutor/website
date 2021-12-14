const util = require('util')

module.exports = function (path) {
  const args = [...arguments].slice(0, arguments.length - 1)
  const segments = []
  for (const path of args) {
    for (const segment of path.split('.')) {
      segments.push(segment)
    }
  }

  const filename = segments[0]
  const keys = segments.slice(1)

  const data = require(`../data/shared/${filename}.json`)

  let value = data
  for (const key of keys) {
    if (key.length === 0) {
      continue
    }
    if (!value.hasOwnProperty(key)) {
      throw `key not found! (${key} in ${path})`
    }
    value = value[key]
  }
  return value
}
