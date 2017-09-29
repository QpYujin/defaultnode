
/*angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationDeployLogsCtrl', function ($scope, Restangular, $timeout, $state, application, deployImages) {
  if (!$scope.deployGlobal || !$scope.deployGlobal.deployed) {
    swal('ERROR', 'Please finish first tab', 'error');
    $state.go('^.images');
  }
});*/




angular.module('app.user.organization.projects.project.applications.logs',['socket.io'])
 .config(function ($socketProvider) {
    $socketProvider.setConnectionUrl('http://ec2-34-229-202-25.compute-1.amazonaws.com:5001/')
})

.controller('OrganizationProjectApplicationDeployLogsCtrl',function($scope, Restangular, $timeout, $state, application, deployImages,$socket) {
 // var $socket = io.connect();
  console.log('Printing msgs from controller logs.js');
  $socket.on('msg',function (msg) {
    $scope.con=msg;
  });

  $socket.on('echo', function (data) {
     alert('value is socket.io'+data)
     $scope.serverResponse = data;
    //$scope.con="this is message from consol";
  });

  $scope.emitBasic = function emitBasic() {
    console.log('logs.js: echo event emited from server');
    console.log('data to send',$scope.dataToSend )
    $socket.emit('echo', $scope.dataToSend);
    $scope.dataToSend = '';
    //$scope.con="echo event emitted from server";
  };


  $scope.emitACK = function emitACK() {
    $socket.emit('echo-ack', $scope.dataToSend, function (data) {
      $scope.serverResponseACK = data;
    });

    $scope.dataToSend = '';
  };

})






