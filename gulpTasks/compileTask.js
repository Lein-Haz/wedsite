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
        'build/bower_files/**/*.js',
        'module.prefix',
        'build/src/**/*.js',
        'build/templates*.js',
        '!build/**/*.spec.js',
        'module.suffix'
    ])
        .pipe($.concat('concatapp.js'))
        .pipe(gulp.dest('./build/'))
        .pipe($.rename('mainapp.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./bin/assets'));
});

gulp.task('compileCss', function() {
    return gulp.src([
        'build/**/*.css'
    ])
        .pipe($.concat('mainapp.css'))
        .pipe(gulp.dest('./bin/assets'));
});