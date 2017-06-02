/**
 * Create ReleaseController
 */

let ReleaseController = module.exports = {};

ReleaseController.findOne = (req, res) => {
  UtilService.wrapCb(Release.findById(req.params.releaseId), (err, release) => {
    if (err) {
      server.log.error('Error getting release', err);
      res.status(500).json(err);
    }
    res.send(release);
  });
};

ReleaseController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  params.applicationId = req.params.applicationId;
  UtilService.wrapCb(Release.create(params), (err, release) => {
    if (err) {
      server.log.error('Error create release', err);
      res.status(500).json(err);
    }
    res.send(release);
  });
};

ReleaseController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(Release.findById(req.params.releaseId).then((release) => {
    console.log(release);
    _.forOwn(req.body, (value, key) => {
      release.setDataValue(key, value);
    });
    return release.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating release', err);
    res.status(500).json(err);
  }));
};

ReleaseController.findAll = (req, res) => {
  UtilService.wrapCb(Release.findAndCountAll({where: {
      organizationId: req.params.organizationId,
      applicationId: req.params.applicationId
    }}), (err, releases) => {
    if (err) {
      server.log.error('Error getting release', err);
      res.status(500).json(err);
    }
    res.send(releases);
  })
}

