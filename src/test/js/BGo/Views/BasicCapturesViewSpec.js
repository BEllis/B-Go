define(['BGo', 'BGo/Views/BasicCapturesView'], function(BGo) {

    describe('BGo.Views.BasicCapturesView', function () {
        "use strict";

        var bgoGame = { numberOfPoints: 9 * 9 };

        describe('.constructor', function () {

            it('Throw an exception when invalid player color is used.', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame);

                expect(function () { var capturesView = BGo.Views.BasicCapturesView.createNew('blah', domContainer, viewModel); }).toThrow();
            });

        });

        describe('Updates when the score is changed', function () {
            it('Blacks captures view updates when blacks captures changes', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    capturesView = BGo.Views.BasicCapturesView.createNew(BGo.Black, domContainer, viewModel);

                expect(domContainer.textContent).toBe('0');
                viewModel.blackCaptures.set(10);
                expect(domContainer.textContent).toBe('10');

            });

            it('Whites captures view updates when whites captures changes', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    capturesView = BGo.Views.BasicCapturesView.createNew(BGo.White, domContainer, viewModel);

                expect(domContainer.textContent).toBe('0');
                viewModel.whiteCaptures.set(10);
                expect(domContainer.textContent).toBe('10');

            });

            it('Blacks captures view does not update when whites captures changes', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    capturesView = BGo.Views.BasicCapturesView.createNew(BGo.Black, domContainer, viewModel);

                expect(domContainer.textContent).toBe('0');
                viewModel.whiteCaptures.set(10);
                expect(domContainer.textContent).toBe('0');

            });

            it('Whites captures view does not updates when blacks captures changes', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    capturesView = BGo.Views.BasicCapturesView.createNew(BGo.White, domContainer, viewModel);

                expect(domContainer.textContent).toBe('0');
                viewModel.blackCaptures.set(10);
                expect(domContainer.textContent).toBe('0');

            });
        });
    });
});