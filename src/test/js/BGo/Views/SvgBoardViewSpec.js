define(['BGo', 'BGo/Views/SvgBoardView'], function(BGo) {

    describe('BGo.Views.SvgBoardView', function () {
        "use strict";

        var bgoGame = { numberOfPoints: 9 * 9 };

        describe('Sends commands to the viewModel', function () {

            it('all points call ViewModel.playMove if clicked.', function () {

                // Arrange
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    boardView = BGo.Views.SvgBoardView.createNew(domContainer, viewModel),
                    i,
                    j;

                spyOn(viewModel, 'playMove');

                for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                    // Action
                    var element = boardView.getPointElement(i);
                    element.click();

                    // Assert
                    expect(viewModel.playMove).toHaveBeenCalledWith(i);
                }
            });

        });

        describe('Updates when the view model changes', function () {

            it('all points update to black stone when the viewModel.boardState changes for that element', function () {

                // Arrange
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    boardView = BGo.Views.SvgBoardView.createNew(domContainer, viewModel),
                    i;

                for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                    // Action
                    viewModel.boardState[i].owner.set(BGo.Black);

                    // Assert
                    expect(boardView.getPointElement(i).textContent).toBe(BGo.Black);
                }
            });


            it('all points update to white stone when the viewModel.boardState changes for that element', function () {

                // Arrange
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    boardView = BGo.Views.SvgBoardView.createNew(domContainer, viewModel),
                    i;

                for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                    // Action
                    viewModel.boardState[i].owner.set(BGo.White);

                    // Assert
                    expect(boardView.getPointElement(i).textContent).toBe(BGo.White);
                }
            });

            it('all points update to empty when the viewModel.boardState changes for that element', function () {

                // Arrange
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    boardView,
                    i;

                // Start all points in the illegal move state.
                for (i = 0; i < bgoGame.numberOfPoints; i += 1) {
                    viewModel.boardState[i].owner.set(BGo.Black);
                }

                boardView = BGo.Views.SvgBoardView.createNew(domContainer, viewModel);

                for (i = 0; i < bgoGame.numberOfPoints; i += 1) {


                    // Action
                    viewModel.boardState[i].owner.set(BGo.Empty);

                    // Assert
                    expect(boardView.getPointElement(i).textContent).toBe(BGo.Empty);
                }
            });

            it('all points update to non-ko when the viewModel.boardState changes for that element', function () {

                // Arrange
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    boardView,
                    i;

                // Start all points in the illegal move state.
                for (i = 0; i < bgoGame.numberOfPoints; i += 1) {
                    viewModel.boardState[i].ko.set(true);
                }

                boardView = BGo.Views.SvgBoardView.createNew(domContainer, viewModel);

                for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                    // Action
                    viewModel.boardState[i].ko.set(false);

                    // Assert
                    expect(boardView.getPointElement(i).getAttribute('class')).toBe('');
                }
            });

            it('all Points update to ko move when the viewModel.boardState changes for that element', function () {

                // Arrange
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    boardView = BGo.Views.SvgBoardView.createNew(domContainer, viewModel),
                    i,
                    j;

                for (i = 0; i < viewModel.numberOfPoints; i += 1) {

                    // Action
                    viewModel.boardState[i].ko.set(true);

                    // Assert
                    expect(boardView.getPointElement(i, j).getAttribute('class')).toBe('bgo-illegal-ko-move');
                }
            });
        });
    });

});