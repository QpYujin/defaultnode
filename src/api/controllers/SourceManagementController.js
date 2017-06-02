/**
 * Create SourceManagementController
 */

let SourceManagementController = module.exports = {};

SourceManagementController.findOne = (req, res) => {
  UtilService.wrapCb(SourceManagement.findById(req.params.repoId), (err, project) => {
    if (err) {
      server.log.error('Error getting project', err);
      res.status(500).json(err);
    }
    res.send(project);
  });
};

SourceManagementController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  UtilService.wrapCb(SourceManagement.create(params), (err, project) => {
    if (err) {
      server.log.error('Error create project', err);
      res.status(500).json(err);
    }
    res.send(project);
  });
};

SourceManagementController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(SourceManagement.findById(req.params.repoId).then((project) => {
    console.log(project);
    _.forOwn(req.body, (value, key) => {
      project.setDataValue(key, value);
    });
    return project.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating project', err);
    res.status(500).json(err);
  }));
};

SourceManagementController.findAll = (req, res) => {
  UtilService.wrapCb(SourceManagement.findAndCountAll({where: {
      organizationId: req.params.organizationId,
      projectId: req.params.projectId
    }}), (err, projects) => {
    if (err) {
      server.log.error('Error getting project', err);
      res.status(500).json(err);
    }
    res.send(projects);
  })
}

