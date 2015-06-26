'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.MapController
 * @description MapController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('MapController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $state ) {
      $scope.SharedData = SharedData;
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';

      $scope.infowindowShow = false;

      $rootScope.$state = $state;

      angular.element(document).ready(function (){
        console.log('Angular is ready');

        if ( !$scope.$storage ) {
          $scope.$storage = $localStorage;
        }

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
          console.log('Cordova is ready');

          // $scope.clearLocalStorage = function () {
          //   $localStorage.$reset();
          // }

          // Now safe to use device APIs

          StatusBar.hide();  // hide iPhone status bar
          // toolbar.hide();
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(false);
          // Keyboard.shrinkView(true);
          // Keyboard.hideFormAccessoryBar(true);
        };

        $scope.checkState = function ( stateName, stateString ) {

          if ( !stateName || !stateString || stateName.length < stateString.length ) {
            return false;
          } else if ( stateName.slice(0, stateString.length ) ===  stateString) {
            return true;
          } else {
            return false;
          }
        }

        $scope.filters = {
          hrLounge : true,
          conferences : true,
          alumni : true,
          companies : true,
          events : true
        };

        // var markers = [];
        $scope.myMarkers = [];
        $scope.hrMarkers = [];
        $scope.conferencesMarkers = [];
        $scope.alumniMarkers = [];
        $scope.companiesMarkers = [];
        $scope.eventsMarkers = [];

        $scope.mapLocation = false;

        // map style ref: https://snazzymaps.com
        var styles = [
                      {
                          "featureType": "all",
                          "elementType": "labels.text.fill",
                          "stylers": [
                              {
                                  "saturation": "0"
                              },
                              {
                                  "color": "#5bc0de"
                              },
                              {
                                  "lightness": "0"
                              }
                          ]
                      },
                      {
                          "featureType": "all",
                          "elementType": "labels.text.stroke",
                          "stylers": [
                              {
                                  "visibility": "on"
                              },
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": 16
                              },
                              {
                                  "weight": "0.1"
                              }
                          ]
                      },
                      {
                          "featureType": "all",
                          "elementType": "labels.icon",
                          "stylers": [
                              {
                                  "visibility": "off"
                              }
                          ]
                      },
                      {
                          "featureType": "administrative",
                          "elementType": "geometry.fill",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "25"
                              }
                          ]
                      },
                      {
                          "featureType": "administrative",
                          "elementType": "geometry.stroke",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "25"
                              },
                              {
                                  "weight": 1.2
                              }
                          ]
                      },
                      {
                          "featureType": "landscape",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "23"
                              }
                          ]
                      },
                      {
                          "featureType": "poi",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "17"
                              }
                          ]
                      },
                      {
                          "featureType": "road.highway",
                          "elementType": "geometry.fill",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "5"
                              }
                          ]
                      },
                      {
                          "featureType": "road.highway",
                          "elementType": "geometry.stroke",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "10"
                              },
                              {
                                  "weight": 0.2
                              }
                          ]
                      },
                      {
                          "featureType": "road.arterial",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "15"
                              }
                          ]
                      },
                      {
                          "featureType": "road.local",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#000000"
                              },
                              {
                                  "lightness": "15"
                              }
                          ]
                      },
                      {
                          "featureType": "transit",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#ffffff"
                              },
                              {
                                  "lightness": "-61"
                              },
                              {
                                  "gamma": "1"
                              },
                              {
                                  "saturation": "0"
                              }
                          ]
                      },
                      {
                          "featureType": "water",
                          "elementType": "geometry",
                          "stylers": [
                              {
                                  "color": "#2b353c"
                              },
                              {
                                  "saturation": "30"
                              },
                              {
                                  "lightness": "13"
                              }
                          ]
                      }
                  ];

        // load main map
        $scope.map = {
          center: {
            latitude: 37.82670075048411,
            longitude: -122.42281079292297
          },
          zoom: 16
        };

        // load map options
        $scope.mapOptions = {
          styles: styles,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
          },
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false
        };

        // PLACE MARKER ON START - ONLY FOR TESTING
        // var position = {};
            // position.id = 'self';
            // position.latLng = { latitude: 37.82670075048411, longitude: -122.42281079292297 },
            // position.img = {url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50)};

        // $scope.myMarkers.push( position );

        // offsets the infoWindow above the markers
        $scope.infoWindow = { options: { pixelOffset: new google.maps.Size(0, -50, 'px', 'px') }};

        $scope.$watch('infoWindow', function(){
          console.log('infoWindow changed');
        });


        $scope.closeInfoWindow = function () {
          console.log('closeInfoWindow');
          $scope.infoWindow.show = false;
          $scope.$apply();
        }

        $scope.openMarkerInfo = function( markerType, id ) {
          // used to be marker
          console.log('openMarkerInfo', markerType, id );
          $scope.infoWindow.show = false;
            $scope.$apply();

          if ( markerType && id ) {
            for ( var i = 0; i < $scope[ markerType ].length; i++ ) {
              if ( $scope[ markerType ][ i ].id === id ) {
                console.log('openMarkerInfo through', JSON.stringify( $scope[ markerType ][ i ] ) );
                console.log('openMarkerInfo through', $scope[ markerType ][ i ].latLng.latitude, $scope[ markerType ][ i ].latLng.longitude );

                var foundLat = $scope[ markerType ][ i ].latLng.latitude;
                var foundLng = $scope[ markerType ][ i ].latLng.longitude;

                $scope.infoWindow.coordinates = { latitude: foundLat, longitude: foundLng };
                // $scope.infoWindow.id = id;
                // $scope.infoWindow.group = markerType;
                $scope.infoWindow.show = true;

                $scope.map = $scope.map;

                console.log( $scope.infoWindow );
                $scope.$apply();
              }
            }
          }
          // $scope.infoWindow.show = true;
          // $scope.currentMarker = marker;
          // $scope.currentMarkerLat = marker.getPosition().lat();
          // $scope.currentMarkerLng = marker.getPosition().lng();
          // $scope.myInfoWindow.open($scope.myMap, marker);
        };

        $scope.positionAccuracyCount = 0;
        $scope.positionAccuracyMin = 100000000;

        $scope.getLocation = function() {

          $scope.mapLocation = true;
          $scope.infowindowShow = false;
          // var posOptions = { timeout: 10000, enableHighAccuracy: true };
          var posOptions = { enableHighAccuracy: true };
          navigator.geolocation.getCurrentPosition( onSuccess, onError, posOptions ); // gets Geo location data


          // onSuccess Geolocation
          function onSuccess(position) {
            console.log( position.coords.accuracy );

            $scope.positionAccuracyCount++;

            var foundLat = position.coords.latitude;
            var foundLng = position.coords.longitude;

            if ( position.coords.accuracy < $scope.positionAccuracyMin ) {
              $scope.positionAccuracyMin = position.coords.accuracy;

              $scope.myMarkers = [];
              $scope.$apply();

              var position = {};
                  position.id = 'self';
                  position.latLng = { latitude: foundLat, longitude: foundLng };
                  position.img = {url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50)};


              $scope.myMarkers.push( position );

              $scope.infoWindow.coordinates = position.latLng;
              $scope.infoWindow.show = true;
              $scope.infoWindow.id = position.id;
              $scope.infoWindow.group = 'myMarkers';

              $scope.map = { center: { latitude: foundLat, longitude: foundLng } };
              $scope.$apply();
            }

            if ( $scope.positionAccuracyCount < 3 ) {
              $scope.getLocation();
            } else {
              $scope.positionAccuracyCount = 0;
              $scope.positionAccuracyMin = 100000000;
              $scope.mapLocation = false;
            }
          }


          // onError Callback receives a PositionError object
          function onError(error) {
            $scope.mapLocation = false;
              alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
          }
        }

        window.setTimeout( $scope.getLocation(), 300 );

        // navigator.vibrate(3000);
      });

    }]);
