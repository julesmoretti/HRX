'use strict';

/**
 * @ngdoc service
 * @name core.Services.SharedData
 * @description SharedData Factory
 */
angular
    .module('core')
    .factory('SharedData',
        function() {
            return {

                /**
                 * @ngdoc function
                 * @name core.Services.SharedData#method1
                 * @methodOf core.Services.SharedData
                 * @return {boolean} Returns a boolean value
                 */
                method1: function() {
                    return true;
                },

                /**
                 * @ngdoc function
                 * @name core.Services.SharedData#method2
                 * @methodOf core.Services.SharedData
                 * @return {boolean} Returns a boolean value
                 */
                method2: function() {
                    return false
                }
            };
    });
