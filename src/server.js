const express = require('express');
const glob = require('glob');
const path = require('path');
const nconf = require('nconf');


let CONFIG_SCHEME = process.env.CONFIG_SCHEME || 'local';
nconf.argv().env().file({file: 'config/env/.' + CONFIG_SCHEME + '.json'});
nconf.defaults({
  PORT: 3000,
  NODE_ENV: 'development'
});


// Global variables
global._ = require('lodash');
global.async = require('async');
global.server = {};

/**
 * Load modules
 * @param pattern glob pattern for modules to load
 * @param setGlobal Set modules to global variables
 * @param opts glob options
 */
server.loadModules = function(pattern, setGlobal, opts) {
  let modules = glob.sync(pattern, opts || {});

  return _(modules).keyBy(_.partialRight(path.basename, '.js')).mapValues((f, key) => {
    let module = require(path.resolve(process.cwd(), f));

    if (setGlobal) {
      global[key] = module;
    }
    return module;
  }).value();
};

/**
 * Start listening express app
 */
server.startExpress = function() {

  // Bootstraping express server
  const app = server.app = express();

  require('./api/bootstrap')(app);

  // Serve static files
  app.use(express.static(path.join(__dirname, '.tmp/public')));

  // Morgan logger
  app.use(require('morgan')('tiny'));
  require('./api/routes')(app);


  // Last routes will be 404 page
  app.use(IndexController.notFound);
  app.listen(nconf.get('PORT'));
  server.log.info('App listening on port', nconf.get('PORT'));

  var io = require('socket.io')(3000);

  io.sockets.on('connection',function (socket) {
    var _socket = socket;

    console.log('Someone connected');
    console.log('Client Address ',socket.client.conn.remoteAddress);

    socket.on('echo', function (data) {
      console.log('server.js: echo event at server')
      _socket.emit('echo', data+10);
    });

    socket.on('echo-ack', function (data, callback) {
      callback(data);
    });

    msg="This is from server in server.js";
   _socket.emit('msg',msg);
  });




};




const Server = module.exports = {};
Server.init = function(cb) {

  // Init winston and setup initialize
  server.log = require('winston');

  // Setting up config and load modules
  server.config = server.loadModules('./config/*.js');
  server.services = server.loadModules('./api/services/*.js', server.config.global.services);
  server.controllers = server.loadModules('./api/controllers/*.js', server.config.global.controllers);
  server.models = server.loadModules('./api/models/*.js', server.config.global.models);

  // Sync models
  _.forEach(server.models, (Model) => Model.associate());
  server.config.sequelize.sync({}).then(() => cb()).catch((err) => {
    server.log.error('Error initialize db', err);
    cb(err);
  });
};
