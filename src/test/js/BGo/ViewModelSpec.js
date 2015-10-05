define(['BGo', 'BGo/ViewModel'], function(BGo) {

    describe('BGo.ViewModel', function () {
        "use strict";

        var bgoGame = { numberOfPoints: 9 * 9, playMove: function (index) { throw 'Unexpected call to playMove'; } };

        it('calls bgoGame.playMove when BGo.ViewModel.playMove is called.', function () {

            var viewModel = BGo.ViewModel.createNew(bgoGame);

            spyOn(bgoGame, 'playMove');

            viewModel.playMove(1);

            expect(bgoGame.playMove).toHaveBeenCalledWith(1);

        });

        it('initializes to the same board size as bgoGame', function () {

            var viewModel = BGo.ViewModel.createNew(bgoGame);

            spyOn(bgoGame, 'playMove');

            viewModel.playMove(1);

            expect(bgoGame.playMove).toHaveBeenCalledWith(1);

        });
    });

});