'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.CompaniesController
 * @description CompaniesController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('CompaniesController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.companies = SharedData.listCompanies();
    }]);
