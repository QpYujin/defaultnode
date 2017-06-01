/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 *    https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

  grunt.config.set('sails-linker', {
    devJs: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/admin.pug': require('../pipeline').jsFilesToInject('adminPage'),
      }
    },
    devStyles: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/admin.pug': require('../pipeline').cssFilesToInject('adminPage'),
      }
    },
  });

  grunt.loadNpmTasks('grunt-sails-linker');
};
