/**
 * Create ApplicationController
 */
var shell = require('shelljs');
var K8s = require('k8s');
var yaml = require('write-yaml');
const http = require('http');
const fs = require('fs');
var Slack = require('slack-node');
var webhookUri = "https://hooks.slack.com/services/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";
var dummyjson = require('dummy-json');
var jsonfile = require('jsonfile');


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
  var file = 'service.json'
  var dummyjson = require('dummy-json');
  var port= params.port;
  var domain= params.domain;
  var appname=params.appname;
  var namespace=params.namespace;
  var dockerimage=params.dockerimage;
  var decservice = params.appname;
  var fulldomain=domain +'.deploybytes.com';

  console.log('Parameters :',params);
  console.log('Appname :',params.appname);
  console.log('Port',params.port);
  console.log("At the server side service function");

/*  UtilService.wrapCb(Service.create(params), (err, application) => {
    if (err) {
      server.log.error('Error create service', err);
      res.status(500).json(err);
    }
    res.send(service);
  });*/


  
var data = {
		apiVersion: 'v1',
		kind:"List",
		items:
		[
	    	{apiVersion: "v1",
			 kind: 'Namespace',
			 metadata:
			 {name: namespace},
			},
			
		    {
			  apiVersion: 'v1',
			   kind: 'Service',
			   metadata:
			   {name: appname,
				namespace: namespace,
				labels:
				{ app: appname,
				 role: "web",
				  dns: "route53"},
				annotations:
				{domainName:fulldomain}          		   
			   },
			   spec:
			   {
				type: 'LoadBalancer',
				ports:
				[ 
				 {name: 'web',
				  port: parseInt(port),
				  targetPort: 'web',
				  protocol: 'TCP'}
				 ],
				selector:
				{app: appname,
				role: "web"} 			 
			   }
			   },
			   
			   {
			apiVersion: 'extensions/v1beta1',
			kind: 'Deployment',
			metadata:
			   {name: appname,
			   namespace: namespace},
			spec:
			   {replicas: 3,
			strategy: 
			   {type: "RollingUpdate"},
			revisionHistoryLimit: 10,
			selector:
			   {   matchLabels:
			   {app: appname,
				role: "web"}
				},
			template:
			{
			 metadata:{
			 labels:{
			  app: appname,
			  role: "web"
			  }
			},
			 spec:
			 {
			 containers:
			 [
			{name: appname,
			 image: dockerimage,
			 resources:
			{  limits:{
			 cpu: "100m",
			  memory: "250Mi"
				},
			 requests:{
			  cpu: "10m",
			  memory: "125Mi"
				 }
			 },
			 ports:[
				{name: "web",
				containerPort: 5000}
				   ]
				
				}]
					 }
					}
				}
			   }	
			]
			};

		
yaml('/usr/src/app/api/controllers/deployment.yaml',data, function(err) {
  // do stuff with err
});




 console.log('Service name -',decservice);
 
  var slack = new Slack();
  slack.setWebhook(webhookUri);
  slack.webhook({
    channel: "#opsbot",
    username: "Deploybyte",
    text: "Hello from deploybytes... Processing your deployment of app name :"+decservice
  }, function(err, response) {
    console.log(response);
  });



//-------------------------------------------------------------------------------------------------------------------------------------------
  


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
  })

 


  console.log('before service.yml file');
       var delayMillis = 4000;
 
       kubectl.command('create -f /usr/src/app/api/controllers/deployment.yaml', function(err, data){
         console.log(data)
         console.log(err)
        })

         setTimeout(function() {
        //code to be executed after 4 second

         //kubectl.command('describe services'+decservice, function(err, data){
         kubectl.command('--namespace='+namespace+' describe services '+appname, function(err, data){

                 console.log(data)
                 console.log(err)
         
                 slack.webhook({
                 channel: "#opsbot",
                 username: "Deploybyte", //neha main user
                 text: data
                 }, function(err, response) {
                       console.log(response);
                 });//slackwebhook


                slack.webhook({
                 channel: "#opsbot",
                 username: "Deploybyte", //neha main user
                 text: 'Please wait for a while to see your application... Keep refreshing domain link to see your app in browser!'
                 }, function(err, response) {
                       console.log(response);
                 });//slackwebhook


         })//kubectl command
         
        },delayMillis);//settimeout function

//------------------------------------------------------------------------------------------------------------------------------

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

