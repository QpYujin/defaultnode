/**
 * Create BuildImageController
 */

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

