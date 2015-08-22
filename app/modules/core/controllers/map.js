'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.MapController
 * @description MapController
 * @requires ng.$scope
*/

// TODO: convert to a www.mapbox.com version to fit font style too.
angular
    .module('core')
    .controller('MapController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$state', '$location', 'uiGmapGoogleMapApi', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $state, $location, uiGmapGoogleMapApi ) {

      $rootScope.$state = $state;

      $scope.infowindowShow = false;

      // TEMP
      // $scope.$storage.user_id = 1;
      // $scope.$storage.token = 'KklM9P84RSLE21sVRQsFtg==';

      angular.element(document).ready(function (){
        console.log('Angular MapController is ready');

        if ( !$scope.$storage ) {
          $scope.$storage = $localStorage;

          // console.log('building MapController localStorage');
          // DEFAULT SETTINGS
          // $scope.$storage.set({'notifications':true});

          if ( !$scope.$storage.notifications ) {
            $scope.$storage.notifications = true;
          }

          if ( !$scope.$storage.geoPositioning ) {
            $scope.$storage.geoPositioning = true;
          }

        }

        if ( !$scope.SharedData ) {
          $scope.SharedData = SharedData;
        }

        $scope.SharedData.moveLocationDown = false;

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
          // console.log('openMarkerInfo', markerType, typeof id, id );
          $scope.infoWindow.show = false;
            $scope.$apply();

          if ( markerType && id ) {
            for ( var i = 0; i < $rootScope.$storage[ markerType ].length; i++ ) {
              if ( $rootScope.$storage[ markerType ][ i ].id === id ) {
                // console.log('openMarkerInfo through', JSON.stringify( $scope[ markerType ][ i ] ) );
                // console.log('openMarkerInfo through', $scope[ markerType ][ i ].latLng.latitude, $scope[ markerType ][ i ].latLng.longitude );

                var foundLat = $rootScope.$storage[ markerType ][ i ].latitude;
                var foundLng = $rootScope.$storage[ markerType ][ i ].longitude;

                $scope.infoWindow.coordinates = { latitude: foundLat, longitude: foundLng };
                // $scope.infoWindow.id = id;
                // $scope.infoWindow.group = markerType;

                if ( markerType === 'alumni' ) {
                  // console.log('alumni');

                  if ( $rootScope.$storage[ markerType ][ i ].logo !== null ) {
                    $scope.window_image = $rootScope.$storage[ markerType ][ i ].GH_profile_picture;
                  } else {
                    $scope.window_image = 'img/profile.jpg';
                  }

                  $scope.window_title = $rootScope.$storage[ markerType ][ i ].full_name;
                  $scope.window_sub_title = $rootScope.$storage[ markerType ][ i ].LI_positions;
                  $scope.window_hyperlink = 'home.map.menu.alumni.alumn({id: '+  id +'})';

                  // console.log( $scope.window_image, $scope.window_title, $scope.window_sub_title, $scope.window_hyperlink );

                } else if ( markerType === 'companies' ) {
                  // console.log('companies');

                  if ( $rootScope.$storage[ markerType ][ i ].logo !== null ) {
                    $scope.window_image = $rootScope.$storage[ markerType ][ i ].logo;
                  } else {
                    $scope.window_image = 'img/comp.jpg';
                  }

                  $scope.window_title = $rootScope.$storage[ markerType ][ i ].name;
                  $scope.window_sub_title = $rootScope.$storage[ markerType ][ i ].size;
                  $scope.window_hyperlink = 'home.map.menu.companies.company({id: '+  id +'})';

                  // console.log( $scope.window_image, $scope.window_title, $scope.window_sub_title, $scope.window_hyperlink );

                } else if ( markerType === 'HR_chapters' ) {
                  // console.log('HR_chapters');

                  $scope.window_image = 'img/HRA-logo.svg';

                  $scope.window_title = $rootScope.$storage[ markerType ][ i ].name;
                  $scope.window_sub_title = $rootScope.$storage[ markerType ][ i ].location;
                  $scope.window_hyperlink = 'home.map';

                  console.log( $scope.window_image, $scope.window_title, $scope.window_sub_title, $scope.window_hyperlink );
                }

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

        $scope.centerLocation = function ( latitude, longitude ) {
          $scope.map = { center: { latitude: latitude, longitude: longitude } };
        };

        $scope.updateLocation = function( latitude, longitude ) {
          console.log('updateLocation');
          var req = {
            method: 'GET',
            // url: 'http://api.hrx.club/apntoken',
            url: 'http://api.hrx.club/geoposition',
            headers: {
              // 'X-HRX-User-Token' : encodeURIComponent( $scope.$storage.token ),
              'X-HRX-User-Token' : $scope.$storage.token
            },
            params: { 'latitude': latitude, 'longitude': longitude, 'addition': $scope.$storage.addition, 'user_id': $scope.$storage.user_id }
          };

          $http( req ).
            success( function( data, status, headers, config ) {
              // data responses
              // alert( "data: "+ data );
              // { responseCode: 200, message: 'Added device to Database' }
              // { responseCode: 300, message: 'Already have it on file' }

              // { responseCode: 400, message: 'APN token - No header detected... please report this error' }
              // { responseCode: 401, message: 'APN token - No valid token found... please report this error' }

              if ( data.responseCode === 200 ) {
                console.log(data);
                // $scope.$storage.iosTokenRegistered = true;
                // alert( "Response code: " + data.responseCode + " - " + JSON.stringify( data ) );

                if ( data.new_users ) {
                  // alert("There is data.new_users: "+ typeof data.new_users +" - "+ JSON.stringify( data.new_users ) );
                  for ( var new_users_id_keys in data.new_users ) {
                    for ( var new_users_keys in data.new_users[ new_users_id_keys ] ) {
                      if ( data.new_users[ new_users_id_keys ][ new_users_keys ] === "null" || data.new_users[ new_users_id_keys ][ new_users_keys ] === undefined ) {
                        delete data.new_users[ new_users_id_keys ][ new_users_keys ];
                      }
                    }
                    $scope.SharedData.addAlumni( data.new_users[ new_users_id_keys ] );
                  }
                }

                if ( data.companies ) {
                  for ( var companies_id_keys in data.companies ) {
                    for ( var companies_keys in data.companies[ companies_id_keys ] ) {
                      if ( data.companies[ companies_id_keys ][ companies_keys ] === "null" || data.companies[ companies_id_keys ][ companies_keys ] === undefined ) {
                        delete data.companies[ companies_id_keys ][ companies_keys ];
                      }
                    }
                    $scope.SharedData.addCompany( data.companies[ companies_id_keys ] );
                  }
                }

                if ( data.geolocations ) {
                  for ( var geolocations_id in data.geolocations ) {
                    $scope.SharedData.addAlumni( data.geolocations[ geolocations_id ] );
                  }
                }

                if ( data.hr_chapters ) {
                  // console.log("found hr_chapters: ", data.hr_chapters );
                  for ( var hr_chapters_id in data.hr_chapters ) {
                    for ( var hr_chapters_keys in data.hr_chapters[ hr_chapters_id ] ) {
                      if ( data.hr_chapters[ hr_chapters_id ][ hr_chapters_keys ] === "null" || data.hr_chapters[ hr_chapters_id ][ hr_chapters_keys ] === undefined ) {
                        delete data.hr_chapters[ hr_chapters_id ][ hr_chapters_keys ];
                      }
                    }
                    // console.log("hr_chapters clean: ", data.hr_chapters );
                    $scope.SharedData.addHR_chapter( data.hr_chapters[ hr_chapters_id ] );
                    // console.log("hr_chapters added: ", data.hr_chapters );
                  }
                }

                if ( data.last_id ) {
                  $scope.$storage.addition = data.last_id;
                }

              } else {
                // TODO - ADD better error handler
                // alert( "Response code: " + data.responseCode + " - " + data.message );
              }
            }).
            error( function( data, status, headers, config ) {
              // something called here
              alert( "Error establishing a connection to API: "+ data+" - And status: " + status );

              // need to handle errors like time outs etc...
            });
        };


        $scope.checkForUser_id = function () {
          // alert( $scope.currentLatitude +" - "+ $scope.currentLongitude +" - "+ $scope.$storage.user_id +" - "+ JSON.stringify( $scope.$storage ) );

          if ( $scope.$storage.user_id ) {
            $scope.updateLocation( $scope.currentLatitude, $scope.currentLongitude );
          } else {
            window.setTimeout( function() {
              $scope.checkForUser_id();
            }, 500 );
          }
        }

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

            // TODO - edit to have callback and send to API current positions
            $scope.checkForUser_id();

            // if ( position.coords.accuracy < $scope.positionAccuracyMin ) {
            $scope.positionAccuracyMin = position.coords.accuracy;

            // TODO myMarkers should be locally stored
            // $scope.myMarkers = [];  // already declared bellow
            $scope.$apply();

            // var position = {};
                // position.id = 'self';
                // position.latLng = { latitude: $scope.currentLatitude, longitude: $scope.currentLongitude };
                // position.img = {url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50)};

            // $scope.myMarkers[0] = position;

              if ( $scope.mapFirstLoad ) {
                $scope.mapLocation = false;
                $scope.mapFirstLoad = false;
                $scope.showMyLocation();

                $scope.openMarkerInfo( 'alumni', $scope.$storage.user_id );

                // $scope.infoWindow.coordinates = $scope.myMarkers[0].latLng;
                // $scope.infoWindow.show = true;
                // $scope.infoWindow.id = position.id;
                // $scope.infoWindow.group = 'myMarkers';
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
          // alert(JSON.stringify( event ) );

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
        $scope.alumniMarkers = [];
        $scope.companiesMarkers = [];
        $scope.hrMarkers = [];
        // $scope.conferencesMarkers = [];
        // $scope.eventsMarkers = [];

        // navigator.vibrate(3000);
      });

    }]);
