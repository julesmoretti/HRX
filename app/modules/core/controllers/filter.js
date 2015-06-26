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
      $scope.SharedData = SharedData;
      $scope.aboutVariable = 'Jules Moretti - About';

      $scope.filterInput = '';

      $scope.moveFrameDown = function ( event, value ) {
        // console.log(value, event);
        event.preventDefault(); event.stopPropagation();
        window.scrollTo(0,70); // shifts the frame down to align the input window by the keyboard.
      };

      $scope.getPosition = function () {
        console.log('filterInput called');
        if ( $scope.filterInput.length ) {
          console.log('filterInput called has input', $scope.filterInput );

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode( { 'address': $scope.filterInput}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log( results[0].geometry.location.A, results[0].geometry.location.F )
              cordova.plugins.Keyboard.close();
              $scope.filterInput = "";

              $scope.infowindowShow = false;

              $scope.map.center = { latitude: results[0].geometry.location.A, longitude: results[0].geometry.location.F };
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
