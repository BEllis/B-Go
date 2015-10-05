/*jslint browser: true*/
/*global BGo, alert */

define(['BGo', 'BGo/Views'], function (BGo) {

    function BasicCommandsView(domContainer, viewModel) {

        var me = this;
        var viewModelTypeName = BGo.getObjectTypeName(viewModel);

        if (!BGo.isElement(domContainer)) {
            throw 'domContainer must be a DOM element.';
        } 

        if (viewModelTypeName !== 'ViewModel') {

            throw 'viewModel is of type ' + viewModelTypeName +' must be of type BGo.ViewModel';
        }

        me.undoButton = domContainer.ownerDocument.createElement('button');
        me.passButton = domContainer.ownerDocument.createElement('button');
        me.resignButton = domContainer.ownerDocument.createElement('button');

        me.undoButton.className = 'bgo-basic-undo-button';
        me.passButton.className = 'bgo-basic-pass-button';
        me.resignButton.className = 'bgo-basic-resign-button';

        me.undoButton.innerText = viewModel.languagePack.CommandButtonUndo;
        me.passButton.innerText = viewModel.languagePack.CommandButtonPass;
        me.resignButton.innerText = viewModel.languagePack.CommandButtonResign;

        me.undoButton.onclick = function () { viewModel.undo(); };
        me.passButton.onclick = function () { viewModel.pass(); };
        me.resignButton.onclick = function () { viewModel.resign(); };

        domContainer.appendChild(me.undoButton);
        domContainer.appendChild(me.passButton);
        domContainer.appendChild(me.resignButton);

        return this;
    };

    BGo.Game.prototype.withBasicCommandsView = function (domContainer) {

        if (!this.viewModel) {
            BGo.ViewModel.createNew(this);
        }

        var viewModel = this.viewModel;
        var view = BGo.Views.BasicCommandsView.createNew(domContainer, viewModel);
        return this;

    };

    BGo.Views.BasicCommandsView = {};
    BGo.Views.BasicCommandsView.createNew = function(domContainer, viewModel) {

        return new BasicCommandsView(domContainer, viewModel);

    }

    return BGo.Views.BasicCommandsView;

});
