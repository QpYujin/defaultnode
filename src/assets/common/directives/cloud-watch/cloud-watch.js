angular.module('app.directives')
.directive('cloudWatch', function () {
  return {
    restrict: 'E',
    templateUrl: 'common/directives/cloud-watch/cloud-watch.tpl.jade',
    controller: function ($scope, $stateParams) {
      var metricNames = ['CPUUtilization',
                      'DiskReadBytes',
                      'DiskReadOps',
                      'DiskWriteBytes',
                      'DiskWriteOps',
                      'NetworkIn',
                      'NetworkOut',
                      'StatusCheckFailed',
                      'StatusCheckFailed_Instance',
                      'StatusCheckFailed_System',
                      'CPUCreditUsage',
                      'CPUCreditBalance'];
      $scope.statistics = ["Average", 'Minimum', 'Maximum', 'Sum', 'SampleCount'];
      $scope.timeRanges = [
        {
          text: "Last Hour",
          value: 60 //mins
        },{
          text: "Last 3 Hours",
          value: 3 * 60 //mins
        },{
          text: "Last 6 Hours",
          value: 6 * 60 //mins
        },{
          text: "Last 12 Hours",
          value: 12 * 60 //mins
        },{
          text: "Last 24 Hours",
          value: 24 * 60 //mins
        },{
          text: "Last 3 Days",
          value: 3 * 24 * 60 //mins
        },{
          text: "Last 1 Week",
          value: 7 * 24 * 60 //mins
        },{
          text: "Last 3 Weeks",
          value: 3 * 7 * 24 * 60 //mins
        }
      ];
      $scope.periods = [
        {
          text: "5 Minutes",
          value: 5
        }, {
          text: "15 Minutes",
          value: 15
        }, {
          text: "1 Hour",
          value: 60
        }, {
          text: "6 Hours",
          value: 6 * 60
        }, {
          text: "1 Day",
          value: 24 * 60
        }
      ];
      $scope.statistics = [
        { 
          text: 'Average',
          value: 'Average'
        }, { 
          text: 'Minimum',
          value: 'Minimum'
        }, { 
          text: 'Maximum',
          value: 'Maximum'
        }, { 
          text: 'Sum',
          value: 'Sum'
        }, { 
          text: 'SampleCount',
          value: 'SampleCount'
        }];
        $scope.types = [{
          name: "statistic",
          arr: $scope.statistics
        }, {
          name: "timeRange",
          arr: $scope.timeRanges
        }, {
          name: "period",
          arr: $scope.periods
        }
      ]

      $scope.lineLabels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.lineSeries = ['Series A', 'Series B'];
      $scope.lineData = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      $scope.lineOptions = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };
      $scope.metrics = _.map(metricNames, function(name){
        return {
          name: name,
          statistic: $scope.statistics[0],
          timeRange: $scope.timeRanges[0],
          period: $scope.periods[0],
          data: [
            _.map(Array(7), function (num, index) {
              return (Math.random(100)*100).toFixed(0);
            }),
            _.map(Array(7), function (num, index) {
              return (Math.random(100)*100).toFixed(0)
            })
          ],
          show: true
        }
      });
    }
  }
})