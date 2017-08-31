angular.module('app.user.organization.admin', [])
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.state('user.organization.admin', {
      url: '/admin',
      title: 'admin',
      views: {
        'organization@user.organization': {
          templateUrl: 'app/user/organization/admin/admin.tpl.jade',
          controller: 'OrganizationProjectAdminCtrl'
        }
      }

      /*resolve: {
        projects: function (Restangular, $stateParams) {
          return Restangular
            .one('user',$stateParams.userId)
            .one('organizations', $stateParams.organizationId)
            .one('admin').get()
        }
      }*/
    })
  .controller('OrganizationProjectAdminCtrl', function ($scope, StaticParams, breadcrumbItems, projects, projectService, globalUtils) {
    console.log('start cluster admin controller client side')
  })
