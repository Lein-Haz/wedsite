/**
 * Created by Phil on 1/28/2016.
 */
var gulp            = require('gulp'),
    Server          = require('karma').Server,
    $               = require('gulp-load-plugins')()
    ;
require('run-sequence').use(gulp);


gulp.task('test', function (done) {
    new Server({
        configFile: __dirname +'/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('karma:serve', function (done) {
    new Server({
        configFile: __dirname +'/karma.conf.js',
        singleRun: false
    }, done).start();
});