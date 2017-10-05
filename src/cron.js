/**
 * App startup
 */
const CronJob = require('cron').CronJob;
const Server = require('./server');

Server.init(function(err) {

  // Exit app on error
  if (err) {
    return process.exit(1);
  }

  let cronJobs = server.loadModules('./cron/*.js');

  _.forEach(cronJobs, function(cron, name) {
    if (cron.start) {
      server.log.info('Registering cronjob:', name);
      new CronJob(cron);
    } else {
      server.log.info('Skipping disabled cronjob:', name);
    }
  });
});
