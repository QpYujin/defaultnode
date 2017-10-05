const glob = require('glob');
const _ = require('lodash');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {}
  });

  let tasks = glob.sync('./tasks/config/*.js');
  _.forEach(tasks, function(task) {
    console.log(task);
    require(task)(grunt);
  });

  grunt.registerTask('build', [
    'bower:install',
    'clean:dev',
    'html2js:app',
    'less:dev',
    'copy:dev',
    'sails-linker:devJs',
    'sails-linker:devStyles'
  ]);
  grunt.registerTask('default', [
    'build',
    'watch'
  ]);
};
