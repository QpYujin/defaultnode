angular.module('app.user.organization.admin',[])
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',function ($stateProvider,$locationProvider,$urlRouterProvider){
    $stateProvider.state('user.organization.admin', {
      url: '/admin',
      title: 'Admin',
      views: {
        'organization@user.organization': {
          templateUrl: 'app/user/organization/admin/admin.tpl.jade',
          controller: 'OrganizationProjectAdminCtrl'
        }
      }

      /*resolve: {
 *         projects: function (Restangular, $stateParams) {
 *                   return Restangular
 *                               .one('user',$stateParams.userId)
 *                                           .one('organizations', $stateParams.organizationId)
 *                                                       .one('admin').get()
 *                                                               }
 *                                                                     }*/
    })

   }])

  .controller('OrganizationProjectAdminCtrl', function ($scope, $stateParams,StaticParams, breadcrumbItems, globalUtils,$stateParams,Restangular) {
    console.log('Admin controller for client side cluster start');

    $scope.startcluster = function () {
    console.log("This is from the client side function for access",$scope.cluster.access);
    console.log("This is from the client side function for secret",$scope.cluster.secret);    
    Restangular
            .one('organizations', String($stateParams.organizationId))
            .one('admin')
	    .one('start')
            .post('', $scope.cluster)
            .then(function () {
        swal('DONE', 'Cluster started', 'success');
    })
   }

   $scope.destroycluster = function () {
    console.log("This is from the client side function for access",$scope.cluster.access);
    console.log("This is from the client side function for secret",$scope.cluster.secret);
    Restangular
            .one('organizations', String($stateParams.organizationId))
            .one('admin')
            .one('destroy')
            .post('', $scope.cluster)
            .then(function () {
        swal('DONE', 'Cluster destroyed successfully', 'success');
    })
   }

  $scope.getconfig = function () {
    console.log("This is from the client side function for access",$scope.cluster.access);
    console.log("This is from the client side function for secret",$scope.cluster.secret);
    Restangular
            .one('organizations', String($stateParams.organizationId))
            .one('admin')
            .one('getconfig')
            .post('', $scope.cluster)
            .then(function () {
        swal('DONE', 'Created config successfully', 'success');
    })   
}

 $scope.getstatus = function () {
    console.log("This is from the client side function for access",$scope.cluster.access);
    console.log("This is from the client side function for secret",$scope.cluster.secret);
    Restangular
            .one('organizations', String($stateParams.organizationId))
            .one('admin')
            .one('getstatus')
            .post('', $scope.cluster)
            .then(function () {
        swal('DONE', 'kubctl node creation process have started, wait for while to bring up completly ', 'success');
    })
}








})
