'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.CompanyController
 * @description CompanyController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('CompanyController', ['$scope', '$stateParams', 'SharedData', '$state', function($scope, $stateParams, SharedData, $state ) {
      $scope.SharedData = SharedData;
      $scope.selectedCompany = SharedData.findCompany( JSON.parse( $stateParams.id ) );

      if ( typeof $scope.selectedCompany.alumni === 'string' ) {
        $scope.selectedCompany.alumni = JSON.parse( $scope.selectedCompany.alumni );
      }

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };

      $scope.goToMapCompany = function() {
        // console.log('goToMap', $scope.selectedAlumn.latitude, $scope.selectedAlumn.longitude, $scope.selectedAlumn );
        $scope.infoWindow.show = false;
        $scope.map.center.latitude = $scope.selectedCompany.latitude;
        $scope.map.center.longitude = $scope.selectedCompany.longitude;

        $scope.openMarkerInfo( "companies", $scope.selectedCompany.id );

        $state.go( 'home.map' );
      };
    }]);
