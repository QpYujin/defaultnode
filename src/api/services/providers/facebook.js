/**
 * Facebook authenticate callback
 */
module.exports.verify = function(token, refreshToken, profile, done) {

  AuthService.socialOauth('oauth2', 'facebook', token, profile).then(user => {
    done(null, user.toJSON());
  }).catch(done);
};
