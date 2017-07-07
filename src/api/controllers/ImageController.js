/**
 * Create ImageController
 */
var shell = require('shelljs');

let ImageController = module.exports = {};
var shell = require('shelljs');

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

    //code for push.sh shell script
    var getrepolink = function () {
      var img = image.toJSON();
      return BuildImage.findById(image.buildImageId).then((build)=>{
        img.build=build;//.toJSON();
        console.log('Image is building for repo: ',build.repoName);
        console.log('Image tage name',build.tag);
        var dockertab=build.repoName.toLowerCase()+'_'+build.tag;
        console.log('Complete dockerhub',dockertab);
          shell.exec('/usr/src/app/api/controllers/push.sh'+' '+dockertab+' '+build.repoName+' ',
            function (error, stdout, stderr) {

            //copy this thing while buiding image
              console.log('This is inside ---push--- shell script function');

              if (error !== null) {
                  console.log('Success for running shell script!!');
                  console.log('inside image update function');

                var delayMillis = 6000; //1 second
                setTimeout(function() {
                   if(shell.echo=='Image successfully build'){
                     build.setDataValue('status', 'SUCCESS!');
                     return build.save();
                    }
                    else{
                      build.setDataValue('status', 'Failed Build');
                      return build.save();
                      }
                  },delayMillis);
                }//end of error

            });



        //code for getting link JOIN source management table
        return SourceManagement.findById(build.sourceControlId).then((repo)=>{
        img.repo=repo.toJSON();
        console.log('This is at pushing docker hub github.js  link: ',repo.url);
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

/*
ImageController.findAll = (req, res) =>
{
  UtilService.wrapCb(Image.findAndCountAll({
    where: {
      organizationId: req.params.organizationId,
      projectId: req.params.projectId,
      applicationId: req.params.applicationId,
      //stage: req.params.stage
      },
     // limit: 5,
     // offset: 0,
      order: [['updatedAt', 'DESC']]
     }),(err, images)=>

     {

      if (err) {
        server.log.error('Error getting image', err);
        res.status(500).json(err);
      }

      Promise.all(_.map(images.rows, (image) = > {
      let img= buildImage.toJSON();
      console.log('value of img',img);
      return function () {
        return Promise.all([
          function () {
            return buildImage.findById(image.buildImageId).then((build)=>{
              img.build=build.toJSON();
              });
          }()
      //add another function here
    ])
  }();
  })).then(() = > {
      res.send(images);
      })


});
}

*/






























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

