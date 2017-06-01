angular.module('app.directives')
.directive('pipeline', function () {
  return {
    restrict: 'E',
    templateUrl: 'common/directives/pipeline/pipeline.tpl.jade',
    scope: {
      data: '=?'
    },
    controller: function ($scope) {
      var dummyData = {
        release: 1,
        stages: [
          {
            name: 'build',
            status: 'failed',
            class: 'danger',
            createdAt: moment().fromNow(),
          },
          {
            name: 'deploy',
            status: 'success',
            createdAt: moment().fromNow(),
            class: 'success',
          },
          {
            name: 'dev',
            status: 'failed',
            createdAt: moment().fromNow(),
            class: 'danger',
          },
          {
            name: 'test',
            status: 'running',
            createdAt: moment().fromNow(),
            class: 'primary',
          },
          {
            name: 'performance',
            status: 'pending',
            createdAt: moment().fromNow(),
            class: 'info',
          },
          {
            name: 'production',
            status: 'pending',
            createdAt: moment().fromNow(),
            class: 'warning',
          },
        ]
      }

      $scope.data = $scope.data || dummyData;
    }
  }
});