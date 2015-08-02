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

            var alumni = [];

            // var alumni = [
            //   { id: 0,
            //     full_name: 'Jules Moretti',
            //     LI_positions: 'Design Technologist',
            //     LI_location_name: 'San Francisco Bay Area',
            //     LI_location_country_code: 'us',
            //     LI_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tempor arcu, quis hendrerit nunc accumsan quis. In ut dolor metus, eget viverra odio. Quisque sed suscipit leo. Curabitur dictum magna ut turpis interdum a mollis nunc condimentum. Praesent leo est, hendreriteget condimentum sit amet, placerat adipiscing neque. Curabitur id metus tellus, sed semper odio. Phasellus id justo ante, vel bibendum eros. Nulla suscipit felis eget erat iaculis et aliquam turpis consequat. Nunc posuere mollis tellus sit amet dapibus. Praesent sagittis quam sit amet mauris venenatis in dignissim purus dapibus.',
            //     skills: ['industrial design', 'front end', 'choreography' ],
            //     cohort: 12,

            //     LI_company: {
            //       id: 0,
            //       profile_picture: 'img/profile.jpg',
            //       name: 'WET Design',
            //       size: '201-500 employees',
            //       alumn: 8,
            //       www: 'http://www.wetdesign.com'
            //     },
            //     LI_url: 'http://linkedin.com/in/julesmoretti',

            //     GH_profile_picture: 'img/dummy-profile.jpeg',
            //     GH_private_repos: 9,
            //     GH_public_repos: 39,
            //     GH_url: 'http://github.com/julesmoretti',
            //     blog: 'http://behance.net/julesmoretti',

            //     LI_address: '3405 Helen St, Apt 9, Oakland, 94608 CA',
            //     email: 'jules@jules.com',
            //     phone: 2134007436
            //   },
            //   {id: 1, full_name: 'James Jackson', email: 'james@james.com', LI_description: 'this is the description of 1' },
            //   {id: 2, full_name: 'Bruce William', email: 'bruce@bruce.com', LI_description: 'this is the description of 2' },
            //   {id: 3, full_name: 'Frank Morris', email: 'frank@frank.com', LI_description: 'this is the description of 3' },
            //   {id: 4, full_name: 'Johny Franckle', email: 'Johny@Johny.com', LI_description: 'this is the description of 4' },
            //   {id: 5, full_name: 'Jules Morrison', email: 'jules@jules.com', LI_description: 'this is the description of 5' },
            //   {id: 6, full_name: 'James Snapper', email: 'james@james.com', LI_description: 'this is the description of 6' },
            //   {id: 7, full_name: 'Bruce Franc', email: 'bruce@bruce.com', LI_description: 'this is the description of 7' },
            //   {id: 8, full_name: 'Frank Muscle', email: 'frank@frank.com', LI_description: 'this is the description of 8' },
            //   {id: 9, full_name: 'Johny Black', email: 'Johny@Johny.com', LI_description: 'this is the description of 9' },
            //   {id: 10, full_name: 'Jules Speghetti', email: 'jules@jules.com', LI_description: 'this is the description of 10' },
            //   {id: 11, full_name: 'James Franco', email: 'james@james.com', LI_description: 'this is the description of 11' },
            //   {id: 12, full_name: 'Bruce Lee', email: 'bruce@bruce.com', LI_description: 'this is the description of 12' },
            //   {id: 13, full_name: 'Frank Diaz', email: 'frank@frank.com', LI_description: 'this is the description of 13' },
            //   {id: 14, full_name: 'Johny Walker', email: 'Johny@Johny.com', LI_description: 'this is the description of 14' },
            //   ];

            var companies = [];

            // var companies = [
            //   {
            //     id: 0,
            //     name: 'WET Design',
            //     industry: 'Design',
            //     size: '201-500 employees',
            //     type: 'Privately Held',
            //     alumni: [0,2,3,1,7,4,5,6],
            //     address: '10847 Sherman Way, Sun Valley, CA 91352, USA',
            //     address_suite: undefined,
            //     phone: 8884007832,
            //     www: 'http://www.wetdesign.com',
            //     logo: undefined,
            //     lat: 34.201519,
            //     long: -118.367399
            //   },
            //   {
            //     id: 1,
            //     name: 'Frog Design'
            //   },
            //   {
            //     id: 2,
            //     name: 'Google Inc'
            //   },
            //   {
            //     id: 3,
            //     name: 'Apple'
            //   },
            //   {
            //     id: 4,
            //     name: 'Yellow'
            //   },
            //   {
            //     id: 5,
            //     name: 'Bananna'
            //   },
            //   {
            //     id: 6,
            //     name: 'Pineaple'
            //   },
            //   {
            //     id: 7,
            //     name: 'Tomato'
            //   }
            //   // ];

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

                listCompanies: function() {
                  return companies;
                },

                /**
                 * @ngdoc function
                 * @name core.Services.SharedData#method2
                 * @methodOf core.Services.SharedData
                 * @return {boolean} Returns a boolean value
                 */
                findAlumn: function( id ) {

                  if ( id === undefined ) return false;

                    for (var i = 0; i < alumni.length; i++) {
                      if ( alumni[i].id === id ) {
                        return alumni[i];
                      }
                    };
                    return false;
                },

                findCompany: function( id ) {
                  for (var i = 0; i < companies.length; i++) {
                    if ( companies[i].id === id ) {
                      return companies[i];
                    }
                  };
                  return false;
                },

                addAlumni: function( alumni_object ) {
                  alumni.push( alumni_object );
                },

                addCompany: function( company_object ) {
                  companies.push( company_object );
                },

                updateAlumni: function( alumni_object ) {

                  var alumni = this.findAlumn( alumni_object.id );

                  for ( var keys in alumni_object ) {
                    alumni[ keys ] = alumni_object[ keys ];
                  }

                  return alumni;

                },

                updateCompany: function( company_object ) {

                  var company = this.findCompany( company_object.id );

                  for ( var keys in company_object ) {
                    company[ keys ] = company_object[ keys ];
                  }

                  return alumni;

                }

            };
    });
