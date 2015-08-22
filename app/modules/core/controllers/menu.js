'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.MenuController
 * @description MenuController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('MenuController', ['$rootScope', '$scope', '$state', '$localStorage', 'SharedData', function( $rootScope, $scope, $state, $localStorage, SharedData ) {

      console.log('MenuController Ready');

      if ( !$scope.$storage ) {
        $scope.$storage = $localStorage;
      }

      if ( !$scope.SharedData ) {
        $scope.SharedData = SharedData;
      }

      $scope.all_users = $scope.SharedData.listAlumni();
      $scope.all_companies = $scope.SharedData.listCompanies();
      $scope.all_chapters = $scope.SharedData.listHR_chapters();

    }]);
