angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationDeployLogsCtrl', function ($scope, Restangular, $stateParams, $timeout, $state, application, deployImages) {

  /*if (!$scope.deployGlobal || !$scope.deployGlobal.deployed) {
    swal('ERROR', 'Please finish first tab', 'error');
    $state.go('^.images');
  }*/

   var getlogs = function () {
      Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
        //.one('build-images')
        .one('logs')
        .get()
        .then(function (msg) {
          console.log("This is from the client side log function for .get call");
          console.log('.then function get call');
          $scope.logs= msg;
        })

     }
    getlogs();	

});
