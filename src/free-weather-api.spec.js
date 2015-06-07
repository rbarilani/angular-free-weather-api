'use strict';

describe('rbarilani.freeWeatherApi', function () {

    describe('freeWeatherApiProvider', function () {

        var freeWeatherApiProvider,
            apiKey = 'foobar',
            baseExpectedUrl = '/free/test/weather.ashx?callback=JSON_CALLBACK&format=json&includelocation=yes&key=foobar';

        beforeEach(function () {


            // Initialize the service provider
            // by injecting it to a fake module's config block
            var fakeModule = angular.module('test.app.config',[]);

            fakeModule.config( function (_freeWeatherApiProvider_) {
                freeWeatherApiProvider = _freeWeatherApiProvider_;
                freeWeatherApiProvider.setParameters({
                    url : '',
                    version : 'test'
                });

                freeWeatherApiProvider.setApiKey(apiKey);
            })
            .controller('TestCtrl', function ($scope, freeWeatherApi) {
                $scope.weatherData =  freeWeatherApi
                    .localWeather($scope.city).$data;
            });

            // Initialize test.app injector
            module('rbarilani.freeWeatherApi', 'test.app.config');

            // Kickstart the injectors previously registered
            // with calls to angular.mock.module
            inject(function () {});
        });



        it('Should exists, be defined', function () {
            expect(freeWeatherApiProvider).toBeDefined();
        });


        it('Should have a getApiKey/setApiKey methods', function () {
            expect(typeof freeWeatherApiProvider.getApiKey).toBe('function');
            expect(typeof freeWeatherApiProvider.setApiKey).toBe('function');
            expect(freeWeatherApiProvider.getApiKey()).toBe(apiKey);
        });

        describe('freeWeatherApi', function () {
            var freeWeatherApi;

            beforeEach(inject(function(_freeWeatherApi_) {
                freeWeatherApi = _freeWeatherApi_;
            }));

            afterEach(function () {
                freeWeatherApi = undefined;
            });


            it('Should have this functions and aren\'t empty functions', function () {
                angular.forEach([
                    'localWeather',
                    'skyAndMountainWeather',
                    'marineWeather',
                    'timezone',
                    'search',
                    'getApiKey'
                ], function (methodName) {
                    expect(typeof freeWeatherApi[methodName]).toBe('function');
                    expect(freeWeatherApi[methodName].toString()).not.toEqual('function (q, params, httpConfig) {}');
                });
            });

            describe('localWeather', function () {
                var $httpBackend;

                beforeEach(inject(function(_$httpBackend_) {
                    $httpBackend = _$httpBackend_;
                }));

                afterEach(function() {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                    $httpBackend.resetExpectations();
                });

                it('Should call the correct end point with correct params', function () {
                    var expectedResponseData = {
                            data : {}
                        },
                        actualResponse = {};

                    $httpBackend
                        .expectJSONP(baseExpectedUrl + '&q=Rome')
                        .respond(function () {
                            return [200, expectedResponseData];
                        });

                    freeWeatherApi
                        .localWeather('Rome')
                        .then(function (response) {
                            actualResponse = response;

                        });


                    $httpBackend.flush();

                    expect(actualResponse.data).toBeDefined();
                    expect(actualResponse.data).toEqual(expectedResponseData.data);
                });


                it('Should reject when error response', function () {
                    var responseData = {
                        data : {
                            'error': [{
                                'msg': 'Unable to find any matching weather location to the query submitted!'
                            }]
                        }
                    };

                    var actualResponse = {};

                    $httpBackend
                        .expectJSONP(baseExpectedUrl +'&q=WrongPlace28923829')
                        .respond(function () {
                            return [200, responseData];
                        });

                    freeWeatherApi
                        .localWeather('WrongPlace28923829')
                        .then(function (){})
                        .catch(function (response){
                            actualResponse = response;
                        });

                    $httpBackend.flush();
                    expect(actualResponse.error).toBeDefined();
                    expect(actualResponse.error).not.toEqual(responseData.error);
                });

                it('Should take optional parameters', function () {
                    var responseData = {
                            data : {}
                        },
                        actualResponse = {};

                    $httpBackend
                        .expectJSONP(baseExpectedUrl + '&num_of_days=2&q=Rome')
                        .respond(function () {
                            return [200, responseData];
                        });


                    freeWeatherApi
                        .localWeather('Rome', {'num_of_days' : 2 })
                        .then(function (response){
                            actualResponse = response;
                        });

                    $httpBackend.flush();
                    expect(actualResponse.data).toBeDefined();
                    expect(actualResponse.data).toEqual(responseData.data);
                });



            });
        });


        describe('magic resolve', function () {
            var $httpBackend;


            beforeEach(inject(function(_$httpBackend_) {
                $httpBackend = _$httpBackend_;
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should fill the object with data result, when resolved' ,inject(function ($rootScope, $controller) {
                var $scope = $rootScope.$new();

                $scope.city = 'NewYoriyiutyyk';
                var ctrl = $controller('TestCtrl', {
                    $scope : $scope
                });

                $httpBackend
                    .expectJSONP(baseExpectedUrl + '&q=' + $scope.city )
                    .respond(function () {
                        return [200, {data:{foo:1}}];
                    });

                expect($scope.weatherData).toEqual({});

                $httpBackend.flush();

                expect($scope.weatherData).toBeDefined();
                expect($scope.weatherData).not.toEqual({});
                expect($scope.weatherData).toEqual({foo:1});
            }));
        });

    });

});
