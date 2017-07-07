angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployDeploymentsCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

     var getclusters = function () {
      Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
       // .one($stateParams.stage)
        .one('deployments')
        .get()
        .then(function (cluster) {
          console.log("This is from the client side function for .get call");
          console.log('successfully getting all deployments');
          $scope.clusters = cluster.rows;
          console.log(cluster.rows[0].servicename);
          console.log(cluster.rows[0].serviceyaml);

        })

     }
    getclusters();

    $scope.deployservice = function () {
      if (!$scope.deployGlobal.selectedImage) {
        swal('ERROR', 'You have to select an image first', 'error');
        return;
      }

      $scope.deployGlobal.deployed = true;

      $scope.global.deploymentStatus = 'Deploying';
      $state.go('^.logs');

      $timeout(function () {
        $scope.deployGlobal.logs += 'Succssfully configured deploybytes with your docker hub repository....\n';
      }, 2000);
      $timeout(function () {
        $scope.deployGlobal.logs += 'Initializing Dockerhub repository.....,\n';
      }, 3000);
      $timeout(function () {
        $scope.deployGlobal.logs += 'Configuring clusters....\n';
      }, 3500);
      $timeout(function () {
        $scope.deployGlobal.logs += 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged\n';
      }, 5000);
      $timeout(function () {
        $scope.deployGlobal.logs += ' It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages\n';
      }, 7000);

      $timeout(function () {
        $scope.global.deploymentStatus = '';
      }, 10000);

    }



  })



