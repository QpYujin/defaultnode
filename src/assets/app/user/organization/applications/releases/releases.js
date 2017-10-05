angular.module('app.user.organization.applications')
.controller('SingleApplicationReleasesCtrl', function ($scope, $state, Restangular, application) {
  $scope.releases = application.releases;
})
.controller('SingleApplicationReleaseCtrl', function ($scope, $stateParams, $state, Restangular, application, release) {
  var newRelease = {
    name: '',
    description: '',
    releaseDate: new Date()
  };
  $scope.release = release ? angular.copy(release) : angular.copy(newRelease);

  $scope.updateRelease = function () {
    if ($scope.release.uuid) {
      Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
        .one('releases', $stateParams.releaseId)
        .post('', $scope.release)
        .then(function (addedRelease) {
          swal('DONE', '', 'success');
          _.forEach(application.releases, function (rl) {
            if (rl.uuid == $scope.release.uuid) {
              rl = angular.copy($scope.release);
            }
          })
          $state.go('^');
        })
    }
    else {
      Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
        .one('releases')
        .post('', $scope.release)
        .then(function (addedRelease) {
          application.releases.push(addedRelease);
          swal('DONE', '', 'success');
          $state.go('^');
        })
    }
  }
})