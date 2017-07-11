/**
 * Create OrganizationController
 */

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
