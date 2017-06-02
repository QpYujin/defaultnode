angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationTestConfigCtrl', function ($scope, $timeout, application, globalUtils) {
    $scope.appGlobal.testParameters = [];
    $scope.addNewParam = function () {
      $scope.appGlobal.testParameters.push({
        id: globalUtils.generateUUID(),
        name: '',
        value: ''
      })
    }

    $scope.removeParam = function (param) {
      _.remove($scope.appGlobal.testParameters, function (p) {
        return p.id == param.id;
      })
    }

    $scope.updateConfig = function () {
      if(!$('#jmx-file').val()) {
        swal('ERROR', 'Please upload JMX file', 'error');
        return;
      }
      if (!$scope.appGlobal.testParameters.length) {
        swal('ERROR', 'Please add parameters', 'error');
        return;
      }

      var invalidParam = _.find($scope.appGlobal.testParameters, function (p) {
        return !p.name || !p.value;
      })
      if (invalidParam) {
        swal('ERROR', 'Please enter all the parameters name and value', 'error');
        return;
      }

      var paramsGroupByName = _.groupBy($scope.appGlobal.testParameters, 'name');
      var duplicatedParam = _.find(paramsGroupByName, function (p) {
        return p && p.length > 1;
      })
      if (duplicatedParam) {
        swal('ERROR', 'There are some params have same name', 'error');
        return;
      }


      $scope.global.deploymentStatus = 'Uploading JMX File';
      $timeout(function () {
        $scope.global.deploymentStatus = '';

        $scope.global.deploymentStatus = 'Testing';
        $timeout(function () {
          $scope.global.deploymentStatus = '';
        }, 10000);

      
      }, 5000);

      

    }
})