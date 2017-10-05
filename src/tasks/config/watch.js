/**
 * watch task
 * Created by chuongtran on 02/27/2017.
 */

module.exports = function(grunt) {
  grunt.config.set('watch', {
    options: {
      spawn: false // add spawn option in watch task
    },
    assets: {

      // Assets to watch:
      files: ['assets/styles/**/*', 'assets/app/**/*', 'assets/common/**/*', 'assets/common/**/**/*', 'tasks/pipeline.js', '!assets/app/**/*.jade', "!**/node_modules/**/*", "!**/bower_components/**/*"],

      // When assets are changed:
      tasks: [
        'less:dev',
        'sync:dev']
      }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
