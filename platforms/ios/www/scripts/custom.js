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
    ]);
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
            $urlRouterProvider.otherwise('/map');

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
                    template: '<div class="back-button ion-android-close" ui-sref="home.map"></div><div class="main-title"></div><div class="settings-button ion-gear-a" ui-sref="home.map.menu.settings"></div>',
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
        window.scrollTo(0,70); // shifts the frame down to align the input window by the keyboard.
      };

      $scope.getPosition = function () {
        console.log('filterInput called');
        if ( $scope.filterInput.length ) {
          console.log('filterInput called has input', $scope.filterInput );

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode( { 'address': $scope.filterInput}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log( results[0].geometry.location.A, results[0].geometry.location.F )
              cordova.plugins.Keyboard.close();
              $scope.filterInput = "";

              $scope.infowindowShow = false;

              $scope.map.center = { latitude: results[0].geometry.location.A, longitude: results[0].geometry.location.F };
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
    .controller('HomeController', ['$scope', '$http', '$window', '$localStorage', 'SharedData' , function( $scope, $http, $window, $localStorage, SharedData ) {
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
            console.log('Cordova is ready');

            StatusBar.hide();  // hide iPhone status bar

            var element = document.getElementById('deviceProperties');

            element.innerHTML = 'Device Name: '     + device.name     + '<br />' +
                                'Device Cordova: ' + device.cordova + '<br />' +
                                'Device Platform: ' + device.platform + '<br />' +
                                'Device UUID: '     + device.uuid     + '<br />' +
                                'Device Model: '    + device.model    + '<br />' +
                                'Device Version: '  + device.version  + '<br />';


            var model = device.model;

            if ( model.length && model.length === 9 && model.slice(0,-3) === 'iPhone' ) {
              console.log( model.slice(0,-3) );

              var modelVersion = model.slice(-3).split(',');
              console.log( modelVersion[0], modelVersion[1] );
              if ( modelVersion[0] === '1' || modelVersion[0] === '2' ) {
                console.log('iPhone: 1, 2, 3G, 3GS = 480x320');
                $scope.SharedData.menuWidth = 320;
              } else if ( modelVersion[0] === '3' || modelVersion[0] === '4' || modelVersion[0] === '5' || modelVersion[0] === '6' ) {
                console.log('iPhone: 4, 4S = 960x640');
                console.log('iPhone: 5, 5C, 5s = 1136x640');
                $scope.SharedData.menuWidth = 640;
              } else if ( modelVersion[0] === '7' && modelVersion[1] === '1' ) {
                console.log('iPhone: 6+ = 1920x1080');
                $scope.SharedData.menuWidth = 1080;
              } else if ( modelVersion[0] === '7' && modelVersion[1] === '2' ) {
                console.log('iPhone: 6 = 1334x750');
                $scope.SharedData.menuWidth = 750;

              }

            } else {
              $scope.SharedData.menuWidth = 320;
            }
          }
        });

    }]);

'use strict';

angular
    .module('core')
    .controller('LoginController', [
        '$scope',
        function($scope) {


        }
]);

'use strict';

angular
    .module('core')
    .controller('MapController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $state ) {
      $scope.SharedData = SharedData;
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';

      $scope.infowindowShow = false;

      $rootScope.$state = $state;

      angular.element(document).ready(function (){
        console.log('Angular is ready');

        if ( !$scope.$storage ) {
          $scope.$storage = $localStorage;
        }

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
          console.log('Cordova is ready');

          StatusBar.hide();  // hide iPhone status bar
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(false);
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

        $scope.mapLocation = false;
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
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false
        };
        $scope.infoWindow = { options: { pixelOffset: new google.maps.Size(0, -50, 'px', 'px') }};

        $scope.$watch('infoWindow', function(){
          console.log('infoWindow changed');
        });


        $scope.closeInfoWindow = function () {
          console.log('closeInfoWindow');
          $scope.infoWindow.show = false;
          $scope.$apply();
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

        $scope.positionAccuracyCount = 0;
        $scope.positionAccuracyMin = 100000000;

        $scope.getLocation = function() {

          $scope.mapLocation = true;
          $scope.infowindowShow = false;
          var posOptions = { enableHighAccuracy: true };
          navigator.geolocation.getCurrentPosition( onSuccess, onError, posOptions ); // gets Geo location data
          function onSuccess(position) {
            console.log( position.coords.accuracy );

            $scope.positionAccuracyCount++;

            var foundLat = position.coords.latitude;
            var foundLng = position.coords.longitude;

            if ( position.coords.accuracy < $scope.positionAccuracyMin ) {
              $scope.positionAccuracyMin = position.coords.accuracy;

              $scope.myMarkers = [];
              $scope.$apply();

              var position = {};
                  position.id = 'self';
                  position.latLng = { latitude: foundLat, longitude: foundLng };
                  position.img = {url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50)};


              $scope.myMarkers.push( position );

              $scope.infoWindow.coordinates = position.latLng;
              $scope.infoWindow.show = true;
              $scope.infoWindow.id = position.id;
              $scope.infoWindow.group = 'myMarkers';

              $scope.map = { center: { latitude: foundLat, longitude: foundLng } };
              $scope.$apply();
            }

            if ( $scope.positionAccuracyCount < 3 ) {
              $scope.getLocation();
            } else {
              $scope.positionAccuracyCount = 0;
              $scope.positionAccuracyMin = 100000000;
              $scope.mapLocation = false;
            }
          }
          function onError(error) {
            $scope.mapLocation = false;
              alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
          }
        }

        window.setTimeout( $scope.getLocation(), 300 );
      });

    }]);

'use strict';

angular
    .module('core')
    .controller('MenuController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.aboutVariable = 'Jules Moretti - About';
      $scope.menuList = [
        {name: 'Alumni', link: 'alumni'},
        {name: 'Companies', link: 'companies'},
        {name: 'Calendar', link: 'calendar'},
        {name: 'Messenger', link: 'messenger'},
        {name: 'Profile', link: 'profile'}
      ];
    }]);

'use strict';

angular
    .module('core')
    .controller('TopThreeController', [
        '$scope',
        function($scope) {


        }
]);
