/**
 * Created by Phil on 2/8/2016.
 */
/**
 * @ngdoc service
 * @name wedSite.services.BaseDAO
 * @description
 * extendable services for managing Data Access and CRUD remotely and locally
 * @requires ex.breeze
 *
 */
angular.module('wedSite.services')
    .factory('BaseDAO',[
        'breeze',
        'ApiRouter',
        'EntityManager',
        '$q',
        function(breeze, apiRouter,entityManager, $q){
            /**
             * BaseDAO constructor
             * @param entityType
             * @param resource
             * @returns{
             * {
             * load: function,
             * get: function,
             * create: function,
             * update: function,
             * createFromServer: function
             * }
             * }
             */


            var baseDAO = function(entityType, resource){
                return {
                    load: function () {
                        return serverLoad(resource);
                    },
                    get: function(){
                        return getFromLocal(entityType);
                    },
                    getWhere: function(column, value){
                        return getLocalCond(entityType, column, value);
                    },
                    create: function(data){
                        return serverCreate(data);
                    },
                    update: function (data) {
                        return serverUpdate(data);
                    },
                    createFromServer: function (values) {
                        return entityManager.createEntityFromServer(entityType, values);
                    }
                };
            };
            return baseDAO;

            function getFromLocal(entityType) {
                console.log(entityType);
                var query = breeze.EntityQuery
                    .from(entityType);
                return entityManager.executeQueryLocally(query);
            }

            function getLocalCond(entityType, column, value) {
                console.log(entityType);
                var query = breeze.EntityQuery
                    .from(entityType)
                    .where(column, 'equals', value);
                return entityManager.executeQueryLocally(query);
            }

            function serverLoad(resource){
                var query = breeze.EntityQuery
                    .from(resource);
                return entityManager.executeQuery(query);
            }

            function serverCreate(data){
                var deferred = $q.defer();
                createHelperCall(data)
                    .then(function (response) {
                        var serverEntity = entityManager.createEntityFromServer(entityType, response);
                        deferred.resolve(serverEntity);
                    });
                return deferred.promise;
            }

            function createHelperCall(data){
                console.log(data);
                var url = apiRouter.getServiceName();
                var method = 'POST';
                var params = apiRouter.getParams();
                var headers = null;
                return apiRouter.apiCall(headers,method,url,params,data);
            }
            function serverUpdate(data){
                var deferred = $q.defer();
                updateHelperCall(data)
                    .then(function (response) {
                        var serverEntity = entityManager.saveChangesLocalForEntityType(entityType, response);
                        deferred.resolve(serverEntity);
                    });
                return deferred.promise;
            }
            function updateHelperCall(data){
                var url = apiRouter.getServiceName() + resource;
                var method = 'PUT';
                var params = null;
                var headers = null;
                return apiRouter.apiCall(headers,method,url,params,data);
            }
        }
    ])
;
