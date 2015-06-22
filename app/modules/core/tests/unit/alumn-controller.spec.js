'use strict';

describe('Controller: AlumnController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var AlumnController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        AlumnController = $controller('AlumnController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
