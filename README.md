angular-free-weather-api
=======================

> **Version**: 0.0.1beta

[![Build Status](https://travis-ci.org/rbarilani/angular-free-weather-api.png)](https://travis-ci.org/rbarilani/angular-free-weather-api)

A simple angular implementation for consuming the worldweatheronline.com's REST Api.
http://developer.worldweatheronline.com/io-docs

- - -

## Getting Started

Install with bower:

```sh
$ bower install angular-free-weather-api
```

Includes in your web page:
```javascript
<script src="bower_components/angular-free-weather-api/dist/free-weather-api.min.js"></script>
```



Includes in your angularJS module and set the ***REQUIRED*** api key:

```javascript
angular
    .module('myApp',['rbarilani.freeWeatherApi'])
    .config(function(freeWeatherApiProvider) {
        freeWeatherApiProvider.setApiKey('YOUR_API_KEY_HERE');
    });
```

Use the service:

```javascript
//...

angular
    .module('myApp')

    .controller('MyAppCtrl', function ($log, $scope, freeWeatherApi) {

        // Today's weather in "Verona"
        freeWeatherApi
            .localWeather('Verona')
            .then(function (data) {
                $scope.today = data;
            })
            .catch(function(errorData) {
                $log.error(errorData);
            });

        // The weather of the next 5 days in "Verona" (including today)
        freeWeatherApi
            .localWeather('Verona', { num_of_days: '5' })
            .then(function (data) {
                $scope.nextDays = data;
            })
            .catch(function(errorData) {
                $log.error(errorData);
            });

    });
```


## Documentation

### Provider `freeWeatherApiProvider`

Configure ***freeWeatherApi*** service.

- - -

* **`freeWeatherApiProvider` freeWeatherApiProvider.setApiKey(apiKey)**

  Set the api key for consuming the rest api. ***REQUIRED***

  - `apiKey` `{string}` - Your api key


* **`freeWeatherApiProvider` freeWeatherApiProvider.setParameters(parameters)**

  Merge/override default configuration parameters. ***OPTIONAL***

  Parameters can be given as an object, with the following allowed values (all parameters are ***OPTIONAL***):

  - `version` `{string}` Api version (default: `'v1'`)
  - `premium` `{boolean}` Use the premium version (default: `false`)
  - `url` `{string}` Base url (default: `'http://api.worldweatheronline.com'`)
  - `method` `{string}` $http method we're going to use for the http call, allowed values are `'jsonp'` or `'get'` (default: `'jsonp'`)
  - `params` `{object}` Query parameters for all requests (default: `{ includelocation : 'yes' }`)


### Service `freeWeatherApi`

- - -

* **`promise` freeWeatherApi.localWeather(q, [params, httpConfig])**

  Get worldwide city and town weather by US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) and city name

  - `q` `{string}` US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name ***REQUIRED***

  - `params` `{object}` Query parameters as an object, list for available parameters can be found at http://developer.worldweatheronline.com/io-docs ***OPTIONAL***

  - `httpConfig` `{object}` Object describing the request to be made and how it should be processed, see `$http(config)` at https://docs.angularjs.org/api/ng/service/$http ***OPTIONAL***


* **`promise` freeWeatherApi.skyAndMountainWeather(q, [params, httpConfig])**

  Get nearest worldwide ski and mountain weather by US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) and city name.

  - `q` `{string}` US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name ***REQUIRED***

  - `params` `{object}` Query parameters as an object, list for available parameters can be found at http://developer.worldweatheronline.com/io-docs ***OPTIONAL***

  - `httpConfig` `{object}` Object describing the request to be made and how it should be processed ***OPTIONAL***


* **`promise` freeWeatherApi.marineWeather(q, [params, httpConfig])**

  Get worldwide marine/sailing/surfing weather by Latitude/Longitude (decimal degree) of sea or ocean points.

   - `q` `{string}` Latitude/Longitude (decimal degree) of sea or ocean point ***REQUIRED***

  - `params` `{object}` Query parameters as an object, list for available parameters can be found at http://developer.worldweatheronline.com/io-docs ***OPTIONAL***

  - `httpConfig` `{object}` Object describing the request to be made and how it should be processed ***OPTIONAL***



* **`promise` freeWeatherApi.timezone(q, [params, httpConfig])**

  Retreive current local time and UTC offset hour and minute

   - `q` `{string}` US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name ***REQUIRED***

  - `params` `{object}` Query parameters as an object, list for available parameters can be found at http://developer.worldweatheronline.com/io-docs ***OPTIONAL***

  - `httpConfig` `{object}` Object describing the request to be made and how it should be processed ***OPTIONAL***


* **`promise` freeWeatherApi.search(q, [params, httpConfig])**

  Search for worldwide city and town or if 'wct' parameter is passed then returns nearest locations for the category passed

  - `q` `{string}` US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name ***REQUIRED***

  - `params` `{object}` Query parameters as an object, list for available parameters can be found at http://developer.worldweatheronline.com/io-docs ***OPTIONAL***

  - `httpConfig` `{object}` Object describing the request to be made and how it should be processed  ***OPTIONAL***

