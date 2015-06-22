'use strict';

describe('Controller: TopThreeController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var TopThreeController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        TopThreeController = $controller('TopThreeController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
