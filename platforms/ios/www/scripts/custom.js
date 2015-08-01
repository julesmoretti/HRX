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

            var alumni = [
              { id: 0,
                full_name: 'Jules Moretti',
                LI_positions: 'Design Technologist',
                LI_location_name: 'San Francisco Bay Area',
                LI_location_country_code: 'us',
                LI_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tempor arcu, quis hendrerit nunc accumsan quis. In ut dolor metus, eget viverra odio. Quisque sed suscipit leo. Curabitur dictum magna ut turpis interdum a mollis nunc condimentum. Praesent leo est, hendreriteget condimentum sit amet, placerat adipiscing neque. Curabitur id metus tellus, sed semper odio. Phasellus id justo ante, vel bibendum eros. Nulla suscipit felis eget erat iaculis et aliquam turpis consequat. Nunc posuere mollis tellus sit amet dapibus. Praesent sagittis quam sit amet mauris venenatis in dignissim purus dapibus.',
                skills: ['industrial design', 'front end', 'choreography' ],
                cohort: '12',

                LI_company: {
                  id: 0,
                  profile_picture: 'img/profile.jpg',
                  name: 'WET Design',
                  size: '201-500 employees',
                  alumn: 8,
                  www: 'http://www.wetdesign.com'
                },
                LI_url: 'http://linkedin.com/in/julesmoretti',

                GH_profile_picture: 'img/dummy-profile.jpeg',
                GH_private_repos: 9,
                GH_public_repos: 39,
                GH_url: 'http://github.com/julesmoretti',
                blog: 'http://behance.net/julesmoretti',

                LI_address: '3405 Helen St, Apt 9, Oakland, 94608 CA',
                email: 'jules@jules.com',
                phone: 2134007436
              },
              {id: 1, full_name: 'James Jackson', email: 'james@james.com', LI_description: 'this is the description of 1' },
              {id: 2, full_name: 'Bruce William', email: 'bruce@bruce.com', LI_description: 'this is the description of 2' },
              {id: 3, full_name: 'Frank Morris', email: 'frank@frank.com', LI_description: 'this is the description of 3' },
              {id: 4, full_name: 'Johny Franckle', email: 'Johny@Johny.com', LI_description: 'this is the description of 4' },
              {id: 5, full_name: 'Jules Morrison', email: 'jules@jules.com', LI_description: 'this is the description of 5' },
              {id: 6, full_name: 'James Snapper', email: 'james@james.com', LI_description: 'this is the description of 6' },
              {id: 7, full_name: 'Bruce Franc', email: 'bruce@bruce.com', LI_description: 'this is the description of 7' },
              {id: 8, full_name: 'Frank Muscle', email: 'frank@frank.com', LI_description: 'this is the description of 8' },
              {id: 9, full_name: 'Johny Black', email: 'Johny@Johny.com', LI_description: 'this is the description of 9' },
              {id: 10, full_name: 'Jules Speghetti', email: 'jules@jules.com', LI_description: 'this is the description of 10' },
              {id: 11, full_name: 'James Franco', email: 'james@james.com', LI_description: 'this is the description of 11' },
              {id: 12, full_name: 'Bruce Lee', email: 'bruce@bruce.com', LI_description: 'this is the description of 12' },
              {id: 13, full_name: 'Frank Diaz', email: 'frank@frank.com', LI_description: 'this is the description of 13' },
              {id: 14, full_name: 'Johny Walker', email: 'Johny@Johny.com', LI_description: 'this is the description of 14' },
            ];

            var companies = [
              {
                id: 0,
                name: 'WET Design',
                industry: 'Design',
                size: '201-500 employees',
                type: 'Privately Held',
                alumni: [0,2,3,1,7,4,5,6],
                address: '10847 Sherman Way, Sun Valley, CA 91352, USA',
                address_suite: undefined,
                phone: 8884007832,
                www: 'http://www.wetdesign.com',
                logo: undefined,
                lat: 34.201519,
                long: -118.367399
              },
              {
                id: 1,
                name: 'Frog Design'
              },
              {
                id: 2,
                name: 'Google Inc'
              },
              {
                id: 3,
                name: 'Apple'
              },
              {
                id: 4,
                name: 'Yellow'
              },
              {
                id: 5,
                name: 'Bananna'
              },
              {
                id: 6,
                name: 'Pineaple'
              },
              {
                id: 7,
                name: 'Tomato'
              }
              ];

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
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';

        angular.element(document).ready(function (){
          console.log('Angular HomeController is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;
            $scope.$storage.notifications = true;
            $scope.$storage.geoPositioning = true;
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

          var req = {
            method: 'GET',
            url: 'http://api.hrx.club/geoposition',
            headers: {
              'X-HRX-User-Token' : $scope.$storage.token
            },
            params: { 'latitude': latitude, 'longitude': longitude }
          };

          $http( req ).
            success( function( data, status, headers, config ) {

              if ( data.responseCode === 200 ) {
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
      $scope.selectedProfile = SharedData.findAlumn( $scope.$storage.user_id );

      $scope.selectedHR = "??";

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
