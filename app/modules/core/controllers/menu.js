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

      // console.log("writting 0");
      // $scope.$storage.user_id = 0;
    }]);
