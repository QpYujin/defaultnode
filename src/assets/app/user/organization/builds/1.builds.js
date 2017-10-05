angular.module('app.user.organization.builds', [
  'app.user.organization.builds.build'
])
.config(function ($stateProvider) {
  $stateProvider.state('user.organization.builds', {
    url: '/builds',
    title: 'Builds',
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/builds/builds.tpl.jade',
        controller: 'OrganizationBuildsCtrl'
      }
    },
    resolve: {
      builds: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('builds').get()
      }
    }
  });

  $stateProvider.state('user.organization.builds.build', {
    url: '/:buildId',
    title: 'Build Name',
    abstract: true,
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/applications/application-steps.tpl.jade',
        controller: 'BuildStepsCtrl'
      }
    },
    resolve: {
      application: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('builds', $stateParams.buildId).get().then(function (app) {
            app.isBuild = true;
            return app;
          })
      }
    }
  });
})

.controller('BuildStepsCtrl', function ($scope, $stateParams, $timeout, application, Restangular, StaticParams, $q, deploymentService) {
  $scope.rootStateUrl = application.isBuild ? 'user.organization.builds.build' : 'user.organization.applications.application';
  $scope.steps = [
    {
      title: 'Config',
      url: 'config'
    },
    {
      title: 'Logs',
      url: 'log'
    },
    {
      title: 'Summary',
      url: 'summary'
    }

  ];
  $scope.global = {
    application: application
  }

  var runTestParams = {
    'bucket_name' : 'qpairboto',
    'jmx_file_path' : 'jmx/project-bf185a07-9db4-49ed-95f5-918ff9bb2057/tarabalam_test.jmx',
    'destination_jmx_path' : 'tarabalam_test.jmx',
    'properties_file_path' : '4f1a5173-1d71-4874-b09b-c0c5149649be/user.properties',
    'destination_prop_file_path' : 'user.properties',
    'param' : '-JthreadCount=1 -JrampUp=1 -Jduration=60',
    'summariser.influx.project': $stateParams.applicationId,
    'summariser.influx.project.suite': $stateParams.buildId
  }

  $scope.global.runTest = function () {
    $scope.deploymentStatus = 'Running test';
    return Restangular.allUrl('runTest', 'http://ec2-54-89-145-153.compute-1.amazonaws.com:8080/perfDriver/v0/jmeter')
      .customPOST(runTestParams, '')
      .then(function (result) {
        $scope.deploymentStatus = '';
        $scope.global.ranTest = true;
      }, function () {
        $scope.deploymentStatus = '';
      });

  }
}).controller('OrganizationBuildsCtrl', function ($scope, builds, StaticParams) {
  $scope.builds = builds ? builds.rows : [];
  $scope.masonryOptions = StaticParams.masonryOptions;
})
