define(['BGo'], function(BGo) {

    BGo.Events = {};

    // Setup Events
    BGo.Events.BoardSpecification = 'BoardSpecification';
    BGo.Events.HandicapSet = 'HandicapSet';
    BGo.Events.KomiSet = 'KomiSet';
    // BGo.Events.PlayerSet = 'PlayerSet';
    // BGo.Events.RefereeSet = 'RefereeSet';
    // BGo.Events.SpectatorSet = 'SpectatorSet';

    // Chat Events
    // Bgo.Events.Message = 'Message';

    // Game State Events
    BGo.Events.SetupMode = 'SetupMode';
    BGo.Events.PlayMode = 'PlayMode';
    BGo.Events.ReviewMode = 'ReviewMode';
    BGo.Events.ScoringMode = 'ScoringMode';
    BGo.Events.RepositionMode = 'RepositionMode';
    BGo.Events.CompleteMode = 'CompleteMode';

    // Derived events
    BGo.Events.ModeChange = 'ModeChange';

    // Play Mode Events
    BGo.Events.Play = 'Play';
    BGo.Events.Pass = 'Pass';
    BGo.Events.Resign = 'Resign';
    BGo.Events.RequestUndo = 'RequestUndo';
    BGo.Events.ApproveUndo = 'ApproveUndo';
    BGo.Events.RejectUndo = 'RejectUndo';

    // Review Mode Events
    BGo.Events.Put = 'Put';
    /*
    BGo.Events.Remove = 'Remove';
    BGo.Events.Mark = 'Mark';

    // Scoring Mode Events
    BGo.Events.MarkGroupState = 'MarkGroupState';
    BGo.Events.AgreeDeadGroups = 'AgreeDeadGroups';
    BGo.Events.DisputeDeadGroups = 'DisputeDeadGroups';
    BGo.Events.AllDeadGroupsMarked = 'AllDeadGroupsMarked';
    BGo.Events.FinalScore = 'FinalScore';
    */

    function EventAggregator() {

        var me = this,
            eventValidators = {},
            eventHandlers = {},
            eventQueue = [],
            handlingEvents = false;

        // Adds an event type to be supported by this game.
        var supportEvent = function(event) {
            if (eventHandlers[event]) {
                return false;
            }

            eventValidators[event] = [];
            eventHandlers[event] = [];
            return true;
        }

        Object.keys(BGo.Events).map(function(item) { supportEvent(item); });

        // Indicates whether the given event is supported in this game (i.e. is there an emitter)
        /* me.isEventSupported = function(event) {
         return false;
         }  */

        me.subscribeValidator = function (event, handler) {

            if (eventValidators[event]) {
                eventValidators[event].push(handler);
            } else {
                throw 'Cannot subscribeValidator to unsupported event ' + event + '.';
            }

        }

        me.subscribeHandler = function (event, handler) {

            if (eventHandlers[event]) {
                eventHandlers[event].push(handler);
            } else {
                throw 'Cannot subscribeHandler to unsupported event ' + event + '.';
            }
        };

        var handleEvents = function() {

            // If not already handling events,
            if (!handlingEvents) {
                // Keep popping events off event queue until caught up.
                handlingEvents = true;
                while (eventQueue.length > 0) {

                    var eventData = eventQueue.pop();

                    console.log(eventData.event);
                    eventHandlers[eventData.event].map(function (handler) { handler.apply(null, eventData.args); });
                }

                handlingEvents = false;
            }

        };

        var raiseHighPriority = function (event, args) {

            // TODO: Hack, must be a better way of doing this.
            var oldEventQueue = eventQueue;
            eventQueue = [{ 'event': event, 'args': args }];
            while (oldEventQueue.length > 0) {
                eventQueue.push(oldEventQueue.pop());
            }

        }

        me.raise = function (event, args) {

            // Add event to a queue.
            eventQueue.push({ 'event': event, 'args': args })
            handleEvents();
        };

        me.validate = function (event, args) {

            if (handlingEvents) {
                // TODO: Look at promises perhaps to get around this problem?
                throw 'Can\'t validate event while events are being handled.';
            }

            eventValidators[event].map(function (handler) { handler.apply(null, args); });

        }

        // Derived events
        function deriveEventFrom(fromEvent, toEvent) {

            me.subscribeHandler(fromEvent, function() { raiseHighPriority(toEvent, [ fromEvent, arguments ]); })

        }

        deriveEventFrom(BGo.Events.SetupMode, BGo.Events.ModeChange);
        deriveEventFrom(BGo.Events.PlayMode, BGo.Events.ModeChange);
        deriveEventFrom(BGo.Events.RepositionMode, BGo.Events.ModeChange);
        deriveEventFrom(BGo.Events.ScoringMode, BGo.Events.ModeChange);
        deriveEventFrom(BGo.Events.ReviewMode, BGo.Events.ModeChange);
        deriveEventFrom(BGo.Events.CompleteMode, BGo.Events.ModeChange);

    }

    BGo.EventAggregator = EventAggregator;
    BGo.EventAggregator.createNew = function () {

        return new BGo.EventAggregator();

    };

    return BGo.Events;

});

/*
 Note: Need to synchronize events on server between players/AI.

 ModePlay // Handle moves in real-time.
 BlackPlayA
 WhitePlayB
 BlackPlayC
 BlackRequestUndo
 WhiteAgreesToUndo
 ModeReposition
 BlackPlayA
 WhitePlayB
 ModePlay
 BlackPlayD
 WhitePlayPass
 BlackPlayPass
 ModeScoring // Move to Scoring state
 MarkGroupState // Mark alive/dead groups
 MarkGroupState
 BlackAgrees
 WhiteAgrees
 AllDeadGroupsMarked // Indicate agreement from players
 FinalScore // Calculated Score
 ModeComplete
 ModeReview // Allow players to review afterwards
 ModeReposition (All current game state is reset and act as if replayed from the beginning to get to a new current game state)
 BlackPlayA
 WhitePlayB
 BlackPlayD
 WhitePlayE
 ModeReview
 RemoveBlackX
 PutWhiteX
 PutWhiteY
 PutWhiteZ
 RemoveWhiteG


 Set Up Events (Setup Mode only, includes Put from Review Events used in conjunction with handicap)
 -------------

 BoardSpecification
 HandicapSet
 KomiSet
 PlayerSet
 RefereeSet
 SpectatorSet

 Chat Events
 -----------

 + Message

 Review Events (Plus Play Events) (Only in Review Mode)
 -------------

 + Put (And Setup Mode)
 + Remove
 + Mark (And Setup Mode?)

 Play Events (Play, Review or Reposition modes)
 -----------

 + Play
 + Pass
 + RequestUndo
 + ApproveUndo
 + RejectUndo

 Scoring Events (Scoring Mode only)
 --------------

 + MarkGroupState
 + AgreeDeadGroups
 + DisputeDeadGroups
 AllDeadGroupsMarked
 FinalScore

 Game State Events
 -----------------

 ModeSetup
 + ModePlay
 ModeScoring
 ModeReposition
 ModeComplete
 + ModeReview

 + = App, Referee, or player Command

 */