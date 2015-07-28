'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.CompanyController
 * @description CompanyController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('CompanyController', ['$scope', '$stateParams', 'SharedData', function($scope, $stateParams, SharedData) {
      $scope.SharedData = SharedData;
      $scope.selectedCompany = SharedData.findCompany( JSON.parse( $stateParams.id ) );

      $scope.openlink = function ( link ) {
        window.open(link, "_system");
      };
    }]);
