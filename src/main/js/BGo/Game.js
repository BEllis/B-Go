/*jslint browser: false*/
/*global BGo, alert */

define(['BGo', 'BGo/Events'], function(BGo) {
    "use strict";

    // The game class actually is just a specialised event aggregator.
    function Game () {

        var me = this,
            eventAggregator = BGo.EventAggregator.createNew();
/*            trigger,
            togglePlayerTurn,
            gameState = GameState.BlackToPlay; */



        me.validateMove = function (index) {

            var event = BGo.Events.Play;
            eventAggregator.validate(event);

        }

        me.playMove = function (index) {

            var event = BGo.Events.Play;
            eventAggregator.validate(event);
            eventAggregator.raise(event);

        };

        me.pass = function () {

            var event = BGo.Events.Pass;
            eventAggregator.validate(event);
            eventAggregator.raise(event);

        }

        me.playMode = function () {

            var event = BGo.Events.PlayMode;
            eventAggregator.validate(event);
            eventAggregator.raise(event)

        }

        me.reviewMode = function () {

            var event = BGo.Events.ReviewMode;
            eventAggregator.validate(event);
            eventAggregator.raise(event)

        }

        /*
         // TODO: Move to a rule.
         var GameState = {}, IntersectionState = {};

         GameState.BlackToPlay = 'blackToPlay';
         GameState.WhiteToPlay = 'whiteToPlay';
         IntersectionState.Black = 'black';
         IntersectionState.White = 'white';
         IntersectionState.Empty = '';

         BGo.Intersection = function () {
         var me = this;

         me.state = IntersectionState.Empty;

         return me;
         }

         BGo.BoardState = function (boardSize) {
         var me = this, i, j;

         me.intersection = [];

         for (i = 0; i < boardSize; i = i + 1) {
         for (j = 0; j < boardSize; j = j + 1) {
         me.intersection.push(new BGo.Intersection());
         }
         }

         return me;
         }

         // TODO: Move to a rule.
         var intersection = boardState.intersection[index];
         if (intersection.state !== IntersectionState.Empty)
         {
         me.raiseEvent(BGo.Events.CannotPlayOnAnotherStone, [ index ]);
         return;
         }

         // TODO: Move to a rule.
         if (gameState === GameState.BlackToPlay) {
         intersection.state = IntersectionState.Black;
         me.raiseEvent(BGo.Events.BlackStonePlayed, [ index ]);
         } else {
         intersection.state = IntersectionState.White;
         me.raiseEvent(BGo.Events.WhiteStonePlayed, [ index ]);
         }

         // TODO: Move to a rule.
         togglePlayerTurn();   */

        /*
        // TODO: Move to a rule.
        me.supportEvent(BGo.Events.BlackStonePlayed);
        me.supportEvent(BGo.Events.WhiteStonePlayed);
        me.supportEvent(BGo.Events.CannotPlayOnAnotherStone);

        // TODO: Move to a rule.
        togglePlayerTurn = function () {
            if (gameState === GameState.BlackToPlay) {
                gameState = GameState.WhiteToPlay;
            } else {
                gameState = GameState.BlackToPlay;
            }
        }; */

        return me;
    };

    BGo.Game = Game;
    BGo.Game.createNew = function() {

        // var boardState = new BGo.BoardState(boardSpec);
        return new Game();

    }

    return BGo.Game;

});
