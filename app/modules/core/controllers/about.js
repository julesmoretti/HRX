'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('AboutController', ['$scope', 'sharedScope', function($scope, sharedScope) {
      $scope.sharedScope = sharedScope;
      $scope.aboutVariable = 'Jules Moretti - About';
    }]);
