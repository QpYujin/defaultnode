/**
 * Created by tphuocthai on 3/20/16.
 */

var nconf = require('nconf');

module.exports = {
  local: {
    strategy: require('passport-local').Strategy,
    options: {
      usernameField: 'email',
      passwordField: 'passwd'
    }
  },

  jwt: {
    strategy: require('passport-jwt').Strategy,
    options: {
      jwtFromRequest: require('passport-jwt').ExtractJwt.fromAuthHeader(),
      secretOrKey: nconf.get('jwt:secret'),
      issuer: nconf.get('jwt:issuer'),
      expiresIn: '7days'
    }
  },

  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    scope: ['profile', 'email'],
    options: _.defaults(nconf.get('google'), {
      callbackURL: nconf.get('baseUrl') + '/auth/google/callback'
    })
  },
  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    scope: ['public_profile', 'email'],
    options: _.defaults(nconf.get('facebook'), {
      callbackURL: nconf.get('baseUrl') + '/auth/facebook/callback',
      profileFields: ['id', 'email', 'gender', 'about', 'cover', 'name']
    })
  },

  github:{
    name: 'Github',
    protocol: 'oauth2',
    strategy : require('passport-github').Strategy,
    scope: ['profile', 'email','repo','user','gist','delete_repo','read:org','write:org'],
    options: _.defaults(nconf.get('github'), {
      callbackURL: nconf.get('baseUrl') + '/auth/github/callback'
    })
  }

};
