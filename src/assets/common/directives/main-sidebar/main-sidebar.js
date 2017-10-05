angular.module('app.directives')
.directive('mainSidebar', function(){
  return {
    restrict: "E",
    templateUrl: 'common/directives/main-sidebar/main-sidebar.tpl.jade',
    controller: function($rootScope, $scope, $state, Restangular, $mdSelect) {
    	$scope.$on('$stateChangeSuccess', function (event, toState) {
    		if (toState.name.indexOf('application.')==-1) {
    			$rootScope.currentApplicationName = null;
    		}
    	})
    }
  }
});