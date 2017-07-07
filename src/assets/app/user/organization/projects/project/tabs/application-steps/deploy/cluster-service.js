angular.module('app.user.organization.applications')
  .controller('OrganizationProjectApplicationDeployClusterServiceCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular,application, StaticParams,$timeout) {

    $scope.newservice = function () {
      console.log("This is from the client side function for new service",$scope.cluster.serviceyaml);
      console.log("This is from the client side function for new service",$scope.cluster.servicename);
      //shell.exec('/home/ubuntu/build_script/deploy.sh');
      Restangular
        .one('organizations', String($stateParams.organizationId))
        .one('projects', $stateParams.projectId)
        .one('applications', $scope.application.uuid)
        .one('deployments')
        .post('', $scope.cluster)
        .then(function () {
          swal('DONE', 'Service.yaml created', 'success');
        //  $state.go('^.logs', {}, {reload: true});

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

        })
    }
    //newservice();

  })



