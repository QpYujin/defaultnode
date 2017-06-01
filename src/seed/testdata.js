/**
 * App startup
 */

var Server = require('../server');
var moment = require('moment');

Server.init(function(err) {

  function cb(err) {
    if (err) {
      server.log.error(err);
    }
    process.exit();
  }

  // Exit app on error
  if (err) {
    return cb(err);
  }


  // Sync db structure
  server.config.sequelize.sync({force: true}).then(() => {
    Promise.all([
      AuthService.registerUser({firstName: 'Admin', email: 'admin@tarabalam.com', password: 'admin', role: 'ADMIN'}),
      Message.bulkCreate(_.times(100, (i) => {return {content: `Hi there ${i}`}})),
      Template.create({name: 'holiday', messageBody: 'Get a Puja Done on the Eve of Holi', messageTitle: 'Happy Holi'})
    ]).then(() => {
      return Event.bulkCreate(_.times(10, (i) => {
        let eventDate = moment().add(_.random(20), 'days');
        return {
          name: `event ${i}`,
          eventDay: eventDate.date(),
          eventMonth: eventDate.month() + 1,
          templateId: 1
        };
      }));
    }).then(() => cb());
  }).catch(cb);
});
