/**
 * Create ProjectController
 */

let ProjectController = module.exports = {};

// Route: get /organizations/:projectId
ProjectController.findOne = (req, res) => {
  UtilService.wrapCb(Project.findById(req.params.projectId), (err, project) => {
    if (err) {
      server.log.error('Error getting project', err);
      res.status(500).json(err);
    }
    res.send(project);
  });
};

// Route: post /organizations
ProjectController.create = (req, res) => {
  let params = req.body;
  params.userId=req.params.userId;
  params.organizationId = req.params.organizationId;
  UtilService.wrapCb(Project.create(params), (err, project) => {
    if (err) {
      server.log.error('Error create project', err);
      res.status(500).json(err);
    }
    res.send(project);
  });
};

ProjectController.update = (req, res) => {
  let params = req.body;
  // params.organizationId = req.params.organizationId;
  UtilService.wrapCb(Project.findById(req.params.projectId).then((project) => {
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

ProjectController.findAll = (req, res) => {
  UtilService.wrapCb(Project.findAndCountAll({where: {
      //userId:req.params.userId,
      organizationId: req.params.organizationId,
    }}), (err, projects) => {
    if (err) {
      server.log.error('Error getting project', err);
      res.status(500).json(err);
    }
    res.send(projects);
  })
}

