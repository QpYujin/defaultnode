/**
 * App bootstrap
 * Created by tphuocthai on 3/19/16.
 */

const compress = require('compression');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const nconf = require('nconf');
const cors = require('cors');

module.exports = function(app) {

  // Load passport strategies
  _.forOwn(server.config.passport, function(config, key) {
    server.log.verbose('Loading strategy', key);
    let Strategy = config.strategy;
    let strategy = new Strategy(config.options, AuthService.providers[key].verify);
    passport.use(strategy);
  });

  // Setup passport
  passport.serializeUser(function(user, next) {
    next(null, user.id);
  });

  passport.deserializeUser(function(id, next) {
    User.findById(id).then(user => { next(null, user); }).catch(next);
  });

  app.set('view engine', 'pug');
  // Enable jsonp
  app.enable('jsonp callback');
  app.enable('trust proxy');
  app.use(cookieParser());
  app.use(cors());

  // Should be placed before app.static
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  let NODE_ENV = nconf.get('NODE_ENV');
  server.log.verbose('Running ENV', NODE_ENV);

  // development only
  if (NODE_ENV === 'development') {
    app.use(require('errorhandler')());
    // Disable views cache
    app.set('view cache', false);
    // Support livereload when edit page
    app.use(require('connect-livereload')());
  } else if (NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  app.use(server.config.session);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(flash());
};
