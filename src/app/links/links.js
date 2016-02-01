angular.module('gulp-bp.links',[
    'ui.router'
])

.config(function config( $stateProvider ) {
    $stateProvider.state( 'links', {
        url: '/links',
        views: {
            "main": {
                controller: 'LinksCtrl',
                templateUrl: 'links/links.tpl.html'
            }
        },
        data:{ pageTitle: 'Links' }
    });
})

.controller('LinksCtrl',[
        '$scope',
        function($scope){

        }
    ])
;