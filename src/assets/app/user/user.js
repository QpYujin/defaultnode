angular.module('app.user', [
  'app.user.organization'
])


.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function ($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);
    $stateProvider.state('user', {
      url: '/user/:userId',
      //url: '/user/',
      //params : { userId : null },
      title: 'Home',
      abstract: true,
      views: {
        'main':{
          templateUrl: 'app/user/user.tpl.jade',
          controller: function ($rootScope, $scope, $state, $location) {

            // $scope.$on('$stateChangeStart', function ($event, fromState, fromParams) {
            //     $rootScope.loading = true;
            //     if (fromParams.projectId) {
            //         $rootScope.sidebarClosed = true;
            //     }
            //     else {
            //         $rootScope.sidebarClosed = false;
            //     }
            //     // $location.url($location.path());
            // })
            // $scope.$on('$stateChangeSuccess', function () {
            //     $rootScope.loading = false;
            //     $rootScope.hasSidebar = false;
            //     $location.url('');
            // });

            // $scope.$on('closeSidebar', function () {
            //     $rootScope.sidebarClosed = true;
            // })
          }
        }
      },
      resolve: {
        userProfile: function (Restangular, $stateParams, $rootScope, $state) {
          return Restangular.one('users', String($stateParams.userId))
            .get()
            .then(function (profile) {
              $rootScope.profile = angular.copy(profile);
              return profile;
            });
        }
      }
    })
  }])
