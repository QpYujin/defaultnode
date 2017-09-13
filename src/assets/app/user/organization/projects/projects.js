angular.module('app.user.organization.projects', [
  'app.user.organization.projects.project',
  'app.user.organization.projects.new-project'
])
.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider.state('user.organization.projects', {
    url: '/projects',
    title: 'Projects',
    addOnButton: {
      title: 'Add new Project',
      url: 'user.organization.projects.new-project'
    },
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/projects/projects.tpl.jade',
        controller: 'OrganizationProjectsCtrl'
      }
    },
    resolve: {
      projects: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects').get()
      }
    }
  });

  $stateProvider.state('user.organization.projects.new-project', {
    url: '/new-project',
    title: 'New Project',
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/projects/project/new-project.tpl.jade',
        controller: 'OrganizationNewProjectCtrl'
      }
    },
    resolve: {
      project: function () {
        return null;
      }
    }
  });

  $stateProvider.state('user.organization.projects.project', {
    url: '',
    params:{ projectId : null },    
    title: 'Project Name',
    abstract: true,
    addOnButton: {
      title: 'Configuration',
      url: 'user.organization.projects.project.config'
    },
    views: {
      'organization@user.organization': {
        templateUrl: 'app/user/organization/projects/project/project.tpl.jade',
        controller: 'OrganizationProjectCtrl'
      }
    },
    resolve: {
      project: function (Restangular, $stateParams, globalUtils) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId).get().then(function (proj) {
            proj.environments = globalUtils.isJSON(proj.environment) ? JSON.parse(proj.environment) : [];
            proj.dbStacks = globalUtils.isJSON(proj.dbStack) ? JSON.parse(proj.dbStack) : [];
            return proj;
          })
      },
      repositories: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId)
          .one('source-managements').get();
      },
      clouds: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId)
          .one('cloud-providers').get();
      },
      images: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId)
          .one('image-repos').get();
      },
      applications: function (Restangular, $stateParams) {
        return Restangular.one('organizations', $stateParams.organizationId)
          .one('projects', $stateParams.projectId)
          .one('applications').get()
      }
    }
  });

})

.controller('OrganizationProjectsCtrl', function ($scope,Restangular,StaticParams,$stateParams,breadcrumbItems, projects, projectService, globalUtils) {
  breadcrumbItems.items = [
    {
      title: 'Organization',
      url: 'user.organization'
    },
    {
      title: 'Projects',
      url: 'user.organization.projects'
    }
  ];
  projectService.getProjects().then(function (results) {
    $scope.projects = results.rows;
    _.forEach($scope.projects, function (pj) {
      pj.environmentDisplay = globalUtils.isJSON(pj.environment) ? JSON.parse(pj.environment).join(', ') : pj.environment;

     // pj.environmentDisplay= pj.environment;// ? JSON.parse(pj.environment).split(', ') : pj.environment;
      console.log(pj.environmentDisplay);


    })
  })
  // $scope.projects = projects.rows;
  $scope.options = StaticParams.tableOptions;
  $scope.query = StaticParams.tableQuery;

  var getapps = function () {
    Restangular.one('organizations', $stateParams.organizationId)
      .one('projects')
      .one('getapps')
      .get()
      .then(function (proj) {
        console.log("This is from the client side function for .get call getting no of applications");
        $scope.apps=proj;
        console.log(proj);
        
      })

  }
  getapps();






})


.filter("commaBreak", 
    function () {
        return function ( value ) {
            if( !value.length ) return;
            return value.split(',');
        }

});
