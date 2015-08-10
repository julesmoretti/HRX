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

      if ( $scope.selectedAlumn.LI_company ) {
        $scope.selectedCompany = SharedData.findCompany( JSON.parse( $scope.selectedAlumn.LI_company ) );

        if ( typeof $scope.selectedCompany.alumni === 'string' ) {
          $scope.selectedCompany.alumni = JSON.parse( $scope.selectedCompany.alumni );
        }
      }

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };
    }]);
