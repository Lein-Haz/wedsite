/**
 * Created by Phil on 2/8/2016.
 */
angular.module('wedSite.apiDemo',[
    'ui.router'
])

    .config(['$stateProvider',function config( $stateProvider ) {
        $stateProvider.state( 'problems', {
            url: '/problems',
            views: {
                "main": {
                    controller: 'ApiDemoCtrl',
                    templateUrl: 'nflClowns/apiDemo.tpl.html'
                }
            },
            data:{ pageTitle: 'Who got Arrested' },
            resolve:{
                teams : ['TeamCrimeDAO', function(teamCrimeDAO){
                    return teamCrimeDAO.loadTeams();
                }]

            }
        });
    }])

    .controller('ApiDemoCtrl',[
        '$scope',
        'TeamCrimeDAO',
        'PlayerCrimeDAO',
        function(
            $scope,
            teamCrimeDAO,
            playerCrimeDAO
        ){
            $scope.playerGrid = {
                data: 'playerArrestData',
                enableSorting: 'true',
                columnDefs: [
                    {
                        displayName: 'Name',
                        field: 'Name'
                    },
                    {
                        displayName: 'Position',
                        field: 'Position'
                    },
                    {
                        displayName: 'Arrest Count',
                        field: 'arrest_count'
                    }
                ]
            };
            $scope.teamGrid = {
                data: 'teamArrestData',
                enableSorting: 'true',
                columnDefs: [
                    {
                        displayName: 'Team name',
                        field: 'Team'
                    },
                    {
                        displayName: 'Total Arrest Count',
                        field: 'arrest_count'
                    }
                ]
            };



            $scope.teamArrestData = teamCrimeDAO.get();
            $scope.makeCall = function () {
                console.log('button clicked');
                playerCrimeDAO.loadPlayers().then(function () {
                    $scope.playerArrestData = playerCrimeDAO.get();
                    console.log($scope.playerArrestData);
                });
            };


        }
    ])


;