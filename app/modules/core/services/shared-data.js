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

            var alumni = [
              {id: 0, name: 'Jules', email: 'jules@jules.com', description: 'this is the description of 0' },
              {id: 1, name: 'James', email: 'james@james.com', description: 'this is the description of 1' },
              {id: 2, name: 'Bruce', email: 'bruce@bruce.com', description: 'this is the description of 2' },
              {id: 3, name: 'Frank', email: 'frank@frank.com', description: 'this is the description of 3' },
              {id: 4, name: 'Johny', email: 'Johny@Johny.com', description: 'this is the description of 4' }
            ];

            return {

                /**
                 * @ngdoc function
                 * @name core.Services.SharedData#method1
                 * @methodOf core.Services.SharedData
                 * @return {boolean} Returns a boolean value
                 */
                listAlumni: function() {
                    return alumni;
                },

                /**
                 * @ngdoc function
                 * @name core.Services.SharedData#method2
                 * @methodOf core.Services.SharedData
                 * @return {boolean} Returns a boolean value
                 */
                findAlumn: function( id ) {
                    for (var i = 0; i < alumni.length; i++) {
                      if ( alumni[i].id === id ) {
                        return alumni[i];;
                      }
                    };
                    return false;
                }
            };
    });
