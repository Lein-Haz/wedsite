/**
 * Created by Phil on 2/8/2016.
 */
/**
 * @ngdoc service
 * @name wedSite.services.JsonResultsAdapter
 * @description
 * Implementation of breeze jsonResultsAdapter
 */
angular.module('wedSite.services')
    .value('jsonResultsAdapter',
    new breeze.JsonResultsAdapter({

        name: "jsonResultsAdapter",

        /**
         * @ngdoc method
         * @name extractResults
         * @methodOf wedSite.services.jsonResultsAdapter
         * @description
         * returns the response
         * @params {Object} data response from ajax call
         */

        extractResults: function (data) {
            var results = data.results;
            console.log("extract results");
            console.log(results);
            if (!results){
                return false;
            }
            return results;
        },

        /**
         * @ngdoc method
         * @name visitNode
         * @methodOf wedSite.services.jsonResultsAdapter
         * @description
         * steps through each node
         * @params {Object} data response from ajax call
         */

        visitNode: function (node, parseContext, nodeContext) {
            if(node.hasOwnProperty('entityType')){
                console.log('this is a breeze obj');

            }

            /*// Make parser
             if (node.id && node.models) {
             // move 'node.models' links so 'models' can be empty array
             node.modelLinks = node.models;
             node.models = [];
             return { entityType: "Make"  }
             }

             // Model parser
             else if (node.id && node.makeId) {
             // move 'node.make' link so 'make' can be null reference
             node.makeLink = node.make;
             node.make = null;

             // flatten styles and sizes as comma-separated strings
             var styles = node.categories && node.categories["Vehicle Style"];
             node.vehicleStyles = styles && styles.join(", ");
             var sizes = node.categories && node.categories["Vehicle Size"];
             node.vehicleSizes = sizes && sizes.join(", ");

             return { entityType: "Model" };
             }*/

        }

    }));