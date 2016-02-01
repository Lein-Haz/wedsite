angular.module('gulp-bp.test',[
    'ui.router'
])

    .config(function config( $stateProvider ) {
        $stateProvider.state( 'test', {
            url: '/test',
            views: {
                "main": {
                    controller: 'TestCtrl',
                    templateUrl: 'test/test.tpl.html'
                }
            },
            data:{ pageTitle: 'Test' }
        });
    })

    .controller('TestCtrl',[
        '$scope',
        function($scope){
            $scope.gridOptions = {
                data: 'gridData',
                enableSorting: 'true',
                columnDefs: [
                    {
                        displayName: 'Name',
                        field: 'name'
                    },
                    {
                        displayName: 'Favorite Color',
                        field: 'color'
                    }

                ]
            };

            $scope.gridData = [
                {
                    name: 'Bob',
                    color: 'Red'
                },
                {
                    name: 'Jan',
                    color: 'Green'
                },
                {
                    name: 'Brantley',
                    color: 'Brantley is a stupid name'
                },
                {
                    name: 'John',
                    color: 'Orange'
                }

            ];


        }
    ])


;