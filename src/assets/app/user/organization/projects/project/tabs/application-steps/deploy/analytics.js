angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployAnalyticsCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

  })

app.directive('iframeDirective', ['$sce', function($sce) {
  return {
    restrict: 'E',
    template: '<iframe scrolling="no" src="{{ mysite1 }}" frameborder="0" allowfullscreen></iframe>',
    link: function(scope) {
      scope.trustedUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/dQw4w9WgXcQ");
      scope.mysite1=$sce.trustAsResourceUrl("http://a19c8f112658811e795490e57546ef20-2144173511.us-east-1.elb.amazonaws.com:5601/app/kibana#/dashboard/New-Dashboard?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-15m,mode:quick,to:now))&_a=(filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(%27@timestamp%27,tag,source,_id,_index),id:New-Saved-Search,panelIndex:1,row:1,size_x:9,size_y:4,sort:!(%27@timestamp%27,desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:%27*%27)),title:%27New%20Dashboard%27,uiState:())");
i
      scope.mysite=$sce.trustAsResourceUrl("https://api.deploybytes.com?embed=true&username=admin&password=EwyYppd81PjH7iYgGM8nNi8gHGkGh4jT/api/v1/proxy/namespaces/kube-system/services/kibana-logging/goto/9efb4a8216d5d26005312f0dd66457a9")}


  }
}]);

