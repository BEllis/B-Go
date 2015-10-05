define(['BGo', 'BGo/Views/BasicCommandsView'], function(BGo) {

    describe('BGo.Views.BasicCommandsView', function () {
        "use strict";

        var bgoGame = { numberOfPoints: 9 * 9 };

        describe('.constructor', function () {

            it('domContainer is not a DOM element', function () {
                var domContainer = {},
                    viewModel = BGo.ViewModel.createNew(bgoGame);
                try {
                    var commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel);
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
                    var commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel);
                    throw 'Failed to throw exception';
                } catch (ex) {
                    if (ex !== 'viewModel is of type Object must be of type BGo.ViewModel') {
                        throw "Failed to throw 'viewModel is of type Object must be of type BGo.ViewModel' exception, instead '" + ex + "' was thrown.";
                    }
                }
            });
        });

        describe('Buttons are shown', function () {

            it('has a undo button', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel),
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
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel),
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
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel),
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
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel),
                    pass = false;

                viewModel.undo = function () { pass = true; };
                commandsView.undoButton.click();
                if (!pass) {
                    throw 'Undo button did not call undo on the ViewModel.';
                }
            });

            it('calls ViewModel.pass if pass is clicked.', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel),
                    pass = false;

                viewModel.pass = function () { pass = true; };
                commandsView.passButton.click();
                if (!pass) {
                    throw 'Pass button did not call pass on the ViewModel.';
                }
            });

            it('calls ViewModel.resign if resign is clicked.', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel),
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
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
                    commandsView,
                    pass = false;

                viewModel.languagePack = dummyLanguagePack;
                commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel, dummyLanguagePack);

                if (commandsView.undoButton.innerText !== dummyLanguagePack.CommandButtonUndo) {
                    throw 'Undo button does not display text from the language pack.';
                }
            });

            it('Pass button has text from language pack value CommandButtonPass.', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
                    commandsView,
                    pass = false;

                viewModel.languagePack = dummyLanguagePack;
                commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel, dummyLanguagePack);

                if (commandsView.passButton.innerText !== dummyLanguagePack.CommandButtonPass) {
                    throw 'Pass button does not display text from the language pack.';
                }
            });

            it('Resign button has text from language pack value CommandButtonResign.', function () {
                var domContainer = document.createElement('div'),
                    viewModel = BGo.ViewModel.createNew(bgoGame),
                    dummyLanguagePack = { CommandButtonUndo: 'random text1', CommandButtonPass: 'random text2', CommandButtonResign: 'random text3' },
                    commandsView,
                    pass = false;

                viewModel.languagePack = dummyLanguagePack;
                commandsView = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel, dummyLanguagePack);

                if (commandsView.resignButton.innerText !== dummyLanguagePack.CommandButtonResign) {
                    throw 'Resign button does not display text from the language pack.';
                }
            });
        });
    });
});