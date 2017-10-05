/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */

var modules = {
  adminPage: {
    cssFilesToInject: [
      'vendor/**/*.css',
      'styles/**/*.css',
      'styles/**/**/*.css',
      'styles/**/**/**/*.css',
    ],
    jsFilesToInject: [
      'addons/**/*.js',
      'vendor/jquery/jquery.js',
      'vendor/moment/moment.js',
      'vendor/lodash/js/lodash.js',
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/angular-ui-router.js',
      'vendor/restangular/restangular.js',

      'chart-library/Chart.js',

      // Load the rest of the vendor directory
      'vendor/**/*.js',
      // '!vendor/lodash/**/*.js',

      'chart-library/angular-chart.js',

      'app/templates-app.js',
      'app/*.js',
      'app/**/*.js',
      'common/**/*.js'
    ],
    templateFilesToInject: [
      'app/**/*.tpl.html',
      'app/**/*.tpl.jade',
      'common/directives/**/*.tpl.jade'
    ]
  }
};

// Workaround for ignoring file
function calculatePath(concatStr, path) {
  console.log(concatStr);
  if (path && path.length && path[0] === '!')
    return ['!', concatStr, path.substr(1)].join('');
  return concatStr + path;
}


module.exports.cssFilesToInject = function(page) {
  return modules[page].cssFilesToInject.map(function(path) {
    console.log(path);
    return calculatePath('.tmp/public/', path);
  });
};

module.exports.jsFilesToInject = function(page) {
  return modules[page].jsFilesToInject.map(function(path) {
    return calculatePath('.tmp/public/', path);
  });
};

module.exports.templateFilesToInject = function(page) {
  return modules[page].templateFilesToInject.map(function(path) {
    return calculatePath('assets/', path);
  });
};
