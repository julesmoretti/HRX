'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.SettingsController
 * @description SettingsController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('SettingsController', ['$scope', '$state', '$localStorage', 'SharedData', function($scope, $state, $localStorage, SharedData) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
        console.log('Building SettingsController localStorage');
      }

      $scope.signOut = function () {
        console.log('signOUT');
        $localStorage.$reset();
        $state.go( 'home.login' );
      }

    }]);
