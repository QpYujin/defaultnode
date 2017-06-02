/**
 * Create BuildController
 */

let BuildController = module.exports = {};

// Route: get /organizations/:buildId
BuildController.findOne = (req, res) => {
  console.log('========================================');
  UtilService.wrapCb(Build.findById(req.params.buildId), (err, build) => {
    if (err) {
      server.log.error('Error getting build', err);
      res.status(500).json(err);
    }
    res.send(build);
  });
};

// Route: post /organizations
BuildController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.applicationId = req.params.applicationId;
  UtilService.wrapCb(Build.create(params), (err, build) => {
    if (err) {
      server.log.error('Error create build', err);
      res.status(500).json(err);
    }
    res.send(build);
  });
};

BuildController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(Build.findById(req.params.buildId).then((build) => {
    _.forOwn(req.body, (value, key) => {
      build.setDataValue(key, value);
    });
    return build.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating build', err);
    res.status(500).json(err);
  }));
};

BuildController.findAllInOrg = (req, res) => {
  UtilService.wrapCb(Build.findAndCountAll({where: {
      organizationId: req.params.organizationId,
    }}), (err, builds) => {
    if (err) {
      server.log.error('Error getting build', err);
      res.status(500).json(err);
    }
    res.send(builds);
  })
}

BuildController.findAll = (req, res) => {
  UtilService.wrapCb(Build.findAndCountAll({where: {
      organizationId: req.params.organizationId,
      applicationId: req.params.applicationId
    }}), (err, builds) => {
    if (err) {
      server.log.error('Error getting build', err);
      res.status(500).json(err);
    }
    res.send(builds);
  })
}

