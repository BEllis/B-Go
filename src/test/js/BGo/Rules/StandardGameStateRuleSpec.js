define(['BGo', 'BGo/Rules/StandardGameStateRule'], function(BGo) {

    describe('BGo.Rules.StandardGameStateRule', function () {
        "use strict";

        describe('SetupMode => PlayMode', function() {

            it ('is allowed', function() {

               // Arrange
               var target = BGo.Rules.StandardGameStateRule.createNew();
               target.mode = 'SetupMode'

               // Action
               target.validate(BGo.Events.PlayMode);

            });

        });

        describe('PlayMode => SetupMode', function() {

            it ('is not allowed', function() {

                // Arrange
                var target = BGo.Rules.StandardGameStateRule.createNew();
                target.mode = 'PlayMode'

                // Action
                var action = function() { target.validate(BGo.Events.SetupMode); };

                // Assert
                expect(action).toThrow('Invalid mode: Cannot switch back to Setup Mode');

            });

        });
    });
});
