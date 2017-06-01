/**
 * EmailService
 * Created by tphuocthai.
 */
const moment = require('moment');
const crypto = require('crypto');

let TokenService = module.exports = {};

TokenService.verifyUserEmail = (user, cb) => {

  let promise = ActionToken.create({
    token: crypto.randomBytes(16).toString('hex'),
    userId: user.id,
    expiredOn: moment().add(1, 'days').toDate(),
    type: 'verify-email'
  }).then(actionTkn => {
    return UtilService.promisify(EmailService.sendVerifyEmail, actionTkn, user)
  });

  return UtilService.wrapCb(promise, cb);
};

TokenService.forgotPassword = (email, cb) => {
  let promise = User.find({where: {email: email}}).then(user => {
    if (!user) {
      throw {status: 400, message: 'Email not registered'};
    }

    return ActionToken.create({
      token: crypto.randomBytes(16).toString('hex'),
      userId: user.id,
      expiredOn: moment().add(1, 'days').toDate(),
      type: 'forgot-password'
    }).then(actionTkn => {
      return UtilService.promisify(EmailService.sendForgotPassword, actionTkn, user)
    });
  });

  return UtilService.wrapCb(promise, cb);
};
