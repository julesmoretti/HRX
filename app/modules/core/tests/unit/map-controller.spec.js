'use strict';

describe('Controller: MapController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var MapController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MapController = $controller('MapController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
