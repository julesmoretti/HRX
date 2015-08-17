'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.SkillsController
 * @description SkillsController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('SkillsController', ['$rootScope', '$scope', '$stateParams', 'SharedData', '$state', '$http', function($rootScope, $scope, $stateParams, SharedData, $state, $http) {
      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      if ( !$rootScope.$state ) {
        $rootScope.$state = $state;
      }

      $scope.selectedOriginal = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );
      $scope.selectedProfile = JSON.parse( JSON.stringify( SharedData.findAlumn( $scope.$storage.user_id ) ) );

      $scope.skillsArray = ["","",""];

      $scope.selectedHR = $scope.selectedOriginal.cohort;

      $scope.checkForChangesSkills = function() {
        if ( JSON.stringify( $scope.selectedOriginal ) !== JSON.stringify( $scope.selectedProfile ) && $scope.skillsArray[0] !== "" && $scope.skillsArray[1] !== "" && $scope.skillsArray[2] !== "" ) {
          $scope.skills_status = 'New Changes';
          $scope.skills_changes = true;
        } else {
          $scope.skills_status = 'Nothing to Change';
          $scope.skills_changes = false;
        }
      };
      $scope.checkForChangesSkills();

      $scope.cohort_max_number = 250;
      $scope.getNumber = function( num ) {

        var array = [];

        for ( var i = 0; i < num; i++) {
          array[i] = i+1;
        }

        return array;
        // return new Array(num);
      }

      $scope.updateSkills = function () {
        console.log('updateSkills');
        // console.log('updateProfile');
        $scope.profileUpdates = {};

        var mysql_string = "";

        $scope.profileUpdates.id = $scope.$storage.user_id;

        if ( $scope.selectedProfile.cohort !== $scope.selectedOriginal.cohort ) {
          // `cohort` INT(20),
          if ( mysql_string.length ) mysql_string = mysql_string + ', ';
          mysql_string = mysql_string + 'cohort = ' + $scope.selectedProfile.cohort;
          $scope.profileUpdates.cohort = $scope.selectedProfile.cohort;
        }

        $scope.profileUpdates.skill_1 = $scope.skillsArray[0];
        $scope.profileUpdates.skill_2 = $scope.skillsArray[1];
        $scope.profileUpdates.skill_3 = $scope.skillsArray[2];
        if ( mysql_string.length ) mysql_string = mysql_string + ', ';
        mysql_string = mysql_string + 'skill_1 = "' + $scope.skillsArray[0] + '", skill_2 = "' + $scope.skillsArray[1] + '", skill_3 = "' + $scope.skillsArray[2] + '"' ;

        // console.log( JSON.stringify( mysql_string ) );
        // console.log('updateProfile: -profileUpdates- ' + JSON.stringify( $scope.profileUpdates ) );

        // console.log(JSON.stringify( mysql_string ) ) ;
        // return;

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
            params: { 'user_id': $scope.$storage.user_id, 'user_mysql_updates': mysql_string, 'user_updates': JSON.stringify( $scope.profileUpdates ) }
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
                    $rootScope.$state.go( 'home.map' );
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
