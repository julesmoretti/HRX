'use strict';

describe('Controller: CompanyController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var CompanyController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        CompanyController = $controller('CompanyController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
