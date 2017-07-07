/**
 * AuthController
 */

const passport = require('passport');

const AuthController = module.exports = {};

/**
 * Render login page
 */

AuthController.redirectToLogin = function (req, res) {
  res.redirect('/login');
}
AuthController.login = function(req, res) {
  // Get 3rd-party providers
  let providers = _.chain(server.config.passport).mapValues((provider, key) => {
    provider = _.pick(provider, ['name', 'protocol']);
    provider.slug = key;
    return provider;
  }).filter((provider) => {
    return _.includes(['oauth', 'oauth2', 'openid'], provider.protocol);
  }).value();

  // Preparing data
  let viewData = {
    providers: providers,
    errors: req.flash('error')
  };

  res.render('auth/login', viewData);
};

AuthController.renderRegister = function(req, res) {
  res.render('auth/register');
};



/**
 * The logout route
 */
AuthController.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Authentication provider
 * Route: /auth/:provider
 */


AuthController.provider = function(req, res, next) {
  let providerName = req.params.provider;
  let provider = server.config.passport[providerName];

  console.log('this is provider',provider);
  console.log('this is provider',provider.protocol);

  if (!_.includes(['oauth', 'oauth2'], provider.protocol)) {
    console.log('this is protocol',provider.protocol)
    return next();
  }

  let authOpt = _.pick(provider, ['scope']);
  console.log('this authOpt',authOpt);
  passport.authenticate(providerName, authOpt)(req, res, next);
};






/**
 * Callback
 * route: /auth/:provider/callback
 */
AuthController.callback = function(req, res, next) {

  console.log('this is after callback');


  let loginSuccess = function(err) {
    console.log('this is in login success function');
    if (err) {
      return next(err);
    }

    res.redirect('/user/'+req.user.id+'/'+'organizations/'+'cc7604f0-2aa0-11e7-b06f-d7863b545409');

    // if (_(req.user).pick(['placeOfBirth', 'dateOfBirth', 'timeOfBirth']).pickBy().isEmpty()) {
    //   server.log.warn('User profile has not completed yet, redirecting to user profile');
    //   return res.redirect('/profile');
    // }

    // If we have previously stored a returnTo, use that,
    // otherwise, use the default.
    // if (req.session && req.session.returnTo) {
    //   let url = req.session.returnTo;
    //   delete req.session.returnTo;
    //   server.log.verbose('Redirecting to', url);
    //   if (url !== '/') {
    //     return res.redirect(url);
    //   }
    // }

    /*
    MembershipService.getUserOrgs(req.user, (err, orgs) => {
      if (err) {
        console.log(err);
        res.redirect('/login');
        return;
      }
      console.log(orgs);
      console.log('this is orgnisation',orgs)
      if (orgs.length)
      {
        console.log('this is org length function')
        res.redirect('/user/'+req.user.id+'/'+'organizations/'+orgs[0]);

      }
    });*/
  };

  passport.authenticate(req.params.provider || 'local', {
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, loginSuccess);


};

/**
 * JWT login using username and password
 */
AuthController.jwtLogin = function(req, res) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!user) {
      return res.status(403).json(info);
    }

    res.json({
      token: AuthService.generateJWT(user),
      user: user
    });
  })(req, res);
};

/**
 * Register user
 */
AuthController.register = function(req, res) {
  AuthService.registerUser(req.body).then((user) => {
    return TokenService.verifyUserEmail(user);
  }).then(user => {
    res.status(201).send(user.toJSON());
  }).catch(err => {
    res.status(err.status || 500).send(err);
  })
};

AuthController.ensureAuth = (req, res, next) => {

  // TODO: Support JWT authorization
  // passport.authenticate('jwt', {session: false});

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (!req.user) {
    server.log.warn('Access denied for route', req.originalUrl);
    if (req.xhr) {
      return res.status(403).send({status: 403, message: 'Access denied'});
    } else {
      return res.redirect('/login');
    }
  }

  let incompleteProfile = _(req.user).pick(['placeOfBirth', 'dateOfBirth', 'timeOfBirth']).pickBy().isEmpty();
  // if (!req.xhr && req.user.role == 'USER' && incompleteProfile) {
  //   server.log.warn('User profile has not completed yet, redirecting to user profile');
  //   // return res.redirect('/profile');
  //   res.render('userhome', {user: req.user});
  // }

  let user = req.user;
  if (req.method == 'POST') {
    req.body.createdById = user.id;
  } else if (req.method == 'PUT' || req.method == 'PATCH') {
    req.body.updatedById = user.id;
  }

  res.locals.user = req.user;
  return next();
};
