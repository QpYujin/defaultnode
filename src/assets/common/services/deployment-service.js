angular.module('app.services')
.service('deploymentService', function () {
  return {
    inProgressBuilds: [],
    addBuild: function (build) {
      var self = this;
      self.inProgressBuilds.push(build);
    },
    removeBuild: function (build) {
      var self = this;
      _.remove(self.inProgressBuilds, function (b) {
        return b.uuid == build.uuid;
      });
    },

  }
})