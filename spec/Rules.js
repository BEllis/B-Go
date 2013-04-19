var helloWorld = function() { return 'Hello world!'; }

describe('SuperKo', function() {
        it('Detect Positional Superko', function() {

		var g1 = BGo(9);

                // black to capture
		g1.viewModel.userClick(3,1); // B
		g1.viewModel.userClick(1,2); // W
		g1.viewModel.userClick(2,2); // B
		g1.viewModel.userClick(2,1); // W

                // black to capture
		g1.viewModel.userClick(7,9); // B
		g1.viewModel.userClick(9,8); // W
		g1.viewModel.userClick(8,8); // B
		g1.viewModel.userClick(8,9); // W

                // white to capture
		g1.viewModel.userClick(1,8); // B
		g1.viewModel.userClick(3,9); // W
		g1.viewModel.userClick(2,9); // B
		g1.viewModel.userClick(2,8); // W

                // white to capture
		g1.viewModel.userClick(9,2); // B
		g1.viewModel.userClick(7,1); // W
		g1.viewModel.userClick(8,1); // B
		g1.viewModel.userClick(8,2); // W


		// Black captures first
		g1.viewModel.userClick(1,1); // B
/*
		// Then White
		g1.viewModel.userClick(9,1); // W

		// Then Black
		g1.viewModel.userClick(9,9); // B

		// Now white
		g1.viewModel.userClick(1,9); // W */

/*
		expect(g1.viewModel.getBoardState(3,1).state).toEqual('black');
		expect(g1.viewModel.getBoardState(1,2).state).toEqual('white');
		expect(g1.viewModel.getBoardState(2,2).state).toEqual('black');
		expect(g1.viewModel.getBoardState(2,1).state).toEqual('white'); */
        });
});