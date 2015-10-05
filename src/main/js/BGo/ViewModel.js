/*jslint browser: true*/
/*global BGo, alert */

define(['BGo', 'BGo/Observables/Observable'], function(BGo) {
    "use strict";

    function ViewModel(bgoGame, languagePack) {

        var me = this,
            i,
            j;

        // if (!languagePack) {
            me.languagePack = {
                CommandButtonUndo: 'Undo',
                CommandButtonPass: 'Pass',
                CommandButtonResign: 'Resign'
            };
        /*    
        } else {
            me.languagePack = languagePack;
        } */

        // State
        me.numberOfPoints = bgoGame.numberOfPoints;
        me.blackCaptures = new BGo.Observables.Observable(0);
        me.whiteCaptures = new BGo.Observables.Observable(0);
        me.boardState = [];
        for (i = 0; i < me.numberOfPoints; i += 1) {
            this.boardState.push(
                {
                    point: i,
                    owner: new BGo.Observables.Observable(BGo.Empty),
                    ko: new BGo.Observables.Observable(false)
                }
            );
        }

        // Commands
        me.playMove = function (index) { bgoGame.playMove(index); };

        bgoGame.viewModel = me;

        return me;
    }

    BGo.ViewModel = {};
    BGo.ViewModel.createNew = function(bgoGame, languagePack) {

        return new ViewModel(bgoGame, languagePack);

    }

    return BGo.ViewModel;

});