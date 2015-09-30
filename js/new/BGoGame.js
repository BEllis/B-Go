/*jslint browser: false*/
/*global BGo, alert */

(function (global) {
    "use strict";

    var GameState = {}, IntersectionState = {};

    GameState.BlackToPlay = 'blackToPlay';
    GameState.WhiteToPlay = 'whiteToPlay';
    IntersectionState.Black = 'black';
    IntersectionState.White = 'white';
    IntersectionState.Empty = '';

    global.BGoIntersection = function () {
        var me = this;

        me.state = IntersectionState.Empty;

        return me;
    }

    global.BGoBoardState = function () {
        var me = this, i, j;

        me.intersection = [];

        for (i = 0; i < 19; i = i + 1) {
            for (j = 0; j < 19; j = j + 1) {
                me.intersection.push(new BGoIntersection());
            }
        }

        return me;
    }

    global.BGoGame = function () {

        var me = this,
            trigger,
            togglePlayerTurn,
            gameState = GameState.BlackToPlay,
            boardState = new BGoBoardState();

        me.eventHandlers = {};
        me.eventHandlers[BGo.Events.BlackStonePlayed] = [];
        me.eventHandlers[BGo.Events.WhiteStonePlayed] = [];
        me.eventHandlers[BGo.Events.CannotPlayOnAnotherStone] = [];

        me.bind = function (event, handler) {

            if (event === BGo.Events.BlackStonePlayed
                    ||
                    event === BGo.Events.WhiteStonePlayed
                    ||
                    event === BGo.Events.CannotPlayOnAnotherStone) {
                me.eventHandlers[event].push(handler);
            } else {
                throw 'Cannot bind to unsupported event.';
            }
        };

        trigger = function (event, args) {
            me.eventHandlers[event].map(function (handler) { handler.apply(null, args); });
        };

        togglePlayerTurn = function () {
            if (gameState === GameState.BlackToPlay) {
                gameState = GameState.WhiteToPlay;
            } else {
                gameState = GameState.BlackToPlay;
            }
        };

        me.playMove = function (index) {

            var intersection = boardState.intersection[index];
            if (intersection.state !== IntersectionState.Empty)
            {
                trigger(BGo.Events.CannotPlayOnAnotherStone, [ index ]);
                return;
            }

            if (gameState === GameState.BlackToPlay) {
                intersection.state = IntersectionState.Black;
                trigger(BGo.Events.BlackStonePlayed, [ index ]);
            } else {
                intersection.state = IntersectionState.White;
                trigger(BGo.Events.WhiteStonePlayed, [ index ]);
            }

            togglePlayerTurn();

        };

        return me;
    };
}(window));