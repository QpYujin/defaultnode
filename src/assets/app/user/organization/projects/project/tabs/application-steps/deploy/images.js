angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationDeployCtrl', function ($scope, Restangular, $stateParams,$timeout, $state, application, deployImages) {
  $scope.images = deployImages && deployImages.rows;

  $scope.deployImage = function () {
    if (!$scope.deployGlobal.selectedImage) {
      swal('ERROR', 'You have to select an image first', 'error');
      return;
    }

    /*if (!$scope.service) {
      swal('ERROR', 'Please select server type', 'error');
      return;
    }

    if ($scope.service == 'external' && !$scope.service.domain) {
      swal('ERROR', 'Please enter the port', 'error');
      return;
    }*/

     
    else{
    
    console.log('This is select Image ID',$scope.deployGlobal.selectedImage.build.uuid)
    console.log('This is reponame',$scope.deployGlobal.selectedImage.build.repoName);
    var link= 'kokyj93/'+$scope.deployGlobal.selectedImage.build.repoName;
    console.log('This is complete link',link);
    console.log('This is application name',$scope.global.application.name)
    console.log('This is application port',$scope.deployGlobal.selectedImage.build.port)

    Restangular
      .one('organizations', String($stateParams.organizationId))
      .one('projects', $stateParams.projectId)
      .one('applications', $stateParams.applicationId)
      .one('deployments')
      .post('',
      	{
       		appname: $scope.global.application.name,
       		namespace:$scope.global.application.name,
       		port:$scope.deployGlobal.selectedImage.build.port,
       		domain:$scope.global.application.name,
       		dockerimage:link,
      	}

	).then(function () {

    	$scope.deployGlobal.deployed = true;
	
    	$scope.global.deploymentStatus = 'Deploying';
    	$state.go('^.logs');

     	$timeout(function () {
      	$scope.deployGlobal.logs += 'Succssfully configured deploybytes with your docker hub repository....\n';
   	 }, 2000);
    	$timeout(function () {
      	$scope.deployGlobal.logs += 'Initializing Dockerhub repository.....\n';
   	 }, 3000);
    	$timeout(function () {
      	$scope.deployGlobal.logs += 'Configuring DNS for github repository.........'+$scope.deployGlobal.selectedImage.build.repoName+'\n';
   	 }, 3500);
    	$timeout(function () {
     	 $scope.deployGlobal.logs += 'Locating space for deployment :'+$scope.global.application.name+'\n';
   	 }, 5000);
    	$timeout(function () {
      	$scope.deployGlobal.logs += 'Processing deployment ..\n';
   	 }, 8000);
	
	$timeout(function () {
      	$scope.global.deploymentStatus = '';
    	}, 10000);
   	
   	 })

   }//end of else

  }
})
