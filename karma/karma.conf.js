
'use strict';
var buildConfig         = require('../gulp.buildcfg.js');
var vendorArray         = buildConfig.bower_files.js;
var appAssetsArray      = [
    'build/templates-common.js',
    'build/templates-app.js',
    'bower_files/angular-mocks/angular-mocks.js',

    'src/**/*.spec.js',
    'src/**/*.js'
];
var depArray = vendorArray.concat(appAssetsArray);

module.exports = function ( karma ) {
    karma.set({
        /**
         * From where to look for files, starting with the location of this file.
         */
        basePath: '../',

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: depArray,
        exclude: [
            'src/assets/**/*.js'
        ],
        frameworks: [ 'jasmine' ],
        plugins: [ 'karma-jasmine', 'karma-chrome-launcher', 'karma-firefox-launcher','karma-phantomjs-launcher','karma-html2js-preprocessor', 'karma-htmlfile-reporter' ],
        preprocessors:{
            '**/*.tpl.html': ['html2js']
        },
        /**
         * switch logLevel to 'karma.LOG_DEBUG' for more verbose logging
         * or
         * switch logLevel to 'karma.LOG_INFO' for only important messages
         */
        logLevel: karma.LOG_INFO,

        /**
         * How to report, by default.
         */
        reporters: ['dots', 'html'],

        /**
         * On which port should the browser connect, on which port is the test runner
         * operating, and what is the URL path for the browser to use.
         */
        port: 9018,
        runnerPort: 9100,
        urlRoot: '/',

        /**
         * Disable file watching by default.
         */
        autoWatch: false,

        /**
         * The list of browsers to launch to test on. Plugins are needed for browers
         * other than the listed ones.  Testing browsers include:
         * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
         *
         * Notes:
         * By default we use phantom, for uniformity and seamless deployment.
         * However for debugging of tests use Chrome or Firefox depending on your
         * debugger preference.
         *
         * You can also use the executable name of the browser, like "chromium"
         * or "firefox", but that these vary based on your operating system.
         *
         * You may also leave this blank and manually navigate your browser to
         * http://localhost:9018/ when you're running tests. The window/tab can be left
         * open and the tests will automatically occur there during the build. This has
         * the aesthetic advantage of not launching a browser every time you save.
         */
        browsers: [
            'PhantomJS'
            //'Firefox'
            //'Chrome'
        ],
        /**
         * Output of testing log file
         */
        htmlReporter: {
            outputFile: 'testResults/unit-test.html'
        }
    });
};

