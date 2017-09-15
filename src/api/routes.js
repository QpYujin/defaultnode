/**
 * Setting up routes for app, express style routing
 * Created by tphuocthai on 3/19/16.
 */
const express = require('express');
const passport = require('passport');

module.exports = function(app) {

  app.get('', AuthController.redirectToLogin);
  app.get('/login', AuthController.login);
  app.get('/register', AuthController.renderRegister);
  app.get('/logout', AuthController.logout);
  app.get('/profile', AuthController.ensureAuth, UserController.profile);
  app.get('/auth/:provider', AuthController.provider);
  app.get('/auth/:provider/callback', AuthController.callback);
  app.post('/auth/local', AuthController.callback);
  app.post('/api/auth/jwt', AuthController.jwtLogin);
  app.post('/api/register', AuthController.register);

  app.get('/api/confirm/:token', TokenController.verifyEmail);
  app.post('/api/forgot-password', TokenController.forgotPassword);
  app.post('/api/reset-password/:token', TokenController.resetPassword);
  
  //Newly added 
  app.get('/api/buildInfo',BuildInfoController.getInfo);

  let apiRoutes = express.Router();
  apiRoutes.use(AuthController.ensureAuth);


  // Get user profile
  apiRoutes.get('/user/:userId', UserController.getProfile);

  // Organizations
  apiRoutes.get('/organizations/:organizationId', OrganizationController.findOne);
  apiRoutes.post('/organizations', OrganizationController.create);

  // Projects
  apiRoutes.get('/organizations/:organizationId/projects/:projectId', ProjectController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId', ProjectController.update);
  apiRoutes.get('/organizations/:organizationId/projects', ProjectController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects', ProjectController.create);

  // Project ImageRepository
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/image-repos/:imageId', ImageRepositoryController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/image-repos/:imageId', ImageRepositoryController.update);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/image-repos', ImageRepositoryController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/image-repos', ImageRepositoryController.create);

   // Project SourceManagement
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/source-managements/:repoId', SourceManagementController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/source-managements/:repoId', SourceManagementController.update);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/source-managements', SourceManagementController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/source-managements', SourceManagementController.create);

  // Project CloudProvider
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/cloud-providers/:cloudId', CloudProviderController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/cloud-providers/:cloudId', CloudProviderController.update);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/cloud-providers', CloudProviderController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/cloud-providers', CloudProviderController.create);

  // Applications
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications', ApplicationController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications', ApplicationController.create);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId', ApplicationController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId', ApplicationController.update);
  
  //new route added for get and post all deployments for service model
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/12', ApplicationController.newdeployApi);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/deployments', DeployController.create);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/deployments', DeployController.findAll);



   // Application Releases
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/releases', ReleaseController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/releases', ReleaseController.create);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/releases/:releaseId', ReleaseController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/releases/:releaseId', ReleaseController.update);

   // Build Images
  //newly added without stage
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/build-images', BuildImageController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/build-images', BuildImageController.create);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/build-images/:buildImageId', BuildImageController.findOne);



  //apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/build-images', BuildImageController.findAll);
  //apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/build-images', BuildImageController.create);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/build-images/:buildImageId', BuildImageController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/build-images/:bunpm startildImageId', BuildImageController.update);


  // Images Releases newly added without stage
  //apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/images', ImageController.findAll);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/images', ImageController.findAll);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/images', ImageController.create);
  //apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/images', ImageController.create);
  apiRoutes.get('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/images/:imageId', ImageController.findOne);
  apiRoutes.post('/organizations/:organizationId/projects/:projectId/applications/:applicationId/:stage/images/:imageId', ImageController.update);



  // Builds
  apiRoutes.get('/organizations/:organizationId/builds', BuildController.findAllInOrg)
  apiRoutes.get('/organizations/:organizationId/applications/:applicationId/builds', BuildController.findAll);
  apiRoutes.post('/organizations/:organizationId/applications/:applicationId/builds', BuildController.create);
  apiRoutes.get('/organizations/:organizationId/builds/:buildId', BuildController.findOne);
  apiRoutes.post('/organizations/:organizationId/applications/:applicationId/builds/:buildId', BuildController.update);

  // Organization Membership
  apiRoutes.post('/organization-memberships', OrganizationMembershipController.create);


  apiRoutes.get('/messages', MessageController.findAll);
  apiRoutes.get('/messages/:id', MessageController.findOne);
  apiRoutes.get('/users/:userId/messages', MessageController.findByUser);
  apiRoutes.post('/messages', MessageController.create);
  apiRoutes.put('/messages/:id', MessageController.update);

  apiRoutes.get('/messages/:messageId/comments', CommentController.findAll);
  apiRoutes.post('/messages/:messageId/comments', CommentController.create);

  apiRoutes.get('/users/astrologers', UserController.getAstrologers);
  apiRoutes.put('/users/:id', UserController.updateUser);
  apiRoutes.put('/users/:id/change-password', UserController.changePassword);

  app.use('/api/', apiRoutes);

  app.get('/*.json', IndexController.proxy);
  app.get('/*', AuthController.ensureAuth, IndexController.userhome);
};
