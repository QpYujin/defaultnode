angular.module('app.user.organization.applications', [
  'app.user.organization.applications.application'
])
.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider.state('user.organization.applications', {
    url: '/applications',
    title: 'Applications',
    addOnButton: {
      title: 'Add new Application',
      url: 'user.organization.applications.new-application'
    },
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/applications/applications.tpl.jade',
        controller: 'OrganizationApplicationsCtrl'
      }
    },
    resolve: {
      applications: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('applications').get()
      }
    }
  });

  $stateProvider.state('user.organization.applications.new-application', {
    url: '/new-application',
    title: 'New Application',
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/applications/single-application.tpl.jade',
        controller: 'SingleApplicationCtrl'
      }
    },
    resolve: {
      application: function () {
        return null;
      }
    }
  });

  $stateProvider.state('user.organization.applications.application',
    {
    url: '/',
    params : { applicationId : null },
    title: 'Application Name',
    abstract: true,
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/applications/application-steps.tpl.jade',
        controller: 'ApplicationStepsCtrl'
      }
    },
    resolve: {
      application: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('applications', $stateParams.applicationId).get()
      }
    }
  });

})

.controller('OrganizationApplicationsCtrl', function ($scope, StaticParams, applications) {
  $scope.applications = applications.rows;
  // $scope.applications = [applications.rows[0], applications.rows[0], applications.rows[0], applications.rows[0], applications.rows[0]]
  $scope.options = StaticParams.tableOptions;
  $scope.query = StaticParams.tableQuery;
})
