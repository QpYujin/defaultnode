/**
 * Create CloudProviderController
 */

let CloudProviderController = module.exports = {};

CloudProviderController.findOne = (req, res) => {
  UtilService.wrapCb(CloudProvider.findById(req.params.cloudId), (err, cloud) => {
    if (err) {
      server.log.error('Error getting cloud', err);
      res.status(500).json(err);
    }
    res.send(cloud);
  });
};

CloudProviderController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  UtilService.wrapCb(CloudProvider.create(params), (err, cloud) => {
    if (err) {
      server.log.error('Error create cloud', err);
      res.status(500).json(err);
    }
    res.send(cloud);
  });
};

CloudProviderController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(CloudProvider.findById(req.params.cloudId).then((cloud) => {
    console.log(cloud);
    _.forOwn(req.body, (value, key) => {
      cloud.setDataValue(key, value);
    });
    return cloud.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating cloud', err);
    res.status(500).json(err);
  }));
};

CloudProviderController.findAll = (req, res) => {
  UtilService.wrapCb(CloudProvider.findAndCountAll({where: {
      organizationId: req.params.organizationId,
      projectId: req.params.projectId
    }}), (err, clouds) => {
    if (err) {
      server.log.error('Error getting cloud', err);
      res.status(500).json(err);
    }
    res.send(clouds);
  })
}

