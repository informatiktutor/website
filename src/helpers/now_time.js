module.exports = function () {
  const now = new Date()
  const value =
    ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2)
  return value
}
