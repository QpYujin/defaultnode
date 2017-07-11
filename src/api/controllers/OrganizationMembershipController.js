/**
 * Create OrganizationMembershipController
 */

let OrganizationMembershipController = module.exports = {};

// Route: get /organization-memberships/:id
OrganizationMembershipController.findOne = (req, res) => {

  UtilService.wrapCb(OrganizationMembership.findById(req.params.id), (err, membership) => {
    if (err) {
      server.log.error('Error getting membership', err);
      res.status(500).json(err);
    }

    res.send(membership);
  });
};

// Route: post /organization-memberships
OrganizationMembershipController.create = (req, res) => {
  UtilService.wrapCb(OrganizationMembership.create(req.body), (err, membership) => {
    if (err) {
      server.log.error('Error create membership', err);
      res.status(500).json(err);
    }

    res.send(membership);
  });
};

OrganizationMembershipController.findAll = (req, res) => {
  UtilService.wrapCb(OrganizationMembership.findAndCountAll({where: {
    //userId:req.params.userId,
    userId: req.params.userId,
  }}), (err, membership) => {
    if (err) {
      server.log.error('Error getting project', err);
      res.status(500).json(err);
    }
    res.send(membership);
})
}
