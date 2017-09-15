/**
 * Membership Service
 */
const moment = require('moment');
const nconf = require('nconf');

let MembershipService = module.exports = {};


/* Privious code for get users
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
*/

/*
MembershipService.getUserOrgs = (user, cb) => {
  console.log('At membership get users',user);

  Organization.create
  (
    {
      name:user.firstName,
      description:user.lastName
    }
  )
    .then((orgs) =>
  {
  console.log('Created ORGANIZATION successfully');
  console.log('This is userId',user.id);
  console.log('This is organizations ID',orgs.uuid);

  OrganizationMembership.create
  ({userId: user.id,
      organizationId:orgs.uuid})
    .then((orgs) =>
  {
    console.log('Created ORGANIZATION MEMEBER successfully');
    console.log('This is orgs',orgs)
    })

})


  OrganizationMembership.findAll({where: {userId: user.id}})
    .then((orgs) =>
    {
    console.log('At organization membership',user);
    console.log('This is orgs',orgs);

    let organizationIds = _.map(orgs, (org) => {
      console.log('This is organization IDs',org);
      return org.toJSON().organizationId;
    })
     cb(null, _.uniq(organizationIds));
     console.log("This is organizationID null",organizationIds);
     console.log("make post call for creating organization");


}).catch((err) => {
    cb(err);
  });


}*/



MembershipService.getUserOrgs = (user, cb) => {
  console.log('At membership get users',user);

  Organization.create
  (
    {
      name:user.firstName,
      description:user.lastName
    }
  )
    .then((orgs) =>
  {
  console.log('Created ORGANIZATION successfully');
  console.log('This is userId',user.id);
  console.log('This is organizations ID',orgs.uuid);

  OrganizationMembership.create
  ({userId: user.id,
      organizationId:orgs.uuid})
    .then((orgs) =>
  {
    console.log('Created ORGANIZATION MEMEBER successfully');
    console.log('This is orgs',orgs)

      OrganizationMembership.findAll({where: {userId: user.id}})
        .then((orgs) =>
        {
          console.log('At organization membership find all ',user);
          console.log('This is orgs',orgs);

        let organizationIds = _.map(orgs, (org) => {
            console.log('This is organization IDs',org);
            return org.toJSON().organizationId;
        })
        cb(null, _.uniq(organizationIds));
        console.log("This is organizationID null",organizationIds);

      }).catch((err) => {
          cb(err);
      });

})

})
  
}






