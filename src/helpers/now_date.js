module.exports = function () {
  const now = new Date()
  const value =
    ('0' + now.getDate()).slice(-2) +
    '.' +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    '.' +
    now.getFullYear().toString()
  return value
}
