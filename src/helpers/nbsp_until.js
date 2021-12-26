// Adds a &nbsp; before every word that has n characters or less
// (but only at the end of the text).
module.exports = function (n, text) {
  let result = ''
  const parts = text.split(/\s/g)
  for (const [i, part] of parts.entries()) {
    if (i + 1 === parts.length && part.length <= n) {
      result += '&nbsp;'
    } else {
      result += ' '
    }
    result += part
  }
  return result
}
