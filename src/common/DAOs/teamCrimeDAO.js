/**
 * Created by Phil on 2/8/2016.
 */
/**
 * @ngdoc service
 * @name wedSite.services.TeamCrimeDAO
 * @description
 * extends BaseDAO service, used for managing Data Access on Team entities
 * @requires ex.breeze
 * @requires BaseDAO
 *
 */
angular.module('wedSite.services')
    .factory('TeamCrimeDAO',[
        'breeze',
        'BaseDAO',
        'EntityManager',
        'ApiRouter',
        'ENTITY_TYPES',
        '$q',
        function (breeze, BaseDAO, manager, apiRouter, ENTITY_TYPES, $q) {

            var entityType = ENTITY_TYPES.TEAM_ENTITY;
            var resource = apiRouter.getResource(entityType, true);
            /**
             * Extend BaseDAO
             * @type {BaseDAO}
             * */
            var svc = new BaseDAO(entityType, resource);

            /**
             * loads classes assigned to teacher's ID
             */
            svc.loadTeams = function () {
                var deferred = $q.defer();
                loadTeamsCall().then(function (response) {
                    console.log(response);
                    var teamList = [];
                    angular.forEach(response.data, function (teamObject) {
                        teamList.push(svc.createFromServer(teamObject));
                    });
                    deferred.resolve(teamList);
                });
                return deferred.promise;
            };

            return svc;

            function loadTeamsCall(){
                var url = apiRouter.getResource(entityType, true);
                var method = 'GET';
                var headers = null;
                var params = null;
                var data = null;


                console.log('API Call config is');
                console.log(url);
                console.log(headers);
                console.log(params);
                console.log(data);


                return apiRouter.apiCall(headers,method,url,params,data);
            }
        }
    ])
;
