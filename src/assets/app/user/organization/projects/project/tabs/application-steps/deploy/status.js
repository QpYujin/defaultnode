angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployStatusCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

  })

app.directive('iframeDirective1', ['$sce', function($sce) {
  return {
    restrict: 'E',
    template: '<iframe scrolling="no" src="{{ mysite2 }}" frameborder="0" allowfullscreen></iframe>',
    link: function(scope) {
     // scope.trustedUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/dQw4w9WgXcQ");
      scope.mysite2=$sce.trustAsResourceUrl("http://a148076d1670f11e7ad4a0e80d0343f2-698800236.us-east-1.elb.amazonaws.com:8500/ui/#/dc1/services");
    } 

  }
}]);

