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
    .controller('AlumnController', ['$localStorage', '$scope', '$stateParams', 'SharedData', function($localStorage, $scope, $stateParams, SharedData) {
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
    }]);
