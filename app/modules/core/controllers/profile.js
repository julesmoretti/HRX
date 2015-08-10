'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.ProfileController
 * @description ProfileController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('ProfileController', ['$rootScope', '$scope', '$stateParams', 'SharedData', '$state', '$http', function($rootScope, $scope, $stateParams, SharedData, $state, $http) {

      console.log('ProfileController Ready');


      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      if ( !$rootScope.$state ) {
        $rootScope.$state = $state;
      }

      $scope.selectedOriginal = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );
      $scope.selectedProfile = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );

      $scope.selectedHR = $scope.selectedOriginal.cohort;


      // if ( !$scope.selectedProfile.cohort || $scope.selectedProfile.cohort === undefined || $scope.selectedProfile.cohort === null ) {
        // $scope.selectedHR = "??";
      // } else {
        // console.log('selected cohort is:', typeof $scope.selectedProfile.cohort,$scope.selectedProfile.cohort );
        // $scope.selectedHR = $scope.selectedProfile.cohort;
      // }

      $scope.checkForChanges = function() {
        if ( JSON.stringify( $scope.selectedOriginal ) === JSON.stringify( $scope.selectedProfile ) ) {
          $scope.profile_status = 'Nothing to Change';
          $scope.profile_changes = false;
        } else {
          $scope.profile_status = 'New Changes';
          $scope.profile_changes = true;
        }
      };
      $scope.checkForChanges();


      $scope.cohort_max_number = 250;
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
        console.log('updateProfile');
        // console.log('updateProfile');
        $scope.profileUpdates = {};

        var mysql_string = '';

        $scope.profileUpdates.id = $scope.selectedOriginal.id;

        if ( $scope.selectedProfile.cohort !== $scope.selectedOriginal.cohort ) {
          // `cohort` INT(20),
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'cohort = ' + $scope.selectedProfile.cohort;
          $scope.profileUpdates.cohort = $scope.selectedProfile.cohort;
        }

        if ( $scope.selectedProfile.LI_description !== $scope.selectedOriginal.LI_description ) {
          // `LI_description` VARCHAR(2048),
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'LI_description = "' + $scope.selectedProfile.LI_description + '"';
          $scope.profileUpdates.LI_description = $scope.selectedProfile.LI_description;
        }

        // `skills` VARCHAR(255),  -- TODO

        if ( $scope.selectedProfile.blog !== $scope.selectedOriginal.blog ) {
          // `blog` VARCHAR(255),
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'blog = "' + $scope.selectedProfile.blog + '"';
          $scope.profileUpdates.blog = $scope.selectedProfile.blog;
        }

        if ( $scope.selectedProfile.address !== $scope.selectedOriginal.address ) {
          // `address` VARCHAR(255),
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'address = "' + $scope.selectedProfile.address + '"';
          $scope.profileUpdates.address = $scope.selectedProfile.address;
        }

        if ( $scope.selectedProfile.email !== $scope.selectedOriginal.email ) {
          // `email` VARCHAR(255),
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'email = "' + $scope.selectedProfile.email + '"';
          $scope.profileUpdates.email = $scope.selectedProfile.email;
        }

        if ( $scope.selectedProfile.phone_number !== $scope.selectedOriginal.phone_number ) {
          // `phone_number` VARCHAR(255),
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'phone_number = "' + $scope.selectedProfile.phone_number + '"';
          $scope.profileUpdates.phone_number = $scope.selectedProfile.phone_number;
        }

        // console.log( JSON.stringify( mysql_string ) );
        // console.log('updateProfile: -profileUpdates- ' + JSON.stringify( $scope.profileUpdates ) );

        if ( Object.keys( $scope.profileUpdates ).length > 1 ) {
          // console.log( 'there is ', JSON.stringify( $scope.profileUpdates ) );

          // $scope.SharedData.updateAlumni( $scope.profileUpdates );

          // sends token to API
          var req = {
            method: 'GET',
            // url: 'http://api.hrx.club/apntoken',
            url: 'http://api.hrx.club/updateprofile',
            headers: {
              'X-HRX-User-Token' : $scope.$storage.token
            },
            params: { 'user_id': $scope.selectedOriginal.id, 'user_mysql_updates': mysql_string, 'user_updates': JSON.stringify( $scope.profileUpdates ) }
          };

          $http( req ).
            success( function( data, status, headers, config ) {

              // data responses
              // alert( "data: "+ data );
              // { responseCode: 200, message: 'Thank you all clear here!' }

              // { responseCode: 401, message: 'no username found' }
              // { responseCode: 400, message: 'no header detected' }

              if ( data.responseCode === 200 ) {

                if ( data.user_updates ) {
                  // alert("There is data.new_users: "+ typeof data.new_users +" - "+ JSON.stringify( data.new_users ) );
                    for ( var user_updates_keys in data.user_updates ) {
                      if ( data.user_updates[ user_updates_keys ] === null || data.user_updates[ user_updates_keys ] === undefined ) {
                        delete data.user_updates[ user_updates_keys ];
                      }
                    }
                    $scope.SharedData.addAlumni( data.user_updates );
                    $rootScope.$state.go( 'home.map.menu' );
                }

                // alert( "Response code: " + data.responseCode + " - " + data.message + " - User ID: " + typeof data.user_id + "" + data.user_id );
              } else {
                alert( "Response code: " + data.responseCode + " - " + data.message );
              }
            }).
            error( function( data, status, headers, config ) {
              // something called here
              alert( "Error establishing a connection to API: "+ data+" - And status: " + status );

              // need to handle errors like time outs etc...
            });

        } else {
          console.log('nothing updated');
        }
        console.log('called')
      }

    }]);
