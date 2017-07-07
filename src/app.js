/**
 * App startup
 */

const Server = require('./server');

Server.init(function(err) {

  // Exit app on error
  if (err) {
    return process.exit(1);
  }

  server.startExpress();
});
