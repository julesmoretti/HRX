'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.MapController
 * @description MapController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('MapController', ['$scope', '$http', '$window', '$localStorage', 'SharedData' , function( $scope, $http, $window, $localStorage, SharedData ) {
      $scope.SharedData = SharedData;
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';

        angular.element(document).ready(function (){
          console.log('Angular is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;
          }

          $scope.$on('mapInitialized', function(event, map) {
            $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
            map.setCenter( $scope.map );
            // ..
          });



          $scope.clearLocalStorage = function () {
            $localStorage.$reset();
          }


          document.addEventListener("deviceready", onDeviceReady, false);

          function onDeviceReady() {
            console.log('Cordova is ready');

            // Now safe to use device APIs

            // StatusBar.hide();  // hide iPhone status bar
            // toolbar.hide()
            // Keyboard.shrinkView(true);
            // Keyboard.hideFormAccessoryBar(true);

            // var posOptions = { timeout: 10000, enableHighAccuracy: true };
            // var posOptions = {enableHighAccuracy: false };
            // navigator.geolocation.getCurrentPosition( onSuccess, onError, posOptions ); // gets Geo location data

            // onSuccess Geolocation
            //
            // function onSuccess(position) {
            //     var element = document.getElementById('geolocation');
            //     element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
            //                         'Longitude: '          + position.coords.longitude             + '<br />' +
            //                         'Altitude: '           + position.coords.altitude              + '<br />' +
            //                         'Accuracy: '           + position.coords.accuracy              + '<br />' +
            //                         'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
            //                         'Heading: '            + position.coords.heading               + '<br />' +
            //                         'Speed: '              + position.coords.speed                 + '<br />' +
            //                         'Timestamp: '          + position.timestamp                    + '<br />';
            // }

            // onError Callback receives a PositionError object
            //
            // function onError(error) {
            //     alert('code: '    + error.code    + '\n' +
            //           'message: ' + error.message + '\n');
            // }

            // navigator.vibrate(3000);
          }
        });

    }]);
