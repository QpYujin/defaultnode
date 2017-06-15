angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployAnalyticsCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

  })

app.directive('iframeDirective', ['$sce', function($sce) {
  return {
    restrict: 'E',
    template: '<iframe scrolling="no" src="{{ mysite1 }}" frameborder="0" allowfullscreen></iframe>',
    link: function(scope) {
      scope.trustedUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/dQw4w9WgXcQ");
      scope.mysite1=$sce.trustAsResourceUrl("https://api.deploybytes.com/api/v1/proxy/namespaces/kube-system/services/kibana-logging/goto/64967e6889bfc2603ece9683e9663316")
      scope.mysite=$sce.trustAsResourceUrl("https://api.deploybytes.com?embed=true&username=admin&password=EwyYppd81PjH7iYgGM8nNi8gHGkGh4jT/api/v1/proxy/namespaces/kube-system/services/kibana-logging/goto/9efb4a8216d5d26005312f0dd66457a9")}


  }
}]);

