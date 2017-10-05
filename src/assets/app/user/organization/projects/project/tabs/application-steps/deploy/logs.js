angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationDeployLogsCtrl', function ($scope, Restangular, $timeout, $state, application, deployImages) {
  if (!$scope.deployGlobal || !$scope.deployGlobal.deployed) {
    swal('ERROR', 'Please finish first tab', 'error');
    $state.go('^.images');
  }
});
