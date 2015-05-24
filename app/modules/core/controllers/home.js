'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('HomeController', ['$scope', 'sharedScope', function($scope, sharedScope) {
      $scope.sharedScope = sharedScope;
      $scope.homeVariable = 'Jules Moretti - home';
      $scope.sent_over = 'type Something';
    }]);
