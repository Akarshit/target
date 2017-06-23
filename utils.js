const _ = require('lodash')
/**
 * Map a function to catch data
 *
 * @param {Function} fn - function to bind
 *
 * @return {Function}
 */
function wrapAsync(fn) {
  if (fn.length <= 3) {
    return (req, res, next) => fn(req, res, next).catch(next);
  }
  return (err, req, res, next) => fn(err, req, res, next).catch(next);
}


/**
 * Map all methods using wrapAsync
 *
 * @param {Object} obj
 *
 * @param {Object} obj
 */
function mapAsync(obj) {
  const result = {};
  _.forOwn(obj, (value, key) => {
    Object.assign(result, {
      [key]: wrapAsync(value),
    });
  });
  return result;
}

module.exports = {mapAsync};