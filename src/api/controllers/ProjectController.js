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

  console.log('This is default value',params.mydefaultvalue)
  params.organizationId = req.params.organizationId;
  
 UtilService.wrapCb(Project.create(params), 
  (err, project) => {
    if (err) {
      server.log.error('Error create project', err);
      res.status(500).json(err);
    }
    //res.send(project);
    console.log("This is project object",project);
    if (params.mydefaultvalue==1)
     {
       
       var name="Qpair"
       var provider="Github"
       var url = "https://github.com/cloudoptim"
       var type = "public"

     SourceManagement.create
	({
          organizationId:params.organizationId,
          projectId: project.uuid,
          name:"Qpair",
          provider:"github",
          url:"https://github.com/cloudoptim",
          type:"public"}).then
	  {
        	console.log('This is another post from source')
                console.log('This is project uuid',project.uuid);
        	if (err) {
           	server.log.error('Error create project', err);
          	 res.status(500).json(err);
               }
            }
   }

   res.send(project);

})
 

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
      organizationId: req.params.organizationId,
    }}), (err, projects) => {
    if (err) {
      server.log.error('Error getting project', err);
      res.status(500).json(err);
    }
    res.send(projects);
  })
}

