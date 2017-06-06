//var defaultdep="default value at deployment";
//var defaultser="default value at service";

angular.module('app.user.organization.applications')
.controller('SingleApplicationCtrl', function ($rootScope, $scope, $state, $stateParams, $location, Restangular, application, StaticParams) {
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
    console.log("This is from the client side function for new service",$scope.service.appname);
    console.log("This is from the client side function for new service",$scope.service.namespace);
    console.log("Port : ",$scope.service.port)
    Restangular
      .one('organizations', String($stateParams.organizationId))
      .one('projects', $stateParams.projectId)
      .one('applications', $scope.application.uuid)
      .one('13')
      .post('', $scope.service)
      .then(function () {
        swal('DONE', 'Service.yaml created', 'success');
        //$state.go('^', {}, {reload: true});
      })
  }





})
