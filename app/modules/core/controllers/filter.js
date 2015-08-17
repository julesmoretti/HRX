'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.FilterController
 * @description FilterController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('FilterController', ['$scope', 'SharedData', function($scope, SharedData) {
      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      $scope.filterInput = '';

      $scope.moveFrameDown = function ( event, value ) {
        // console.log(value, event);
        event.preventDefault(); event.stopPropagation();
        window.scrollTo(0,40); // shifts the frame down to align the input window by the keyboard.
        // $scope.moveLocationDown = !$scope.moveLocationDown;
        $scope.SharedData.moveLocationDown = true;
      };

      $scope.getPosition = function () {
        // console.log('filterInput called');
        $scope.SharedData.moveLocationDown = false;
        if ( $scope.filterInput.length ) {
          // console.log('filterInput called has input', $scope.filterInput );

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode( { 'address': $scope.filterInput}, function(results, status) {

            // console.log( 'getPosition', results[0], status );

            if (status == google.maps.GeocoderStatus.OK) {

              var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
              if ( app ) cordova.plugins.Keyboard.close();

              $scope.filterInput = "";

              $scope.infowindowShow = false;

              var viewportKeys = Object.keys( results[0].geometry.viewport );
              var viewportKeysA = Object.keys( results[0].geometry.viewport[ viewportKeys[0] ] );
              var viewportKeysB = Object.keys( results[0].geometry.viewport[ viewportKeys[1] ] );
              // console.log( 'viewportKeys', viewportKeys, viewportKeysA, viewportKeysB );

              var viewport = { "northeast" : {
                                  "latitude" : results[0].geometry.viewport[ viewportKeys[0] ][ viewportKeysB[1] ],
                                  "longitude" : results[0].geometry.viewport[ viewportKeys[1] ][ viewportKeysB[1] ]
                               },
                               "southwest" : {
                                  "latitude" : results[0].geometry.viewport[ viewportKeys[0] ][ viewportKeysB[0] ],
                                  "longitude" : results[0].geometry.viewport[ viewportKeys[1] ][ viewportKeysB[0] ]
                               }};

              // $scope.map.bounds = results[0].geometry.viewport;
              $scope.map.bounds = viewport;

              var mypositionKey = Object.keys( results[0].geometry.location );

              $scope.map.center = { latitude: results[0].geometry.location[ mypositionKey[0] ], longitude: results[0].geometry.location[ mypositionKey[1] ] };
              $scope.$apply();

              // map.setCenter(results[0].geometry.location);
              // $scope.myMap.setCenter(new google.maps.LatLng( results[0].geometry.location.A, results[0].geometry.location.F ));
              // var marker = new google.maps.Marker({
                  // map: map,
                  // position: results[0].geometry.location
              // });
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
          });
        }
      };

    }]);
