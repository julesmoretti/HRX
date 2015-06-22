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
    }]);
