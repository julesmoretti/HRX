'use strict';

describe('Controller: LoginLiController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var LoginLiController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        LoginLiController = $controller('LoginLiController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
