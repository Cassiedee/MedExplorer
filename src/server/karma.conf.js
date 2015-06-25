// Karma configuration
// Generated on Mon Jun 22 2015 11:35:56 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks : ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      /*
      'test-main.js',
      {pattern: 'tests\*.test.js', included: false},
      {pattern: 'tests\*.js', included: false}
      */
      "tests/test.js"
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 8080,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : true,
    reporters : ['dots','junit'],
    junitReporter : {
        outputFile: 'test-results.xml'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],

    plugins : [
      "karma-mocha",
      "karma-junit-reporter",
      "karma-jasmine",
      "karma-coverage"
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,



    junitReporter: {
        outputFile: 'results/Test-units.xml',
        suite:''
    },

    coverageReporter: {
        type: 'lcov',
        dir: 'results/',
        subdir: '.'
    }


  });
};
