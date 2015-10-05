define(['BGo', 'BGo/Events', 'BGo/Rules/StandardGameEndRule'], function(BGo) {

    describe('BGo.Rules.StandardGameEndRule', function () {
        "use strict";

        it ('If in play mode, one passes does not cause scoring to start.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.PlayMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode)
            eventAggregator.raise(BGo.Events.Pass);

            // Assert
            expect(mode).toBe(BGo.Events.PlayMode);

        });


        it ('If in play mode, two passes with a move in between does not cause scoring to start.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.PlayMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode)
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.Play);
            eventAggregator.raise(BGo.Events.Pass);

            // Assert
            expect(mode).toBe(BGo.Events.PlayMode);

        });

        it ('If in play mode, two consecutive passes causes scoring to start.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.PlayMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode)
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.Pass);

            // Assert
            expect(mode).toBe(BGo.Events.ScoringMode);

        });

        it ('If not in play mode, two consecutive passes does not cause scoring to start.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.SetupMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode)
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.Pass);

            // Assert
            expect(mode).toBe(BGo.Events.SetupMode);

        });

        it ('If resuming play mode after reposition mode, if one pass was at the end of the reposition and another pass' +
            'is played then cause scoring to start.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.RepositionMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode);
            eventAggregator.raise(BGo.Events.Play);
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.PlayMode);
            eventAggregator.raise(BGo.Events.Pass);

            // Assert
            expect(mode).toBe(BGo.Events.ScoringMode);

        });

        it ('If resuming play mode after reposition mode, if two passes were at the end of the reposition' +
            'then cause scoring to start.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.RepositionMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode);
            eventAggregator.raise(BGo.Events.Play);
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.PlayMode);

            // Assert
            expect(mode).toBe(BGo.Events.ScoringMode);

        });

        it ('If resuming play mode after scoring mode, ignore previous passes.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.RepositionMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode);
            eventAggregator.raise(BGo.Events.Play);
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.Pass);
            eventAggregator.raise(BGo.Events.PlayMode); // Scoring mode is triggered as the players passed twice.
            eventAggregator.raise(BGo.Events.PlayMode); // Should end in play-mode otherwise passes aren't being
                                                        // ignored.

            // Assert
            expect(mode).toBe(BGo.Events.PlayMode);

        });

        it ('In play mode, resignation causes game to complete.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.PlayMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode);
            eventAggregator.raise(BGo.Events.Play);
            eventAggregator.raise(BGo.Events.Resign);

            // Assert
            expect(mode).toBe(BGo.Events.CompleteMode);

        });

        it ('In review mode, resignation is ignored.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.ReviewMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode);
            eventAggregator.raise(BGo.Events.Play);
            eventAggregator.raise(BGo.Events.Resign);

            // Assert
            expect(mode).toBe(BGo.Events.ReviewMode);

        });

        it ('In reposition mode, when switching to Play mode, game is marked as complete.', function() {

            // Arrange
            var eventAggregator = BGo.EventAggregator.createNew();
            var target = BGo.Rules.StandardGameEndRule.createNew(eventAggregator);
            var mode = BGo.Events.RepositionMode;
            eventAggregator.subscribeHandler(BGo.Events.ModeChange, function(event, args) { mode = event; });

            // Action
            eventAggregator.raise(mode);
            eventAggregator.raise(BGo.Events.Play);
            eventAggregator.raise(BGo.Events.Resign);
            eventAggregator.raise(BGo.Events.PlayMode);

            // Assert
            expect(mode).toBe(BGo.Events.CompleteMode);

        });


    });
});
