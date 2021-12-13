module.exports = function (expected) {
  const env = process.env.NODE_ENV;
  if (arguments.length > 1) {
    return env === expected;
  }
  return env;
};
