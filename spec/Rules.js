var g1 = {};
var playMove = function(x,y) { g1.viewModel.userClick(x,y); }

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
		expect(g1.viewModel.getBoardState(2,1).state).toEqual('white'); */
        });
});