'use strict';

describe('Controller: SkillsController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var SkillsController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        SkillsController = $controller('SkillsController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
