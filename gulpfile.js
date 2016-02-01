/**
 * @author  Phil Zahniel
 * @url     https://github.com/Lein-Haz/ng-gulp-karma-boilerplate
 * @date    January 2016
 * @license MIT
 *
 * Thanks to Jozef Butko for creating the
 * original boilerplate that I built upon.
 * The project structure and build system
 * has been modified.
 *
 * source author  Jozef Butko
 * date    March 2015
 * repo     "https://github.com/jbutko/AngularJS-Boilerplate"
 * AngularJS Boilerplate: Build, watch and other useful tasks
 *
 * The build process consists of following steps:
 * 1. clean /build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 * 
 */
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')(),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    buildConfig     = require('./gulp.buildCfg.js')

    ;

/**
 * Task Imports
 */
require('./gulpTasks/copyTask.js');
require('./gulpTasks/sassTask.js');
require('./gulpTasks/templateTask.js');
require('./gulpTasks/bsyncTask.js');
require('./gulpTasks/compileTask.js');
require('./karma/karmaGulpTask.js');

var compileFlag = false;

/**
 * public functions
 */
this.isCompile = function () {
    return compileFlag;
};

// optimize images
gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    //.pipe($.if(!compileFlag, $.changed('./src/images')))
    //.pipe($.if(compileFlag, $.changed('./build/images')))
    .pipe($.changed('./src/images'))
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./build/images'))
    .pipe($.if(compileFlag,gulp.dest('./bin/images')));
});




// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src('./fonts/**/*.{ttf,woff,eof,eot,svg}')
    .pipe($.changed('./build/fonts'))
    .pipe(gulp.dest('./build/fonts'));
});


// delete build folder
gulp.task('clean:build', function (cb) {
  return del([
    './build/'
    // if we don't want to clean any file we can use negate pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

// delete compile folder
gulp.task('clean:bin', function (cb) {
    return del([
        './bin/'
    ], cb);
});


// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;

// index.html compile task
gulp.task('minIndex', function() {
    return gulp.src('./src/index.html')
        .pipe($.htmlReplace({
            'appCss': '<link rel="stylesheet" href="assets/mainapp.css"/>',
            'app': '<link rel="stylesheet" href="assets/mainapp.js"/>'
        }))
        .pipe(gulp.dest('./bin/'))
        ;
});

// index.html build task
gulp.task('index', function() {
    //reference to app's js files
    var jsArray = gulp.src([
        'src/**/*.js',
        '!src/assets/**/*.js',
        '!src/**/*.spec.js'
    ], {read: false, base: './'});
    return gulp.src('./src/index.html')
        // add app's JS files paths
        .pipe($.inject(jsArray))
        .pipe($.htmlReplace({
            'templatesApp': '<script type="text/javascript" src="templates-app.js"></script>',
            'templatesCommon': '<script type="text/javascript" src="templates-common.js"></script>',
            'vendor': {
                src: buildConfig.bower_files.js
            },
            'vendorCss':{
                src: buildConfig.bower_files.css
            },
            'appCss': '<link rel="stylesheet" href="styles/app.css"/>'
        }))
        .pipe(gulp.dest('./build/'))
        ;
});





// calculate build folder size
gulp.task('build:size', function() {
  var s = $.size();

  return gulp.src('./build/**/*.*')
    .pipe(s)
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Total build size ' + s.prettySize;
      }
    }));
});

gulp.task('lint', function () {
    return gulp.src('./src/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
    ;
});


gulp.task('debug:test', function(){
    gulp.watch(['karma/*.js','src/**/*.spec.js'], ['karma:serve']);
});


// default task to be run with `gulp` command
gulp.task('default', function (cb) {
    runSequence(
        'build',
        'watch',
        cb
    )
});


/**
 * Tasks defined in /gulpTasks/copyTask.js
 */
gulp.task('copy', ['copy:js', 'copy:vendorJs', 'copy:assets', 'copy:css']);

// make templateCache from all HTML files
gulp.task('templates',['templates:common', 'templates:app']);

gulp.task('compile', function(callback){
    runSequence(
        'compile:taskList',
        callback
    )
});

gulp.task('build', function (callback) {
    runSequence(
        'lint',
        'build:taskList',
        callback);
});



/**
 * build tasks:
 * 1. clean /build folder
 * 2. copy bower files to /build folder
 * 3. compile SASS files, minify and uncss compiled css
 * 4. copy and minimize images
 * 5. minify and copy all HTML files into $templateCache
 * 6. build index.html
 * 7. copy fonts
 * 8. run karma unit tests
 * 9. show build folder size
 */
gulp.task('build:taskList', function(callback) {
    compileFlag = false;
    runSequence(
        'clean:build',
        'copy',
        'sass:build',
        'images',
        'templates',
        'index',
        'fonts',
        'test',
        'build:size',
        callback);
});

//TODO complete and check
//TODO missing move images on compile
gulp.task('compile:taskList', function(callback) {
    compileFlag = true;
    runSequence(
        //'clean:build',
        'clean:bin',
        'copy',
        'sass:build',
        'images',
        'templates',
        'compileTasks',
        'minIndex',
        'fonts',
        'build:size',
        callback);
});
