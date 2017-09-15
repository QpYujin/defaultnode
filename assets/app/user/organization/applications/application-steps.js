angular.module('app.user.organization.applications.application', [])
// .config(function ($stateProvider) {
//   $stateProvider.state('user.organization.applications.application.config', {
//     url: '/config',
//     title: 'Config',
//     hideTitle: true,
//     views: {
//       'stepContent': {
//         templateUrl: 'app/user/organization/applications/single-application.tpl.jade',
//         controller: 'OrganizationApplicationConfigCtrl'
//       }
//     },
//   });
//   $stateProvider.state('user.organization.applications.application.log', {
//     url: '/log',
//     title: 'Log',
//     hideTitle: true,
//     views: {
//       'stepContent': {
//         templateUrl: 'app/user/organization/applications/steps/log.tpl.jade',
//         controller: 'OrganizationApplicationLogCtrl'
//       }
//     },
//   });
//   $stateProvider.state('user.organization.applications.application.summary', {
//     url: '/summary',
//     title: 'Summary',
//     hideTitle: true,
//     views: {
//       'stepContent': {
//         templateUrl: 'app/user/organization/applications/steps/summary.tpl.jade',
//         controller: 'OrganizationApplicationSummaryCtrl'
//       }
//     },
//   })
// })

// .controller('ApplicationStepsCtrl', function ($scope, $stateParams, $timeout, application, Restangular, StaticParams, $q, deploymentService) {
//   // $scope.rootStateUrl = application.isBuild ? 'user.organization.builds.build' : 'user.organization.applications.application';
//   $scope.rootStateUrl = 'user.organization.projects.project.applications.application';
//   $scope.steps = [
//     {
//       title: 'Config',
//       url: 'config'
//     },
//     {
//       title: 'Build',
//       url: 'build'
//     },
//     {
//       title: 'Summary',
//       url: 'summary'
//     }

//   ];
//   $scope.global = {
//     application: application
//   }
  
//   $scope.global.deployApp = function () {
//     $scope.deploymentHasError = false;
//     if (deploymentService.inProgressBuilds.length >= 5) {
//       swal('ERROR', 'There are 5 deploying applications, please wait', 'error');
//       return;
//     }
//     $q.all([saveConfig(), addNewBuild()])
//       .then(function () {
//         if (!$scope.deploymentHasError) {
//           doDeploy().then(function () {
//           })
//         }
//       // addProgressBuild($scope.global.newBuild);
//     })
//   }  

//   var addProgressBuild = function (build) {
//     var newBuild = angular.copy(build);
//     deploymentService.addBuild(newBuild);
//     $timeout(function () {
//       deploymentService.removeBuild(newBuild);
//     }, 10000);
//   }

//   $scope.updateApplication = function () {
//     saveConfig().then(function () {
//       $scope.deploymentStatus = '';
//       swal('DONE', 'Application details have been updated', 'success');
//     });
//   }
//   var paramsList = _.map(StaticParams.applicationFields, 'field');
//   var doDeploy = function () {
//     deploymentService.addBuild(angular.copy($scope.global.newBuild));
//     $scope.deploymentStatus = 'Deploying App';

//     var params = _.pick($scope.global.application, paramsList);
//     params.buildUUID = $scope.global.newBuild.uuid;

//     return Restangular.allUrl('deployment', 'http://ec2-54-243-25-248.compute-1.amazonaws.com:3000/deploy')
//       .customPOST(params, '')
//       .then(function (result) {
//         $scope.global.serverLogs = result;
//         $scope.deploymentStatus = '';
//         deploymentService.removeBuild(angular.copy($scope.global.newBuild));
//         updateBuild();
//         return result;
//       }, function () {
//         swal('ERROR', 'There is an error when deploying app.', 'error');
//         $scope.deploymentStatus = '';
//         deploymentService.removeBuild(angular.copy($scope.global.newBuild));
//       });
//   }

//   var saveConfig = function () {
//     $scope.deploymentStatus = 'Saving App Config';
//     return Restangular.one('organizations', $stateParams.organizationId)
//       .one('applications', $stateParams.applicationId)
//       .post('', $scope.global.application)
//       .then(function (updatedApp) {
//         return updatedApp;
//       }, function () {
//         swal('ERROR', 'There is an error when updating app config. Please check the paras and try again', 'error');
//         $scope.deploymentStatus = '';
//         $scope.deploymentHasError = true;
//       });
//   }

//   var addNewBuild = function () {
//     var params = angular.copy($scope.global.application);
//     params.uuid = undefined;
//     return Restangular.one('organizations', $stateParams.organizationId)
//       .one('applications', $stateParams.applicationId)
//       .post('builds', params)
//       .then(function (newBuild) {
//         $scope.global.newBuild = newBuild;
//       }, function () {
//         swal('ERROR', 'There is an error when creating build. Please try again', 'error');
//         $scope.deploymentHasError = true;
//       })
//   }

//   var updateBuild = function () {
//     if ($scope.global.newBuild) {
//       return Restangular.one('organizations', $stateParams.organizationId)
//       .one('applications', $stateParams.applicationId)
//       .one('builds', $scope.global.newBuild.uuid)
//       .post('', {
//         log: $scope.global.serverLogs
//       })
//     }
//   }
// })

// .controller('OrganizationApplicationConfigCtrl', function ($scope, application, StaticParams) {
//   console.log('aaaa');
//   $scope.application = $scope.global.application;
//   $scope.fields = StaticParams.applicationFields;
// })

// .controller('OrganizationApplicationBuildCtrl', function ($scope, application, StaticParams) {
// })

// .controller('OrganizationApplicationSummaryCtrl', function ($scope, application, StaticParams) {
// });


.controller('ApplicationStepsCtrl', function ($scope, $stateParams, $timeout, application, Restangular, StaticParams, $q, deploymentService) {
  // $scope.rootStateUrl = application.isBuild ? 'user.organization.builds.build' : 'user.organization.applications.application';
  $scope.appGlobal = {};
  $scope.rootStateUrl = 'user.organization.projects.project.applications.application';
  $scope.steps = [
    {
      title: 'Config',
      url: 'config'
    },
    {
      title: 'Add Image',
      url: 'add-image'
    },
    {
      title: 'Build History',
      url: 'build-history'
    },
    // {
    //   title: 'Deploy',
    //   url: 'deploy'
    // }
  ];
})

.controller('OrganizationApplicationConfigCtrl', function ($scope, application, StaticParams) {
 
})

.controller('OrganizationApplicationBuildCtrl', function ($scope, $stateParams, $timeout, application, images, StaticParams, Restangular, deploymentService) {
  $scope.build = {};
  $scope.releases = application.releases;
  $scope.currentSourceManagement = _.find($scope.global.repos, function (item) {
    return item.uuid = application.sourceManagementId;
  });


  var getImages = function () {
    Restangular.one('organizations', $stateParams.organizationId)
      .one('projects', $stateParams.projectId)
      .one('applications', $stateParams.applicationId)
      .one('build-images')
      .get()
      .then(function (images) {
        $scope.images = images.rows;
      })
  }
  getImages();

  var getGitHubRepo = function (owner) {
    return Restangular.allUrl('get-repo', 'https://api.github.com/users/')
      .one(owner).one('repos').get();
  }

  var getGitHubBranch = function (owner, repo) {
    return Restangular.allUrl('get-branch', 'https://api.github.com/')
      .one('repos').one(owner)
      .one(repo).one('branches').get();
  }



  if ($scope.currentSourceManagement) {
    $scope.build.sourceManagementUrl = $scope.currentSourceManagement.url;
    var pathArray = $scope.currentSourceManagement.url.split('/');
    $scope.sourceManagementOwner = pathArray[pathArray.length-1];
    getGitHubRepo($scope.sourceManagementOwner).then(function (repos) {
      $scope.repos = repos;
    })
  }

  $scope.changeRepo = function () {
    getGitHubBranch($scope.sourceManagementOwner, $scope.build.sourceManagementRepo)
      .then(function (branches) {
        $scope.branches = branches;
        
      })
  }

  $scope.updateImage = function () {
    if ($scope.build.uuid) {

    }
    else {
      $scope.global.deploymentStatus = 'Adding new image';
      Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
        .one('build-images')
        .post('', $scope.build)
        .then(function () {
          getImages();
          $scope.showLogs = true;
          $scope.logs = '';


          // Will be removed
          $timeout(function () {
            $scope.logs += 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n';
          }, 2000);
          $timeout(function () {
            $scope.logs += 'Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,\n';
          }, 3000);
          $timeout(function () {
            $scope.logs += 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n';
          }, 3500);
          $timeout(function () {
            $scope.logs += 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged\n';
          }, 5000);
          $timeout(function () {
            $scope.logs += ' It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages\n';
          }, 7000);

          $scope.global.deploymentStatus = 'Cloning code';
          $timeout(function () {
            $scope.global.deploymentStatus = '';
            swal('DONE', '', 'success');
            $scope.build = {
              sourceManagementUrl: $scope.currentSourceManagement.url
            }
            $scope.showLogs = false;
          }, 10000)
        }, function () {
          $scope.global.deploymentStatus = '';
          swal('ERROR', 'This version is existed.', 'error');
        })
    }
  }

  $scope.deploy = function (image) {
    $scope.global.deploymentStatus = 'Deploying';
    deploymentService.addBuild(image);
    image.blocked = true;
    image.name = image.version;
    $timeout(function () {
      $scope.global.deploymentStatus = '';
      deploymentService.removeBuild(image);
      image.blocked = false;
    }, 10000);
  }

})

.controller('OrganizationApplicationSummaryCtrl', function ($scope, application, StaticParams) {
});