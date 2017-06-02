/**
 * Membership Service
 */
const moment = require('moment');
const nconf = require('nconf');

let MembershipService = module.exports = {};

MembershipService.getUserOrgs = (user, cb) => {
  OrganizationMembership.findAll({where: {userId: user.id}}).then((orgs) => {
    let organizationIds = _.map(orgs, (org) => {
      return org.toJSON().organizationId;
    })
    cb(null, _.uniq(organizationIds));
  }).catch((err) => {
    cb(err);
  });
}