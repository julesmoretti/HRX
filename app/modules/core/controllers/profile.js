'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.ProfileController
 * @description ProfileController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('ProfileController', ['$scope', '$stateParams', 'SharedData', function($scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.selectedOriginal = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );
      $scope.selectedProfile = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );

      if ( !$scope.selectedProfile.cohort || $scope.selectedProfile.cohort === undefined || $scope.selectedProfile.cohort === null ) {
        $scope.selectedHR = "??";
      } else {
        $scope.selectedHR = $scope.selectedProfile.cohort;
      }


      $scope.number = 250;
      $scope.getNumber = function( num ) {

        var array = [];

        for ( var i = 0; i < num; i++) {
          array[i] = i+1;
        }

        return array;
        // return new Array(num);
      }

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };

      $scope.updateProfile = function () {
        // console.log('updateProfile');
        $scope.profileUpdates = {};

        if ( $scope.selectedHR !== $scope.selectedOriginal.cohort ) {
          $scope.profileUpdates.cohort = $scope.selectedHR;
        }

        if ( $scope.selectedProfile.LI_description !== $scope.selectedOriginal.LI_description ) {
          $scope.profileUpdates.LI_description = $scope.selectedProfile.LI_description;
        }

        if ( $scope.selectedProfile.blog !== $scope.selectedOriginal.blog ) {
          $scope.profileUpdates.blog = $scope.selectedProfile.blog;
        }

        if ( $scope.selectedProfile.LI_address !== $scope.selectedOriginal.LI_address ) {
          $scope.profileUpdates.LI_address = $scope.selectedProfile.LI_address;
        }

        if ( $scope.selectedProfile.email !== $scope.selectedOriginal.email ) {
          $scope.profileUpdates.email = $scope.selectedProfile.email;
        }

        if ( $scope.selectedProfile.phone !== $scope.selectedOriginal.phone ) {
          $scope.profileUpdates.phone = $scope.selectedProfile.phone;
        }

        if ( Object.keys( $scope.profileUpdates ).length ) {
          console.log( JSON.stringify( $scope.profileUpdates ) );
        } else {
          console.log('nothing updated');
        }
        console.log('called')
      }

    }]);
