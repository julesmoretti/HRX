'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.LoginLiController
 * @description LoginLiController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('LoginLiController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$location', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $location, $state ) {
      $scope.SharedData = SharedData;
      // alert( 'absUrl' + $location.absUrl()+' --- url' + $location.url() + ' --- search' + JSON.stringify( $location.search() ) );

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      $scope.send_LI_token = function ( token, LI_token ) {

        // sends token to API
        var req = {
          method: 'GET',
          // url: 'http://api.hrx.club/apntoken',
          url: 'http://api.hrx.club/LItoken',
          headers: {
            // 'X-HRX-User-Token' : encodeURIComponent( $scope.$storage.token ),
            'X-HRX-User-Token' : token,
            'X-HRX-LI-Token' : LI_token
          }
        };

        $http( req ).
          success( function( data, status, headers, config ) {

            // data responses
            // alert( "data: "+ data );
            // { responseCode: 200, message: 'Thank you all clear here!' }

            // { responseCode: 401, message: 'no username found' }
            // { responseCode: 400, message: 'no header detected' }

            if ( data.responseCode === 200 ) {
              $scope.$storage.LI_Token_Registered = true;
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
      }

      $scope.LIlogin = function() {

        var ref = window.open('http://api.hrx.club/LIlogin', '_blank', 'location=no,toolbar=no');
        // alert('GHlogin');

        // attach listener to loadstart
        ref.addEventListener('loadstart', function( event ) {
          // alert( event.url );
          var url = event.url;
          var urlStart = url.split('?');
          // alert( JSON.stringify( event ) );
          var urlSuccessPage = "http://localhost:1234/li_success/";

          if ( urlStart[0] === urlSuccessPage) {
            var result = JSON.parse( decodeURIComponent( urlStart[1] ) );
            // alert( decodeURIComponent( urlStart[1] ) );
            ref.close();
            if ( result.LI_token && ( result.message === 'Welcome to HRX!' ) ) {
              $scope.$storage.LI_token = result.LI_token;
              $scope.send_LI_token( $scope.$storage.token ,result.LI_token );
              $state.go( 'home.map' );
            }
          }
        });

      };
    }]);
