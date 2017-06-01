
/**
* HTML2JS task
* Created by chuongtran on 02/27/2017.
*/

module.exports = function(grunt) {

  grunt.config.set('sync', {
    dev: {
      files: [{
        cwd: './assets',
        src: ['**/*.!(coffee)', '!**/*spec.js', '!**/*scenario.js', '!**/*.jade', '!**/*.scss'],
        dest: '.tmp/public'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-sync');
};
