angular.module('app.user.organization', [
  'app.user.organization.projects',
  'app.user.organization.applications',
  'app.user.organization.builds',
  'app.user.organization.admin'
])

.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function ($stateProvider, $locationProvider, $urlRouterProvider) {


    $stateProvider.state('user.organization',
      {
      url: '/organizations/:organizationId',
      //params : { organizationId : null },
      title: 'Organizations',
      views: {
        'user@user':{
          templateUrl: 'app/user/organization/organization.tpl.jade',
           controller: function ($rootScope, $scope, $state, $location, currentOrganization, breadcrumbItems)
              {
                  var getStateTitle = function (title) {
                  if (title) {
                      return typeof title === 'function' ? title() : title;
                  }
                  return '';

                    /*
                    breads['user.organization'] = [
                      {text: userOrg.organization ? userOrg.organization.name : "No Organization", state: "user.organization"}
                    ];
                    $scope.organizationId = organizationId;*/

               }




            breadcrumbItems.items = [
              {
                title: 'Organization',
                url: 'user.organization'
              }
            ]

            $scope.breadcrumbs = breadcrumbItems;

            $scope.$on('$stateChangeStart', function () {
              $rootScope.loading = true;
            })

            $scope.$on('$stateChangeSuccess', function () {
              $rootScope.loading = false;
              $scope.addOnButton = $state.current.addOnButton || {};
              $scope.hideTitle = $state.current.hideTitle;
            });

            $scope.$on('addBreadcrumbItem', function (event, item) {
              $scope.breadcrumbs.push(item);
            })

            $scope.getBreadcrumbs = function (parent) {
              if (parent) {
                // var parent = state.$current.parent;
                $scope.breadcrumbs.push({
                  title: getStateTitle(parent.self.title),
                  url: parent.self.name,
                  params: parent.params
                });
                $scope.getBreadcrumbs(parent.parent);
              }
              else {
                return;
              }
            }

          }
        }
      },

      resolve: {
        currentOrganization: function (Restangular, $state, $stateParams) {
          return Restangular.one('organizations', String($stateParams.organizationId))
            .get()
            .then(function (org) {
              // $state.current.title = org.name;
              return org;
            });
        }
      }
    })
  }])









  .service('breadcrumbItems', function () {
    return {
      items: []
    }
  })


