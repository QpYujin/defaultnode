/**
 * Created by QPAIR on 8/15/2017.
 */


let LogsController = module.exports = {};




LogsController.getLogs = (req, res) => {
  console.log('server side controller get call for logs');

  var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(
      client,
      [
        { topic: 'build', partition: 0 }
      ],
      {
        autoCommit: false
      }
    );

  consumer.on('message', function (message) {
    console.log('This is msgs :', message);
  });

};
