/**
 * Created by pzahniel on 2/8/16.
 */
var gulp            = require('gulp'),
    $               = require('gulp-load-plugins')()
    ;
require('run-sequence').use(gulp);


// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('watch', ['browser-sync', 'sass', 'cssnano'], function() {
    /**
     * Watchers for src directory
     */
    gulp.watch('build/bower_files/**/*.css', function(file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch(['src/index.html'], ['index']);
    gulp.watch(['src/app/**/*.tpl.html'], ['templates','bs-reload']);
    gulp.watch(['src/app/**/*.js', 'js/*.js'], ['copy:js']);
    /**
     * Watchers for build directory
     */
    gulp.watch(['build/index.html'], ['bs-reload']);

    gulp.watch(['build/src/app/**/*.js', 'js/*.js'], ['bs-reload']);
    gulp.watch('src/styles/**/*.scss', ['sass', 'cssnano']);
});