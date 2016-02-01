angular.module( 'wedSite', [
    'templates-app',
    'templates-common',
    'ui.router',
    'ui.bootstrap',
    'ui.utils.masks',
    'ui.utils.masks.helpers',
    'angularMoment',
    'wedSite.home',
    'wedSite.home.events',
    'wedSite.test',
    'wedSite.links',
    'ngMaterial',
    'ui.grid',
    'ngAnimate',
    'duParallax'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
    $urlRouterProvider.otherwise( '/home' );
    $locationProvider.html5Mode( true );
})

.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .dark()
            .primaryPalette('grey',{
                'default': '800',
                'hue-1': '500',
                'hue-2': '200',
                'hue-3': '50'
            })
            .accentPalette('red',{
                'default': '800'
            })
            .backgroundPalette('blue-grey', {
                'default': '900',
                'hue-1': '500',
                'hue-2': '200',
                'hue-3': '50'
            })
            .warnPalette('deep-purple', {
                'default': '700'
            })

        ;
    })

.run( function run () {
})

.controller( 'AppCtrl',[
        '$scope',
        '$location',
        'parallaxHelper',
        function(
            $scope,
            $location,
            parallaxHelper
        ){
            $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if ( angular.isDefined( toState.data.pageTitle ) ) {
                    $scope.pageTitle = 'wedSite | ' + toState.data.pageTitle;
                    $scope.$broadcast('stateChanged');

                }
            });
            $scope.background = parallaxHelper.createAnimator(-0.3);
}])

.controller('NavCtrl',[
        '$scope',
        '$mdSidenav',

        function($scope, $mdSidenav){
            $scope.snapOpts = {
                tapToClose: true,
                touchToDrag: true
            };
            $scope.openLeftMenu = function() {
                $mdSidenav('left').toggle();
            };
            $scope.$on('stateChanged', function(){
                $mdSidenav('left').close();
            });

    }])

;

