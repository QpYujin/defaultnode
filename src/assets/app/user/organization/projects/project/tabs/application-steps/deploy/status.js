angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployStatusCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

  })

app.directive('iframeDirective1', ['$sce', function($sce) {
  return {
    restrict: 'E',
    template: '<iframe scrolling="no" src="{{ mysite2 }}" frameborder="0" allowfullscreen></iframe>',
    link: function(scope) {
     // scope.trustedUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/dQw4w9WgXcQ");
      scope.mysite2=$sce.trustAsResourceUrl("http://a8cbd91b2658711e795490e57546ef20-1674572602.us-east-1.elb.amazonaws.com:8500/ui/#/dc1/services");
    } 

  }
}]);

