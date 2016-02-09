/**
 * Created by Phil on 2/8/2016.
 */
/**
 * @ngdoc service
 * @name wedSite.services.PlayerCrimeDAO
 * @description
 * extends BaseDAO service, used for managing Data Access on Player entities
 * @requires ex.breeze
 * @requires BaseDAO
 *
 */
angular.module('wedSite.services')
    .factory('PlayerCrimeDAO',[
        'breeze',
        'BaseDAO',
        'EntityManager',
        'ApiRouter',
        'ENTITY_TYPES',
        '$q',
        function (breeze, BaseDAO, manager, apiRouter, ENTITY_TYPES, $q) {

            var entityType = ENTITY_TYPES.PLAYER_ENTITY;
            var resource = apiRouter.getResource(entityType, true);
            /**
             * Extend BaseDAO
             * @type {BaseDAO}
             * */
            var svc = new BaseDAO(entityType, resource);

            /**
             * loads classes assigned to teacher's ID
             */
            svc.loadPlayers = function () {
                var deferred = $q.defer();
                loadPlayersCall().then(function (response) {
                    console.log(response);
                    var playerList = [];
                    angular.forEach(response.data, function (playerObject) {
                        playerList.push(svc.createFromServer(playerObject));
                    });
                    deferred.resolve(playerList);
                });
                return deferred.promise;
            };

            return svc;

            function loadPlayersCall(){
                var url = apiRouter.getResource(entityType, true);
                var method = 'GET';
                var headers = null;
                var params = null;
                var data = null;

                return apiRouter.apiCall(headers,method,url,params,data);
            }
        }
    ])
;
