'use strict';

describe('Controller: AlumniController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var AlumniController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        AlumniController = $controller('AlumniController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
