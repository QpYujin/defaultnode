angular.module('app.directives')
.directive('collapseBox', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@',
      buttons: '='
    },
    templateUrl: 'common/directives/collapse-box/collapse-box.tpl.jade',
    link: function (scope, element, attrs) {
      scope.$watch('opened', function () {
        if (scope.opened == undefined) return;
        if (scope.opened) {
          angular.element(element).find('.content').slideDown();
        }
        else {
          angular.element(element).find('.content').slideUp();
        }
      });

      scope.btnClicked = function (btn) {
        btn.onClickFn && btn.onClickFn();
        scope.opened = true;
      }
    },
    controller: function ($scope) {

    }
  }
})