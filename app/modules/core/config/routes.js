'use strict';

/**
 * @ngdoc object
 * @name core.config
 * @requires ng.$stateProvider
 * @requires ng.$urlRouterProvider
 * @description Defines the routes and other config within the core module
 */
angular
    .module('core')
    .config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
            // $urlRouterProvider.otherwise('/map/filter');

            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the path is `'/'`, route to home
             * */
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
                    // template: '<div class="back-button ion-chevron-left" ui-sref="home.map"></div><div class="main-title">Menu</div>',
                    template: '<div class="back-button ion-android-close" ui-sref="home.map"></div><div class="main-title"></div>',
                    controller: 'MenuController'
                  }
                }
              })

              .state('home.map.menu.alumni', {
                  url: '/alumni',
                  views: {
                    // 'menu@': {
                    'alumni@home.map.menu': {
                      templateUrl: 'modules/core/views/alumni.html',
                      controller: 'AlumniController'
                    },
                    'menuFooter@home.map.menu': {
                      template: '<div class="back-button ion-chevron-left" ui-sref="home.map.menu"></div><div class="main-title">Alumni</div>',
                      controller: 'AlumniController'
                    }
                  }
              })
              .state('home.map.menu.alumni.alumn', {
                  url: '/:id',
                  views: {
                      // 'menu@': {
                      'alumn@home.map.menu.alumni': {
                        templateUrl: 'modules/core/views/alumn.html',
                        controller: 'AlumnController'
                      },
                      'menuFooter@home.map.menu': {
                        template: '<div class="back-button ion-chevron-left" ui-sref="home.map.menu.alumni"></div><div class="main-title">{{selectedAlumn.name}}</div>',
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
