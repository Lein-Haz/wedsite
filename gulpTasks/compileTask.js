/**
 * Created by Phil on 1/31/2016.
 */
var gulp            = require('gulp'),
    $               = require('gulp-load-plugins')()
    ;
require('run-sequence').use(gulp);

gulp.task('compileTasks', ['compileJs', 'compileCss']);

gulp.task('compileJs', function() {
    //wraps JS in IIFE
    return gulp.src([
        'module.prefix',
        'build/**/*.js',
        '!build/**/*.spec.js',
        'module.suffix'
    ])
        .pipe($.concat('mainapp.js'))
        .pipe(gulp.dest('./bin/assets'));
});

gulp.task('compileCss', function() {
    return gulp.src([
        'build/**/*.css'
    ])
        .pipe($.concat('mainapp.css'))
        .pipe(gulp.dest('./bin/assets'));
});