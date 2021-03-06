angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationDeployCtrl', function ($scope, Restangular, $timeout, $state, application, deployImages) {
  $scope.images = deployImages && deployImages.rows;
  
  $scope.deployImage = function () {
    if (!$scope.deployGlobal.selectedImage) {
      swal('ERROR', 'You have to select an image first', 'error');
      return;
    }
    if (!$scope.service) {
      swal('ERROR', 'Please select server type', 'error');
    }
    if ($scope.service == 'external' && !$scope.port) {
      swal('ERROR', 'Please enter the port', 'error');
      return;
    }
    $scope.deployGlobal.deployed = true;

    $scope.global.deploymentStatus = 'Deploying';
    $state.go('^.logs');

     $timeout(function () {
      $scope.deployGlobal.logs += 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n';
    }, 2000);
    $timeout(function () {
      $scope.deployGlobal.logs += 'Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,\n';
    }, 3000);
    $timeout(function () {
      $scope.deployGlobal.logs += 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n';
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