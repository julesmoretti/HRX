'use strict';

describe('Controller: FilterController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var FilterController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        FilterController = $controller('FilterController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
