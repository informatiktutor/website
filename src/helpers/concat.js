module.exports = function (a1, a2) {
  if (Array.isArray(a1) && Array.isArray(a2)) {
    return a1.concat(a2)
  }
  if (!a1) {
    return a2
  }
  if (!a2) {
    return a1
  }
  return a1 + a2
}
