var app = angular.module('app', [
  'ui.router',
  'app.user',
  'app.directives',
  'templates-app',
  'masonry',
  'chart.js',
  'ngMaterial',
  'md.data.table',
  'ui.bootstrap',
  'restangular',
])

angular.module('app.services', []);
angular.module('app.directives', ['app.services']);

app.controller('AppCtrl', function ($scope, $rootScope, StaticParams) {
  console.log('In Admin Controller');
  $rootScope.masonryOptions = StaticParams.masonryOptions;
})
app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
})

.service('utils', function () {
  return {
    stringToArray: function (str) {
      if (!str) return [];
      var arr = str.split(',');
      return _.map(arr, function (item) {
        return item.trim();
      })
    },
    stringToCollection: function (str) {
      if (!str) return [];
      var arr = str.split(',');
      return _.map(arr, function (item) {
        return {
          name: item
        }
      })
    }
  }
})
.directive('ngOnload', function() {
  return {
    restrict: "A",
    scope: {
      callback: "&ngOnload"
    },
    link: function(scope, element) {
      element.on("load", function(event) {
        scope.callback({ event: event });
      });
    }
  };
})

.constant('StaticParams', function () {

  var convertToObj = function (arr) {
    return _.map(arr, function (item) {
      return {
        name: item,
        value: item
      }
    })
  }
  var regions = [ 
      {
        id: 'us-east-1',
        name: 'US East (N. Virginia)',
        children: [
          // {id: 'us-east-1b'},
          {id: 'us-east-1c'}, 
          // {id: 'us-east-1d'}, 
          // {id: 'us-east-1e'}
        ]
      },
      {
        id: 'us-west-2',
        name: 'US West (Oregon)'
      },
      {
        id: 'us-west-1',
        name: 'US West (N. California)'
      },
      {
        id: 'eu-west-1',
        name: 'EU (Ireland)'
      },
      {
        id: 'eu-central-1',
        name: 'EU (Frankfurt)'
      },
      {
        id: 'ap-southeast-1',
        name: 'Asia Pacific (Singapore)'
      },
      {
        id: 'ap-northeast-1',
        name: 'Asia Pacific (Tokyo)'
      },
      {
        id: 'ap-northeast-2',
        name: 'Asia Pacific (Seoul)'
      },
      {
        id: 'ap-southeast-2',
        name: 'Asia Pacific (Sydney)'
      },
      {
        id: 'sa-east-1',
        name: 'South America (São Paulo)'
      },
      {
        id: 'us-gov-west-1',
        name: 'AWS GovCloud (US)'
      },
      {
        id: 'cn-north-1',
        name: 'China (Beijing)'
      },
    ];
  return {
    masonryOptions: {
      transitionDuration : '0.4s' ,
      itemSelector : '.item',
      gutter: 15
    },
    self: this,
    tableQuery : {
      order: '-id',
      limit: 8,
      page: 1,
      offset: 0,
    },
    tableOptions: {
      rowSelection: true,
      multiSelect: true,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: false,
      limitSelect: true,
      pageSelect: true,
      limitOptions: [8, 16, 24],
      label: {
        page: 'Page:',
        rowsPerPage: 'Per Page:',
        of: '/' 
      }
    },
    // configStatusIds: ['be-terminate', 'stop', 'runnning', 'started  ']; 
    configStatuses: [
      {
        id: 'terminate',
        name: 'Be Terminate',
        color: ''
      },
      {
        id: 'stop',
        name: 'Stop',
        color: ''
      },
      {
        id: 'running',
        name: 'Running',
        color: ''
      },
      {
        id: 'started',
        name: 'Started',
        color: ''
      },
    ],
    configTypes: [
      {
        id: 1,
        name: 'Type 1' 
      },
      {
        id: 2,
        name: 'Type 2' 
      },
      {
        id: 3,
        name: 'Type 3' 
      },
      {
        id: 4,
        name: 'Type 4' 
      }
    ],
    regions: regions,
    instanceTypes: [
      't2.nano',
      't2.micro',
      't2.small',
      't2.medium',
      't2.large',
      'm4.large',
      'm4.xlarge',
      'm4.2xlarge',
      'm4.4xlarge',
      'm4.10xlarge',
      'm4.16xlarge',
      'm3.medium',
      'm3.large',
      'm3.xlarge',
      'm3.2xlarge',
      'c4.large',
      'c4.xlarge',
      'c4.2.xlarge',
      'c4.4.xlarge',
      'c4.8.xlarge',
      'c3.large',
      'c3.xlarge',
      'c3.2xlarge',
      'c3.4xlarge',
      'c3.8.xlarge',
      'p2.xlarge',
      'p2.8xlarge',
      'p2.16xlarge',
      'g2.2xlarge',
      'g2.8xlarge',
      'x1.16large',
      'x1.32xlarge',
      'r3.large',
      'r3.xlarge',
      'r3.2xlarge',
      'r3.4xlarge',
      'r3.8xlarge',
      'i2.xlarge',
      'i2.2xlarge',
      'i2.4xlarge',
      'i2.8xlarge',
      'd2.xlarge',
      'd2.2xlarge',
      'd2.4xlarge',
      'd2.8xlarge',
    ],
    applicationFields: [
      {
        name: 'Name',
        field: 'name',
      },
      {
        name: 'Description',
        field: 'description',
        type: 'textarea',
        separator: 'line'
      },
      {
        name: 'AMI',
        field: 'ami',
        group: 'ami'
      },
      // {
      //   name: 'SSH User',
      //   field: 'sshUser',
      //   group: 'ami'
      // },
      {
        name: 'Access Key',
        field: 'accessKey',
        group: 'ami'
      },
      {
        name: 'Access Secret Key',
        field: 'accessSecretKey',
        group: 'ami',
        separator: 'line'
      },
      {
        name: 'Region',
        field: 'region',
        type: 'select',
        items: regions
      },
      {
        name: 'Zone',
        field: 'zone'
      },
      {
        name: 'VPC',
        field: 'vpc'
      },
      {
        name: 'Subnet',
        field: 'subnet',
        separator: 'line'
      },
      {
        name: 'Config File',
        field: 'configFile'
      },
      {
        name: 'Config File Path',
        field: 'configFilePath',
        separator: 'line'
      },
      {
        name: 'Instance Name',
        field: 'instanceName'
      },
      {
        name: 'Github',
        field: 'github'
      },
      // {
      //   name: 'Instance Type',
      //   field: 'instanceType',
      //   type: 'select',
      //   items: $scope.instanceTypes
      // },
      // {
      //   name: 'Security Group',
      //   field: 'securityGroup'
      // },
      // {
      //   name: 'Tags',
      //   field: 'tags'
      // },
      // {
      //   name: 'Profile',
      //   field: 'profile'
      // }
      
    ],
    projectParams: {
      stack: convertToObj(['node', 'meanstack', 'flask', 'other']),
      environment: convertToObj(['development', 'stage', 'performance', 'qa', 'production', 'other']),
      dbStack: convertToObj(['rds', 'docker', 'mongolabs']),
      repoProvider: convertToObj(['github', 'bitbucket', 'codecommit', 's3']),
      cloudProvider: convertToObj(['aws', 'azure', 'gcp']),
      imageProvider: convertToObj(['dockerhub', 's3', 'ecr'])
    }
  }
}())

.constant('globalUtils', {
  generateUUID: function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  },
  isJSON: function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
});