'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.AlumnController
 * @description AlumnController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('AlumnController', ['$scope', '$stateParams', 'SharedData', function($scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.selectedAlumn = SharedData.findAlumn( JSON.parse( $stateParams.id ) );

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };
    }]);
