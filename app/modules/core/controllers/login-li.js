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
            if ( result.access_token && ( result.message === 'Welcome to HRX!' || result.message === 'Welcome back!' ) ) {
              $scope.$storage.token = result.access_token;
              $state.go( 'home.map' );
            }
          }
        });

      };
    }]);
