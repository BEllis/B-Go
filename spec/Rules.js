/*jslint browser: true*/
/*global BGo:false, BGoViewModel:false, BGoSgfBoardView:false, BGoSgfCapturesView:false, BGoSgfCommandsView:false, describe, it */

var g1 = null;
var vm1 = null;
var v1 = null;
var v2 = null;
var v3 = null;
var commandsView = null;
var playMove = function (x, y) { "use strict"; g1.viewModel.userClick(x, y); };

describe('Setup Basic Commands View', function () {
    "use strict";

    function BGoViewModel() {
        return this;
    }

    var MockBGoViewModel = BGoViewModel,
        mockLanguagePack =
            {
                CommandButtonUndo: 'Undo',
                CommandButtonPass: 'Pass',
                CommandButtonResign: 'Resign'
            };

    it('domContainer is not a DOM element', function () {
        var domContainer = {},
            viewModel = new MockBGoViewModel();
        try {
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack);
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
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack);
            throw 'Failed to throw exception';
        } catch (ex) {
            if (ex !== 'viewModel must be of type BGoViewModel') {
                throw "Failed to throw 'viewModel must be of type BGoViewModel' exception, instead '" + ex + "' was thrown.";
            }
        }
    });

    it('has a undo button', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack),
            i,
            nodes,
            pass = false;

        nodes = domContainer.childNodes;
        for (i = 0; i < nodes.length; i += 1) {
            if (nodes[i].tagName === 'BUTTON' && nodes[i].className === 'bgo-sgf-undo-button') {
                pass = true;
            }
        }

        if (!pass) {
            throw 'No button element with className "bgo-sgf-undo-button" found.';
        }

        if (!commandsView.undoButton) {
            throw 'undoButton not set';
        }
    });

    it('has a pass button', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack),
            i,
            nodes,
            pass = false;

        nodes = domContainer.childNodes;
        for (i = 0; i < nodes.length; i += 1) {
            if (nodes[i].tagName === 'BUTTON' && nodes[i].className === 'bgo-sgf-pass-button') {
                pass = true;
            }
        }

        if (!pass) {
            throw 'No button element with className "bgo-sgf-pass-button" found.';
        }

        if (!commandsView.passButton) {
            throw 'passButton not set';
        }
    });

    it('has a resign button', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack),
            i,
            nodes,
            pass = false;

        nodes = domContainer.childNodes;
        for (i = 0; i < nodes.length; i += 1) {
            if (nodes[i].tagName === 'BUTTON' && nodes[i].className === 'bgo-sgf-resign-button') {
                pass = true;
            }
        }

        if (!pass) {
            throw 'No button element with className "bgo-sgf-resign-button" found.';
        }

        if (!commandsView.resignButton) {
            throw 'resignButton not set';
        }
    });

    it('calls ViewModel.undo if undo is clicked.', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack),
            pass = false;

        viewModel.undo = function () { pass = true; };
        commandsView.undoButton.click();
        if (!pass) {
            throw 'Undo button did not call undo on the ViewModel.';
        }
    });

    it('calls ViewModel.pass if pass is clicked.', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack),
            pass = false;

        viewModel.pass = function () { pass = true; };
        commandsView.passButton.click();
        if (!pass) {
            throw 'Pass button did not call pass on the ViewModel.';
        }
    });

    it('calls ViewModel.resign if resign is clicked.', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, mockLanguagePack),
            pass = false;

        viewModel.resign = function () { pass = true; };
        commandsView.resignButton.click();
        if (!pass) {
            throw 'Resign button did not call resign on the ViewModel.';
        }
    });

    it('Undo button has text from language pack value CommandButtonUndo.', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, dummyLanguagePack),
            pass = false;

        if (commandsView.undoButton.innerText !== dummyLanguagePack.CommandButtonUndo) {
            throw 'Undo button does not display text from the language pack.';
        }
    });

    it('Pass button has text from language pack value CommandButtonPass.', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, dummyLanguagePack),
            pass = false;

        if (commandsView.passButton.innerText !== dummyLanguagePack.CommandButtonPass) {
            throw 'Pass button does not display text from the language pack.';
        }
    });

    it('Resign button has text from language pack value CommandButtonResign.', function () {
        var domContainer = document.createElement('div'),
            viewModel = new MockBGoViewModel(),
            dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
            commandsView = new BGoSgfCommandsView(domContainer, viewModel, dummyLanguagePack),
            pass = false;

        if (commandsView.resignButton.innerText !== dummyLanguagePack.CommandButtonResign) {
            throw 'Resign button does not display text from the language pack.';
        }
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
        v1 = new BGoSgfBoardView(boardContainer, vm1); // Board View
        v2 = new BGoSgfCapturesView(blackCardContainer, vm1, 'white'); // Card View (Captured black stones)
        v3 = new BGoSgfCapturesView(whiteCardContainer, vm1, 'black'); // Card View (Captured white stones)
        commandsView = new BGoSgfCommandsView(commandsContainer, vm1); // Commands View (Undo, Pass, Resign)
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