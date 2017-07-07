module.exports.verify = function(token, refreshToken, profile, done) {

  AuthService.socialOauth('oauth2', 'github', token, profile)
  .then(user => {
    done(null, user.toJSON());
    console.log('At github.js function',user);
}).catch(done);

 console.log('After github.js function');
};
