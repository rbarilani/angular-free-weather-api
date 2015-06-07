'use strict';

(function (angular){
    angular
        .module('freeWeatherApiDemoApp', ['rbarilani.freeWeatherApi'])

        .config(function (freeWeatherApiProvider){

            freeWeatherApiProvider.setApiKey('mf64nhwethefscaxk2tv5wba');
        })

        .run(function ($rootScope, $q, freeWeatherApi){

            $rootScope.city = 'Verona';
            $rootScope.days = 1;
            $rootScope.weather = {};

            $rootScope.getInfo = function (city , days) {

                $rootScope.weather.error = undefined;
                $rootScope.weather.data  = undefined;

                freeWeatherApi
                    .localWeather(city, {num_of_days: days})
                    .then(function (response) {
                        $rootScope.weather.data = response.data;
                    })
                    .catch(function(response){
                        $rootScope.weather.error = response.error;
                    });
            };

        });
})(angular);
