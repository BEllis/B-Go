/*jslint browser: true*/
/*global BGo, alert */

(function (global, document) {
    "use strict";

    function BGoViewModel(bgoGame, languagePack) {

        var me = this,
            i,
            j;

        if (!languagePack) {
            me.languagePack = {
                CommandButtonUndo: 'Undo',
                CommandButtonPass: 'Pass',
                CommandButtonResign: 'Resign'
            };
        } else {
            me.languagePack = languagePack;
        }

        // State
        me.numberOfPoints = bgoGame.numberOfPoints;
        me.blackCaptures = BGo.Utils.createObservable(0);
        me.whiteCaptures = BGo.Utils.createObservable(0);
        me.boardState = [];
        for (i = 0; i < me.numberOfPoints; i += 1) {
            this.boardState.push(
                {
                    point: i,
                    owner: BGo.Utils.createObservable(BGo.Empty),
                    ko: BGo.Utils.createObservable(false)
                }
            );
        }

        // Commands
        me.playMove = function (index) { bgoGame.playMove(index); };

        return me;
    }

    global.BGoViewModel = BGoViewModel;
}(window, document));