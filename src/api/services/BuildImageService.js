/**
 * BuildImage Service
 */
const moment = require('moment');
const nconf = require('nconf');

let BuildImageService = module.exports = {};

BuildImageService.getOne = (buildImageId, cb) => {
  BuildImage.findById(buildImageId).then((build) => {
    let b = build.toJSON();
    Promise.all([
      function () {
        return Release.findById(b.releaseId).then((release) => {
          b.release = release.toJSON();
        });
      }(),
      function () {
        return SourceManagement.findById(b.sourceControlId).then((repo) => {
          b.repo = repo.toJSON();
        });
      }()
    ]).then(() => {
      cb(null, b);
    })
    Release.findById(b.releaseId).then((release) => {
      b.release = release.toJSON();
      cb(null, b);
    });
  }).catch((err) => {
    cb(err);
  });
}