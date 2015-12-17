define(['BGo', 'BGo/Events', 'BGo/Rules'], function(BGo) {

    function StandardGameEndRule(eventAggregator) {

        var me = this;
        var numberOfPasses;
        var resignation;
        var mode = 'SetupMode';

        var reset = function() {
            numberOfPasses = 0;
            resignation = false;
        }

        reset();

        var checkForGameEnd = function() {

            if (mode == 'PlayMode' && numberOfPasses > 1) {

                eventAggregator.raise(BGo.Events.ScoringMode);

            } else if (mode == 'PlayMode' && resignation) {

                eventAggregator.raise(BGo.Events.CompleteMode);

            }

        };

        var handlePass = function() {

            if (mode == 'RepositionMode' || mode == 'PlayMode')
            {
                numberOfPasses++;
            }

            checkForGameEnd();
        }

        var handleResign = function() {

            if (mode == 'PlayMode') {
                eventAggregator.raise(BGo.Events.CompleteMode);
            } else {
                resignation = true;
            }

        };

        eventAggregator.subscribeHandler(BGo.Events.Resign, handleResign);
        eventAggregator.subscribeHandler(BGo.Events.Pass, handlePass);
        eventAggregator.subscribeHandler(BGo.Events.Play, function() { reset(); });

        eventAggregator.subscribeHandler(BGo.Events.SetupMode, function() { mode = 'SetupMode'; });
        eventAggregator.subscribeHandler(BGo.Events.PlayMode, function() { mode = 'PlayMode'; checkForGameEnd(); });

        eventAggregator.subscribeHandler(BGo.Events.RepositionMode, function() { mode = 'RepositionMode'; reset(); });
        eventAggregator.subscribeHandler(BGo.Events.ScoringMode, function() { mode = 'ScoringMode'; reset(); });

    }

    BGo.Rules.StandardGameEndRule = StandardGameEndRule;
    BGo.Rules.StandardGameEndRule.createNew = function(eventAggregator) {
        return new StandardGameEndRule(eventAggregator);
    };

});