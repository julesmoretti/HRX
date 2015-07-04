'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.MapController
 * @description MapController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('MapController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$state', '$location', 'uiGmapGoogleMapApi', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $state, $location, uiGmapGoogleMapApi ) {
      $scope.SharedData = SharedData;

      $scope.SharedData.moveLocationDown = false;

      $rootScope.$state = $state;

      $scope.infowindowShow = false;

      angular.element(document).ready(function (){
        console.log('Angular MapController is ready');

        if ( !$scope.$storage ) {
          $scope.$storage = $localStorage;
          // console.log('building MapController localStorage');
          // DEFAULT SETTINGS
          // $scope.$storage.set({'notifications':true});
          $scope.$storage.notifications = true;
          $scope.$storage.geoPositioning = true;
          // console.log("storage", $scope.$storage);
        }


        // alert( 'absUrl' + $location.absUrl()+' --- url' + $location.url() + ' --- search' + JSON.stringify( $location.search() ) );
        // absUrlhttp://localhost:3000/#!/map?access_token=R0OkDz8zAtuhcuxpFsCLOQ --- url/map?access_token=R0OkDz8zAtuhcuxpFsCLOQ --- search[object Object]
        // bsUrlhttp://localhost:3000/#!/map?access_token=R0OkDz8zAtuhcuxpFsCLOQ --- url/map?access_token=R0OkDz8zAtuhcuxpFsCLOQ --- search{"access_token":"R0OkDz8zAtuhcuxpFsCLOQ"}

        uiGmapGoogleMapApi.then(function(maps) {
          console.log('google maps ready');
          $scope.infoWindow = { options: { pixelOffset: new google.maps.Size(0, -50, 'px', 'px') }};

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
            disableDefaultUI: true
            // panControl: false,
            // zoomControl: false,
            // mapTypeControl: false,
            // scaleControl: false,
            // streetViewControl: false,
            // overviewMapControl: false
          };

          // PLACE MARKER ON START - ONLY FOR TESTING
          // var position = {};
              // position.id = 'self';
              // position.latLng = { latitude: 37.82670075048411, longitude: -122.42281079292297 },
              // position.img = {url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50)};

          // $scope.myMarkers.push( position );

          // offsets the infoWindow above the markers

          window.setTimeout( $scope.getLocation(), 500 );
        });

        $scope.mapLocation = false;
        $scope.mapFirstLoad = true;

        $scope.closeInfoWindow = function () {
          console.log('closeInfoWindow');
          $scope.infoWindow.show = false;
          // $scope.$apply();
        }

        $scope.openMarkerInfo = function( markerType, id ) {
          // used to be marker
          console.log('openMarkerInfo', markerType, id );
          $scope.infoWindow.show = false;
            $scope.$apply();

          if ( markerType && id ) {
            for ( var i = 0; i < $scope[ markerType ].length; i++ ) {
              if ( $scope[ markerType ][ i ].id === id ) {
                // console.log('openMarkerInfo through', JSON.stringify( $scope[ markerType ][ i ] ) );
                // console.log('openMarkerInfo through', $scope[ markerType ][ i ].latLng.latitude, $scope[ markerType ][ i ].latLng.longitude );

                var foundLat = $scope[ markerType ][ i ].latLng.latitude;
                var foundLng = $scope[ markerType ][ i ].latLng.longitude;

                $scope.infoWindow.coordinates = { latitude: foundLat, longitude: foundLng };
                // $scope.infoWindow.id = id;
                // $scope.infoWindow.group = markerType;
                $scope.infoWindow.show = true;

                $scope.map = $scope.map;

                // console.log( $scope.infoWindow );
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

        $scope.showMyLocation = function () {
          $scope.map = { center: { latitude: $scope.currentLatitude, longitude: $scope.currentLongitude } };
        };

        $scope.getLocation = function () {

          if ( $scope.mapFirstLoad ) $scope.mapLocation = true;
          $scope.infowindowShow = false;

          // var posOptions = { timeout: 10000, enableHighAccuracy: true };
          var posOptions = {
                              enableHighAccuracy: false,  // false means longer battery life
                              // maximumAge        : 60000   // offset until new coordinate retrieval - every minutes
                            };

          navigator.geolocation.getCurrentPosition( onSuccess, onError, posOptions ); // gets Geo location data

          // onSuccess Geolocation
          function onSuccess( position ) {
            // console.log( position.coords.accuracy ); // shows the accuracy of position retrieved

            // $scope.positionAccuracyCount++;
            $scope.currentLatitude = position.coords.latitude;
            $scope.currentLongitude = position.coords.longitude;

            // if ( position.coords.accuracy < $scope.positionAccuracyMin ) {
            $scope.positionAccuracyMin = position.coords.accuracy;

            $scope.myMarkers = [];
            $scope.$apply();

            var position = {};
                position.id = 'self';
                position.latLng = { latitude: $scope.currentLatitude, longitude: $scope.currentLongitude };
                position.img = {url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50)};

            $scope.myMarkers[0] = position;

              if ( $scope.mapFirstLoad ) {
                $scope.mapLocation = false;
                $scope.mapFirstLoad = false;
                $scope.showMyLocation();

                $scope.infoWindow.coordinates = $scope.myMarkers[0].latLng;
                $scope.infoWindow.show = true;
                $scope.infoWindow.id = position.id;
                $scope.infoWindow.group = 'myMarkers';
              }

              window.setTimeout( function() {
                $scope.infoWindow.show = false;
                $scope.$apply();
              }, 5000 ); // hides infoWindow after 5 second

            $scope.$apply();

            // TODO | Need to update BackEnd with Location

            window.setTimeout( function() {
              $scope.getLocation()
            }, 60000 ); // calls getLocation every 5 minutes
          }

          // onError Callback receives a PositionError object
          function onError(error) {
            $scope.mapLocation = false;
              // alert('code: '    + error.code    + '\n' +
              // 'message: ' + error.message + '\n');
            window.setTimeout( function() {
              $scope.getLocation()
            }, ( 500 ) ); // calls getLocation every 5 minutes
            // navigator.geolocation.clearWatch( $scope.wpid ); // clean watchNavigation
          }
        }

        // iOS APN CALLBACK HANDLER FROM API NOTIFICATIONS
        window.onNotificationAPN = function ( event ) {
          // alert('event');
          alert(JSON.stringify( event ) );

          if ( event.state ) {
            $state.go( event.state ); // if state param is passed. App will go to this state
          }
            // if ( event.alert )
            // {
                // navigator.notification.alert(event.alert);
            // }

            // if ( event.sound )
            // {
                // var snd = new Media(event.sound);
                // snd.play();
            // }

            // if ( event.badge )
            // {
                // pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
            // }
        }

        document.addEventListener("deviceready", onDeviceReady.bind(this), false);

        function onDeviceReady() {
          console.log('Cordova is ready');

          // $scope.clearLocalStorage = function () {
          //   $localStorage.$reset();
          // }

          // Now safe to use device APIs

          // HIDE THE IPHONE STATUS BAR
          StatusBar.hide();

          // HIDE THE KEYBOARD DONE BACK AND NEXT ARROW
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(false);


          var addCallback = function addCallback(key, callback) {
            if (window.pushCallbacks === undefined) {
                window.pushCallbacks = {}
            }
            window.pushCallbacks[key] = callback;
          };

          // INITIATE PUSH PUSHNOTIFICATION
          var pushNotification = window.plugins.pushNotification;

          if ( !$scope.$storage.iosTokenRegistered ) {

            pushNotification.register( tokenHandler, errorHandler,  {
                                                                      "badge":"true",
                                                                      "sound":"true",
                                                                      "alert":"true",
                                                                      "ecb":"window.onNotificationAPN"
                                                                    });
          }

          // result contains any message sent from the plugin call
          function tokenHandler ( result ) {
            // alert('result = ' + result);
            $scope.$storage.deviceToken = result;
            // sends token to API
            var req = {
              method: 'GET',
              // url: 'http://api.hrx.club/apntoken',
              url: 'http://api.hrx.club/apntoken',
              headers: {
                // 'X-HRX-User-Token' : encodeURIComponent( $scope.$storage.token ),
                'X-HRX-User-Token' : $scope.$storage.token,
                'X-HRX-User-APN-Token' : result
              }
            };

            $http( req ).
              success( function( data, status, headers, config ) {

                // data responses
                // alert( "data: "+ data );
                // { responseCode: 200, message: 'Added device to Database' }
                // { responseCode: 300, message: 'Already have it on file' }

                // { responseCode: 400, message: 'APN token - No header detected... please report this error' }
                // { responseCode: 401, message: 'APN token - No valid token found... please report this error' }

                if ( data.responseCode === 200 || data.responseCode === 300 ) {
                  $scope.$storage.iosTokenRegistered = true;
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

          // result contains any error description text returned from the plugin call
          function errorHandler (error) {
              alert('error = ' + error);
          }

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

        // navigator.vibrate(3000);
      });

    }]);
