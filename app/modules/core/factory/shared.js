'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .factory('sharedScope', function() {
      console.log('sharedScope loaded');
      return {};
    });
