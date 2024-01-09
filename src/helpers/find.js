module.exports = function (array, object_attribute, attribute_value) {
  for (var item of array) {
    if (item.hasOwnProperty(object_attribute)) {
      if (item[object_attribute] === attribute_value) {
        return item;
      }
    }
  }
  return null;
};
