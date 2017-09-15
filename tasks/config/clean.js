/**
 * Clean task
 * Created by chuongtran on 02/27/2017.
 */
 
module.exports = function(grunt) {

  grunt.config.set('clean', {
    dev: ['.tmp/public/**'],
    build: ['www']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
