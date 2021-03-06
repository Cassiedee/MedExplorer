// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-20 using
// generator-karma 1.0.0
module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/vendor/jquery/dist/jquery.js',
      'app/vendor/angular/angular.js',
      'app/vendor/angular-animate/angular-animate.js',
      'app/vendor/angular-cookies/angular-cookies.js',
      'app/vendor/angular-resource/angular-resource.js',
      'app/vendor/angular-route/angular-route.js',
      'app/vendor/angular-sanitize/angular-sanitize.js',
      'app/vendor/angular-touch/angular-touch.js',
      'app/vendor/bootstrap/dist/js/bootstrap.js',
      'app/vendor/angular-ui-router/release/angular-ui-router.js',
      'app/vendor/lodash/lodash.js',
      'app/vendor/ng-lodash/build/ng-lodash.js',
      'app/vendor/d3/d3.js',
      'app/vendor/c3/c3.js',
      'app/vendor/angular-mocks/angular-mocks.js',
      'app/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/assets/alv-ch-ng.text-truncate/dist/alv-ch-ng.textTruncate.js',
      'app/assets/angular-utils-pagination/dirPagination.js',
      'app/vendor/angular-breadcrumb/dist/angular-breadcrumb.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
        'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      "karma-junit-reporter",
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : true,
    reporters : ['dots','junit'],
    junitReporter : {
        outputFile: 'test-results.xml'
    },


    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
