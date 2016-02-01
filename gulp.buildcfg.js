/**
 * Created by Phil on 1/24/2016.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build',
    compile_dir: 'bin',
    tester: function(){
        return testFunc();
    },
    //TODO edit
    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    bower_files: {
        js: [
            'bower_files/angular/angular.min.js',
            'bower_files/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_files/angular-ui-router/release/angular-ui-router.min.js',
            'bower_files/moment/min/moment.min.js',
            'bower_files/angular-moment/angular-moment.min.js',
            'bower_files/angular-ui-grid/ui-grid.min.js',
            'bower_files/angular-input-masks/angular-input-masks-standalone.min.js',
            'bower_files/angular-animate/angular-animate.min.js',
            'bower_files/angular-material/angular-material.min.js',
            'bower_files/angular-animate/angular-animate.min.js',
            'bower_files/angular-aria/angular-aria.min.js',
            'bower_files/angular-scroll/angular-scroll.min.js',
            'bower_files/ng-parallax/angular-parallax.min.js',
        ],
        css: [
            'bower_files/angular-ui-grid/ui-grid.min.css',
            'bower_files/bootstrap/dist/css/bootstrap.min.css',
            'bower_files/angular-material/angular-material.min.css',
        ],
        assets: [
            'bower_files/angular-ui-grid/ui-grid.svg',
            'bower_files/angular-ui-grid/ui-grid.ttf',
            'bower_files/angular-ui-grid/ui-grid.woff',
            'bower_files/angular-ui-grid/ui-grid.eot'
        ]
    }
};

function testFunc(){
    return 'Oh yeah';
}
