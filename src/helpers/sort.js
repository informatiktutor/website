module.exports = function (array) {
  return array.sort((a, b) => a.localeCompare(b));
};
