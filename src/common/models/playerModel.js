/**
 * Created by Phil on 2/8/2016.
 */
/**
 * @ngdoc object
 * @name wedSite.models.playerModel
 * @description
 * class model factory
 * @requires ex.breeze
 *
 */

angular.module('wedSite.models')
    .factory('PlayerModel',[
        'breeze',
        'ENTITY_TYPES',
        function (breeze, ENTITY_TYPES) {
            var DT = breeze.DataType;
            return {
                meta: {
                    namespace: "wedSite",
                    shortName: ENTITY_TYPES.PLAYER_ENTITY,
                    defaultResourceName: ENTITY_TYPES.PLAYER_ENTITY,
                    autoGeneratedKeyType: breeze.AutoGeneratedKeyType.Identity,
                    dataProperties: {
                        Name: {dataType: DT.String, isPartOfKey: true},
                        arrest_count: {dataType: DT.Int32},
                        Position: {dataType: DT.String, isPartOfKey: true}
                    },
                    navigationProperties:{
                    }
                },
                init : function (metadataStore) {
                    metadataStore.addEntityType(this.meta);
                }
            };
        }
    ])
;