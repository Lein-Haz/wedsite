var gulp            = require('gulp'),
    buildConfig     = require('../gulp.buildcfg.js'),
    main            = require('../gulpfile.js'),
    $               = require('gulp-load-plugins')()
    ;
require('run-sequence').use(gulp);


gulp.task('copy:js', function() {
    return gulp.src([
        '!src/**/*.spec.js',
        'src/**/*.js',
        '!src/assets/**/*.js'
    ], {base: './'})
        //adds app non-test JS files to build dir
        .pipe(gulp.dest('build/'))
        ;
});


gulp.task('copy:vendorJs', function() {
    var vendorArray = buildConfig.bower_files.js;//get Vendor Assets in gulp.buildcfg.js
    if(vendorArray){
        /*if array is defined add source assets*/
        //vendorArray.push('bower_files/**/*.js');
    }else{
        /*else set to an array of source assets*/
        vendorArray = [
            'bower_files/**/*.js'
        ];//
    }
    //copy vendor JS to build task
    return gulp.src(vendorArray,{base: './'})
        //copies vendor JS to build dir
        .pipe(gulp.dest('./build/'))
        ;
});

gulp.task('copy:css', function() {
    var isCompile = main.isCompile();
    var assetArray = buildConfig.bower_files.css;//get Vendor Assets in gulp.buildcfg.js
    if(assetArray){
        /*if array is defined add source assets*/
        //assetArray.push('bower_files/**/*.css');
    }else{
        /*else set to an array of source assets*/
        assetArray = [
            'bower_files/**/*.css'
        ];//
    }
    //copy vendor css to build task
    return gulp.src(assetArray,{base: './'})
        .pipe($.if(isCompile, $.cssnano({zindex: false})))
        //copies vendor css to build dir
        .pipe(gulp.dest('./build/'))
    ;
});

gulp.task('copy:assets', function() {
    var assetArray = buildConfig.bower_files.assets;//get Vendor Assets in gulp.buildcfg.js
    if(assetArray){
        /*if array is defined add source assets*/
        //assetArray.push('src/assets/**/*.*');
    }else{
        /*else set to an array of source assets*/
        assetArray = ['src/assets/**/*.*'];//
    }

    //copy assets to build task
    return gulp.src(assetArray,{base: './bower_files/'})
        //copies assets to build dir
        .pipe(gulp.dest('./build/assets'))
        ;
});

