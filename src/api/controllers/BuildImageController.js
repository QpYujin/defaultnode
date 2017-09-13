/**
 * Create BuildImageController
 */

var sleep = require('sleep');
var fs = require('fs');
var shell = require('shelljs');
var Kafka = require('no-kafka');
var logger = require('fluent-logger');


var Kafka = require('no-kafka');
//var connString = ' kafka://192.168.1.237:2181, 192.168.1.237:2181 '
//var producer = new Kafka.Producer({ connectionString: connString });

var connString = ' kafka://a2297de55842511e782690e0b9849711-872475790.us-east-1.elb.amazonaws.com:9092, http://a2297de55842511e782690e0b9849711-872475790.us-east-1.elb.amazonaws.com:9092 '
var producer = new Kafka.Producer({ connectionString: connString });



logger.configure('frontend', {
    host:'ac25381b868b011e798a60ec8ff6c4ad-2031531158.us-east-1.elb.amazonaws.com',
    port: 24224,
    timeout: 3.0,
    reconnectInterval: 600000 // 10 minutes
});




let BuildImageController = module.exports = {};

BuildImageController.findOne = (req, res) => {
  UtilService.wrapCb(BuildImage.findById(req.params.buildImageId), (err, buildImage) => {
    if (err) {
      server.log.error('Error getting buildImage', err);
      res.status(500).json(err);
    }
    res.send(buildImage);
  });
};



/* 
//privious code for creating all image/POST call
BuildImageController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  params.applicationId = req.params.applicationId;
  params.stage = req.params.stage;
  UtilService.wrapCb(BuildImage.create(params), (err, buildImage) => {
    if (err) {
      server.log.error('Error create buildImage', err);
      res.status(500).json(err);
    }
    res.send(buildImage);
  });
};*/






BuildImageController.getLogs = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  console.log(params);
  console.log('server side logs controller get call for logs');
  var consumer = new Kafka.SimpleConsumer({ connectionString: connString });

  // data handler function can return a Promise 
  var dataHandler = function (messageSet, topic, partition) {
	var arr = [ ];
	messageSet.forEach(function (m) {
        console.log(topic, partition, m.message.value.toString('utf8'));
		msg=m.message.value.toString('utf8');
		arr.push(msg);
    });
	
	console.log(arr);
       //let msg=arr;
       res.send(arr);

  };
 
        return consumer.init().then(function () {
       // Subscribe partitons 0 and 1 in a topic: 
       //return consumer.subscribe('test', dataHandler);
	return consumer.subscribe('build', 0, {offset: 0, maxBytes: 1000}, dataHandler)
     });

};










BuildImageController.create = (req, res) => {

   console.log("Build image logs in build image controller");
   
    payloads = [
       
         {topic: 'build',partition: 0,message: {value: 'INFO : Intialising buiding process...'}}
	  // {topic: 'build',partition: 0,message: {value: 'INFO : started build..'}},
	  // {topic: 'build',partition: 0,message: {value: 'INFO : verifying dockers..'}},
          // {topic: 'build',partition: 0,message: {value: '-----------------------------------------------------------'}}

   ]
 
  /*	return producer.init()
	.then(function(){	 
    	return producer.send(payloads);
	}).then(function (result) {
  	console.log('topic sent');
        //add functionality here

	});*/
 

  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  params.applicationId = req.params.applicationId;
  params.stage = req.params.stage;
  console.log(params.stage);

  UtilService.wrapCb(BuildImage.create(params), (err, buildImage) => {
    if (err) {
      server.log.error('Error create buildImage', err);
      res.status(500).json(err);
    }
    res.send(buildImage);
    let c = buildImage.toJSON();
    var getrepolink = function () {
    return SourceManagement.findById(buildImage.sourceControlId).then((repo)=>{
      c.repo=repo.toJSON();
      //console.log('This is value of :',c);
      console.log('This is repository github link',repo.url); 
      console.log('This is build image object--------------------------------');
      console.log('This is repository name',params.repoName);
      console.log('this is from branch',params.branchName);
      console.log('This is port',params.port);      

      var gitlink=repo.url+'/'+params.repoName+'.git';
      console.log('complete github link ',gitlink);    
      //payloads.push({topic: 'build',partition: 0,message: {value: 'INFO : This is github repository link for clonnning : '+gitlink}} );
           //code for clonning image
           shell.exec('/usr/src/app/api/controllers/clone.sh'+' '+gitlink+' '+params.repoName+' ',
           function (error, stdout, stderr) {
           console.log('This is inside shell script function');
               if (error !== null) {
	       //payloads.push({topic: 'build',partition: 0,message: {value: 'INFO: executing shell script!'}} );
               //payloads.push({topic: 'build',partition: 0,message: {value: '-----------------------------------------------------------'}} );

		 }

		//code for getting logs from shell
               sleep.sleep(15);
		fs.readFile('/usr/src/app/api/controllers/clonelog.txt', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			
			console.log(data);
			logger.emit('read', {message: 'Successfully reading clone logs'});
	
			if(data.indexOf('Successfully cloned') >= 0){			
				console.log('This is status after clonning:',data.toString());
                                payloads.push({topic: 'status',partition: 0,message: {value: 'SUCCESS : successfully clonned '}} );
	                        buildImage.setDataValue('build', 'Success fully cloned');
                		return buildImage.save();				 

			 }//end of clonned if

			else if(data.indexOf('Image successfully build') >= 0){
                                        console.log('This is status:',data.toString());
                                        payloads.push({topic: 'status',partition: 0,message: {value: 'SUCCESS : Successfully build '}} );
                                        buildImage.setDataValue('status', 'Successfully Build');
                                        logger.emit('build', {message: 'Successfully Build'});
                                        return buildImage.save();

                                         }



			else if(data.indexOf('Image build failed') >= 0)
				{	console.log('This is build status :failed');
                                        payloads.push({topic: 'status',partition: 0,message: {value: 'ERROR : Failed to build '}} );
                                        buildImage.setDataValue('status', 'Failed to Build');
                                        logger.emit('build', {message: 'Failed to Build'});
                                        return buildImage.save();
                                         }



			  else{
				 console.log('failed');
                                 payloads.push({topic: 'status',partition: 0,message: {value: 'ERROR : Failed to clonned '}} );
				 buildImage.setDataValue('status', 'Failed to clonned');
				 logger.emit('build', {message: 'Failed to clonned'});
                		return buildImage.save();
			  }
		
          	 });

		});


        });//end of source management

    }();//end of get repo
 });//util services

        return producer.init()
        .then(function(){
        return producer.send(payloads);
        }).then(function (result) {
        console.log('topic sent');
        //add functionality here
        });


};


BuildImageController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(BuildImage.findById(req.params.buildImageId).then((buildImage) => {
    _.forOwn(req.body, (value, key) => {
      buildImage.setDataValue(key, value);
    });
    return buildImage.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating buildImage', err);
    res.status(500).json(err);
  }));
};



//new function to get all images with repository link for JOINING table

BuildImageController.findAll = (req, res) => {
  UtilService.wrapCb(BuildImage.findAndCountAll({
    where: {
      organizationId: req.params.organizationId,
      projectId:req.params.projectId,
      applicationId: req.params.applicationId
      //stage: req.params.stage
    },
    order: [['updatedAt', 'DESC']]}), (err, buildImages) => {
        if (err) {
          server.log.error('Error getting buildImage', err);
          res.status(500).json(err);
        }

    Promise.all(_.map(buildImages.rows,(buildImage)=>{
      let b= buildImage.toJSON();
      console.log('value of b',b);
      return function () {
        return Promise.all([
          function () {
             return SourceManagement.findById(buildImage.sourceControlId).then((repo)=>{
               b.repo=repo.toJSON();
            });
          }()
          //add another function here
        ])
      }();
    }
  )).then(()=>{
          res.send(buildImages);
  })
  })
}






/*privious code for get all

BuildImageController.findAll = (req, res) => {
  UtilService.wrapCb(BuildImage.findAndCountAll({
    where: {
      organizationId: req.params.organizationId,
      applicationId: req.params.applicationId,
      stage: req.params.stage
    },
    order: [['updatedAt', 'DESC']]}), (err, buildImages) => {
    if (err) {
      server.log.error('Error getting buildImage', err);
      res.status(500).json(err);
    }
    Promise.all(_.map(buildImages.rows, (buildImage) => {
      let b = buildImage.toJSON();
      return function () {
        return Promise.all([
          function () {
            return Release.findById(b.releaseId).then((release) => {
              b.release = release.toJSON();
            });
          }(),
          function () {
            return SourceManagement.findById(b.sourceControlId).then((repo) => {
              b.repo = repo.toJSON();
            });
          }()
        ])
      }()
    })).then(() => {
      res.send(buildImages);
    })
  })
}


BuildImageController.findAll = (req, res) => {
  UtilService.wrapCb(BuildImage.findAndCountAll({where: {
    organizationId: req.params.organizationId,
    projectId: req.params.projectId,
    applicationId:req.params.applicationId
  }}), (err, buildImages) => {
    if (err) {
      server.log.error('Error while getting application', err);
      res.status(500).json(err);
    }
    res.send(buildImages);
});
};
*/
