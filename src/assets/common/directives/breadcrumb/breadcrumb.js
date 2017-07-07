angular.module('app.directives')
.directive('breadcrumb', function () {
  return {
    restrict: 'E',
    templateUrl: 'common/directives/breadcrumb/breadcrumb.tpl.jade',
    scope: {
      items: '='
    },
    controller: function ($scope) {
      // console.log($scope.items);

    } 
  }
});