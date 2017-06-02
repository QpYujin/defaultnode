/**
 * Create ApplicationController
 */
var shell = require('shelljs');
var K8s = require('k8s');
const http = require('http');
const fs = require('fs');
var Slack = require('slack-node');
var webhookUri = "https://hooks.slack.com/services/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";

let ApplicationController = module.exports = {};

// Route: get /organizations/:applicationId
ApplicationController.findOne = (req, res) => {
  UtilService.wrapCb(Application.findById(req.params.applicationId), (err, application) => {
    if (err) {
      server.log.error('Error getting application', err);
      return res.status(500).json(err);
    }
    Release.findAll({where: {applicationId: application.uuid}}).then((releases) => {
      var a = application.toJSON();
      console.log(err);
      a.releases = releases || [];
      res.send(a);
    })
  });
};

// Route: post /organizations
ApplicationController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  UtilService.wrapCb(Application.create(params), (err, application) => {
    if (err) {
      server.log.error('Error create application', err);
      res.status(500).json(err);
    }
    res.send(application);
  });
};

ApplicationController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  // params.projectId = req.params.projectId;
  UtilService.wrapCb(Application.findById(req.params.applicationId).then((application) => {
    _.forOwn(req.body, (value, key) => {
      application.setDataValue(key, value);
    });
    return application.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating application', err);
    res.status(500).json(err);
  }));
};

ApplicationController.newdeployApi = (req, res) => {
  let params = req.body;
  //params.organizationId = req.params.organizationId;
  //params.projectId = req.params.projectId;
  console.log('Parameters :',params);
  console.log('Namespace :',params.namespace);
  console.log('yaml :',params.deploymentyaml);
  console.log("At the server side function");

  console.log('Creating file from editor');
  var writeStream = fs.createWriteStream("/usr/src/app/api/controllers/deployment.yaml");
  console.log('Writing to file from editor');
  fs.writeFile("/usr/src/app/api/controllers/deployment.yaml", params.deploymentyaml, 'utf8', function (err) {
    if (err) return console.log(err);
  });
  res.end('ending server response');
};



ApplicationController.newservice = (req, res) => {
  let params = req.body;
  //params.organizationId = req.params.organizationId;
  //params.projectId = req.params.projectId;
  console.log('Parameters :',params);
  console.log('yaml :',params.serviceyaml);
  console.log("At the server side function");
  console.log('Creating file from editor');
  var writeStream = fs.createWriteStream("/usr/src/app/api/controllers/service.yaml");
  console.log('Writing to file from editor');

  fs.writeFile("/usr/src/app/api/controllers/service.yaml", params.serviceyaml, 'utf8', function (err) {
    if (err) return console.log(err);
  });

  console.log('At application controller server side');
  console.log("You can put code here to run cubectl");

  var slack = new Slack();
  slack.setWebhook(webhookUri);
  slack.webhook({
    channel: "#opsbot",
    username: "Deploybyte", //neha main user
    text: "Hello from deploybytes... Processing to deployments!"
  }, function(err, response) {
    console.log(response);
  });

  /*
  console.log('Before kubctl function');
  var kubectl= K8s.kubectl ({
    //endpoint: 'https://34.225.125.175',
    //namespace: 'default',
    binary: '/usr/local/bin/kubectl',
    kubeconfig: '/usr/src/app/api/controllers/config.yaml',
    version: '/api/v1',
    /*auth: {
     username: "admin",
     password: "guRZdC5eC75EbvyX",
     i                       //clientKey: fs.readFileSync('kube.key').toString(),
     //clientCert: fs.readFileSync('ca.crt').toString(),
     //caCert: fs.readFileSync('server.crt').toString()
     }*/
  /*})


  console.log('before deployment.yml file');
  kubectl.deployment.create(('/usr/src/app/api/controllers/deployment.yaml'), function(err, data){
    console.log(err)
    console.log(data)
  })

  console.log('before service.yml file');
  kubectl.service.create(('/usr/src/app/api/controllers/service.yaml'), function(err, data){
         console.log(err)
          console.log(data)

    kubectl.command('describe services my-app', function(err, data){
          console.log(data)
          console.log(err)
      //sending messages on slack
      slack.setWebhook(webhookUri);
      slack.webhook({
        channel: "#api-creator",
        username: "securitybot", //neha main user
        text: err
      }, function(err, response) {
        console.log(response);
      });
    })//kubectl command
   })//kubectl service
*/
  res.end('ending server response');
};




ApplicationController.findAll = (req, res) => {

  UtilService.wrapCb(Application.findAndCountAll({where: {
      organizationId: req.params.organizationId,
      projectId: req.params.projectId,
    }}), (err, applications) => {
    if (err) {
      server.log.error('Error getting application', err);
      res.status(500).json(err);
    }
    res.send(applications);
  })
}

