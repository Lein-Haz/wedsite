/**
 * Created by Phil on 2/8/2016.
 */
/**
 * @ngdoc service
 * @name wedSite.services.modelProvider
 * @description
 * central place to manage models used by views
 * @requires ex.breeze
 * @requires wedSite.models
 */

angular.module('wedSite.services')
    .service('ModelRegister',[
        'breeze',
        'TeamModel',
        'PlayerModel',
        function (
            breeze,
            teamModel,
            playerModel
        ) {
            /**
             * Calls init to register these entities with the
             * breeze metadata store
             */
            this.initialize = function (metaDataStore) {
                teamModel.init(metaDataStore);
                playerModel.init(metaDataStore);
            };

        }
    ])
;