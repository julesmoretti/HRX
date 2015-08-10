'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('HomeController', ['$scope', '$http', '$window', '$localStorage', 'SharedData', '$rootScope', '$state', function( $scope, $http, $window, $localStorage, SharedData, $rootScope, $state ) {

        angular.element(document).ready(function (){
          console.log('Angular HomeController is ready');

          if ( !$scope.$storage ) {
            $scope.$storage = $localStorage;

            // DEFAULT SETTINGS
            $scope.$storage.notifications = true;
            $scope.$storage.geoPositioning = true;

            // REFERENCE POINT TO DATA COLLECTION
            $scope.$storage.addition = 0;

          }

          $scope.SharedData = SharedData;


          $scope.clearLocalStorage = function () {
            $localStorage.$reset();
          }

          $scope.SharedData.menuWidth = 320;

          document.addEventListener("deviceready", onDeviceReady, false);

          function onDeviceReady() {
            // NOW SAFE TO USE DEVICE APIS

            // HIDE THE IPHONE STATUS BAR
            StatusBar.hide();

            // HIDE THE KEYBOARD DONE BACK AND NEXT ARROW
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(false);

            // navigator.vibrate(3000);
          }

          if ( !$scope.$storage.token || !$scope.$storage.LI_Token_Registered ) {
            $scope.clearLocalStorage();
            $state.go('home.login');
            // $state.go('home.map');
          } else {
            $state.go('home.map');
          }

        });

    }]);
