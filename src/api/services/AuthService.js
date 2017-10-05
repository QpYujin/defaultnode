/**
 * Authentication service
 */

const jwt = require('jsonwebtoken');
const AuthService = module.exports = {};

AuthService.providers = server.loadModules('api/services/providers/*.js');

/**
 * Connect provider data to app
 * @param providerName
 */
AuthService.connect = function(providerName, ...args) {

  let provider = AuthService.providers[providerName];
  if (typeof provider.connect === 'function') {
    return provider.connect(args);
  }

  // Last arguments is callback
  args.pop()({
    code: 'connect.not.supported',
    message: 'No connect support for this provider'
  });
};

/**
 * Generate JWT token for user
 * @param payload
 */
AuthService.generateJWT = function(payload) {
  let config = server.config.passport.jwt.options;
  let optFields = ['algorithm', 'expiresIn', 'notBefore', 'audience', 'issuer', 'jwtid', 'subject', 'noTimestamp', 'header'];
  return jwt.sign(payload, config.secretOrKey, _.pick(config, optFields));
};

/**
 * Register user
 */
AuthService.registerUser = function(params) {

  let userFields = ['firstName', 'lastName', 'email', 'validate', 'placeOfBirth', 'dateOfBirth', 'timeOfBirth', 'role', 'star'];
  return User.create(params, {fields: userFields}).then((user) => {

    return user.createCredential({type: 'local', password: params.password}).then(() => {
      return user;
    });

  });

};




AuthService.socialOauth = (type, provider, token, profile) => {
  //console.log('Providers in auth service social uth',provider);
  //console.log('Providers in auth service social profile',profile);

  // Require either type is oauth or oauth2
  if (type !== 'oauth' && type !== 'oauth2') {
    throw {status: 400, message: 'Invalid type'};
  }
  // Create the user OAuth profile
    let email = profile.login;
   //console.log('this is email',profile.profileUrl);
   //console.log('This is profile name',profile.username);


  return Credential.findOne({where: {type: type, provider: provider, identifier: profile.id}}).then(credential => {
    if (credential) {
      server.log.debug('Found credential', profile.id, 'from', provider, 'returning user');
      return credential.getUser();
    }


    // Create user with incomplete information
    return User.findOrCreate({
      where: { email:profile.profileUrl },
      defaults: {
        firstName: profile.username,
        lastName: profile.username,
        emailVerified: true
      }
    }).spread((user, created) => {
      // Got user
      server.log.info('User is created:', created, email);

      return user.createCredential({
        type: type,
        provider: provider,
        identifier: profile.id,
        token: token,
        json: profile
      }).then(() => {
        return user;
      });
    });
  });
};




















/* privious code for authentications 

AuthService.socialOauth = (type, provider, token, profile) => {
  // Require either type is oauth or oauth2
  if (type !== 'oauth' && type !== 'oauth2') {
    throw {status: 400, message: 'Invalid type'};
  }

  // Create the user OAuth profile
  let email = profile.emails[0].value;

  return Credential.findOne({where: {type: type, provider: provider, identifier: profile.id}}).then(credential => {
    if (credential) {
      server.log.debug('Found credential', profile.id, 'from', provider, 'returning user');
      return credential.getUser();
    }

    // Create user with incomplete information
    return User.findOrCreate({
      where: { email: email },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        emailVerified: true
      }
    }).spread((user, created) => {
      // Got user
      server.log.info('User is created:', created, email);
      return user.createCredential({
        type: type,
        provider: provider,
        identifier: profile.id,
        token: token,
        json: profile
      }).then(() => {
        return user;
      });
    });
  });
};


*/
