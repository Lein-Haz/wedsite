/**
 * Created by Phil on 1/27/2016.
 */
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')()
    ;
require('run-sequence').use(gulp);



// start webserver without watchers
gulp.task('server', function(done) {
    return browserSync({
        server: {
            baseDir: './build'
        }
    }, done);
});

// start webserver from build folder to check how it will look in production
gulp.task('server-compile', function(done) {
    return browserSync({
        server: {
            baseDir: './bin/'
        }
    }, done);
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
    return gulp.src('src/**/*.scss')
        .pipe($.sass({
            style: 'expanded'
        }))
        .on('error', $.notify.onError({
            title: 'SASS Failed',
            message: 'Error(s) occurred during compile!'
        }))
        .pipe($.concat('app.css'))
        .pipe(gulp.dest('build/styles'))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({
            message: 'Styles task complete'
        }));
});

// minify CSS
gulp.task('cssnano', function() {
    gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
        .pipe($.concat('app.css'))
        .pipe($.cssnano({zindex: false}))
        .pipe(gulp.dest('./build/styles/'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
});

