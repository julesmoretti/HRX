'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.AlumnController
 * @description AlumnController
 * @requires ng.$scope
*/
angular
    .module('core')
    // split string using ',' and return index value starting from 0
    // .filter('skills', function() {
    //   return function(input, index) {

    //     var skillsArray = input.split(',');

    //     if (skillsArray.length ) {
    //       return skillsArray[ index ];
    //     } else {
    //       return '';
    //     }

    //   };
    //   })

    .filter('breakFilter', function () {
      return function (text) {
          if (text !== undefined) return text.replace(/\n/g, '<br />');
      };
    })
    .controller('AlumnController', ['$localStorage', '$scope', '$stateParams', 'SharedData', '$state' , function($localStorage, $scope, $stateParams, SharedData, $state ) {
      $scope.SharedData = SharedData;
      $scope.currentID = JSON.parse( $stateParams.id );
      $scope.selectedAlumn = SharedData.findAlumn( JSON.parse( $stateParams.id ) );

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      if ( $scope.selectedAlumn.LI_company ) {
        $scope.selectedCompany = SharedData.findCompany( JSON.parse( $scope.selectedAlumn.LI_company ) );
      }

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };

      $scope.goToMapAlumn = function() {
        // console.log('goToMap', $scope.selectedAlumn.latitude, $scope.selectedAlumn.longitude, $scope.selectedAlumn );
        $scope.infoWindow.show = false;
        $scope.map.center.latitude = $scope.selectedAlumn.latitude;
        $scope.map.center.longitude = $scope.selectedAlumn.longitude;

        $scope.openMarkerInfo( "alumni", $scope.selectedAlumn.id );

        $state.go( 'home.map' );
      };

    }]);
