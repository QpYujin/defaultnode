/**
 * Local authenticate callback
 */
module.exports.verify = function(email, password, done) {

  User.findOne({where: {email: email}}).then((user) => {

    if (_.isEmpty(user)) {
      throw {
        code: 'user.not.found',
        message: 'User not found'
      };
    }

    return user.getCredentials({where: {type: 'local'}}).then((credentials) => {
      let isValidPassword = _(credentials).values().find((cred) => {
        return cred.validatePassword(password);
      });

      if (!isValidPassword) {
        throw {
          code: 'invalid.password',
          message: 'You enter invalid password, please check your typing'
        };
      }

      return user;
    });

  }).then((user) => {
    done(null, user.toJSON());
  }).catch((err) => {
    server.log.error('Login error', err);
    if (err.code) {
      return done(null, false, {
        code: 'invalid.login',
        message: 'The given email and password does not match, please try again'
      });
    }
    done(err);
  });
};
