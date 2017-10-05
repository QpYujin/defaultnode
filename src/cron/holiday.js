
function onTick() {
  server.log.info('Processing reminder notification', new Date());

  NotificationService.sendNotification().then(() => {
    server.log.info('Email holiday sent');
  }).catch((err) => {
    server.log.error('Holiday email:', err);
  });
}

module.exports = {
  cronTime: '0 0 8 * * *', // Do send event everyday at 8 AM
  onTick: onTick,
  start: true // set false to disable this cron
};
