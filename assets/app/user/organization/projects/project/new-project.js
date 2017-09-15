angular.module('app.user.organization.projects.new-project', [])
.controller('OrganizationNewProjectCtrl', function ($scope, Restangular, $state, $stateParams, StaticParams, projectService) {
  $scope.projectStaticParams = StaticParams.projectParams;
  $scope.project = {
    stack: 'node',
    environment: 'development',
    dbStack: 'rds'
  };
  $scope.addNewProject = function () {
    // Restangular.one('organizations', $stateParams.organizationId)
    //   .post('projects', $scope.project)
    //   .then(function () {
    //     swal('DONE', 'New project was added', 'success');
    //     $state.go('^');
    //   })
    projectService.updateProject($scope.project, function () {
      $state.go('^');
    });
  }
})