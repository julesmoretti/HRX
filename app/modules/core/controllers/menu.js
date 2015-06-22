'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.MenuController
 * @description MenuController
 * @requires ng.$scope
*/
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
