'use strict';
var ApplicationConfiguration = (function() {
    var applicationModuleName = 'angularjsapp';
    var applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngStorage', 'uiGmapgoogle-maps', 'monospaced.elastic'];
    var registerModule = function(moduleName) {
        angular
            .module(moduleName, []);
        angular
            .module(applicationModuleName)
            .requires
            .push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

'use strict';

angular
    .module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular
    .module(ApplicationConfiguration.applicationModuleName)
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ])
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDfKyIsQyXUKsZpZTqXjkqPDVqQvCNrtDw',
            v: '3',
            libraries: 'weather,geometry,visualization'
        });
    });
angular
    .element(document)
    .ready(function() {
        if (window.location.hash === '#_=_') {
            window.location.hash = '#!';
        }
        angular
            .bootstrap(document,
                [ApplicationConfiguration.applicationModuleName]);

        console.log('app loaded');
    });

'use strict';

ApplicationConfiguration.registerModule('core');

'use strict';

angular
    .module('core')
    .config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

                        $stateProvider
              .state('home', {
                url: '/',
                views: {
                  'home': {
                    templateUrl: 'modules/core/views/home.html',
                    controller: 'HomeController'
                  }
                }
              })

              .state('home.login', {
                url: 'login',
                views: {
                  'home@': {
                    templateUrl: 'modules/core/views/login.html',
                    controller: 'LoginController'
                  }
                }
              })

              .state('home.loginli', {
                url: 'loginli',
                views: {
                  'home@': {
                    templateUrl: 'modules/core/views/loginli.html',
                    controller: 'LoginLiController'
                  }
                }
              })

              .state('home.map', {
                url: 'map',
                views: {
                  'home@': {
                    templateUrl: 'modules/core/views/map.html',
                    controller: 'MapController'
                  }
                }
              })

              .state('home.map.filter', {
                url: '/filter',
                views: {
                  'filter@home.map': {
                    templateUrl: 'modules/core/views/filter.html',
                    controller: 'FilterController'
                  }
                }
              })
              .state('home.map.menu', {
                url: '/menu',
                views: {
                  'menu@home.map': {
                    templateUrl: 'modules/core/views/menu.html',
                    controller: 'MenuController'
                  },
                  'menuList@home.map.menu': {
                    templateUrl: 'modules/core/views/menu-list.html',
                    controller: 'MenuController'
                  },
                  'menuFooter@home.map.menu': {
                    template: '<div class="menuFooter"><div class="back-button ion-close" ui-sref="home.map"></div><div class="main-title"></div><div class="settings-button ion-gear-a" ui-sref="home.map.menu.settings"></div></div>',
                    controller: 'MenuController'
                  }
                }
              })

              .state('home.map.menu.settings', {
                  url: '/settings',
                  views: {
                    'settings@home.map.menu': {
                      templateUrl: 'modules/core/views/settings.html',
                      controller: 'SettingsController'
                    },
                    'menuFooter@home.map.menu': {
                      template: '<div class="menuFooter openSettings"><div class="back-button ion-chevron-down" ui-sref="home.map.menu"></div>',
                      controller: 'SettingsController'
                    }
                  }
              })

              .state('home.map.menu.alumni', {
                  url: '/alumni',
                  views: {
                    'alumni@home.map.menu': {
                      templateUrl: 'modules/core/views/alumni.html',
                      controller: 'AlumniController'
                    },
                    'menuFooter@home.map.menu': {
                      template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu"></div><div class="main-title"></div></div>',
                      controller: 'AlumniController'
                    }
                  }
              })

              .state('home.map.menu.alumni.alumn', {
                  url: '/:id',
                  views: {
                      'alumn@home.map.menu.alumni': {
                        templateUrl: 'modules/core/views/alumn.html',
                        controller: 'AlumnController'
                      },
                      'menuFooter@home.map.menu': {
                        template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu.alumni"></div></div>',
                        controller: 'AlumnController'
                      }
                  }
              })

              .state('home.map.menu.companies', {
                  url: '/companies',
                  views: {
                    'companies@home.map.menu': {
                      templateUrl: 'modules/core/views/companies.html',
                      controller: 'CompaniesController'
                    },
                    'menuFooter@home.map.menu': {
                      template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu"></div><div class="main-title"></div></div>',
                      controller: 'CompaniesController'
                    }
                  }
              })

              .state('home.map.menu.companies.company', {
                  url: '/:id',
                  views: {
                      'company@home.map.menu.companies': {
                        templateUrl: 'modules/core/views/company.html',
                        controller: 'CompanyController'
                      },
                      'menuFooter@home.map.menu': {
                        template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu.companies"></div></div>',
                        controller: 'CompanyController'
                      }
                  }
              })

              .state('home.map.menu.profile', {
                  url: '/profile',
                  views: {
                    'profile@home.map.menu': {
                      templateUrl: 'modules/core/views/profile.html',
                      controller: 'ProfileController'
                    },
                    'menuFooter@home.map.menu': {
                      template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu"></div><div class="main-title"></div></div>',
                      controller: 'CompaniesController'
                    }
                  }
              });
        }
    ]);

'use strict';

angular
    .module('core')
    .factory('SharedData',
        function() {

            var alumni = [];

            var companies = [];

            return {

                                listAlumni: function() {
                  return alumni;
                },

                listCompanies: function() {
                  return companies;
                },

                                findAlumn: function( id ) {

                  if ( id === undefined ) return false;

                    for (var i = 0; i < alumni.length; i++) {
                      if ( alumni[i].id === id ) {
                        return alumni[i];
                      }
                    };
                    return false;
                },

                findCompany: function( id ) {
                  for (var i = 0; i < companies.length; i++) {
                    if ( companies[i].id === id ) {
                      return companies[i];
                    }
                  };
                  return false;
                },

                addAlumni: function( alumni_object ) {
                  alumni.push( alumni_object );
                },

                addCompany: function( company_object ) {
                  companies.push( company_object );
                },

                updateAlumni: function( alumni_object ) {

                  var alumni = this.findAlumn( alumni_object.id );

                  for ( var keys in alumni_object ) {
                    alumni[ keys ] = alumni_object[ keys ];
                  }

                  return alumni;

                },

                updateCompany: function( company_object ) {

                  var company = this.findCompany( company_object.id );

                  for ( var keys in company_object ) {
                    company[ keys ] = company_object[ keys ];
                  }

                  return alumni;

                }

            };
    });

'use strict';

angular
    .module('core')
    .controller('AlumnController', ['$scope', '$stateParams', 'SharedData', function($scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.selectedAlumn = SharedData.findAlumn( JSON.parse( $stateParams.id ) );

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };
    }]);

'use strict';

angular
    .module('core')
    .controller('AlumniController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.subscribers = SharedData.listAlumni();
    }]);

'use strict';

angular
    .module('core')
    .controller('CompaniesController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.companies = SharedData.listCompanies();
    }]);

'use strict';

angular
    .module('core')
    .controller('CompanyController', ['$scope', '$stateParams', 'SharedData', function($scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.selectedCompany = SharedData.findCompany( JSON.parse( $stateParams.id ) );

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };
    }]);

'use strict';

angular
    .module('core')
    .controller('FilterController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.aboutVariable = 'Jules Moretti - About';

      $scope.filterInput = '';

      $scope.moveFrameDown = function ( event, value ) {
        event.preventDefault(); event.stopPropagation();
        window.scrollTo(0,40); // shifts the frame down to align the input window by the keyboard.
        $scope.SharedData.moveLocationDown = true;
      };

      $scope.getPosition = function () {
        $scope.SharedData.moveLocationDown = false;
        if ( $scope.filterInput.length ) {

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode( { 'address': $scope.filterInput}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

              var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
              if ( app ) cordova.plugins.Keyboard.close();

              $scope.filterInput = "";

              $scope.infowindowShow = false;

              var viewportKeys = Object.keys( results[0].geometry.viewport );
              var viewportKeysA = Object.keys( results[0].geometry.viewport[ viewportKeys[0] ] );
              var viewportKeysB = Object.keys( results[0].geometry.viewport[ viewportKeys[1] ] );

              var viewport = { "northeast" : {
                                  "latitude" : results[0].geometry.viewport[ viewportKeys[0] ][ viewportKeysB[1] ],
                                  "longitude" : results[0].geometry.viewport[ viewportKeys[1] ][ viewportKeysB[1] ]
                               },
                               "southwest" : {
                                  "latitude" : results[0].geometry.viewport[ viewportKeys[0] ][ viewportKeysB[0] ],
                                  "longitude" : results[0].geometry.viewport[ viewportKeys[1] ][ viewportKeysB[0] ]
                               }};
              $scope.map.bounds = viewport;

              var mypositionKey = Object.keys( results[0].geometry.location );

              $scope.map.center = { latitude: results[0].geometry.location[ mypositionKey[0] ], longitude: results[0].geometry.location[ mypositionKey[1] ] };
              $scope.$apply();
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
          });
        }
      };

    }]);

'use strict';

angular
    .module('core')
    .controller('HomeController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $state ) {
      $scope.SharedData = SharedData;

        angular.element(document).ready(function (){
          console.log('Angular HomeController is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;
            $scope.$storage.notifications = true;
            $scope.$storage.geoPositioning = true;
            $scope.$storage.addition = 0;
          }

          $scope.clearLocalStorage = function () {
            $localStorage.$reset();
          }

          $scope.SharedData.menuWidth = 320;

          document.addEventListener("deviceready", onDeviceReady, false);

          function onDeviceReady() {
            StatusBar.hide();
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(false);
          }

          if ( !$scope.$storage.token || !$scope.$storage.LI_Token_Registered ) {
            $scope.clearLocalStorage();
            $state.go('home.login');
          } else {
            $state.go('home.map');
          }

        });

    }]);

'use strict';

angular
    .module('core')
    .controller('LoginLiController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$location', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $location, $state ) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      $scope.send_LI_token = function ( token, LI_token ) {
        var req = {
          method: 'GET',
          url: 'http://api.hrx.club/LItoken',
          headers: {
            'X-HRX-User-Token' : token,
            'X-HRX-LI-Token' : LI_token
          }
        };

        $http( req ).
          success( function( data, status, headers, config ) {

            if ( data.responseCode === 200 ) {
              $scope.$storage.LI_Token_Registered = true;
              $scope.$storage.user_id = data.user_id;
              $scope.$storage.user_status = data.user_status;
            } else {
              alert( "Response code: " + data.responseCode + " - " + data.message );
            }
          }).
          error( function( data, status, headers, config ) {
            alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
          });
      }

      $scope.LIlogin = function() {

        var ref = window.open('http://api.hrx.club/LIlogin', '_blank', 'location=no,toolbar=no');
        ref.addEventListener('loadstart', function( event ) {
          var url = event.url;
          var urlStart = url.split('?');
          var urlSuccessPage = "http://localhost:1234/li_success/";

          if ( urlStart[0] === urlSuccessPage) {
            var result = JSON.parse( decodeURIComponent( urlStart[1] ) );
            ref.close();
            if ( result.LI_token && ( result.message === 'Welcome to HRX!' ) ) {
              $scope.$storage.LI_token = result.LI_token;
              $scope.send_LI_token( $scope.$storage.token ,result.LI_token );
              $state.go( 'home.map' );
            }
          }
        });

      };
    }]);

'use strict';

angular
    .module('core')
    .controller('LoginController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$location', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $location, $state ) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      angular.element(document).ready(function (){
        console.log('Angular LoginController is ready');

        $scope.openlink = function ( link ) {
          window.open(link, "_system");
        };

        $scope.emailTo = function ( email, subject, body ) {
          window.location.href = "mailto:"+email;

        };


        $scope.GHlogin = function() {
          var ref = window.open('http://api.hrx.club/GHlogin', '_blank', 'location=no,toolbar=no');
          ref.addEventListener('loadstart', function( event ) {
            var url = event.url;
            var urlStart = url.split('?');
            var urlSuccessPage = "http://localhost:1234/gh_success/";
            if ( urlStart[0] === urlSuccessPage) {
              var result = JSON.parse( decodeURIComponent( urlStart[1] ) );
              ref.close();
              if ( result.access_token && ( result.message === 'Welcome to HRX!' || result.message === 'Welcome back!' ) ) {
                $scope.$storage.token = result.access_token;
                $state.go( 'home.loginli' );
              }
            }
          });
        };
      });
    }]);

'use strict';
angular
    .module('core')
    .controller('MapController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$state', '$location', 'uiGmapGoogleMapApi', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $state, $location, uiGmapGoogleMapApi ) {
      $scope.SharedData = SharedData;

      $scope.SharedData.moveLocationDown = false;

      $rootScope.$state = $state;

      $scope.infowindowShow = false;

      angular.element(document).ready(function (){
        console.log('Angular MapController is ready');

        if ( !$scope.$storage ) {
          $scope.$storage = $localStorage;

          if ( !$scope.$storage.notifications ) {
            $scope.$storage.notifications = true;
          }

          if ( !$scope.$storage.geoPositioning ) {
            $scope.$storage.geoPositioning = true;
          }
        }

        uiGmapGoogleMapApi.then(function(maps) {
          console.log('google maps ready');
          $scope.infoWindow = { options: { pixelOffset: new google.maps.Size(0, -50, 'px', 'px') }};
          var styles = [
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": "0"
                                },
                                {
                                    "color": "#5bc0de"
                                },
                                {
                                    "lightness": "0"
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                },
                                {
                                    "weight": "0.1"
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "25"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "25"
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "23"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "17"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "5"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "10"
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "15"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": "15"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": "-61"
                                },
                                {
                                    "gamma": "1"
                                },
                                {
                                    "saturation": "0"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#2b353c"
                                },
                                {
                                    "saturation": "30"
                                },
                                {
                                    "lightness": "13"
                                }
                            ]
                        }
                    ];
          $scope.map = {
            center: {
              latitude: 37.82670075048411,
              longitude: -122.42281079292297
            },
            zoom: 16
          };
          $scope.mapOptions = {
            styles: styles,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },
            disableDefaultUI: true
          };

          window.setTimeout( $scope.getLocation(), 500 );
        });

        $scope.mapLocation = false;
        $scope.mapFirstLoad = true;

        $scope.closeInfoWindow = function () {
          console.log('closeInfoWindow');
          $scope.infoWindow.show = false;
        }

        $scope.openMarkerInfo = function( markerType, id ) {
          console.log('openMarkerInfo', markerType, id );
          $scope.infoWindow.show = false;
            $scope.$apply();

          if ( markerType && id ) {
            for ( var i = 0; i < $scope[ markerType ].length; i++ ) {
              if ( $scope[ markerType ][ i ].id === id ) {

                var foundLat = $scope[ markerType ][ i ].latLng.latitude;
                var foundLng = $scope[ markerType ][ i ].latLng.longitude;

                $scope.infoWindow.coordinates = { latitude: foundLat, longitude: foundLng };
                $scope.infoWindow.show = true;

                $scope.map = $scope.map;
                $scope.$apply();
              }
            }
          }
        };

        $scope.showMyLocation = function () {
          $scope.map = { center: { latitude: $scope.currentLatitude, longitude: $scope.currentLongitude } };
        };

        $scope.updateLocation = function( latitude, longitude ) {
          console.log('updateLocation');
          var req = {
            method: 'GET',
            url: 'http://api.hrx.club/geoposition',
            headers: {
              'X-HRX-User-Token' : $scope.$storage.token
            },
            params: { 'latitude': latitude, 'longitude': longitude, 'addition': $scope.$storage.user_status }
          };

          $http( req ).
            success( function( data, status, headers, config ) {

              if ( data.responseCode === 200 ) {
                alert( "Response code: " + data.responseCode + " - " + data );
              } else {
              }
            }).
            error( function( data, status, headers, config ) {
              alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
            });



        };

        $scope.getLocation = function () {

          if ( $scope.mapFirstLoad ) $scope.mapLocation = true;
          $scope.infowindowShow = false;
          var posOptions = {
                              enableHighAccuracy: false,  // false means longer battery life
                            };

          navigator.geolocation.getCurrentPosition( onSuccess, onError, posOptions ); // gets Geo location data
          function onSuccess( position ) {
            $scope.currentLatitude = position.coords.latitude;
            $scope.currentLongitude = position.coords.longitude;

            $scope.updateLocation( $scope.currentLatitude, $scope.currentLongitude );
            $scope.positionAccuracyMin = position.coords.accuracy;

            $scope.myMarkers = [];
            $scope.$apply();

            var position = {};
                position.id = 'self';
                position.latLng = { latitude: $scope.currentLatitude, longitude: $scope.currentLongitude };
                position.img = {url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50)};

            $scope.myMarkers[0] = position;

              if ( $scope.mapFirstLoad ) {
                $scope.mapLocation = false;
                $scope.mapFirstLoad = false;
                $scope.showMyLocation();

                $scope.infoWindow.coordinates = $scope.myMarkers[0].latLng;
                $scope.infoWindow.show = true;
                $scope.infoWindow.id = position.id;
                $scope.infoWindow.group = 'myMarkers';
              }

              window.setTimeout( function() {
                $scope.infoWindow.show = false;
                $scope.$apply();
              }, 5000 ); // hides infoWindow after 5 second

            $scope.$apply();

            window.setTimeout( function() {
              $scope.getLocation()
            }, 60000 ); // calls getLocation every 5 minutes
          }
          function onError(error) {
            $scope.mapLocation = false;
            window.setTimeout( function() {
              $scope.getLocation()
            }, ( 500 ) ); // calls getLocation every 5 minutes
          }
        }
        window.onNotificationAPN = function ( event ) {
          alert(JSON.stringify( event ) );

          if ( event.state ) {
            $state.go( event.state ); // if state param is passed. App will go to this state
          }
        }

        document.addEventListener("deviceready", onDeviceReady.bind(this), false);

        function onDeviceReady() {
          console.log('Cordova is ready');
          StatusBar.hide();
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(false);


          var addCallback = function addCallback(key, callback) {
            if (window.pushCallbacks === undefined) {
                window.pushCallbacks = {}
            }
            window.pushCallbacks[key] = callback;
          };
          var pushNotification = window.plugins.pushNotification;

          if ( !$scope.$storage.iosTokenRegistered ) {

            pushNotification.register( tokenHandler, errorHandler,  {
                                                                      "badge":"true",
                                                                      "sound":"true",
                                                                      "alert":"true",
                                                                      "ecb":"window.onNotificationAPN"
                                                                    });
          }
          function tokenHandler ( result ) {
            $scope.$storage.deviceToken = result;
            var req = {
              method: 'GET',
              url: 'http://api.hrx.club/apntoken',
              headers: {
                'X-HRX-User-Token' : $scope.$storage.token,
                'X-HRX-User-APN-Token' : result
              }
            };

            $http( req ).
              success( function( data, status, headers, config ) {

                if ( data.responseCode === 200 || data.responseCode === 300 ) {
                  $scope.$storage.iosTokenRegistered = true;
                } else {
                  alert( "Response code: " + data.responseCode + " - " + data.message );
                }
              }).
              error( function( data, status, headers, config ) {
                alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
              });
          }
          function errorHandler (error) {
              alert('error = ' + error);
          }

        };

        $scope.checkState = function ( stateName, stateString ) {

          if ( !stateName || !stateString || stateName.length < stateString.length ) {
            return false;
          } else if ( stateName.slice(0, stateString.length ) ===  stateString) {
            return true;
          } else {
            return false;
          }
        }

        $scope.filters = {
          hrLounge : true,
          conferences : true,
          alumni : true,
          companies : true,
          events : true
        };
        $scope.myMarkers = [];
        $scope.hrMarkers = [];
        $scope.conferencesMarkers = [];
        $scope.alumniMarkers = [];
        $scope.companiesMarkers = [];
        $scope.eventsMarkers = [];
      });

    }]);

'use strict';

angular
    .module('core')
    .controller('MenuController', ['$scope', '$state', '$localStorage', 'SharedData', function($scope, $state, $localStorage, SharedData) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      console.log("writting 0");
      $scope.$storage.user_id = 0;
    }]);

'use strict';

angular
    .module('core')
    .controller('ProfileController', ['$scope', '$stateParams', 'SharedData', function($scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.selectedOriginal = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );
      $scope.selectedProfile = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );

      if ( !$scope.selectedProfile.cohort || $scope.selectedProfile.cohort === undefined || $scope.selectedProfile.cohort === null ) {
        $scope.selectedHR = "??";
      } else {
        console.log('selected cohort is:', typeof $scope.selectedProfile.cohort,$scope.selectedProfile.cohort );
        $scope.selectedHR = $scope.selectedProfile.cohort;
      }


      $scope.number = 250;
      $scope.getNumber = function( num ) {

        var array = [];

        for ( var i = 0; i < num; i++) {
          array[i] = i+1;
        }

        return array;
      }

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };

      $scope.updateProfile = function () {
        $scope.profileUpdates = {};

        $scope.profileUpdates.id = $scope.selectedOriginal.id;

        if ( $scope.selectedHR !== $scope.selectedOriginal.cohort ) {
          $scope.profileUpdates.cohort = $scope.selectedHR;
        }

        if ( $scope.selectedProfile.LI_description !== $scope.selectedOriginal.LI_description ) {
          $scope.profileUpdates.LI_description = $scope.selectedProfile.LI_description;
        }

        if ( $scope.selectedProfile.blog !== $scope.selectedOriginal.blog ) {
          $scope.profileUpdates.blog = $scope.selectedProfile.blog;
        }

        if ( $scope.selectedProfile.LI_address !== $scope.selectedOriginal.LI_address ) {
          $scope.profileUpdates.LI_address = $scope.selectedProfile.LI_address;
        }

        if ( $scope.selectedProfile.email !== $scope.selectedOriginal.email ) {
          $scope.profileUpdates.email = $scope.selectedProfile.email;
        }

        if ( $scope.selectedProfile.phone !== $scope.selectedOriginal.phone ) {
          $scope.profileUpdates.phone = $scope.selectedProfile.phone;
        }

        if ( Object.keys( $scope.profileUpdates ).length > 1 ) {
          console.log( JSON.stringify( $scope.profileUpdates ) );

          $scope.SharedData.updateAlumni( $scope.profileUpdates );

        } else {
          console.log('nothing updated');
        }
        console.log('called')
      }

    }]);

'use strict';

angular
    .module('core')
    .controller('SettingsController', ['$scope', '$state', '$localStorage', 'SharedData', '$http', function( $scope, $state, $localStorage, SharedData, $http ) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
        console.log('Building SettingsController localStorage');
      }

      $scope.geoPositioningSetting = function () {
        var req = {
          method: 'GET',
          url: 'http://api.hrx.club/geopositioningsetting',
          headers: {
            'X-HRX-User-Token' : $scope.$storage.token
          },
          params: {
            'value': $scope.$storage.geoPositioning
          }
        };

        $http( req ).
          success( function( data, status, headers, config ) {

            if ( data.responseCode === 200 ) {
              if ( data.value ) {
                $scope.$storage.geoPositioning = true;
              } else {
                $scope.$storage.geoPositioning = false;
              }
            } else {
              alert( "Response code: " + data.responseCode + " - " + data.message );
            }
          }).
          error( function( data, status, headers, config ) {
            alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
          });
      };

      $scope.notificationsSetting = function () {

        var req = {
          method: 'GET',
          url: 'http://api.hrx.club/notificationssetting',
          headers: {
            'X-HRX-User-Token' : $scope.$storage.token,
            'X-HRX-User-APN-Token' : $scope.$storage.deviceToken
          },
          params: {
            'value': !$scope.$storage.notifications
          }
        };

        $http( req ).
          success( function( data, status, headers, config ) {

            if ( data.responseCode === 200 ) {
              if ( data.value ) {
                $scope.$storage.notifications = true;
              } else {
                $scope.$storage.notifications = false;
              }
            } else {
              alert( "Response code: " + data.responseCode + " - " + data.message );
            }
          }).
          error( function( data, status, headers, config ) {
            alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
          });
      };

      $scope.signOut = function () {
        console.log('signOUT');
        $localStorage.$reset();
        $state.go( 'home.login' );
      };

    }]);

'use strict';

angular
    .module('core')
    .controller('TopThreeController', [
        '$scope',
        function($scope) {


        }
]);
