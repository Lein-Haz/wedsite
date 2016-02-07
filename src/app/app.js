angular.module( 'wedSite', [
    'templates-app',
    'templates-common',
    'ui.router',
    'ui.bootstrap',
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

.config(['$stateProvider','$urlRouterProvider' ,function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/home' );
}])

.config(['$mdThemingProvider', function ($mdThemingProvider) {
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
}])

.run([ function run () {
}])

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

