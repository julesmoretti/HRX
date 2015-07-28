'use strict';

describe('Controller: CompaniesController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var CompaniesController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        CompaniesController = $controller('CompaniesController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
