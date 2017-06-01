angular.module('app.user.organization.builds.build', [])
.config(function ($stateProvider) {
  $stateProvider.state('user.organization.builds.build.config', {
    url: '/config',
    title: 'Config',
    hideTitle: true,
    views: {
      'stepContent': {
        templateUrl: 'app/user/organization/applications/single-application.tpl.jade',
        controller: 'OrganizationApplicationConfigCtrl'
      }
    },
  });
  $stateProvider.state('user.organization.builds.build.log', {
    url: '/log',
    title: 'Log',
    hideTitle: true,
    views: {
      'stepContent': {
        templateUrl: 'app/user/organization/applications/steps/log.tpl.jade',
        controller: 'OrganizationApplicationLogCtrl'
      }
    },
  });
  $stateProvider.state('user.organization.builds.build.summary', {
    url: '/summary',
    title: 'Summary',
    hideTitle: true,
    views: {
      'stepContent': {
        templateUrl: 'app/user/organization/applications/steps/summary.tpl.jade',
        controller: 'OrganizationBuildSummaryCtrl'
      }
    },
  })
})

.controller('OrganizationBuildSummaryCtrl', function ($scope, $stateParams, application, $sce, $timeout) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.simplifyGrafana = function(event) {
    $timeout(function() {
      var iframeDoc = $(event.currentTarget.contentWindow.document);
      $(iframeDoc).find('dashnav, dashboard-search, dashboard-submenu, dash-row:first, dash-row:last, [dash-editor-view]').remove();
      var style = iframeDoc[0].createElement('style');
      style.textContent = '.panel-menu {display:none}';
      iframeDoc[0].body.appendChild(style);
      $scope.global.isLoading = false;
    }, 3000);
  };
  var suite = $stateParams.buildId;
  $scope.grafanaUrl = $scope.trustSrc('/grafana/dashboard/file/codedeploy.json' + '?from=now-30m&to=now&var-suite='+suite+'&theme=light');
})
