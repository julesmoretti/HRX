'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.AlumniController
 * @description AlumniController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('AlumniController', ['$scope', 'SharedData', function($scope, SharedData) {
      $scope.SharedData = SharedData;
      $scope.aboutVariable = 'Jules Moretti - About';
      $scope.subscribers = SharedData.listAlumni();
    }]);
