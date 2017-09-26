angular.module('app.user.organization.projects.project.applications.logs',['socket.io'])
 .config(function ($socketProvider) {
    $socketProvider.setConnectionUrl('http://ec2-34-229-202-25.compute-1.amazonaws.com:5001/')
})

//.controller('OrganizationProjectApplicationDeployLogsCtrl',['$scope','socketio',function($scope, Restangular, $timeout, $state, application, deployImages,socketio) {
.controller('OrganizationProjectApplicationDeployLogsCtrl',function($scope, Restangular, $timeout, $state, application, deployImages,$socket) {
  /* if (!$scope.deployGlobal || !$scope.deployGlobal.deployed) {
    swal('ERROR', 'Please finish first tab', 'error');
    $state.go('^.images');
  }*/
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


/*
.factory('socketio', ['$rootScope', function ($rootScope) {
  'use strict';
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}])*/



























/*
angular.module('app.user.organization.projects.project.applications')

  .config(function ($socketProvider) {
  $socketProvider.setConnectionUrl('http://192.168.99.100');
})

.controller('OrganizationProjectApplicationDeployLogsCtrl',function($scope, Restangular, $timeout, $state, application, deployImages, $socket) {
  $socket.on('msg', function (msg) {
    $scope.con = msg;
  })

  console.log('Printing msgs from controller logs.js');
  $socket.on('msg',function (msg) {
    $scope.con=msg;
  });
  $socket.on('echo', function (data) {
    $scope.serverResponse = data;
    //$scope.con="this is message from consol";
  });
  $scope.emitBasic = function emitBasic() {
    console.log('logs.js: echo event emited from server');
    console.log('data to send',$scope.dataToSend )
    $socket.emit('echo', $scope.dataToSend);
    $scope.dataToSend = '';
    //$scope.con="this is message from consol";
  };
  $scope.emitACK = function emitACK() {
    $socket.emit('echo-ack', $scope.dataToSend, function (data) {
      $scope.serverResponseACK = data;
    });
    $scope.dataToSend = '';
  };



});
*/




/*
angular.module('app.user.organization.projects.project.applications',['socket.io'])
  .config(function (socketProvider) {
    socketFactoryProvider.ioSocket(io.connect('/some/path'));
  }).controller('OrganizationProjectApplicationDeployLogsCtrl',function ($scope, Restangular, $timeout, $state, application, deployImages,$socket) {
  if (!$scope.deployGlobal || !$scope.deployGlobal.deployed) {
    swal('ERROR', 'Please finish first tab', 'error');
    $state.go('^.images');
  }
  $socket.on('msg',function (msg) {
    $scope.con=msg;
  });

});
*/
