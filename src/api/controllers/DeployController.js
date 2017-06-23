/*
Create DeployController
 */


var shell = require('shelljs');
var K8s = require('k8s');
const http = require('http');
const fs = require('fs');
var dummyjson = require('dummy-json');
var yaml = require('write-yaml');
var Slack = require('slack-node');
var webhookUri = "https://hooks.slack.com/services/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";

let DeployController = module.exports = {};

DeployController.create = (req, res) => {
console.log("At server side controller");

let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  params.applicationId = req.params.applicationId;
  params.stage = req.params.stage;
  UtilService.wrapCb(Service.create(params), (err, service) => {
    if (err) {
      server.log.error('Error create image', err);
      res.status(500).json(err);
    }
    res.send(service);
    
    	console.log('Service appname',service.appname);
	console.log('Service domain',service.domain);
 	console.log('Service port',service.port);
 	console.log('Service namespace',service.namespace.toLowerCase());
 	console.log('Service dockerimage',service.dockerimage.toLowerCase());

        var port= service.port;
	var domain= service.domain.toLowerCase();
  	var appname= service.appname.toLowerCase();
  	var namespace= service.namespace.toLowerCase();
  	var dockerimage= service.dockerimage.toLowerCase();
  	var fulldomain=domain +'.deploybytes.com';

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
                                   port: 80,
                                   targetPort: 'web',
                                   protocol: 'TCP'}
                                  ],
                                 selector:
                                 {	app: appname,
                                 	role: "web"}
                            }
                            },

                            {
                         	apiVersion: 'extensions/v1beta1',
                         	kind: 'Deployment',
                         	metadata:
                            	{     name: appname,
                            	      namespace: namespace},
                         	spec:
                            	{  replicas: 3,
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
                         				 },
                                                 annotations:{
                                                          "consul.register/enabled": "true"
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
                                		containerPort: parseInt(port)}
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

 	console.log('Service name -',appname);

	var slack = new Slack();
  	slack.setWebhook(webhookUri);
  	slack.webhook({
    	channel: "#opsbot",
    	username: "Deploybyte",
    	text: "Hello from deploybytes... Processing your deployment of app name :"+appname
 	 }, function(err, response) {
    	console.log(response);
 	 });


//--------------------------------------------kubctl deployments-----------------------------------

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
     		//clientKey: fs.readFileSync('kube.key').toString(),
    		 //clientCert: fs.readFileSync('ca.crt').toString(),
  		   //caCert: fs.readFileSync('server.crt').toString()
     		}*/
	 })//remove this comment


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


});//end of .then function

};















//-----------------------------------------------------------------------------privious code which used to take 5 fileds from user and deploy----------------------------------------------------------------------------


/*remove this comment

// Route: post /organizations/projects/application/deployments
DeployController.create = (req, res) => {
  let params = req.body;

  var port= params.port;
  var domain= params.domain;
  var appname=params.appname;
  var namespace=params.namespace;
  var dockerimage=params.dockerimage;

  var fulldomain=domain +'.deploybytes.com';

  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  params.applicationId =req.params.applicationId;
  console.log('This is at the deploy controller',params.applicationId);

  UtilService.wrapCb(Service.create(params), (err, service) => {
    if (err) {
      server.log.error('Error while creating deployments', err);
      res.status(500).json(err);
    }
    res.send(service);
  });


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








/*remove this comment
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
                                  port: 80,
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
                                containerPort: parseInt(port)}
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


 console.log('Service name -',appname);

  var slack = new Slack();
  slack.setWebhook(webhookUri);
  slack.webhook({
    channel: "#opsbot",
    username: "Deploybyte",
    text: "Hello from deploybytes... Processing your deployment of app name :"+appname
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


 // })//remove this comment 
 
/*remove this comment
 
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

//res.end('ending server response');
};


remove this comment */













DeployController.findAll = (req, res) => {
  UtilService.wrapCb(Service.findAndCountAll({where: {
    organizationId: req.params.organizationId,
    projectId: req.params.projectId,
    applicationId:req.params.applicationId,
  }}), (err, service) => {
    if (err) {
      server.log.error('Error while getting application', err);
      res.status(500).json(err);
    }
    res.send(service);
});
};

