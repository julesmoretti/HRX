'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('HomeController', ['$scope', '$http', '$window', '$localStorage', 'SharedData' , function( $scope, $http, $window, $localStorage, SharedData ) {
      $scope.SharedData = SharedData;
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';

        angular.element(document).ready(function (){
          console.log('Angular is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;
          }

          $scope.clearLocalStorage = function () {
            $localStorage.$reset();
          }

          $scope.SharedData.menuWidth = 320;

          document.addEventListener("deviceready", onDeviceReady, false);

          function onDeviceReady() {
            console.log('Cordova is ready');

            // Now safe to use device APIs

            StatusBar.hide();  // hide iPhone status bar
            // toolbar.hide()

            var element = document.getElementById('deviceProperties');

            element.innerHTML = 'Device Name: '     + device.name     + '<br />' +
                                'Device Cordova: ' + device.cordova + '<br />' +
                                'Device Platform: ' + device.platform + '<br />' +
                                'Device UUID: '     + device.uuid     + '<br />' +
                                'Device Model: '    + device.model    + '<br />' +
                                'Device Version: '  + device.version  + '<br />';


            // x86_64
            // iPhone  480x320
            // iPhone1,1   =   iPhone

            // iPhone 2, 3, 3GS  480x320
            // iPhone1,2   =   iPhone 3G
            // iPhone2,1   =   iPhone 3GS


            // iPhone 4, 4s  960x640
            // iPhone3,1   =   iPhone 4 (GSM)
            // iPhone3,3   =   iPhone 4 (CDMA)
            // iPhone4,1   =   iPhone 4S

            // iPhone 5  1136x640
            // iPhone5,1   =   iPhone 5 (A1428)
            // iPhone5,2   =   iPhone 5 (A1429)
            // iPhone5,3   =   iPhone 5c (A1456/A1532)
            // iPhone5,4   =   iPhone 5c (A1507/A1516/A1529)
            // iPhone6,1   =   iPhone 5s (A1433/A1453)
            // iPhone6,2   =   iPhone 5s (A1457/A1518/A1530)

            // iPhone 6 Plus 1920x1080
            // iPhone7,1   =   iPhone 6 Plus

            // iPhone 6  1334x750
            // iPhone7,2   =   iPhone 6


            var model = device.model;

            if ( model.length && model.length === 9 && model.slice(0,-3) === 'iPhone' ) {
              console.log( model.slice(0,-3) );

              var modelVersion = model.slice(-3).split(',');
              console.log( modelVersion[0], modelVersion[1] );

              // iPhone: 1, 2, 3G, 3GS = 480x320
              if ( modelVersion[0] === '1' || modelVersion[0] === '2' ) {
                console.log('iPhone: 1, 2, 3G, 3GS = 480x320');
                $scope.SharedData.menuWidth = 320;

              // iPhone: 4, 4S = 960x640
              // iPhone: 5, 5C, 5s = 1136x640
              } else if ( modelVersion[0] === '3' || modelVersion[0] === '4' || modelVersion[0] === '5' || modelVersion[0] === '6' ) {
                console.log('iPhone: 4, 4S = 960x640');
                console.log('iPhone: 5, 5C, 5s = 1136x640');
                $scope.SharedData.menuWidth = 640;

              // iPhone: 6+ = 1920x1080
              } else if ( modelVersion[0] === '7' && modelVersion[1] === '1' ) {
                console.log('iPhone: 6+ = 1920x1080');
                $scope.SharedData.menuWidth = 1080;

              // iPhone: 6 = 1334x750
              } else if ( modelVersion[0] === '7' && modelVersion[1] === '2' ) {
                console.log('iPhone: 6 = 1334x750');
                $scope.SharedData.menuWidth = 750;

              }

            } else {
              $scope.SharedData.menuWidth = 320;
            }


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
