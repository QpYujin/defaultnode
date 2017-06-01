/**
* HTML2JS task
* Created by chuongtran on 02/27/2017.
*/

module.exports = function(grunt) {

  grunt.config.set('html2js', {
    app: {
      options: {
        base: 'assets',
        // changing the module name here will be set as the angular module name of for the template cache
        // So in this case, our code will use 'templates-app' as the module name
        module: 'templates-app',
        watch: true,
        jade:{}
      },
      files: {
        '.tmp/public/app/templates-app.js':  require('../pipeline').templateFilesToInject('adminPage'),
      }
    },
    // common: {
    //   options: {
    //     base: 'assets/common',
    //     // changing the module name here will be set as the angular module name of for the template cache
    //     // So in this case, our code will use 'templates-app' as the module name
    //     module: 'templates-common',
    //     watch: true,
    //     jade:{}
    //   },
    //   files: {
    //     '.tmp/public/common/templates-common.js':  require('../pipeline').templateFilesToInject('productPage')
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-html2js');
};

