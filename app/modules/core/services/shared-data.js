'use strict';

/**
 * @ngdoc service
 * @name core.Services.SharedData
 * @description SharedData Factory
 */
angular
    .module('core')
    .factory('SharedData', [ '$rootScope', '$localStorage', function( $rootScope, $localStorage ) {

      if ( !$rootScope.$storage ) {
        $rootScope.$storage = $localStorage;
      }

      // if( !($rootScope.$storage.alumni instanceof Array) ) {
      if( !$rootScope.$storage.alumni ) {
        $rootScope.$storage.alumni = [];
      }

      // var alumni = [
          // { id: 0,

            // user_status: 'alumni',

            // full_name: 'Jules Moretti',
            // cohort: 12,

            // skills: ['industrial design', 'front end', 'choreography' ],
            // skills: null,

            // blog: 'http://behance.net/julesmoretti',
            // address: null,
            // email: '',
            // phone_number: null,

            // GH_profile_picture: 'img/dummy-profile.jpeg',
            // GH_url: 'https://github.com/julesmoretti',
            // GH_public_repos: 26,
            // GH_private_repos: 19,

            // LI_positions: 'Design Technologist',
            // LI_location_name: 'San Francisco Bay Area',
            // LI_location_country_code: 'us',
            // LI_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tempor arcu, quis hendrerit nunc accumsan quis. In ut dolor metus, eget viverra odio. Quisque sed suscipit leo. Curabitur dictum magna ut turpis interdum a mollis nunc condimentum. Praesent leo est, hendreriteget condimentum sit amet, placerat adipiscing neque. Curabitur id metus tellus, sed semper odio. Phasellus id justo ante, vel bibendum eros. Nulla suscipit felis eget erat iaculis et aliquam turpis consequat. Nunc posuere mollis tellus sit amet dapibus. Praesent sagittis quam sit amet mauris venenatis in dignissim purus dapibus.',
            // LI_company: 1,
            // LI_url: 'http://linkedin.com/in/julesmoretti',
            // latitude: ...,
            // longitude: ...,
            // share_geoposition: 1,

            // LI_profile_picture: http://.....,
          // },
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

      // if( !($rootScope.$storage.companies instanceof Array) ) {
      if( !$rootScope.$storage.companies ) {
        $rootScope.$storage.companies = [];
      }

      // var companies = [
        //   {
            // id: 1,
            // name: 'frog',
            // logo: null,
            // size: '501-1000 employees',
            // type: 'Privately Held',
            // industry: 'Design',

            // alumni: [0,2,3,1,7,4,5,6], --TODO
            // alumni: null,

            // www: 'http://www.frogdesign.com',
            // address: '660 3rd Street, 4th floor, San Francisco, CA 94107',
            // phone: 8884007832,

            // lat: 34.201519,
            // long: -118.367399
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

        listAlumni: function() {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          return $rootScope.$storage.alumni;
        },

        listCompanies: function() {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          return $rootScope.$storage.companies;
        },

        findAlumn: function( id ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          if ( id === undefined ) return false;

            for (var i = 0; i < $rootScope.$storage.alumni.length; i++) {
              if ( $rootScope.$storage.alumni[i].id === id ) {
                return $rootScope.$storage.alumni[i];
              }
            };
            return false;
        },

        findCompany: function( id ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          if ( id === undefined ) return false;

          for (var i = 0; i < $rootScope.$storage.companies.length; i++) {
            if ( $rootScope.$storage.companies[i].id === id ) {
              return $rootScope.$storage.companies[i];
            }
          };
          return false;
        },

        addAlumni: function( alumni_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          // alert( "addAlumni: " + JSON.stringify( alumni_object ) );

          var current_alumni = this.findAlumn( alumni_object.id );

          if ( current_alumni ) {
            this.updateAlumni( alumni_object );
          } else {
            $rootScope.$storage.alumni.push( alumni_object );
          }

        },

        addCompany: function( company_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          var company = this.findCompany( company_object.id );

          if ( company ) {
            this.updateCompany( company_object );
          } else {
            $rootScope.$storage.companies.push( company_object );
          }
        },

        updateAlumni: function( alumni_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          var current_alumni = this.findAlumn( alumni_object.id );

          for ( var keys in alumni_object ) {
            current_alumni[ keys ] = alumni_object[ keys ];
          }

          return current_alumni;

        },

        updateCompany: function( company_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.companies ) {
            $rootScope.$storage.companies = [];
          }

          var current_company = this.findCompany( company_object.id );

          for ( var keys in company_object ) {
            current_company[ keys ] = company_object[ keys ];
          }

          return current_company;

        }

      };
    }]);
