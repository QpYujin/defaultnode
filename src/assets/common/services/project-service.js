angular.module('app.services')
.service('projectService', function ($stateParams, Restangular) {
  var organizationModel = Restangular.one('organizations', $stateParams.organizationId);
  return {
    getProjects: function () {
      return organizationModel.one('projects').get();
    },
    updateProject: function (project, cb) {
      if (project.uuid) {
        return organizationModel.one('projects', project.uuid).post('', project);
      }
      return organizationModel.post('projects', project)
        .then(function (result) {
            swal('DONE', '', 'success');
            cb && cb();
            return result;
          }, function (err) {
            swal('ERROR', '', 'error');
            return err;
          })
    },
    getRepos: function (projectId) {
      return organizationModel.one('projects', projectId).one('source-managements').get();
    },
    updateRepo: function (repo, cb) {
      if (repo.uuid) {
        return organizationModel.one('projects', $stateParams.projectId)
          .one('source-managements', repo.uuid)
          .post('', repo)
          .then(function (result) {
            swal('DONE', '', 'success');
            cb && cb();
            return result;
          }, function (err) {
            swal('ERROR', '', 'error');
            return err;
          })
      }
      return organizationModel.one('projects', $stateParams.projectId)
        .post('source-managements', repo)
        .then(function (result) {
            swal('DONE', '', 'success');
            cb && cb();
            return result;
          }, function (err) {
            swal('ERROR', '', 'error');
            return err;
          })
    },

    updateCloudProvider: function (cloud, cb) {
      if (cloud.uuid) {
        return organizationModel.one('projects', $stateParams.projectId)
          .one('cloud-providers', cloud.uuid)
          .post('', cloud)
          .then(function (result) {
            swal('DONE', '', 'success');
            cb && cb();
            return result;
          }, function (err) {
            swal('ERROR', '', 'error');
            return err;
          })
      }
      return organizationModel.one('projects', $stateParams.projectId)
        .post('cloud-providers', cloud)
        .then(function (result) {
            swal('DONE', '', 'success');
            cb && cb();
            return result;
          }, function (err) {
            swal('ERROR', '', 'error');
            return err;
          })
    },

    updateImageProvider: function (image, cb) {
      if (image.uuid) {
        return organizationModel.one('projects', $stateParams.projectId)
          .one('image-repos', image.uuid)
          .post('', image)
          .then(function (result) {
            swal('DONE', '', 'success');
            cb && cb();
            return result;
          }, function (err) {
            swal('ERROR', '', 'error');
            return err;
          })
      }
      return organizationModel.one('projects', $stateParams.projectId)
        .post('image-repos', image)
        .then(function (result) {
            swal('DONE', '', 'success');
            cb && cb();
            return result;
          }, function (err) {
            swal('ERROR', '', 'error');
            return err;
          })
    },
    
  }
})