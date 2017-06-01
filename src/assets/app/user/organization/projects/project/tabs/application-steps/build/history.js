angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationBuildHistoryCtrl', function ($rootScope, $scope, $state, $timeout, $stateParams, $location, Restangular, application, StaticParams) {
  var getImages = function () {
    Restangular.one('organizations', $stateParams.organizationId)
      .one('projects', $stateParams.projectId)
      .one('applications', $stateParams.applicationId)
      .one($stateParams.stage)
      .one('build-images')
      .get()
      .then(function (images) {
        // _.forEach(images.rows, function (image) {
        //   var release = _.find(application.releases, function (re) {
        //     return re.uuid == image.releaseId;
        //   });
        //   var repo = _.find($scope.global.repos, function (re) {
        //     return re.uuid == image.sourceControlId;
        //   });
        //   image.release = release || {};
        //   image.repo = repo || {};
        // })
        $scope.buildImages = images.rows;
      })
  }
  getImages();
})

