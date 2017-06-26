/**
 * Create BuildImageController
 */

var shell = require('shelljs');
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






BuildImageController.create = (req, res) => {
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
      console.log('complete link ',gitlink);

           //code for clonning image
           shell.exec('/usr/src/app/api/controllers/clone.sh'+' '+gitlink+' '+params.repoName+' ',
           function (error, stdout, stderr) {
           console.log('This is inside shell script function');
               if (error !== null) {
               console.log(' success ! ');
               }
           });
        });//end of source management

    }();//end of get repo
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
