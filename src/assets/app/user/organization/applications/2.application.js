//var defaultdep="default value at deployment";
//var defaultser="default value at service";

angular.module('app.user.organization.applications')
.controller('SingleApplicationCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular, application, StaticParams,$timeout) {
  $scope.gitProviders = ['git', 'bitbucket'];
  $scope.application = application ? angular.copy(application) : {};


  if ($scope.application.uuid) {
    $state.current.title = $scope.application.name;
  }
  $scope.steps = []
  $scope.regions = StaticParams.regions;
  $scope.instanceTypes = _.map(StaticParams.instanceTypes, function (item) {
    return {
      id: item,
      name: item
    }
  });

  $scope.fields = StaticParams.applicationFields;


  $scope.updateApplication = function () {
    if ($scope.application.uuid) {
      Restangular.one('organizations', String($stateParams.organizationId))
        .one('projects', $stateParams.projectId)
        .one('applications', $scope.application.uuid)
        .post('', $scope.application)
        .then(function () {
          swal('DONE','','success');
        });
    }
    else {
      Restangular.one('organizations', String($stateParams.organizationId))
        .one('projects', $stateParams.projectId)
        .post('applications', $scope.application)
        .then(function () {
          swal('DONE', '', 'success');
          $state.go('^', {}, {reload: true});
        })
    }
  }


  $scope.newdeployApi = function () {
    console.log("This is from the client side function for cluster deploy api",$scope.cluster.namespace);
    //shell.exec('/home/ubuntu/build_script/deploy.sh');
    //$scope.cluster.deploymentyaml=defaultdep;
    Restangular
      .one('organizations', String($stateParams.organizationId))
      .one('projects', $stateParams.projectId)
      .one('applications', $scope.application.uuid)
      .one('12')
      .post('', $scope.cluster)
      .then(function () {
        swal('DONE', 'This will got to node script to run cluster deploy!', 'success');
        $state.go('^', {}, {reload: true});
      })
  }

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
        //$state.go('^.logs', {}, {reload: true});

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


      })
  }



})
