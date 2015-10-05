define(['BGo', 'BGo/Rules'], function(BGo) {

    function StandardGameStateRule() {

        var me = this;

        me.validate = function(event, args) {
          if (event == BGo.Events.SetupMode) {
            throw 'Invalid mode: Cannot switch back to Setup Mode';
          }
        };

        me.mode = 'SetupMode';

    }

    BGo.Rules.StandardGameStateRule = StandardGameStateRule;
    BGo.Rules.StandardGameStateRule.createNew = function() {
        return new StandardGameStateRule();
    };

});