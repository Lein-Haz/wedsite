/**
 * Created by paz5x4 on 10/14/2015.
 */
angular.module('gulp-bp.home.events', [
    'ui.router'
])

    .config(function config( $stateProvider ) {
        $stateProvider.state( 'home.events', {
            url: '/events',
            parent: 'home',
            views: {
                "more": {
                    controller: 'EventsCtrl',
                    templateUrl: 'home/events/events.tpl.html'
                }
            },
            data:{ pageTitle: 'Events' }
        });
    })

    .controller('EventsCtrl',[
        '$scope',
        function($scope){

        }
    ])
;