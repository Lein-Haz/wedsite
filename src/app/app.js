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
      .primaryPalette('indigo', {
        'default': '600',
        'hue-1': '900',
        'hue-2': '700',
        'hue-3': '200'
      })
      .accentPalette('indigo', {
        'default': '400'
      })
      .backgroundPalette('indigo', {
        'default': '200',
        'hue-1': '900',
        'hue-2': '700',
        'hue-3': '200'
      });
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

        function($scope, $mdSidenav, $mdButton){
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
