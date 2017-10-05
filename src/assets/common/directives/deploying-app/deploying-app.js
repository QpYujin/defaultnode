angular.module('app.directives')
.directive('deployingApp', function () {
  return {
    restrict: 'E',
    templateUrl: 'common/directives/deploying-app/deploying-app.tpl.jade',
    controller: function (deploymentService, $scope) {
      $scope.apps = deploymentService.inProgressBuilds;
    }
  }
});