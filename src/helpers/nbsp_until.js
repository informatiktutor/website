// Adds a &nbsp; before every word that has n characters or less.
module.exports = function (n, text) {
  let result = '';
  const parts = text.split(/\s/g);
  for (const [i, part] of parts.entries()) {
    if (i > 0 && part.length <= 2) {
      result += '&nbsp;';
    } else {
      result += ' ';
    }
    result += part;
  }
  return result;
};
