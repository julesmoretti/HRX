'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.SettingsController
 * @description SettingsController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('SettingsController', ['$scope', '$state', '$localStorage', 'SharedData', '$http', function( $scope, $state, $localStorage, SharedData, $http ) {
      $scope.SharedData = SharedData;

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
        console.log('Building SettingsController localStorage');
      }

      $scope.geoPositioningSetting = function () {
        var req = {
          method: 'GET',
          url: 'http://api.hrx.club/geopositioningsetting',
          headers: {
            'X-HRX-User-Token' : $scope.$storage.token
          },
          params: {
            'value': $scope.$storage.geoPositioning
          }
        };

        $http( req ).
          success( function( data, status, headers, config ) {

            // data responses
            // alert( "data: "+ JSON.stringify( data ) );
            // { responseCode: 200, message: 'Added device to Database' }
            // { responseCode: 300, message: 'Already have it on file' }

            // { responseCode: 400, message: 'APN token - No header detected... please report this error' }
            // { responseCode: 401, message: 'APN token - No valid token found... please report this error' }

            if ( data.responseCode === 200 ) {
              if ( data.value ) {
                $scope.$storage.geoPositioning = true;
              } else {
                $scope.$storage.geoPositioning = false;
              }
              // $scope.$storage.iosTokenRegistered = true;
              // alert( "Response code: " + data.responseCode + " - " + data.message );
            } else {
              alert( "Response code: " + data.responseCode + " - " + data.message );
            }
          }).
          error( function( data, status, headers, config ) {
            // something called here
            alert( "Error establishing a connection to API: "+ data+" - And status: " + status );

            // need to handle errors like time outs etc...
          });
      };

      $scope.notificationsSetting = function () {

        var req = {
          method: 'GET',
          url: 'http://api.hrx.club/notificationssetting',
          headers: {
            'X-HRX-User-Token' : $scope.$storage.token,
            'X-HRX-User-APN-Token' : $scope.$storage.deviceToken
          },
          params: {
            'value': !$scope.$storage.notifications
          }
        };

        $http( req ).
          success( function( data, status, headers, config ) {

            // data responses
            // alert( "data: "+ JSON.stringify( data ) );
            // { responseCode: 200, message: 'Added device to Database' }
            // { responseCode: 300, message: 'Already have it on file' }

            // { responseCode: 400, message: 'APN token - No header detected... please report this error' }
            // { responseCode: 401, message: 'APN token - No valid token found... please report this error' }

            if ( data.responseCode === 200 ) {
              if ( data.value ) {
                $scope.$storage.notifications = true;
              } else {
                $scope.$storage.notifications = false;
              }
              // $scope.$storage.iosTokenRegistered = true;
              // alert( "Response code: " + data.responseCode + " - " + data.message );
            } else {
              alert( "Response code: " + data.responseCode + " - " + data.message );
            }
          }).
          error( function( data, status, headers, config ) {
            // something called here
            alert( "Error establishing a connection to API: "+ data+" - And status: " + status );

            // need to handle errors like time outs etc...
          });
      };

      $scope.signOut = function () {
        console.log('signOUT');
        $localStorage.$reset();
        $state.go( 'home.login' );
      };

    }]);
