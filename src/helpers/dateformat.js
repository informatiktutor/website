module.exports = function (timestamp) {
  return new Date(timestamp).toLocaleDateString('de-DE', {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
