'use strict';
var ApplicationConfiguration = (function() {
    var applicationModuleName = 'angularjsapp';
    var applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngStorage', 'uiGmapgoogle-maps'];
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
                    template: '<div class="back-button ion-android-close" ui-sref="home.map"></div><div class="main-title"></div><div class="settings-button ion-gear-a" ng-click="signOut()"></div>',
                    controller: 'MenuController'
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
                      template: '<div class="back-button ion-ios-arrow-back" ui-sref="home.map.menu"></div><div class="main-title">Alumni</div>',
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
                        template: '<div class="back-button ion-ios-arrow-back" ui-sref="home.map.menu.alumni"></div><div class="main-title">{{selectedAlumn.name}}</div>',
                        controller: 'AlumnController'
                      }
                  }
              })

              .state('about', {
                url: '/about',
                templateUrl: 'modules/core/views/about.html',
                controller: 'AboutController'
              });
        }
    ]);

'use strict';

angular
    .module('core')
    .factory('SharedData',
        function() {

            var alumni = [
              {id: 0, name: 'Jules', email: 'jules@jules.com', description: 'this is the description of 0' },
              {id: 1, name: 'James', email: 'james@james.com', description: 'this is the description of 1' },
              {id: 2, name: 'Bruce', email: 'bruce@bruce.com', description: 'this is the description of 2' },
              {id: 3, name: 'Frank', email: 'frank@frank.com', description: 'this is the description of 3' },
              {id: 4, name: 'Johny', email: 'Johny@Johny.com', description: 'this is the description of 4' }
            ];

            return {

                                listAlumni: function() {
                    return alumni;
                },

                                findAlumn: function( id ) {
                    for (var i = 0; i < alumni.length; i++) {
                      if ( alumni[i].id === id ) {
                        return alumni[i];;
                      }
                    };
                    return false;
                }
            };
    });

'use strict';

angular
    .module('core')
    .controller('AboutController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.aboutVariable = 'Jules Moretti - About';
    }]);

'use strict';

angular
    .module('core')
    .controller('AlumnController', ['$scope', '$stateParams', 'SharedData', function($scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.selectedAlumn = SharedData.findAlumn( JSON.parse( $stateParams.id ) );
    }]);

'use strict';

angular
    .module('core')
    .controller('AlumniController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.aboutVariable = 'Jules Moretti - About';
      $scope.subscribers = SharedData.listAlumni();
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
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';

        angular.element(document).ready(function (){
          console.log('Angular is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;
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

          if ( !$scope.$storage.token ) {
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
    .controller('LoginController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$location', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $location, $state ) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      $scope.GHlogin = function() {
        var ref = window.open('http://api.hrx.club/GHlogin', '_blank', 'location=no,toolbar=no');
        ref.addEventListener('loadstart', function( event ) {
          var url = event.url;
          var urlStart = url.split('?');
          var urlSuccessPage = "http://localhost:5000/success/";
          if ( urlStart[0] === urlSuccessPage) {
            var result = JSON.parse( decodeURIComponent( urlStart[1] ) );
            ref.close();
            if ( result.access_token && ( result.message === 'Welcome to HRX!' || result.message === 'Welcome back!' ) ) {
              $scope.$storage.token = result.access_token;
              $state.go( 'home.map' );
            }
          }
        });

      };
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
        console.log('Angular is ready');

        if ( !$scope.$storage ) {
          $scope.$storage = $localStorage;
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

          window.setTimeout( $scope.getLocation(), 300 );

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
                console.log('openMarkerInfo through', JSON.stringify( $scope[ markerType ][ i ] ) );
                console.log('openMarkerInfo through', $scope[ markerType ][ i ].latLng.latitude, $scope[ markerType ][ i ].latLng.longitude );

                var foundLat = $scope[ markerType ][ i ].latLng.latitude;
                var foundLng = $scope[ markerType ][ i ].latLng.longitude;

                $scope.infoWindow.coordinates = { latitude: foundLat, longitude: foundLng };
                $scope.infoWindow.show = true;

                $scope.map = $scope.map;

                console.log( $scope.infoWindow );
                $scope.$apply();
              }
            }
          }
        };

        $scope.showMyLocation = function () {
          $scope.map = { center: { latitude: $scope.currentLatitude, longitude: $scope.currentLongitude } };
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
        window.onNotificationAPN = function (event) {

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

      $scope.menuList = [
        {name: 'Alumni', link: 'alumni'},
        {name: 'Companies', link: 'companies'},
        {name: 'Calendar', link: 'calendar'},
        {name: 'Messenger', link: 'messenger'},
        {name: 'Profile', link: 'profile'}
      ];

      $scope.signOut = function () {
        $localStorage.$reset();
        $state.go( 'home.login' );
      }

    }]);

'use strict';

angular
    .module('core')
    .controller('TopThreeController', [
        '$scope',
        function($scope) {


        }
]);
