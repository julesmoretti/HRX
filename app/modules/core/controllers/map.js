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

          $scope.windowWidth = window.innerWidth;
          $scope.windowHeight = window.innerHeight;



          var styles = [{
                          stylers: [
                            {hue:'#ff1a00'},
                            {invert_lightness:true},
                            {saturation:-100},
                            {lightness:33},
                            {gamma:0.5}]
                        },
                        {
                          featureType:'water',
                          elementType:'geometry',
                          stylers:[{color:'#2D333C'}]
                        }];

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


          // Create a new StyledMapType object, passing it the array of styles,
          // as well as the name to be displayed on the map type control.
          var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});

          // Create a map object, and include the MapTypeId to add
          // to the map type control.
          var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(55.6468, 37.581),
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
              // style: google.maps.ZoomControlStyle.LARGE,
              position: google.maps.ControlPosition.LEFT_TOP
            },
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
          };
          var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

          //Associate the styled map with the MapTypeId and set it to display.
          map.mapTypes.set('map_style', styledMap);
          map.setMapTypeId('map_style');


          $('#map_canvas').find('img[src="https://maps.gstatic.com/mapfiles/szc4.png"]').parent('.gmnoprint').css('background-color', 'red');

          // function initialize() {
            // var mapOptions = {
            //   center: { lat: -34.397, lng: 150.644},
            //   zoom: 8
            // };
            // var map = new google.maps.Map(document.getElementById('map-canvas'),
            //     mapOptions);
            // console.log(map);
          // }

          // google.maps.event.addDomListener(window, 'load', initialize);

          // $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

          // var marker = {
          //   idKey: 123,
          //   coords: {
          //   latitude: 37.7836377,
          //   longitude: -122.4132168
          //   }
          // };

          // $scope.$on('mapInitialized', function(event, map) {
          //   $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
          //   map.setCenter( $scope.map );
          //   // ..
          // });



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
