module.exports = function (satisfaction_value) {
  var result = '';
  while (satisfaction_value > 0) {
    if (satisfaction_value == 1) {
      result += '<span class="star half"></span>';
      break;
    }
    result += '<span class="star on"></span>';
    satisfaction_value -= 2;
  }
  return result;
};
