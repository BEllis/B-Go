define(['BGo', 'BGo/Game', 'BGo/Views/SvgBoardView', 'BGo/Views/BasicCapturesView', 'BGo/Views/BasicCommandsView'], function(BGo) {

	/*
	var BGo = require('BGo');
	require('BGo/Views/SvgBoardView');
	require('BGo/Views/BasicCaptureView');
	require('BGo/Views/BasicCommandsView'); */

	describe('Usage Examples', function() {

		it ('9x9 Game with basic views', function() {

            var blackCapturesContainer = document.createElement('div');
            var whiteCapturesContainer = document.createElement('div');
            var boardContainer = document.createElement('div');
            var commandsContainer = document.createElement('div');

			var customGame = BGo.Game.createNew(9);
            // var standardGameStateRule = BGo.Rules.StandardGameStateRule.createNew(customGame);
            // var standardCaptureRule = BGo.Rules.StandardCaptureRule.createNew(customGame);
			var viewModel = BGo.ViewModel.createNew(customGame);
			var blackCapturesView = BGo.Views.BasicCapturesView.createNew(BGo.Black, blackCapturesContainer, viewModel);
			var whiteCapturesView = BGo.Views.BasicCapturesView.createNew(BGo.White, whiteCapturesContainer, viewModel)
			var boardView = BGo.Views.SvgBoardView.createNew(boardContainer, viewModel);
			var commandsView = BGo.Views.BasicCommandsView.createNew(commandsContainer, viewModel);
            customGame.playMode();

		});

        it ('9x9 Game with basic views using fluent configuration', function() {

            var blackCapturesContainer = document.createElement('div');
            var whiteCapturesContainer = document.createElement('div');
            var boardContainer = document.createElement('div');
            var commandsContainer = document.createElement('div');

            var game = BGo.Game.createNew(9)
                /*
                .withStandardCaptureRule()
                .withStandardKoRule()
                .withStandardPositionalSuperKoRule()
                .withStandardJapaneseScoring()
                */
                .withBasicCapturesView(BGo.Black, blackCapturesContainer)
                .withBasicCapturesView(BGo.White, whiteCapturesContainer)
                .withBasicCommandsView(commandsContainer)
                .withSvgBoardView(boardContainer)
                .playMode();

        });

	});

});