/**
 * Create ImageController
 */

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

ImageController.findAll = (req, res) => {
  UtilService.wrapCb(Image.findAndCountAll({
    where: {
      organizationId: req.params.organizationId,
      applicationId: req.params.applicationId,
      stage: req.params.stage
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
        var img = image.toJSON();
        return new Promise((resolve, reject) => {
          BuildImageService.getOne(img.buildImageId, (err, build) => {
            img.build = build;
            resolve();
          })
        })
      }();
    })).then(() => {
      res.send(images);
    })
  })
}

