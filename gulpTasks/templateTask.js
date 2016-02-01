/**
 * Created by Phil on 1/29/2016.
 */
var gulp            = require('gulp'),
    main            = require('../gulpfile.js'),
    $               = require('gulp-load-plugins')()
    ;
require('run-sequence').use(gulp);

//create templateCache from any app HTML files
gulp.task('templates:app', function() {
    var isCompile = main.isCompile();
    return gulp.src([
        'src/app/**/*.tpl.html'
    ],{})
        .pipe($.if(isCompile, $.htmlmin()))
        .pipe($.angularTemplatecache({
            filename: 'templates-app.js',
            module: 'templates-app',
            standalone: true
        }))
        .pipe(gulp.dest('build'));
});

// create templateCache from any common HTML files
gulp.task('templates:common', function() {
    var isCompile = main.isCompile();
    return gulp.src([
        'src/common/**/*.tpl.html'
    ],{})
        .pipe($.if(isCompile, $.htmlmin()))
        .pipe($.angularTemplatecache({
            filename: 'templates-common.js',
            module: 'templates-common',
            standalone: true
        }))
        .pipe(gulp.dest('build'));
});