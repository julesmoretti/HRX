var app = angular.module('api.controllers', ['api.constants']);

    app.controller('ListCtrl', ['$scope', 'New_users_const', 'Companies_const', 'HR_chapters_const', function( $scope, newUsersConst, companiesConst, hrChapters ) {
      $scope.new_users = newUsersConst;
      $scope.companies = companiesConst;
      $scope.hr_chapters = hrChapters;
      $scope.searchbox = {};
      $scope.textfield = "";

      $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 16 };

      $scope.openLink = function() {
        console.log("openLink")
      };

      $scope.searchCall = function( index ) {

        console.log( 'searchCall', index );

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { "address": $scope.companies[ index ].address }, function(results, status) {

          console.log('$scope.textfield', $scope.companies[ index ].address );
          if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
            var location = results[0].geometry.location,
                lat      = location.lat(),
                lng      = location.lng();
            console.log("passed", location, index);
            // $scope.myMap.panTo(location);
            $scope.companies[ index ].latitude = lat;
            $scope.companies[ index ].longitude = lng;
            $scope.$apply();
          } else {
            console.log("failed", results, status);

          }
        });
      };

      $scope.recenterMap = function( index ) {
        console.log('recenterMap');
        if ( $scope.companies[ index ].center && $scope.companies[ index ].latitude ) {
          $scope.companies[ index ].center.latitude = $scope.companies[ index ].latitude;
          $scope.companies[ index ].center.longitude = $scope.companies[ index ].longitude;
        }
      };

      $scope.updateCompany = function() {
        console.log("updateCompany");
      };

    }]);
