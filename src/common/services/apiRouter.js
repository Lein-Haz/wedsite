/**
 * Created by Phil on 2/8/2016.
 */
angular.module('wedSite.services')
    .service('ApiRouter',[
        '$http',
        'ENTITY_TYPES',
        function(
            $http,
            ENTITY_TYPES
        ){
            var service = {};
            var urlBase,
                serviceName
                ;

            var playerRes,
                teamRes
                ;


            /**
             * API Services points
             */
            urlBase = 'http://www.nflarrest.com/api/v1/';
            serviceName = null;

            /**
             * Resources
             */
            teamRes = urlBase + 'team/';
            playerRes = urlBase + 'player';



            /**
             * resource = tablename
             * endpoint = api name
             * */
            var res = {};
            service.getResource = function(resource, relFlag){
                switch (resource){
                    case ENTITY_TYPES.TEAM_ENTITY:
                        res=getEndPointUrl(teamRes, relFlag);
                        return res;
                    case ENTITY_TYPES.PLAYER_ENTITY:
                        res=getEndPointUrl(playerRes, relFlag);
                        return res;
                }
            };
            service.getServiceName = function(){
                return serviceName;
            };
            service.getParams = function () {
                return null;
            };


            service.apiCall = function(headers,method,url,params,data){
                var query = {
                    headers: headers,
                    method: method,
                    url: url,
                    params: params,
                    data: data
                };
                return $http(query);
            };
            return service;


            function getEndPointUrl(resource, relativePathFlag){
                //cause we don't Env specific paths
                relativePathFlag = true;
                //cause we don't Env specific paths

                var path;
                if(relativePathFlag){
                    path = resource;
                }else{
                    path = serviceName + resource;
                }
                console.log(path);
                return path;

            }


        }

    ])
;
