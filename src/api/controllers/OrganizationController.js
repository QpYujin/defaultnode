/**
 * Create OrganizationController
 */
var shell = require('shelljs');
let OrganizationController = module.exports = {};

// Route: get /organizations/:id
OrganizationController.findOne = (req, res) => {

  UtilService.wrapCb(Organization.findById(req.params.organizationId), (err, organization) => {
    if (err) {
      server.log.error('Error getting organization', err);
      res.status(500).json(err);
    }

    res.send(organization);
  });
};

// Route: post /organizations
OrganizationController.create = (req, res) => {
  UtilService.wrapCb(Organization.create(req.body), (err, organization) => {
    if (err) {
      server.log.error('Error create organization', err);
      res.status(500).json(err);
    }

    res.send(organization);
  });
};




// Route: post /organizations/admin
OrganizationController.launchinstance = (req, res) => {
let params = req.body;
console.log('This is at the launch instances');
UtilService.wrapCb(Instance.create(params), (err, instance) => {
    if (err) {
      server.log.error('Error create cluster', err);
      res.status(500).json(err);
    }
    res.send(instance);
});
console.log("at the server side constroller for start no of instances");
};










// Route: post /organizations/admin
OrganizationController.startcluster = (req, res) => {
let params = req.body;
console.log('This is at the start cluster controller',params);
UtilService.wrapCb(Cluster.create(params), (err, cluster) => {
    if (err) {
      server.log.error('Error create cluster', err);
      res.status(500).json(err);
    }
    res.send(cluster);
});
console.log("at the server side constroller for start cluster");
console.log("cluster access :",params.access);
console.log("cluster secret :",params.secret);

shell.exec('/usr/src/app/api/controllers/scripts/startcluster.sh'+' '+params.access+' '+params.secret,
function (error, stdout, stderr) {
     console.log('This is inside shell script function');
       if (error !== null) {
              console.log('exec error: ' + error);
              console.log('stdout: '+stdout);
               }

           })
};


// Route: post /organizations/admin/destroy
OrganizationController.destroycluster = (req, res) => {
let params = req.body;
console.log('This is at the destroy cluster controller',params);

UtilService.wrapCb(Cluster.create(params), (err, cluster) => {
    if (err) {
      server.log.error('Error create cluster', err);
      res.status(500).json(err);
    }
    res.send(cluster);
});

console.log("at the server side constroller for destoy cluster");
console.log("cluster access :",params.access);
console.log("cluster secret :",params.secret);

shell.exec('/usr/src/app/api/controllers/scripts/destroycluster.sh'+' '+params.access+' '+params.secret,
function (error, stdout, stderr) {
     console.log('This is inside shell script function');
       if (error !== null) {
              console.log('exec error: ' + error);
              console.log('stdout: '+stdout);
               }

           })
};



// Route: post /organizations/admin/getstatus
OrganizationController.getstatus = (req, res) => {
let params = req.body;
console.log('This is at the get status controller',params);
/*
UtilService.wrapCb(Cluster.create(params), (err, cluster) => {
    if (err) {
      server.log.error('Error create cluster', err);
      res.status(500).json(err);
    }
    res.send(cluster);
});*/

console.log("at the server side constroller for get status cluster");
console.log("cluster access :",params.access);
console.log("cluster secret :",params.secret);

shell.exec('/usr/src/app/api/controllers/scripts/getstatus.sh'+' '+params.access+' '+params.secret,
function (error, stdout, stderr) {
  console.log('This is inside shell script function');
        if (error !== null) {
             console.log('exec error: ' + error);
              console.log('stdout: '+stdout);
                           }
                         })
};

