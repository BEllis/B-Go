/*jslint browser: true*/
/*global BGo:false, BGoViewModel:false, BGoSvgBoardView:false, BGoBasicCapturesView:false, BGoBasicCommandsView:false, describe, it, expect, spyOn */

var g1 = null;
var vm1 = null;
var v1 = null;
var v2 = null;
var v3 = null;
var commandsView = null;
var playMove = function (x, y) { "use strict"; g1.viewModel.userClick(x, y); };

describe('Basic Commands View', function () {
    "use strict";

    var bgoGame = { numberOfPoints: 9 * 9 };

    describe('Constructor Validation', function () {

        it('domContainer is not a DOM element', function () {
            var domContainer = {},
                viewModel = new BGoViewModel(bgoGame);
            try {
                commandsView = new BGoBasicCommandsView(domContainer, viewModel);
                throw 'Failed to throw exception';
            } catch (ex) {
                if (ex !== 'domContainer must be a DOM element.') {
                    throw "Failed to throw 'domContainer must be a DOM element' exception, instead '" + ex + "' was thrown.";
                }
            }
        });

        it('viewModel is not a ViewModel', function () {
            var domContainer = document.createElement('div'),
                viewModel = {};
            try {
                commandsView = new BGoBasicCommandsView(domContainer, viewModel);
                throw 'Failed to throw exception';
            } catch (ex) {
                if (ex !== 'viewModel must be of type BGoViewModel') {
                    throw "Failed to throw 'viewModel must be of type BGoViewModel' exception, instead '" + ex + "' was thrown.";
                }
            }
        });
    });

    describe('Buttons are shown', function () {

        it('has a undo button', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                commandsView = new BGoBasicCommandsView(domContainer, viewModel),
                i,
                nodes,
                pass = false;

            nodes = domContainer.childNodes;
            for (i = 0; i < nodes.length; i += 1) {
                if (nodes[i].tagName === 'BUTTON' && nodes[i].className === 'bgo-basic-undo-button') {
                    pass = true;
                }
            }

            if (!pass) {
                throw 'No button element with className "bgo-basic-undo-button" found.';
            }

            if (!commandsView.undoButton) {
                throw 'undoButton not set';
            }
        });

        it('has a pass button', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                commandsView = new BGoBasicCommandsView(domContainer, viewModel),
                i,
                nodes,
                pass = false;

            nodes = domContainer.childNodes;
            for (i = 0; i < nodes.length; i += 1) {
                if (nodes[i].tagName === 'BUTTON' && nodes[i].className === 'bgo-basic-pass-button') {
                    pass = true;
                }
            }

            if (!pass) {
                throw 'No button element with className "bgo-basic-pass-button" found.';
            }

            if (!commandsView.passButton) {
                throw 'passButton not set';
            }
        });

        it('has a resign button', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                commandsView = new BGoBasicCommandsView(domContainer, viewModel),
                i,
                nodes,
                pass = false;

            nodes = domContainer.childNodes;
            for (i = 0; i < nodes.length; i += 1) {
                if (nodes[i].tagName === 'BUTTON' && nodes[i].className === 'bgo-basic-resign-button') {
                    pass = true;
                }
            }

            if (!pass) {
                throw 'No button element with className "bgo-basic-resign-button" found.';
            }

            if (!commandsView.resignButton) {
                throw 'resignButton not set';
            }
        });

    });

    describe('Buttons are hooks into ViewModel', function () {

        it('calls ViewModel.undo if undo is clicked.', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                commandsView = new BGoBasicCommandsView(domContainer, viewModel),
                pass = false;

            viewModel.undo = function () { pass = true; };
            commandsView.undoButton.click();
            if (!pass) {
                throw 'Undo button did not call undo on the ViewModel.';
            }
        });

        it('calls ViewModel.pass if pass is clicked.', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                commandsView = new BGoBasicCommandsView(domContainer, viewModel),
                pass = false;

            viewModel.pass = function () { pass = true; };
            commandsView.passButton.click();
            if (!pass) {
                throw 'Pass button did not call pass on the ViewModel.';
            }
        });

        it('calls ViewModel.resign if resign is clicked.', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                commandsView = new BGoBasicCommandsView(domContainer, viewModel),
                pass = false;

            viewModel.resign = function () { pass = true; };
            commandsView.resignButton.click();
            if (!pass) {
                throw 'Resign button did not call resign on the ViewModel.';
            }
        });
    });

    describe('Button labels come from a language pack', function () {

        it('Undo button has text from language pack value CommandButtonUndo.', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
                commandsView,
                pass = false;

            viewModel.languagePack = dummyLanguagePack;
            commandsView = new BGoBasicCommandsView(domContainer, viewModel, dummyLanguagePack);

            if (commandsView.undoButton.innerText !== dummyLanguagePack.CommandButtonUndo) {
                throw 'Undo button does not display text from the language pack.';
            }
        });

        it('Pass button has text from language pack value CommandButtonPass.', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
                commandsView,
                pass = false;

            viewModel.languagePack = dummyLanguagePack;
            commandsView = new BGoBasicCommandsView(domContainer, viewModel, dummyLanguagePack);

            if (commandsView.passButton.innerText !== dummyLanguagePack.CommandButtonPass) {
                throw 'Pass button does not display text from the language pack.';
            }
        });

        it('Resign button has text from language pack value CommandButtonResign.', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
                commandsView,
                pass = false;

            viewModel.languagePack = dummyLanguagePack;
            commandsView = new BGoBasicCommandsView(domContainer, viewModel, dummyLanguagePack);

            if (commandsView.resignButton.innerText !== dummyLanguagePack.CommandButtonResign) {
                throw 'Resign button does not display text from the language pack.';
            }
        });
    });
});

describe('Basic Captures View', function () {
    "use strict";

    var bgoGame = { numberOfPoints: 9 * 9 };

    describe('Constructor Validation', function () {

        it('Throw an exception when invalid player color is used.', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame);

            expect(function () { var capturesView = new BGoBasicCapturesView('blah', domContainer, viewModel); }).toThrow();
        });

    });

    describe('Updates when the score is changed', function () {
        it('Blacks captures view updates when blacks captures changes', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                capturesView = new BGoBasicCapturesView(BGo.Black, domContainer, viewModel);

            expect(domContainer.textContent).toBe('0');
            viewModel.blackCaptures(10);
            expect(domContainer.textContent).toBe('10');

        });

        it('Whites captures view updates when whites captures changes', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                capturesView = new BGoBasicCapturesView(BGo.White, domContainer, viewModel);

            expect(domContainer.textContent).toBe('0');
            viewModel.whiteCaptures(10);
            expect(domContainer.textContent).toBe('10');

        });

        it('Blacks captures view does not update when whites captures changes', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                capturesView = new BGoBasicCapturesView(BGo.Black, domContainer, viewModel);

            expect(domContainer.textContent).toBe('0');
            viewModel.whiteCaptures(10);
            expect(domContainer.textContent).toBe('0');

        });

        it('Whites captures view does not updates when blacks captures changes', function () {
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                capturesView = new BGoBasicCapturesView(BGo.White, domContainer, viewModel);

            expect(domContainer.textContent).toBe('0');
            viewModel.blackCaptures(10);
            expect(domContainer.textContent).toBe('0');

        });
    });
});

describe('SVG Board View', function () {
    "use strict";

    var bgoGame = { numberOfPoints: 9 * 9 };

    describe('Sends commands to the viewModel', function () {

        it('all points call ViewModel.playMove if clicked.', function () {

            // Arrange
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                boardView = new BGoSvgBoardView(domContainer, viewModel),
                i,
                j;

            spyOn(viewModel, 'playMove');

            for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                // Action
                boardView.getPointElement(i).click();

                // Assert
                expect(viewModel.playMove).toHaveBeenCalledWith(i);
            }
        });

    });

    describe('Updates when the view model changes', function () {

        it('all points update to black stone when the viewModel.boardState changes for that element', function () {

            // Arrange
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                boardView = new BGoSvgBoardView(domContainer, viewModel),
                i,
                j;

            for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                // Action
                viewModel.boardState[i].owner(BGo.Black);

                // Assert
                expect(boardView.getPointElement(i, j).textContent).toBe(BGo.Black);
            }
        });


        it('all points update to white stone when the viewModel.boardState changes for that element', function () {

            // Arrange
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                boardView = new BGoSvgBoardView(domContainer, viewModel),
                i,
                j;

            for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                // Action
                viewModel.boardState[i].owner(BGo.White);

                // Assert
                expect(boardView.getPointElement(i, j).textContent).toBe(BGo.White);
            }
        });

        it('all points update to empty when the viewModel.boardState changes for that element', function () {

            // Arrange
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                boardView,
                i,
                j;

            // Start all points in the illegal move state.
            for (i = 0; i < bgoGame.numberOfPoints; i += 1) {
                viewModel.boardState[i].owner(BGo.Black);
            }

            boardView = new BGoSvgBoardView(domContainer, viewModel);

            for (i = 0; i < bgoGame.numberOfPoints; i += 1) {


                // Action
                viewModel.boardState[i].owner(BGo.Empty);

                // Assert
                expect(boardView.getPointElement(i, j).textContent).toBe(BGo.Empty);
            }
        });

        it('all points update to non-ko when the viewModel.boardState changes for that element', function () {

            // Arrange
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                boardView,
                i,
                j;

            // Start all points in the illegal move state.
            for (i = 0; i < bgoGame.numberOfPoints; i += 1) {
                viewModel.boardState[i].ko(true);
            }

            boardView = new BGoSvgBoardView(domContainer, viewModel);

            for (i = 0; i < bgoGame.numberOfPoints; i += 1) {

                // Action
                viewModel.boardState[i].ko(false);

                // Assert
                expect(boardView.getPointElement(i, j).getAttribute('class')).toBe('');
            }
        });

        it('all Points update to ko move when the viewModel.boardState changes for that element', function () {

            // Arrange
            var domContainer = document.createElement('div'),
                viewModel = new BGoViewModel(bgoGame),
                boardView = new BGoSvgBoardView(domContainer, viewModel),
                i,
                j;

            for (i = 0; i < viewModel.numberOfPoints; i += 1) {

                // Action
                viewModel.boardState[i].ko(true);

                // Assert
                expect(boardView.getPointElement(i, j).getAttribute('class')).toBe('bgo-illegal-ko-move');
            }
        });
    });
});

describe('BGo View Model', function () {
    "use strict";

    var bgoGame = { numberOfPoints: 9 * 9, playMove: function (index) { throw 'Unexpected call to playMove'; }}

    it('calls bgoGame.playMove when BGoViewModel.playMove is called.', function () {

        var viewModel = new BGoViewModel(bgoGame);

        spyOn(bgoGame, 'playMove');

        viewModel.playMove(1);

        expect(bgoGame.playMove).toHaveBeenCalledWith(1);

    });

    it('initializes to the same board size as bgoGame', function () {

        var viewModel = new BGoViewModel(bgoGame);

        spyOn(bgoGame, 'playMove');

        viewModel.playMove(1);

        expect(bgoGame.playMove).toHaveBeenCalledWith(1);

    });
});

/*
describe('Setup Basic Game', function () {
    "use strict";
 it('Setup 19x19 game with defaults', function () {
 var boardContainer = document.createElement('div'),
 blackCardContainer = document.createElement('div'),
 whiteCardContainer = document.createElement('div'),
 commandsContainer = document.createElement('div');

 g1 = new BGo(); // Logical Board (Model)
        vm1 = new BGoViewModel(g1); // View Model
        v1 = new BGoSvgBoardView(boardContainer, vm1); // Board View
        v2 = new BGoCapturesView(blackCardContainer, vm1, 'white'); // Card View (Captured black stones)
        v3 = new BGoCapturesView(whiteCardContainer, vm1, 'black'); // Card View (Captured white stones)
        commandsView = new BGoCommandsView(commandsContainer, vm1); // Commands View (Undo, Pass, Resign)
    });
}); */

/*
describe('SuperKo', function() {
        it('Detect Positional Superko', function() {

		g1 = BGo(9);

                // black to capture
		playMove(3,1); // B
		playMove(1,2); // W
		playMove(2,2); // B
		playMove(2,1); // W

                // black to capture
		playMove(7,9); // B
		playMove(9,8); // W
		playMove(8,8); // B
		playMove(8,9); // W

                // white to capture
		playMove(1,8); // B
		playMove(3,9); // W
		playMove(2,9); // B
		playMove(2,8); // W

                // white to capture
		playMove(9,2); // B
		playMove(7,1); // W
		playMove(8,1); // B
		playMove(8,2); // W

		// Black captures first
		playMove(1,1); // B
/*
		// Then White
		playMove(9,1); // W

		// Then Black
		playMove(9,9); // B

		// Now white
		playMove(1,9); // W */

/*
		expect(g1.viewModel.getBoardState(3,1).state).toEqual('black');
		expect(g1.viewModel.getBoardState(1,2).state).toEqual('white');
		expect(g1.viewModel.getBoardState(2,2).state).toEqual('black');
		expect(g1.viewModel.getBoardState(2,1).state).toEqual('white'); * /
        });
}); */