/**
 * Created by Phil on 1/27/2016.
 */
var gulp            = require('gulp'),
    $               = require('gulp-load-plugins')(),
    main            = require('../gulpfile.js')
    ;
require('run-sequence').use(gulp);



// SASS Build task
gulp.task('sass:build', function() {
    var isCompile = main.isCompile();
    var s = $.size();
    return gulp.src('src/**/*.scss')
        //.pipe($.sourcemaps.init())
        .pipe($.sass({
            style: 'compact'
        }))
        .pipe($.concat('app.css'))
        .pipe($.autoprefixer('last 3 version'))
        .pipe($.if(isCompile, $.uncss(
            {
                html: [
                    './src/index.html',
                    './src/**/*.tpl.html'
                ]
            }
        )))
        .pipe($.if(isCompile, $.cssnano({zindex: false})))//don't attempt to normalize z-indices
        .pipe($.if(isCompile, $.rename({suffix: '.min'})))
        //.pipe($.sourcemaps.write())
        .pipe(gulp.dest('build/styles'))
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            message: function() {
                return 'Total CSS size ' + s.prettySize;
            }
        }));
});

//separate for compile perhaps?
gulp.task('sass:concat', function () {
    return gulp.src('build/styles/**/*.css')
        .pipe($.concat('styleComp.min.css'))
        .pipe(gulp.dest('build/styles'))
});