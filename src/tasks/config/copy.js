/**
 * Copy task
 * Created by chuongtran on 02/27/2017.
 */
module.exports = function (grunt) {
  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(coffee|less)', '!**/*spec.js', '!**/*scenario.js', '**/*.jade', '!**/*.scss'],
        dest: '.tmp/public'
      }]
    },
    // build: {
    //   files: [{
    //     expand: true,
    //     cwd: '.tmp/public',
    //     src: ['**/*'],
    //     dest: 'www'
    //   },
    //   {
    //     expand: true,
    //     cwd: './bower_components/bootstrap-sass-official/assets/fonts/bootstrap',
    //     src: ['*'], 
    //     dest: '.tmp/public/fonts/bootstrap'
    //   }]
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
}
