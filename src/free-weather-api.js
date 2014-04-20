'use strict';

/**
 * @ngdoc module
 * @name hal9087.freeWeatherApi
 *
 * @description
 * worldweatheronline.com rest client for the free rest api
 *
 * http://developer.worldweatheronline.com/io-docs
 *
 * @author Ruben Barilani
 * @license
 */
angular.module('hal9087.freeWeatherApi', [])


/**
 * @ngdoc constant
 * @name FREE_WEATHER_API_DEFAULT_PARAMETERS
 */
    .constant('FREE_WEATHER_API_DEFAULT_PARAMETERS', {
        version : 'v1',
        url: 'http://api.worldweatheronline.com/free',
        method : 'jsonp',
        endPoints : {
            localWeather: '/weather.ashx',
            skyAndMountainWeather: '/sky.ashx',
            marineWeather: '/marine.ashx',
            timezone: '/tz.ashx',
            search: '/search.ashx'
        },
        params: {
            format: 'json',
            includelocation: 'yes'
        }
    })

/**
 * @ngdoc provider
 * @name freeWeatherApiProvider
 *
 * @description
 * Configurator for the freeWeatherApi service
 *
 * @example

 angular.module('myApp',['hal9087.freeWeatherApi'])

 .config(function (freeWeatherApiProvider) {

        freeWeatherApiProvider
            .setApiKey('MY_API_KEY')          // required

            .setParameters({                  // optional, this are defaults
                version : 'v1',
                url: 'http://api.worldweatheronline.com/free',
                endPoints : {
                    localWeather: '/weather.ashx',
                     skyAndMountainWeather: '/sky.ashx',
                     marineWeather: '/marine.ashx',
                     timezone: '/tz.ashx',
                     search: '/seach.ashx'
                },
               params: {
                   format: 'json',
                   includelocation: 'yes'
               }
            });
    })
 .run(function ($scope, freeWeatherApi) {

        freeWeatherApi
            .localWeather('New York', [ extraParams, httpConfig ])
            .then(function(data) {
                $scope.data = data;
            })
            .catch(function(errorData)) {
                $scope.errorData = errorData;
            });
    });
 *
 *
 */
    .provider('freeWeatherApi', ['FREE_WEATHER_API_DEFAULT_PARAMETERS', function (FREE_WEATHER_API_DEFAULT_PARAMETERS) {
        var provider = this,
            key,
            defaultParameters = FREE_WEATHER_API_DEFAULT_PARAMETERS,
            parameters = defaultParameters,
            utils = {
                url : function (endPoint) {
                    return parameters.url + '/' + parameters.version + endPoint;
                },
                config : function (q, params, httpConfig) {
                    var httpParams;

                    params = params || {};

                    if(parameters.method === 'jsonp') {
                        params.callback = 'JSON_CALLBACK';
                    }

                    httpParams = angular.extend(
                        {key :  provider.getApiKey(), 'q' : q },
                        angular.extend(parameters.params, params)
                    );

                    return angular.extend({params : httpParams}, httpConfig || {});
                }
            };

        /**
         * @ngdoc method
         * @name freeWeatherApiProvider#setParameters
         *
         * @description Merge parameters with default
         *
         * @param {Object} params
         * @returns {Object} provider
         */
        provider.setParameters = function (params) {
            parameters = angular.extend(defaultParameters, params);
            return provider;
        };

        /**
         * @ngdoc method
         * @name freeWeatherApiProvider#setApiKey
         *
         * @param {string} apiKey
         * @returns {Object} provider
         */
        provider.setApiKey = function (apiKey) {
            key = apiKey;
            return provider;
        };

        /**
         * @ngdoc method
         * @name freeWeatherApiProvider#getApiKey
         *
         * @returns {string} key
         */
        provider.getApiKey = function () {
            return key;
        };

        provider.$get = ['$q','$http', function ($q, $http) {

            /**
             * @ngdoc service
             * @name freeWeatherApi
             *
             * @description
             * Free Weather Api Service
             */

            if(!angular.isString(provider.getApiKey())) {
                throw new Error('You must provide a valid Free Weather Api Key, actual is : ' + provider.getApiKey());
            }

            var endPoints = parameters.endPoints,
                urls = {
                    localWeather          : utils.url(endPoints.localWeather),
                    skyAndMountainWeather : utils.url(endPoints.skyAndMountainWeather),
                    marineWeather         : utils.url(endPoints.marineWeather),
                    timezone              : utils.url(endPoints.timezone),
                    search                : utils.url(endPoints.search)
                },
                service = {};

            function fnFactory(url) {

                return function (q, params, httpConfig) {

                    var config     = utils.config(q, params, httpConfig),
                        deferred   = $q.defer(),
                        httpMethod = parameters.method,
                        searchApiKey = 'search_api';

                    $http
                        [httpMethod](url, config)
                        .then(function(response){

                            var data;

                            if(response.data && response.data.data && response.data.data.error) {

                                response.status = 400;

                                deferred.reject({
                                    error : angular.copy(response.data.data.error),
                                    originalResponse : response
                                });
                                return;
                            }

                            if(response.data.data) {

                                data = angular.copy(response.data.data);

                            }else if(response.data[searchApiKey] && response.data[searchApiKey].result) {

                                data = angular.copy(response.data[searchApiKey].result);

                            }else{

                                data = angular.copy(response.data);
                            }

                            deferred.resolve ({
                                data : data,
                                originalResponse : response
                            });
                        })
                        .catch(function (response){
                            deferred.reject({
                                error : [
                                    { msg : 'Unknown error! ' }
                                ],
                                originalResponse : response
                            });
                        });

                    return deferred.promise;
                };
            }

            /**
             * @ngdoc method
             * @name freeWeatherApi#localWeather
             *
             * @param q
             * @param params
             * @param httpConfig
             *
             * @return {Promise}
             */
            service.localWeather = function (q, params, httpConfig) {};

            /**
             * @ngdoc method
             * @name freeWeatherApi#skyAndMountainWeather
             *
             * @param q
             * @param params
             * @param httpConfig
             *
             * @return {promise}
             */
            service.skyAndMountainWeather = function (q, params, httpConfig) {};

            /**
             * @ngdoc method
             * @name freeWeatherApi#marineWeather
             *
             * @param q
             * @param params
             * @param httpConfig
             *
             * @return {promise}
             */
            service.marineWeather = function (q, params, httpConfig) {};

            /**
             * @ngdoc method
             * @name freeWeatherApi#timezone
             *
             * @param q
             * @param params
             * @param httpConfig
             *
             * @return {promise}
             */
            service.timezone = function (q, params, httpConfig) {};

            /**
             * @ngdoc method
             * @name freeWeatherApi#search
             *
             * @param q
             * @param params
             * @param httpConfig
             *
             * @return {promise}
             */
            service.search = function (q, params, httpConfig) {};


            // real http functions implementation factory
            angular.forEach(urls, function (url, methodName) {
                service[methodName]  = fnFactory(url);
            });

            /**
             * Get the apiKey
             * @returns {string}
             */
            service.getApiKey = function () {
                return provider.getApiKey();
            };

            return service;

        }];

        return provider;
    }]);