/**
 * Created by Phil on 2/8/2016.
 */
/**
 * @ngdoc service
 * @name wedSite.services.EntityManager
 * @description
 * Implementation of breeze entity manager
 *
 */
angular.module('wedSite.services')
    .factory('EntityManager',[
        'breeze',
        'ApiRouter',
        'ModelRegister',
        'jsonResultsAdapter',
        function (breeze, apiRouter, modelRegister, jsonResultsAdapter) {

            var servName = apiRouter.getServiceName();



            var dataService = new breeze.DataService({
                serviceName: servName,
                hasServerMetadata: false,
                jsonResultsAdapter: jsonResultsAdapter
            });
            dataService.serviceName = servName;


            var manager = new breeze.EntityManager({dataService: dataService});
            setQueryOptions(false);


            //initialize Entities
            modelRegister.initialize(manager.metadataStore);

            //get the current AJAX adapter
            var ajaxAdapter = breeze.config.getAdapterInstance('ajax');

            //do i need?
            ajaxAdapter.requestInterceptor = function (requestInfo) {
                //requestInfo.config.params = apiRouter.defaultParams();
                //requestInfo.config.headers = apiRouter.getHeader();
                console.log(requestInfo);

            };

            /******************
             * custom methods *
             ******************/

            /**
             * @ngdoc method
             * @name includeDeletedInQueries
             * @methodOf wedSite.services.entityManager
             * @description
             * sets query to return deleted
             */
            manager.includeDeletedInQueries = function(){
                setQueryOptions(true);

            };
            /**
             * @ngdoc method
             * @name excludeDeletedInQueries
             * @methodOf wedSite.services.entityManager
             * @description
             * sets query to not return deleted
             */
            manager.excludeDeletedInQueries = function(){
                setQueryOptions(false);
            };

            /**
             * @ngdoc method
             * @name saveChangesLocalForEntityType
             * @methodOf wedSite.services.entityManager
             * @description
             * Sets entities of specified type to unchanged, this leads to breeze keeping them in cache
             * @params {String} A name of an entityType
             *
             */
            manager.saveChangesLocalForEntityType = function(entityType){
                var changes = this.getChanges();
                angular.forEach(changes, function (changeObj) {

                    //if changed entities' type name is same as supplied type
                    if(changeObj.entityType.shortName == entityType){

                        //and if the entities are not slated for deletion
                        if(changeObj.entityAspect.entityState != 'Deleted'){
                            changeObj.entityAspect.setUnchanged();//set to unchanged
                        }else{
                            changeObj.entityAspect.setDetached();//set to detached
                        }

                    }
                });
                return changes;
            };
            /**
             * @ngdoc method
             * @name getChangesForEntityType
             * @methodOf wedSite.services.entityManager
             * @description
             * Gets the changes for the supplied entity type
             * @params {String} A name of an entityType
             *
             */
            manager.getChangesForEntityType = function(entityType){
                var entities = manager.metadataStore.getEntityType(entityType);
                return manager.getChanges(entities);
            };
            /**
             * @ngdoc method
             * @name createEntityFromServer
             * @methodOf wedSite.services.entityManager
             * @description
             * Creates and initializes an entity
             * @params {String} A name of an entityType
             *
             */
            manager.createEntityFromServer = function(entityType, data){
                var mergeStrategy = manager.queryOptions.mergeStrategy;
                var entity = manager.createEntity(entityType, data, breeze.EntityState.Unchanged, mergeStrategy);

                return entity;
            };

            /**
             * @ngdoc method
             * @name createEntityFromServer
             * @methodOf wedSite.services.entityManager
             * @description
             * serializes entity removing navigation properties to create flat json
             * @params {String} A name of an entityType
             *
             */
            manager.getSerializableDataProperties = function(entity){
                return flatten(entity);
            };

            function flatten(entity){
                var data = {};
                if(entity.entityType.dataProperties){
                    angular.forEach(entity.entityType.dataProperties, function (dataProp) {
                        if((dataProp.isDataProperty) && (!dataProp.isNavigationProperty)){
                            data[dataProp.name] = entity.getProperty(dataProp.name);
                        }
                    });
                }
                return data;
            }

            function setQueryOptions(condition){
                var mQueryOptions = new breeze.QueryOptions({
                    mergeStrategy: breeze.MergeStrategy.OverwriteChanges,
                    includeDeleted: condition
                });
                manager.setProperties({ queryOptions: mQueryOptions});
            }
            return manager;
        }

    ])

;