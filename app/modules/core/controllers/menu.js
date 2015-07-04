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
        {name: 'Alumni', link: 'alumni'},
        {name: 'Companies', link: 'companies'},
        {name: 'Calendar', link: 'calendar'},
        {name: 'Messenger', link: 'messenger'},
        {name: 'Profile', link: 'profile'}
      ];

    }]);
