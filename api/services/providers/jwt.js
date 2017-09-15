/**
 * JWT authenticate object
 */
module.exports.verify = function(user, next) {
  next(null, user);
};
