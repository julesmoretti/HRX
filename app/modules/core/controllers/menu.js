'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.MenuController
 * @description MenuController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('MenuController', ['$scope', '$state', '$localStorage', 'SharedData', function($scope, $state, $localStorage, SharedData) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      $scope.menuList = [
        {name: 'Alumni', link: 'alumni', icon: 'ion-android-people'},
        {name: 'Companies', link: 'companies', icon: 'ion-android-home'},
        {name: 'Calendar', link: 'calendar', icon: 'ion-android-calendar'},
        {name: 'Messenger', link: 'messenger', icon: 'ion-android-chat'},
        {name: 'Profile', link: 'profile', icon: 'ion-android-person'}
      ];

    }]);
