angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployAnalyticsCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

  })

app.directive('iframeDirective', ['$sce', function($sce) {
  return {
    restrict: 'E',
    template: '<iframe scrolling="no" src="{{ mysite1 }}" frameborder="0" allowfullscreen></iframe>',
    link: function(scope) {
      scope.trustedUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/dQw4w9WgXcQ");
      scope.mysite1=$sce.trustAsResourceUrl("http://a80f98504670f11e7ad4a0e80d0343f2-656552547.us-east-1.elb.amazonaws.com:5601/app/kibana#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-15m,mode:quick,to:now))&_a=(columns:!(_source),index:%27logstash-*%27,interval:auto,query:(query_string:(analyze_wildcard:!t,query:%27*%27)),sort:!(%27@timestamp%27,desc))");

      scope.mysite=$sce.trustAsResourceUrl("https://api.deploybytes.com?embed=true&username=admin&password=EwyYppd81PjH7iYgGM8nNi8gHGkGh4jT/api/v1/proxy/namespaces/kube-system/services/kibana-logging/goto/9efb4a8216d5d26005312f0dd66457a9")}


  }
}]);

