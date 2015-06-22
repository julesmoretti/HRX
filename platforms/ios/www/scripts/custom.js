'use strict';
var ApplicationConfiguration = (function() {
    var applicationModuleName = 'angularjsapp';
    var applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngStorage', 'ngMap'];
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
                    controller: 'MapController'
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
                    template: '<a ui-sref="home.map">Back</a>MENU',
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
                      template: '<a ui-sref="home.map.menu">Back</a>Alumni',
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
                        template: '<a ui-sref="home.map.menu.alumni">Back</a>{{selectedAlumn.name}}',
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
    .controller('MapController', ['$scope', '$http', '$window', '$localStorage', 'SharedData' , function( $scope, $http, $window, $localStorage, SharedData ) {
      $scope.SharedData = SharedData;
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';

        angular.element(document).ready(function (){
          console.log('Angular is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;
          }

          $scope.$on('mapInitialized', function(event, map) {
            $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
            map.setCenter( $scope.map );
          });



          $scope.clearLocalStorage = function () {
            $localStorage.$reset();
          }


          document.addEventListener("deviceready", onDeviceReady, false);

          function onDeviceReady() {
            console.log('Cordova is ready');
          }
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
        {name: 'Profile', link: 'profile'},
        {name: 'Settings', link: 'settings'}
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
