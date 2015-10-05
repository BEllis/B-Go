define(['BGo', 'BGo/Game'], function(BGo) {

    /*
describe('BGo.Game', function () {
    "use strict";

    var eventHandler =
        {
            blackStonePlayed: function (arg1, arg2) { throw 'Unexpected call to blackStonePlayed'; },
            whiteStonePlayed: function (arg1, arg2) { throw 'Unexpected call to whiteStonePlayed'; },
            cannotPlayOnAnotherStone: function (arg1, arg2) { throw 'Unexpected call to cannotPlayOnAnotherStone'; },
        },
        hookEventHandlers = function (bGoGame, eventHandler) {
            bGoGame.bind(BGo.Events.BlackStonePlayed, eventHandler.blackStonePlayed);
            bGoGame.bind(BGo.Events.WhiteStonePlayed, eventHandler.whiteStonePlayed);
            bGoGame.bind(BGo.Events.CannotPlayOnAnotherStone, eventHandler.cannotPlayOnAnotherStone);
        };

    describe('can have it\'s events be bound to event handlers', function () {

        it('Will throw an error if it is an unhandled event type', function () {
            var bGoGame = BGo.Game.createNew(9);

            expect(function () { bGoGame.bind('blahblahblah', function () { }); }).toThrow('Cannot bind to unsupported' +
                ' event.');

        });

        it('Will support a BGo.Events.BlackStonePlayed event.', function () {

            var bGoGame = BGo.Game.createNew(9);
            bGoGame.bind(BGo.Events.BlackStonePlayed, function () { });

        });

        it('Will support a BGo.Events.WhiteStonePlayed event.', function () {

            var bGoGame = BGo.Game.createNew(9);
            bGoGame.bind(BGo.Events.WhiteStonePlayed, function () { });

        });

    });

    it('adds stones that have been played in legal positions', function () {

        var bGoGame = BGo.Game.createNew(9),
            index = 0;

        spyOn(eventHandler, 'blackStonePlayed');
        hookEventHandlers(bGoGame, eventHandler);

        bGoGame.playMove(0);

        expect(eventHandler.blackStonePlayed).toHaveBeenCalledWith(0);

    });

    it('alternates between black and white after each move', function () {

        var bGoGame = BGo.Game.createNew(9),
            index = 0;

        spyOn(eventHandler, 'blackStonePlayed');
        spyOn(eventHandler, 'whiteStonePlayed');
        hookEventHandlers(bGoGame, eventHandler);

        bGoGame.playMove(0);
        bGoGame.playMove(1);
        bGoGame.playMove(2);
        bGoGame.playMove(3);

        expect(eventHandler.blackStonePlayed).toHaveBeenCalledWith(0);
        expect(eventHandler.whiteStonePlayed).toHaveBeenCalledWith(1);
        expect(eventHandler.blackStonePlayed).toHaveBeenCalledWith(2);
        expect(eventHandler.whiteStonePlayed).toHaveBeenCalledWith(3);

    });

    it('does not allow moves to be played where there is already a stone', function () {

        var bGoGame = BGo.Game.createNew(9),
            index = 0;

        spyOn(eventHandler, 'blackStonePlayed');
        spyOn(eventHandler, 'whiteStonePlayed');
        spyOn(eventHandler, 'cannotPlayOnAnotherStone');
        hookEventHandlers(bGoGame, eventHandler);

        bGoGame.playMove(0);
        bGoGame.playMove(1);
        bGoGame.playMove(1);
        bGoGame.playMove(2);

        expect(eventHandler.blackStonePlayed).toHaveBeenCalledWith(0);
        expect(eventHandler.whiteStonePlayed).toHaveBeenCalledWith(1);
        expect(eventHandler.cannotPlayOnAnotherStone).toHaveBeenCalledWith(1);
        expect(eventHandler.blackStonePlayed).toHaveBeenCalledWith(2);

    });
});               */

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

});