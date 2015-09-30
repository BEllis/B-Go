/*jslint browser: true*/
/*global BGo, alert */

(function (global, document) {
    "use strict";

    global.BGoBasicCommandsView = function (domContainer, viewModel) {

        var me = this;

        if (!BGo.Utils.isElement(domContainer)) {
            throw 'domContainer must be a DOM element.';
        }

        if (BGo.Utils.getObjectTypeName(viewModel) !== 'BGoViewModel') {
            throw 'viewModel must be of type BGoViewModel';
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
}(window, document));