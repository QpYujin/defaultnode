/**
 * TokenController
 */

const TokenController = module.exports = {};

// route: get /confirm/:token
TokenController.verifyEmail = (req, res) => {
  ActionToken.findOne({where: {token: req.params.token}}).then((token) => {
    if (!token) {
      throw {
        status: 404,
        message: 'Token not found'
      }
    }
    return User.findById(token.userId);
  }).then(user => {

    user.setDataValue('emailVerified', true);
    return user.save();

  }).then(user => {
    res.render('email-confirmed', {
      user: user.toJSON()
    });
  }).catch(err => {
    server.log.error('Veriry email error', err);
    res.status(err.status || 500).render('email-confirm-error');
  });
};

// route: post /forgot-password
// params: { email: useremail }
TokenController.forgotPassword = (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.status(400).json({status: 400, message: 'Please enter your email'});
  }

  TokenService.forgotPassword(email).then(() => {
    res.json({status: 200, message: 'Please check email for reset password'});
  }).catch((err) => {
    server.log.error('Forgot password error', err);
    res.status(err.status || 500).json(err);
  })
};

// route: post /reset-password/:token
// Params: { password: yournewpassword }
TokenController.resetPassword = (req, res) => {
  ActionToken.findOne({where: {token: req.params.token}}).then((token) => {
    if (!token) {
      throw {status: 404, message: 'Token not found'};
    }
    return Credential.findOne({where: {userId: token.userId, type: 'local'}});
  })
  .then(cred => {
    cred.setDataValue('password', req.body.password);
    return cred.save();
  })
  .then(() => ActionToken.destroy({where: {token: req.params.token}}))
  .then(() => {
    res.json({status: 200, message: 'Your password has been changed'});
  })
  .catch(err => {
    server.log.error('Reset password error', err);
    res.status(err.status || 500).json(err);
  });
};
