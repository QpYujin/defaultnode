/**
 * Create ImageController
 */



var shell = require('shelljs');
let ImageController = module.exports = {};

ImageController.findOne = (req, res) => {
  UtilService.wrapCb(Image.findById(req.params.imageId), (err, image) => {
    if (err) {
      server.log.error('Error getting image', err);
      res.status(500).json(err);
    }
    BuildImage.findById(image.buildImageId), (err, build) => {
      if (!err) {
        image.build = build;
      }
      res.send(image);
    }
  });

};





//Privious code to create 
ImageController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  params.applicationId = req.params.applicationId;
  params.stage = req.params.stage;
  UtilService.wrapCb(Image.create(params), (err, image) => {
    if (err) {
      server.log.error('Error create image', err);
      res.status(500).json(err);
    }
    res.send(image);
  
  var getrepolink = function () {
      var img = image.toJSON();
      return BuildImage.findById(image.buildImageId).then((build)=>{
        img.build=build;//.toJSON();
        console.log('Image is building for repo: ',build.repoName);
        console.log('Image tage name',build.tag);
        console.log('Image PORT',build.port);
        var dockertab=build.repoName.toLowerCase()+'_'+build.tag;
        console.log('Complete dockerhub tab',dockertab);

          shell.exec('/usr/src/app/api/controllers/push.sh'+' '+dockertab+' '+build.repoName.toLowerCase()+' ',
            function (error, stdout, stderr) {
              console.log('This is inside ---push--- shell script function');
              if (error !== null) {
                console.log('Success for running push shell script!!');
              }
            });

        //code for getting link JOIN source management table
        return SourceManagement.findById(build.sourceControlId).then((repo)=>{
        img.repo=repo.toJSON();
        console.log('This is github  link: ',repo.url);
      });//end of source management

    });

  }();//end of get repo


  });
};
















ImageController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(Image.findById(req.params.imageId).then((image) => {
    console.log(image);
    _.forOwn(req.body, (value, key) => {
      image.setDataValue(key, value);
    });
    return image.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating image', err);
    res.status(500).json(err);
  }));
};



/* privious code for get all images
ImageController.findAll = (req, res) => {
  UtilService.wrapCb(Image.findAndCountAll({
    where: {
      organizationId: req.params.organizationId,
      projectId:req.params.projectId,
      applicationId: req.params.applicationId,
      //stage: req.params.stage
    },
    limit: 5,
    offset: 0,
    order: [['updatedAt', 'DESC']]
  }), (err, images) => {
    if (err) {
      server.log.error('Error getting image', err);
      res.status(500).json(err);
    }

    Promise.all(_.map(images.rows, (image) => {
      return function() {
        //var img = image.toJSON();
        return new Promise((resolve, reject) => {
          BuildImageService.getOne(image.buildImageId, (err, build) => {
            img.build = build;
            resolve();
          })
        })
      }();

    })).then(() => {
      res.send(images);
    })

  })
}*/



ImageController.findAll = (req, res) => {
  UtilService.wrapCb(Image.findAndCountAll({
    where: {
      organizationId: req.params.organizationId,
      projectId: req.params.projectId,
      applicationId: req.params.applicationId,
      //stage: req.params.stage
    },
    limit: 5,
    offset: 0,
    order: [['updatedAt', 'DESC']]
    }), (err, images) => {
        if (err) {server.log.error('Error getting image', err);
                  res.status(500).json(err);
                  }

    Promise.all(_.map(images.rows, (image) => {
      return function() {
        var img = image.toJSON();
        console.log('This is img',img);
        /*return new Promise((resolve, reject) => {
                BuildImage.getOne(image.buildImageId, (err, build) => {
                img.build = build;
                resolve();
              })
        }) */

        return Promise.all([
          function () {
            return BuildImage.findById(image.buildImageId).then((build)=>{
              img.build=build;//.toJSON();
             // console.log(build);
          });
          }()
          //add another function here
        ])

      }();
    })).then(() => {
      res.send(images);
    });
  });
};











