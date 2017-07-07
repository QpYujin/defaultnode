/**
 * Create ImageRepositoryController
 */

let ImageRepositoryController = module.exports = {};

ImageRepositoryController.findOne = (req, res) => {
  UtilService.wrapCb(ImageRepository.findById(req.params.imageId), (err, image) => {
    if (err) {
      server.log.error('Error getting image', err);
      res.status(500).json(err);
    }
    res.send(image);
  });
};

ImageRepositoryController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  UtilService.wrapCb(ImageRepository.create(params), (err, image) => {
    if (err) {
      server.log.error('Error create image', err);
      res.status(500).json(err);
    }
    res.send(image);
  });
};

ImageRepositoryController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(ImageRepository.findById(req.params.imageId).then((image) => {
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

ImageRepositoryController.findAll = (req, res) => {
  UtilService.wrapCb(ImageRepository.findAndCountAll({where: {
      organizationId: req.params.organizationId,
      projectId: req.params.projectId,
    }}), (err, images) => {
    if (err) {
      server.log.error('Error getting image', err);
      res.status(500).json(err);
    }
    res.send(images);
  })
}

