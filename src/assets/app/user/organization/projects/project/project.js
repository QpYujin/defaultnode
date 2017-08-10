angular.module('app.user.organization.projects.project', [
  'app.user.organization.projects.project.applications'
])
.config(function ($stateProvider) {
  $stateProvider.state('user.organization.projects.project.applications', {
    url: '/applications',
    title: 'Applications',
    hideTitle: true,
    addOnButton: {
      title: 'Configuration',
      url: 'user.organization.projects.project.config'
    },
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-applications.tpl.jade',
        controller: 'OrganizationProjectAppplicationsCtrl'
      }
    }
  });

  $stateProvider.state('user.organization.projects.project.applications.new-application', {
    url: '/new-application',
    title: 'New Application',
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/applications/single-application.tpl.jade',
        controller: 'SingleApplicationCtrl'
      }
    },
    resolve: {
      application: function () {
        return null;
      }
    }
  });

  
  $stateProvider.state('user.organization.projects.project.config', {
    url: '/config',
    title: 'Configuration',
    hideTitle: true,
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-config.tpl.jade',
        controller: 'OrganizationProjectConfigCtrl'
      }
    }
  });


  $stateProvider.state('user.organization.projects.project.config.new-repo', {
    url: '/new-repo',
    title: 'Add new Repository',
    hideTitle: true,
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-config-new-repo.tpl.jade',
        controller: 'OrganizationProjectConfigNewRepoCtrl'
      }
    },
    resolve: {
      currentRepo: function () {
        return null;
      }
    }
  });
  $stateProvider.state('user.organization.projects.project.config.repo', {
    url: '/repo/:repoId',
    title: 'Edit Repository',
    hideTitle: true,
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-config-new-repo.tpl.jade',
        controller: 'OrganizationProjectConfigNewRepoCtrl'
      }
    },
    resolve: {
      currentRepo: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId)
          .one('source-managements', $stateParams.repoId)
          .get();
      }
    }
  });

  $stateProvider.state('user.organization.projects.project.config.new-cloud', {
    url: '/new-cloud',
    title: 'Add new Cloud Provider',
    hideTitle: true,
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-config-new-cloud-provider.tpl.jade',
        controller: 'OrganizationProjectConfigSingleCloudProviderCtrl'
      }
    },
    resolve: {
      currentCloud: function () {
        return null;
      }
    }
  });
  $stateProvider.state('user.organization.projects.project.config.cloud', {
    url: '/cloud/:cloudId',
    title: 'Edit Cloud Provider',
    hideTitle: true,
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-config-new-cloud-provider.tpl.jade',
        controller: 'OrganizationProjectConfigSingleCloudProviderCtrl'
      }
    },
    resolve: {
      currentCloud: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId)
          .one('cloud-providers', $stateParams.cloudId)
          .get();
      }
    }
  });

  $stateProvider.state('user.organization.projects.project.config.new-image', {
    url: '/new-image',
    title: 'Add new Image Repository',
    hideTitle: true,
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-config-new-image.tpl.jade',
        controller: 'OrganizationProjectConfigSingleImageRepositoryCtrl'
      }
    },
    resolve: {
      currentImage: function () {
        return null;
      }
    }
  });
  $stateProvider.state('user.organization.projects.project.config.image', {
    url: '/image/:imageId',
    title: 'Edit Image Repository',
    hideTitle: true,
    views: {
      'project-content@user.organization.projects.project': {
        templateUrl: 'app/user/organization/projects/project/tabs/project-config-new-image.tpl.jade',
        controller: 'OrganizationProjectConfigSingleImageRepositoryCtrl'
      }
    },
    resolve: {
      currentImage: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId)
          .one('image-repos', $stateParams.imageId)
          .get();
      }
    }
  });

})
.controller('OrganizationProjectAppplicationsCtrl', function ($rootScope, $scope, project, breadcrumbItems, $state) {
  breadcrumbItems.items = [
    { title: 'Organization',url: 'user.organization'},
    { title: 'Projects', url: 'user.organization.projects'},
    { title: project ? project.name : 'New Project', url: 'user.organization.projects.project.applications'}
  ];
})

// Project configuration
.controller('OrganizationProjectConfigCtrl', function ($rootScope, $scope, project, $state, StaticParams, projectService) {
  
  $scope.codeManagements = [];
  $scope.global.addingNewRepo = false;

  var addCodeManagement = function () {
    $scope.global.addingNewRepo = true;
  }
  $scope.managementButtons = [
    {
      title: "Add Repo",
      onClickFn: function () {
        $state.go('.new-repo');
      }
    }
  ];
  $scope.cloudProviderButtons = [
    {
      title: "Add Cloud Provider",
      onClickFn: function () {
        $state.go('.new-cloud');
      }
    }
  ]
  $scope.imageButtons = [
    {
      title: "Add Image Repository",
      onClickFn: function () {
        $state.go('.new-image');
      }
    }
  ]

  // $scope.global.project.stack = 'node';
  // $scope.global.project.environment = 'development';
  // $scope.global.project.dbStack = 'rds';
  $scope.stacks = StaticParams.projectParams.stack;
  $scope.environments = StaticParams.projectParams.environment;
  $scope.dbStacks = StaticParams.projectParams.dbStack;
  _.forEach($scope.environments, function (item) {
    item.checked = $scope.global.project.environments.indexOf(item.name) != -1
  })
  _.forEach($scope.dbStacks, function (item) {
    item.checked = $scope.global.project.dbStacks.indexOf(item.name) != -1
  })
  
  $scope.updateProject = function () {
    var params = {}
    params.uuid = $scope.global.project.uuid;
    params.stack = $scope.global.project.stack;
    params.environment = JSON.stringify(_($scope.environments).filter(function (item) {
      return item.checked;
    }).map('name').value());
    $scope.global.project.environments = params.environment;
    params.dbStack = JSON.stringify(_($scope.dbStacks).filter(function (item) {
      return item.checked;
    }).map('name').value());
    $scope.global.project.dbStacks = params.dbStack;
    return projectService.updateProject(params);
  }
})

// Project global controller
.controller('OrganizationProjectCtrl', function ($rootScope, $scope, breadcrumbItems, project, $state, repositories, clouds, images, applications) {

  $scope.global = {
    project: project,
    repos: repositories.rows,
    clouds: clouds.rows,
    images: images.rows,
    applications: applications.rows
  };
  if (project.name) {
    $state.current.title = project.name;
  }
})


// Project's elements
.controller('OrganizationProjectConfigNewRepoCtrl', function ($scope, $stateParams, $state, project, StaticParams, projectService, currentRepo) {
  $scope.repoProviders = StaticParams.projectParams.repoProvider;
  var newRepo = {
    provider: 'github',
    type:'public'
  }
  $scope.newRepo = currentRepo ? angular.copy(currentRepo) : angular.copy(newRepo);
  $scope.addNewRepo = function () {
    projectService.updateRepo($scope.newRepo, function () {
      $scope.newRepo = angular.copy(newRepo);
      $state.go('^', {}, {reload: true});
    })
  }
})

.controller('OrganizationProjectConfigSingleCloudProviderCtrl', function ($scope, $stateParams, $state, project, StaticParams, projectService, currentCloud) {
  $scope.providers = StaticParams.projectParams.cloudProvider;
  var newCloud = {
    provider: 'aws',
    type:'public'
  }
  $scope.cloudProvider = currentCloud ? angular.copy(currentCloud) : angular.copy(newCloud);
  $scope.addNewCloudProvider = function () {
    projectService.updateCloudProvider($scope.cloudProvider, function () {
      $scope.cloudProvider = angular.copy(newCloud);
      $state.go('^', {}, {reload: true});
    })
  }
})

.controller('OrganizationProjectConfigSingleImageRepositoryCtrl', function ($scope, $stateParams, $state, project, StaticParams, projectService, currentImage) {
  $scope.providers = StaticParams.projectParams.imageProvider;
  var newImage = {
    provider: 'dockerhub',
    type:'public'
  }
  $scope.image = currentImage ? angular.copy(currentImage) : angular.copy(newImage);

  $scope.addNewImage = function () {
    projectService.updateImageProvider($scope.image, function () {
      $state.go('^', {}, {reload: true});
    })
  }
})
