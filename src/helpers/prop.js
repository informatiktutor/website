module.exports = function (object) {
  let value = object
  const args = [...arguments].slice(1, arguments.length - 1)
  for (const argument of args) {
    value = value[argument]
  }
  return value
}
