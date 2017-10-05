angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployDeploymentHistoryCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

  var getdeployments = function () {
      Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
       // .one($stateParams.stage)
        .one('deployments')
        .get()
        .then(function (service) {
          console.log("This is from the client side function for .get call");
          console.log('successfully getting all deployments');
          $scope.services = service.rows;
          console.log(service.rows[0].appname);
          console.log(service.rows[0].namespace);

        })

     }
    getdeployments();
})
