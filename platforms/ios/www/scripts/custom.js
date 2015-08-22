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

                      .state('home.map.skills', {
                        url: '/skills',
                        views: {
                          'skills@home.map': {
                            templateUrl: 'modules/core/views/skills.html',
                            controller: 'SkillsController'
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
                            templateUrl: 'modules/core/views/menu.html'
                          },
                          'menuList@home.map.menu': {
                            templateUrl: 'modules/core/views/menu-list.html',
                            controller: 'MenuController'
                          },
                          'menuFooter@home.map.menu': {
                            template: '<div class="menuFooter"><div class="back-button ion-close" ui-sref="home.map"></div><div class="main-title"></div><div class="settings-button ion-gear-a" ui-sref="home.map.menu.settings"></div></div>'
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
                                  template: '<div class="menuFooter openSettings"><div class="back-button ion-chevron-down" ui-sref="home.map.menu"></div>'
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
                                  template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu"></div><div class="main-title"></div></div>'
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
                                        template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu.alumni"></div><div class="main-title"></div><div ng-if="currentID === $storage.user_id" class="settings-button ion-edit" ui-sref="home.map.menu.profile"></div></div>',
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
                                  template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu"></div><div class="main-title"></div></div>'
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
                                        template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu.companies"></div></div>'
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
                                  template: '<div class="menuFooter"><div class="back-button ion-chevron-left" ui-sref="home.map.menu"></div><div class="main-title"></div></div>'
                                }
                              }
                          });
        }
    ]);

'use strict';

angular
    .module('core')
    .factory('SharedData', [ '$rootScope', '$localStorage', function( $rootScope, $localStorage ) {

      if ( !$rootScope.$storage ) {
        $rootScope.$storage = $localStorage;
      }
      if( !$rootScope.$storage.alumni ) {
        $rootScope.$storage.alumni = [];
      }
      if( !$rootScope.$storage.companies ) {
        $rootScope.$storage.companies = [];
      }

      if( !$rootScope.$storage.HR_chapters ) {
        $rootScope.$storage.HR_chapters = [];
      }

      return {

        listAlumni: function() {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          return $rootScope.$storage.alumni;
        },

        listCompanies: function() {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          return $rootScope.$storage.companies;
        },

        listHR_chapters: function() {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          return $rootScope.$storage.HR_chapters;
        },



        findAlumn: function( id ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          if ( id === undefined ) return false;

            for ( var i = 0; i < $rootScope.$storage.alumni.length; i++ ) {
              if ( $rootScope.$storage.alumni[i].id === id ) {
                return $rootScope.$storage.alumni[i];
              }
            };
            return false;
        },

        findCompany: function( id ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          if ( id === undefined ) return false;

          for ( var i = 0; i < $rootScope.$storage.companies.length; i++ ) {
            if ( $rootScope.$storage.companies[i].id === id ) {
              return $rootScope.$storage.companies[i];
            }
          };
          return false;
        },

        findHR_chapter: function( id ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          if ( id === undefined ) return false;

          for ( var i = 0; i < $rootScope.$storage.HR_chapters.length; i++ ) {
            if ( $rootScope.$storage.HR_chapters[i].id === id ) {
              return $rootScope.$storage.HR_chapters[i];
            }
          };
          return false;
        },



        addAlumni: function( alumni_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          var current_alumni = this.findAlumn( alumni_object.id );

          alumni_object.marker_img = { url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50) };

          if ( current_alumni ) {
            this.updateAlumni( alumni_object );
          } else {
            $rootScope.$storage.alumni.push( alumni_object );
          }
        },

        addCompany: function( company_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          var company = this.findCompany( company_object.id );

          company_object.marker_img = { url: 'img/Pins_Company.svg', scaledSize: new google.maps.Size(25, 50) };

          if ( company ) {
            this.updateCompany( company_object );
          } else {
            $rootScope.$storage.companies.push( company_object );
          }
        },

        addHR_chapter: function( chapter_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          var chapter = this.findHR_chapter( chapter_object.id );

          chapter_object.marker_img = { url: 'img/Pins_HRLounge.svg', scaledSize: new google.maps.Size(25, 50) };

          if ( chapter ) {
            this.updateHR_chapter( chapter_object );
          } else {
            $rootScope.$storage.HR_chapters.push( chapter_object );
          }
        },

        updateAlumni: function( alumni_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          var current_alumni = this.findAlumn( alumni_object.id );

          for ( var keys in alumni_object ) {
            current_alumni[ keys ] = alumni_object[ keys ];
          }

          return current_alumni;
        },

        updateCompany: function( company_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          var current_company = this.findCompany( company_object.id );

          for ( var keys in company_object ) {
            current_company[ keys ] = company_object[ keys ];
          }

          return current_company;
        },

        updateHR_chapter: function( chapter_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          var current_chapter = this.findHR_chapter( chapter_object.id );

          for ( var keys in chapter_object ) {
            current_chapter[ keys ] = chapter_object[ keys ];
          }

          return current_chapter;
        }

      };
    }]);

'use strict';

angular
    .module('core')
    .controller('AlumnController', ['$localStorage', '$scope', '$stateParams', 'SharedData', function($localStorage, $scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.currentID = JSON.parse( $stateParams.id );
      $scope.selectedAlumn = SharedData.findAlumn( JSON.parse( $stateParams.id ) );

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      if ( $scope.selectedAlumn.LI_company ) {
        $scope.selectedCompany = SharedData.findCompany( JSON.parse( $scope.selectedAlumn.LI_company ) );
      }

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };
    }]);

'use strict';

angular
    .module('core')
    .controller('AlumniController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.subscribers = $scope.SharedData.listAlumni();
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

      if ( typeof $scope.selectedCompany.alumni === 'string' ) {
        $scope.selectedCompany.alumni = JSON.parse( $scope.selectedCompany.alumni );
      }

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };
    }]);

'use strict';

angular
    .module('core')
    .controller('FilterController', ['$scope', 'SharedData', function($scope, SharedData) {
      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      $scope.filterInput = '';

      $scope.moveFrameDown = function ( event ) {
        event.preventDefault(); event.stopPropagation();
        window.scrollTo(0,84); // shifts the frame down to align the input window by the keyboard.
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

        angular.element(document).ready(function (){
          console.log('Angular HomeController is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;
            $scope.$storage.notifications = true;
            $scope.$storage.geoPositioning = true;
            $scope.$storage.addition = 0;

          }

          $scope.SharedData = SharedData;


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

              if ( data.first_time ) {
                $state.go( 'home.map.skills' );
              }
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

        if ( !$scope.SharedData ) {
          $scope.SharedData = SharedData;
        }

        $scope.SharedData.moveLocationDown = false;

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
          $scope.infoWindow.show = false;
            $scope.$apply();

          if ( markerType && id ) {
            for ( var i = 0; i < $rootScope.$storage[ markerType ].length; i++ ) {
              if ( $rootScope.$storage[ markerType ][ i ].id === id ) {

                var foundLat = $rootScope.$storage[ markerType ][ i ].latitude;
                var foundLng = $rootScope.$storage[ markerType ][ i ].longitude;

                $scope.infoWindow.coordinates = { latitude: foundLat, longitude: foundLng };

                if ( markerType === 'alumni' ) {

                  if ( $rootScope.$storage[ markerType ][ i ].logo !== null ) {
                    $scope.window_image = $rootScope.$storage[ markerType ][ i ].GH_profile_picture;
                  } else {
                    $scope.window_image = 'img/profile.jpg';
                  }

                  $scope.window_title = $rootScope.$storage[ markerType ][ i ].full_name;
                  $scope.window_sub_title = $rootScope.$storage[ markerType ][ i ].LI_positions;
                  $scope.window_hyperlink = 'home.map.menu.alumni.alumn({id: '+  id +'})';

                } else if ( markerType === 'companies' ) {

                  if ( $rootScope.$storage[ markerType ][ i ].logo !== null ) {
                    $scope.window_image = $rootScope.$storage[ markerType ][ i ].logo;
                  } else {
                    $scope.window_image = 'img/comp.jpg';
                  }

                  $scope.window_title = $rootScope.$storage[ markerType ][ i ].name;
                  $scope.window_sub_title = $rootScope.$storage[ markerType ][ i ].size;
                  $scope.window_hyperlink = 'home.map.menu.companies.company({id: '+  id +'})';

                } else if ( markerType === 'HR_chapters' ) {

                  $scope.window_image = 'img/HRA-logo.svg';

                  $scope.window_title = $rootScope.$storage[ markerType ][ i ].name;
                  $scope.window_sub_title = $rootScope.$storage[ markerType ][ i ].location;
                  $scope.window_hyperlink = 'home.map';

                  console.log( $scope.window_image, $scope.window_title, $scope.window_sub_title, $scope.window_hyperlink );
                }

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

        $scope.centerLocation = function ( latitude, longitude ) {
          $scope.map = { center: { latitude: latitude, longitude: longitude } };
        };

        $scope.updateLocation = function( latitude, longitude ) {
          console.log('updateLocation');
          var req = {
            method: 'GET',
            url: 'http://api.hrx.club/geoposition',
            headers: {
              'X-HRX-User-Token' : $scope.$storage.token
            },
            params: { 'latitude': latitude, 'longitude': longitude, 'addition': $scope.$storage.addition, 'user_id': $scope.$storage.user_id }
          };

          $http( req ).
            success( function( data, status, headers, config ) {

              if ( data.responseCode === 200 ) {

                if ( data.new_users ) {
                  for ( var new_users_id_keys in data.new_users ) {
                    for ( var new_users_keys in data.new_users[ new_users_id_keys ] ) {
                      if ( data.new_users[ new_users_id_keys ][ new_users_keys ] === "null" || data.new_users[ new_users_id_keys ][ new_users_keys ] === undefined ) {
                        delete data.new_users[ new_users_id_keys ][ new_users_keys ];
                      }
                    }
                    $scope.SharedData.addAlumni( data.new_users[ new_users_id_keys ] );
                  }
                }

                if ( data.companies ) {
                  for ( var companies_id_keys in data.companies ) {
                    for ( var companies_keys in data.companies[ companies_id_keys ] ) {
                      if ( data.companies[ companies_id_keys ][ companies_keys ] === "null" || data.companies[ companies_id_keys ][ companies_keys ] === undefined ) {
                        delete data.companies[ companies_id_keys ][ companies_keys ];
                      }
                    }
                    $scope.SharedData.addCompany( data.companies[ companies_id_keys ] );
                  }
                }

                if ( data.geolocations ) {
                  for ( var geolocations_id in data.geolocations ) {
                    $scope.SharedData.addAlumni( data.geolocations[ geolocations_id ] );
                  }
                }

                if ( data.hr_chapters ) {
                  for ( var hr_chapters_id in data.hr_chapters ) {
                    for ( var hr_chapters_keys in data.hr_chapters[ hr_chapters_id ] ) {
                      if ( data.hr_chapters[ hr_chapters_id ][ hr_chapters_keys ] === "null" || data.hr_chapters[ hr_chapters_id ][ hr_chapters_keys ] === undefined ) {
                        delete data.hr_chapters[ hr_chapters_id ][ hr_chapters_keys ];
                      }
                    }
                    $scope.SharedData.addHR_chapter( data.hr_chapters[ hr_chapters_id ] );
                  }
                }

                if ( data.last_id ) {
                  $scope.$storage.addition = data.last_id;
                }

              } else {
              }
            }).
            error( function( data, status, headers, config ) {
              alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
            });
        };


        $scope.checkForUser_id = function () {

          if ( $scope.$storage.user_id ) {
            $scope.updateLocation( $scope.currentLatitude, $scope.currentLongitude );
          } else {
            window.setTimeout( function() {
              $scope.checkForUser_id();
            }, 500 );
          }
        }

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
            $scope.checkForUser_id();
            $scope.positionAccuracyMin = position.coords.accuracy;
            $scope.$apply();

              if ( $scope.mapFirstLoad ) {
                $scope.mapLocation = false;
                $scope.mapFirstLoad = false;
                $scope.showMyLocation();

                $scope.openMarkerInfo( 'alumni', $scope.$storage.user_id );
              }

              window.setTimeout( function() {
                $scope.infoWindow.show = false;
                $scope.$apply();
              }, 5000 ); // hides infoWindow after 5 second

            $scope.$apply();

            $scope.getlocation_timeout = window.setTimeout( function() {
              $scope.getLocation();
              window.clearTimeout( $scope.getlocation_timeout );
              delete $scope.getlocation_timeout;
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
        $scope.alumniMarkers = [];
        $scope.companiesMarkers = [];
        $scope.hrMarkers = [];
      });

    }]);

'use strict';

angular
    .module('core')
    .controller('MenuController', ['$rootScope', '$scope', '$state', '$localStorage', 'SharedData', function( $rootScope, $scope, $state, $localStorage, SharedData ) {

      console.log('MenuController Ready');

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      $scope.all_users = $scope.SharedData.listAlumni();
      $scope.all_companies = $scope.SharedData.listCompanies();
      $scope.all_chapters = $scope.SharedData.listHR_chapters();

    }]);

'use strict';

angular
    .module('core')
    .controller('ProfileController', ['$rootScope', '$scope', '$stateParams', 'SharedData', '$state', '$http', function($rootScope, $scope, $stateParams, SharedData, $state, $http) {

      console.log('ProfileController Ready');


      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      if ( !$rootScope.$state ) {
        $rootScope.$state = $state;
      }

      $scope.selectedOriginal = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );
      $scope.selectedProfile = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );

      console.log( $scope.selectedOriginal );

      $scope.selectedHR = $scope.selectedOriginal.cohort;

      $scope.checkForChanges = function() {
        if ( JSON.stringify( $scope.selectedOriginal ) === JSON.stringify( $scope.selectedProfile ) || $scope.selectedProfile.skill_1.length === 0 || $scope.selectedProfile.skill_2.length === 0 || $scope.selectedProfile.skill_3.length === 0 ) {
          $scope.profile_status = 'Nothing to Change';
          $scope.profile_changes = false;
        } else {
          $scope.profile_status = 'New Changes';
          $scope.profile_changes = true;
        }
      };
      $scope.checkForChanges();


      $scope.cohort_max_number = 250;
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
        console.log('updateProfile');
        $scope.profileUpdates = {};

        var mysql_string = '';

        $scope.profileUpdates.id = $scope.selectedOriginal.id;

        if ( $scope.selectedProfile.cohort !== $scope.selectedOriginal.cohort ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'cohort = ' + $scope.selectedProfile.cohort;
          $scope.profileUpdates.cohort = $scope.selectedProfile.cohort;
        }

        if ( $scope.selectedProfile.LI_description !== $scope.selectedOriginal.LI_description ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'LI_description = "' + $scope.selectedProfile.LI_description + '"';
          $scope.profileUpdates.LI_description = $scope.selectedProfile.LI_description;
        }

        if ( $scope.selectedProfile.skill_1 !== $scope.selectedOriginal.skill_1 ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'skill_1 = "' + $scope.selectedProfile.skill_1 + '"';
          $scope.profileUpdates.skill_1 = $scope.selectedProfile.skill_1;
        }

        if ( $scope.selectedProfile.skill_2 !== $scope.selectedOriginal.skill_2 ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'skill_2 = "' + $scope.selectedProfile.skill_2 + '"';
          $scope.profileUpdates.skill_2 = $scope.selectedProfile.skill_2;
        }

        if ( $scope.selectedProfile.skill_3 !== $scope.selectedOriginal.skill_3 ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'skill_3 = "' + $scope.selectedProfile.skill_3 + '"';
          $scope.profileUpdates.skill_3 = $scope.selectedProfile.skill_3;
        }

        if ( $scope.selectedProfile.blog !== $scope.selectedOriginal.blog ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'blog = "' + $scope.selectedProfile.blog + '"';
          $scope.profileUpdates.blog = $scope.selectedProfile.blog;
        }

        if ( $scope.selectedProfile.address !== $scope.selectedOriginal.address ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'address = "' + $scope.selectedProfile.address + '"';
          $scope.profileUpdates.address = $scope.selectedProfile.address;
        }

        if ( $scope.selectedProfile.email !== $scope.selectedOriginal.email ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'email = "' + $scope.selectedProfile.email + '"';
          $scope.profileUpdates.email = $scope.selectedProfile.email;
        }

        if ( $scope.selectedProfile.phone_number !== $scope.selectedOriginal.phone_number ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'phone_number = "' + $scope.selectedProfile.phone_number + '"';
          $scope.profileUpdates.phone_number = $scope.selectedProfile.phone_number;
        }

        if ( Object.keys( $scope.profileUpdates ).length > 1 ) {
          var req = {
            method: 'GET',
            url: 'http://api.hrx.club/updateprofile',
            headers: {
              'X-HRX-User-Token' : $scope.$storage.token
            },
            params: { 'user_id': $scope.selectedOriginal.id, 'user_mysql_updates': mysql_string, 'user_updates': JSON.stringify( $scope.profileUpdates ) }
          };

          $http( req ).
            success( function( data, status, headers, config ) {

              if ( data.responseCode === 200 ) {

                if ( data.user_updates ) {
                    for ( var user_updates_keys in data.user_updates ) {
                      if ( data.user_updates[ user_updates_keys ] === null || data.user_updates[ user_updates_keys ] === undefined ) {
                        delete data.user_updates[ user_updates_keys ];
                      }
                    }
                    $scope.SharedData.addAlumni( data.user_updates );
                    $rootScope.$state.go( 'home.map.menu.alumni.alumn', {id: $scope.$storage.user_id } );
                }
              } else {
                alert( "Response code: " + data.responseCode + " - " + data.message );
              }
            }).
            error( function( data, status, headers, config ) {
              alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
            });

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

        if ( $scope.getlocation_timeout ) {
          window.clearTimeout( $scope.getlocation_timeout );
          delete $scope.getlocation_timeout;
        }

        $localStorage.$reset();
        $state.go( 'home.login' );
      };

    }]);

'use strict';

angular
    .module('core')
    .controller('SkillsController', ['$rootScope', '$scope', '$stateParams', 'SharedData', '$state', '$http', function($rootScope, $scope, $stateParams, SharedData, $state, $http) {
      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      if ( !$rootScope.$state ) {
        $rootScope.$state = $state;
      }

      $scope.selectedOriginal = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );
      $scope.selectedProfile = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );

      $scope.skillsArray = ["","",""];

      $scope.selectedHR = $scope.selectedOriginal.cohort;

      $scope.checkForChangesSkills = function() {
        if ( JSON.stringify( $scope.selectedOriginal ) !== JSON.stringify( $scope.selectedProfile ) && $scope.skillsArray[0] !== "" && $scope.skillsArray[1] !== "" && $scope.skillsArray[2] !== "" ) {
          $scope.skills_status = 'New Changes';
          $scope.skills_changes = true;
        } else {
          $scope.skills_status = 'Nothing to Change';
          $scope.skills_changes = false;
        }
      };
      $scope.checkForChangesSkills();

      $scope.cohort_max_number = 250;
      $scope.getNumber = function( num ) {

        var array = [];

        for ( var i = 0; i < num; i++) {
          array[i] = i+1;
        }

        return array;
      }

      $scope.updateSkills = function () {
        console.log('updateSkills');
        $scope.profileUpdates = {};

        var mysql_string = "";

        $scope.profileUpdates.id = $scope.$storage.user_id;

        if ( $scope.selectedProfile.cohort !== $scope.selectedOriginal.cohort ) {
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'cohort = ' + $scope.selectedProfile.cohort;
          $scope.profileUpdates.cohort = $scope.selectedProfile.cohort;
        }

        $scope.profileUpdates.skill_1 = $scope.skillsArray[0];
        $scope.profileUpdates.skill_2 = $scope.skillsArray[1];
        $scope.profileUpdates.skill_3 = $scope.skillsArray[2];
        if ( mysql_string.length ) mysql_string = mysql_string + ', ';
        mysql_string = mysql_string + 'skill_1 = "' + $scope.skillsArray[0] + '", skill_2 = "' + $scope.skillsArray[1] + '", skill_3 = "' + $scope.skillsArray[2] + '"' ;

        if ( Object.keys( $scope.profileUpdates ).length > 1 ) {
          var req = {
            method: 'GET',
            url: 'http://api.hrx.club/updateprofile',
            headers: {
              'X-HRX-User-Token' : $scope.$storage.token
            },
            params: { 'user_id': $scope.$storage.user_id, 'user_mysql_updates': mysql_string, 'user_updates': JSON.stringify( $scope.profileUpdates ) }
          };

          $http( req ).
            success( function( data, status, headers, config ) {

              if ( data.responseCode === 200 ) {

                if ( data.user_updates ) {
                    for ( var user_updates_keys in data.user_updates ) {
                      if ( data.user_updates[ user_updates_keys ] === null || data.user_updates[ user_updates_keys ] === undefined ) {
                        delete data.user_updates[ user_updates_keys ];
                      }
                    }
                    $scope.SharedData.addAlumni( data.user_updates );
                    $rootScope.$state.go( 'home.map' );
                }
              } else {
                alert( "Response code: " + data.responseCode + " - " + data.message );
              }
            }).
            error( function( data, status, headers, config ) {
              alert( "Error establishing a connection to API: "+ data+" - And status: " + status );
            });

        } else {
          console.log('nothing updated');
        }
        console.log('called')
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
