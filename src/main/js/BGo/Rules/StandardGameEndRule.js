define(['BGo', 'BGo/Events', 'BGo/Rules'], function(BGo) {

    function StandardGameEndRule(eventAggregator) {

        var me = this;
        var numberOfPasses = 0;
        var mode = 'SetupMode';

        var checkForScoringMode = function() {

            if (mode == 'PlayMode' && numberOfPasses > 1) {

                eventAggregator.raise(BGo.Events.ScoringMode);

            }

        };

        var handlePass = function() {

            if (mode == 'RepositionMode' || mode == 'PlayMode')
            {
                numberOfPasses++;
            }

            checkForScoringMode();
        }

        var handleResign = function() {

            if (mode == 'PlayMode') {
                eventAggregator.raise(BGo.Events.CompleteMode);
            }

        };

        eventAggregator.subscribeHandler(BGo.Events.Resign, handleResign);
        eventAggregator.subscribeHandler(BGo.Events.Pass, handlePass);
        eventAggregator.subscribeHandler(BGo.Events.Play, function() { numberOfPasses = 0; });

        eventAggregator.subscribeHandler(BGo.Events.SetupMode, function() { mode = 'SetupMode'; });
        eventAggregator.subscribeHandler(BGo.Events.PlayMode, function() { mode = 'PlayMode'; checkForScoringMode(); });

        eventAggregator.subscribeHandler(BGo.Events.RepositionMode, function() { mode = 'RepositionMode'; numberOfPasses = 0; });
        eventAggregator.subscribeHandler(BGo.Events.ScoringMode, function() { mode = 'ScoringMode'; numberOfPasses = 0; });

    }

    BGo.Rules.StandardGameEndRule = StandardGameEndRule;
    BGo.Rules.StandardGameEndRule.createNew = function(eventAggregator) {
        return new StandardGameEndRule(eventAggregator);
    };

});