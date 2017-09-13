
let LogsController = module.exports = {};


console.log('At logs controller');

LogsController.getLogs = (req, res) => {

  
  let params = req.body;
  params.organizationId = req.params.organizationId;
  console.log(params);

  console.log('server side logs controller get call for logs');
  /*var kafka = require('kafka-node'),
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
  });*/


  let msg='This is msg from server side';
  res.send(msg);

};
