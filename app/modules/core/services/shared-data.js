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

      // if( !($rootScope.$storage.companies instanceof Array) ) {
      if( !$rootScope.$storage.companies ) {
        $rootScope.$storage.companies = [];
      }

      if( !$rootScope.$storage.HR_chapters ) {
        $rootScope.$storage.HR_chapters = [];
      }

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

        listHR_chapters: function() {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          return $rootScope.$storage.HR_chapters;
        },



        findAlumn: function( id ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.alumni ) {
            $rootScope.$storage.alumni = [];
          }

          if ( id === undefined ) return false;

            for ( var i = 0; i < $rootScope.$storage.alumni.length; i++ ) {
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

          for ( var i = 0; i < $rootScope.$storage.companies.length; i++ ) {
            if ( $rootScope.$storage.companies[i].id === id ) {
              return $rootScope.$storage.companies[i];
            }
          };
          return false;
        },

        findHR_chapter: function( id ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          if ( id === undefined ) return false;

          for ( var i = 0; i < $rootScope.$storage.HR_chapters.length; i++ ) {
            if ( $rootScope.$storage.HR_chapters[i].id === id ) {
              return $rootScope.$storage.HR_chapters[i];
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

          alumni_object.marker_img = { url: 'img/Pins_People.svg', scaledSize: new google.maps.Size(25, 50) };

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

          company_object.marker_img = { url: 'img/Pins_Company.svg', scaledSize: new google.maps.Size(25, 50) };

          if ( company ) {
            this.updateCompany( company_object );
          } else {
            $rootScope.$storage.companies.push( company_object );
          }
        },

        addHR_chapter: function( chapter_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          var chapter = this.findHR_chapter( chapter_object.id );

          chapter_object.marker_img = { url: 'img/Pins_HRLounge.svg', scaledSize: new google.maps.Size(25, 50) };

          if ( chapter ) {
            this.updateHR_chapter( chapter_object );
          } else {
            $rootScope.$storage.HR_chapters.push( chapter_object );
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
        },

        updateHR_chapter: function( chapter_object ) {

          if ( !$rootScope.$storage ) {
            $rootScope.$storage = $localStorage;
          }

          if( !$rootScope.$storage.HR_chapters ) {
            $rootScope.$storage.HR_chapters = [];
          }

          var current_chapter = this.findHR_chapter( chapter_object.id );

          for ( var keys in chapter_object ) {
            current_chapter[ keys ] = chapter_object[ keys ];
          }

          return current_chapter;
        }

      };
    }]);
