angular.module('app.user.organization.projects.project.applications', [])
  .config(function ($stateProvider) {
    $stateProvider.state('user.organization.projects.project.applications.application', {
      //url: '/:applicationId',
      url: '',
      params : { applicationId : null },
      title: 'Application Name',
      abstract: true,
      views: {
        'project-content@user.organization.projects.project': {
          templateUrl: 'app/user/organization/applications/application-steps.tpl.jade',
          controller: function ($rootScope, $scope, application, breadcrumbItems, project) {
            breadcrumbItems.items = [
              { title: 'Organization',url: 'user.organization'},
              { title: 'Projects', url: 'user.organization.projects'},
              { title: project.name, url: 'user.organization.projects.project.applications'},
              { title: application.name,
                url: 'user.organization.projects.project.applications.application.dashboard'}
            ];

            $scope.appGlobal = {};
            $rootScope.currentApplicationName = application.name;
            $scope.global.application = application;
          }
        }
      },
      resolve: {
        application: function (Restangular, $stateParams) {
          return Restangular.one('organizations', $stateParams.organizationId)
            .one('projects', $stateParams.projectId)
            .one('applications', $stateParams.applicationId)
            .get();
        },
      }
    });


    $stateProvider.state('user.organization.projects.project.applications.application.dashboard', {
      url: '/dashboard',
      title: 'Build History',
      hideTitle: true,
      views: {
        'stepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/dashboard.tpl.jade',
          controller: 'OrganizationProjectApplicationDashboardCtrl'
        }
      }
    });


    $stateProvider.state('user.organization.projects.project.applications.application.stage', {
      url: '/stage-:stage',
      title: 'Stage',
      abstract: true,
      views: {
        'stepContent': {
          template: '<div ui-view="stepContent" flex></div>'
        }
      }
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.build', {
      url: '/build',
      title: 'Build History',
      abstract: true,
      hideTitle: true,
      views: {
        'stepContent': {
          template: '<div ui-view="subStepContent" flex></div>',
          controller: function ($scope) {
            $scope.appGlobal.rootStateUrl = 'user.organization.projects.project.applications.application.stage.build';
            $scope.appGlobal.steps = [
              {
                title: 'Config',
                url: 'config'
              },
              {
                title: 'History',
                url: 'history'
              },
              // {
              //   title: 'Pipeline',
              //   url: 'pipeline'
              // }
              // {
              //   title: 'Build History bbb',
              //   url: 'build-history'
              // },
            ];
          }
        }
      },
      resolve: {
      }
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.build.config', {
      url: '/config',
      title: 'Config',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/build/config.tpl.jade',
          controller: 'OrganizationProjectApplicationBuildConfigCtrl'
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.build.history', {
      url: '/history',
      title: 'Build History',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/build/history.tpl.jade',
          controller: 'OrganizationProjectApplicationBuildHistoryCtrl'
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.build.pipeline', {
      url: '/pipeline',
      title: 'Pipeline',
      hideTitle: true,
      views: {
        'subStepContent': {
          template: '<pipeline></pipeline>'
          // controller: 'OrganizationApplicationBuildCtrl'
        }
      },
      resolve: {
      }
    });


    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy', {
      url: '/deploy',
      title: 'Build History',
      abstract: true,
      hideTitle: true,
      views: {
        'stepContent': {
          template: '<div ui-view="subStepContent" flex></div>',
          controller: function ($scope, breadcrumbItems, $stateParams) {
            $scope.appGlobal.rootStateUrl = 'user.organization.projects.project.applications.application.stage.deploy';
            $scope.appGlobal.steps = [

              {
                title: 'Deploy',
                url: 'images'
              },

              {
                title: 'Logs',
                url: 'logs'
              },

              {
                title: 'Cloud Metric',
                url: 'cloud-metric'
              },
              {
                //newly added cluster deployment section
                title: 'Create Deployment',
                url: 'cluster-service'
              },


              {
                title: 'Analytics',
                url: 'analytics'
              },

              {
                title:'History',
                url:'deployments'
              },




            ];

            $scope.deployGlobal = {
              selectedImage: null
            }

            var items = breadcrumbItems.items.splice(0, 4)
            items.push({
              title: $stateParams.stage,
              url: 'user.organization.projects.project.applications.application.stage.deploy.images'
            });
            breadcrumbItems.items = items;

          }
        }
      },
      resolve: {
        deployImages: function (Restangular, $stateParams) {
          return Restangular.one('organizations', $stateParams.organizationId)
            .one('projects', $stateParams.projectId)
            .one('applications', $stateParams.applicationId)
          //  .one($stateParams.stage)
            .one('images')
            .get()
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy.deployments', {
      url: '/deployments',
      title: 'Deployments',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/deploy/deployments.tpl.jade',
          controller: 'OrganizationProjectApplicationDeployDeploymentsCtrl'
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy.images', {
      url: '/images',
      title: 'Images',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/deploy/images.tpl.jade',
          controller: 'OrganizationProjectApplicationDeployCtrl'
        }
      },
    });


    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy.analytics', {
      url: '/analytics',
      title: 'Analytics',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/deploy/analytics.tpl.jade',
          controller: 'OrganizationProjectApplicationDeployAnalyticsCtrl'
        }
      },
    });















    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy.logs', {
      url: '/logs',
      title: 'Logs',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/deploy/logs.tpl.jade',
          controller: 'OrganizationProjectApplicationDeployLogsCtrl'
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy.cloud-metric', {
      url: '/cloud-metric',
      title: 'Cloud Metric',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/deploy/cloud-metric.tpl.jade',
          controller: 'OrganizationProjectApplicationDeployCloudMetricCtrl'
        }
      },
    });



    //newly added cluster deployment
    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy.cluster-deploy', {
      url: '/cluster-deploy',
      title: 'Cluster Deployment',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/deploy/cluster-deploy.tpl.jade',
          controller: 'SingleApplicationCtrl'
        }
      },
    });

    //newly added cluster service
    $stateProvider.state('user.organization.projects.project.applications.application.stage.deploy.cluster-service', {
      url: '/cluster-service',
      title: 'Create Deployment',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/deploy/cluster-service.tpl.jade',
          controller: 'SingleApplicationCtrl'
        }
      },
    });




    $stateProvider.state('user.organization.projects.project.applications.application.stage.test', {
      url: '/test',
      title: 'Test',
      abstract: true,
      hideTitle: true,
      views: {
        'stepContent': {
          template: '<div ui-view="subStepContent" flex></div>',
          controller: function ($scope, breadcrumbItems, $stateParams) {
            $scope.appGlobal.rootStateUrl = 'user.organization.projects.project.applications.application.stage.test';
            $scope.appGlobal.steps = [
              {
                title: 'Configuration',
                url: 'config'
              },
              {
                title: 'Cloud Metric',
                url: 'cloud-metric'
              },
              {
                title: 'Summary',
                url: 'summary'
              },
            ];

            var items = breadcrumbItems.items.splice(0, 4)
            items.push({
              title: $stateParams.stage,
              url: 'user.organization.projects.project.applications.application.stage.test.config'
            });
            breadcrumbItems.items = items;

          }
        }
      }
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.test.config', {
      url: '/config',
      title: 'Config',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/test/config.tpl.jade',
          controller: 'OrganizationProjectApplicationTestConfigCtrl'
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.test.cloud-metric', {
      url: '/cloud-metric',
      title: 'CLoud Metric',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/test/cloud-metric.tpl.jade',
          controller: 'OrganizationProjectApplicationTestCloudMetricCtrl'
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.stage.test.summary', {
      url: '/summary',
      title: 'Summary',
      hideTitle: true,
      views: {
        'subStepContent': {
          templateUrl: 'app/user/organization/projects/project/tabs/application-steps/test/summary.tpl.jade',
          controller: 'OrganizationProjectApplicationTestSummaryCtrl'
        }
      },
    });









    $stateProvider.state('user.organization.projects.project.applications.application.releases', {
      url: '/releases',
      title: 'Application Releases',
      hideTitle: true,
      views: {
        'stepContent@user.organization.projects.project.applications.application': {
          templateUrl: 'app/user/organization/applications/releases/releases.tpl.jade',
          controller: 'SingleApplicationReleasesCtrl'
        }
      },
    });

    $stateProvider.state('user.organization.projects.project.applications.application.releases.release', {
      url: '/:releaseId',
      title: 'New Release',
      hideTitle: true,
      views: {
        'stepContent@user.organization.projects.project.applications.application': {
          templateUrl: 'app/user/organization/applications/releases/single-release.tpl.jade',
          controller: 'SingleApplicationReleaseCtrl'
        }
      },
      resolve: {
        release: function (Restangular, $stateParams) {
          return Restangular.one('organizations', $stateParams.organizationId)
            .one('projects', $stateParams.projectId)
            .one('applications', $stateParams.applicationId)
            .one('releases', $stateParams.releaseId)
            .get()
        }
      }
    });

    $stateProvider.state('user.organization.projects.project.applications.application.releases.new-release', {
      url: '/new-release',
      title: 'New Release',
      hideTitle: true,
      views: {
        'stepContent@user.organization.projects.project.applications.application': {
          templateUrl: 'app/user/organization/applications/releases/single-release.tpl.jade',
          controller: 'SingleApplicationReleaseCtrl'
        }
      },
      resolve: {
        release: function () {
          return null;
        }
      }
    });

    // Application steps
    $stateProvider.state('user.organization.projects.project.applications.application.config', {
      url: '/config',
      title: 'Config',
      hideTitle: true,
      views: {
        'stepContent': {
          templateUrl: 'app/user/organization/applications/single-application.tpl.jade',
          controller: 'SingleApplicationCtrl'
        }
      },
    });
    $stateProvider.state('user.organization.projects.project.applications.application.add-image', {
      url: '/add-image',
      title: 'Add Image',
      hideTitle: true,
      views: {
        'stepContent': {
          templateUrl: 'app/user/organization/applications/steps/add-image.tpl.jade',
          controller: 'OrganizationApplicationBuildCtrl'
        }
      },
      resolve: {
      }
    });

    $stateProvider.state('user.organization.projects.project.applications.application.build-history', {
      url: '/build-history',
      title: 'Build History',
      hideTitle: true,
      views: {
        'stepContent': {
          templateUrl: 'app/user/organization/applications/steps/build-history.tpl.jade',
          controller: 'OrganizationApplicationBuildCtrl'
        }
      },
      resolve: {
      }
    });

    // $stateProvider.state('user.organization.projects.project.applications.application.deploy', {
    //   url: '/deploy',
    //   title: 'Deploy',
    //   hideTitle: true,
    //   views: {
    //     'stepContent': {
    //       templateUrl: 'app/user/organization/applications/steps/summary.tpl.jade',
    //       controller: 'OrganizationApplicationSummaryCtrl'
    //     }
    //   },
    // })
  })
