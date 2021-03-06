angular.module('app.user.organization.projects.project.applications')
.controller('OrganizationProjectApplicationBuildConfigCtrl', function ($rootScope, $scope, $state, $timeout, $stateParams, breadcrumbItems, $location, Restangular, application, StaticParams) {
  var items = breadcrumbItems.items.splice(0, 4)
  items.push({
    title: $stateParams.stage,
    url: 'user.organization.projects.project.applications.application.stage.build.config'
  });
  breadcrumbItems.items = items;

  
  $scope.build = {};
  $scope.releases = application.releases;
  $scope.currentSourceManagement = _.find($scope.global.repos, function (item) {
    return item.uuid = application.sourceManagementId;
  });

  $scope.editing = false;
  
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
    $scope.build.sourceControlId = $scope.currentSourceManagement.uuid;
    var pathArray = $scope.currentSourceManagement.url.split('/');
    $scope.sourceManagementOwner = pathArray[pathArray.length-1];
    getGitHubRepo($scope.sourceManagementOwner).then(function (repos) {
      $scope.repos = repos;
    })
  }

  $scope.changeRepo = function () {
    getGitHubBranch($scope.sourceManagementOwner, $scope.build.repoName)
      .then(function (branches) {
        $scope.branches = branches;
        
      })
  }

  $scope.updateImage = function () {
    if ($scope.build.uuid) {
      $scope.global.deploymentStatus = 'Adding new image';
      var params = angular.copy($scope.build);
      params.sourceControlId = $scope.currentSourceManagement.uuid;
      params.imageRepoId = application.imageRepositoryId;
      return Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
        .one('build-images', $scope.build.uuid)
        .post('', $scope.build)
        .then(function (newBuild) {
          $scope.showLogs = true;
          $scope.logs = '';
          $scope.build.uuid = newBuild.uuid;

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
            $scope.showLogs = false;
            return newBuild;
          }, 10000)
        }, function (result) {
          if (result.data.fields && result.data.fields.version) {
            swal('ERROR', 'Version is existed, please choose another one.', 'error');
          }
          else {
            swal('ERROR', 'Please fill required fields', 'error');
          }
          $scope.global.deploymentStatus = '';
          return result;
        })
    }
    else {
      $scope.global.deploymentStatus = 'Adding new image';
      var params = angular.copy($scope.build);
      params.sourceControlId = $scope.currentSourceManagement.uuid;
      params.imageRepoId = application.imageRepositoryId;
      return Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
        .one($stateParams.stage)
        .one('build-images')
        .post('', $scope.build)
        .then(function (newBuild) {
          $scope.showLogs = true;
          $scope.logs = '';
          $scope.build.uuid = newBuild.uuid;

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
            
            $scope.showLogs = false;
            return newBuild;
          }, 10000)
        }, function (result) {
          if (result.data.fields && result.data.fields.version) {
            swal('ERROR', 'Version is existed, please choose another one.', 'error');
          }
          else {
            swal('ERROR', 'Please fill required fields', 'error');
          }
          $scope.global.deploymentStatus = '';
          return result;
        })
    }
  }


  var doPushImage = function (buildId) {
    return Restangular.one('organizations', $stateParams.organizationId)
        .one('projects', $stateParams.projectId)
        .one('applications', $stateParams.applicationId)
        .one($stateParams.stage)
        .one('images')
        .post('', {
          buildImageId: buildId,
          status: 'pending',
          tag: '',
        }).then(function () {
          swal('DONE', '', 'success');
          $scope.global.deploymentStatus = '';
        })
  }
  $scope.pushImage = function () {
    if ($scope.build.uuid) {
      doPushImage($scope.build.uuid);
    }
    else {
      swal('ERROR', 'You have to clone the code first', 'error');
      // $scope.updateImage().then(function (result) {
      //   if (!result || result.status && result.status==500) return;
      //   $scope.global.deploymentStatus = 'Pushing Image';
      //   doPushImage($scope.build.uuid);
      // })
      
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