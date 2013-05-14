/*jslint browser: true*/
/*global BGo, alert */

(function (global, document) {
    "use strict";

    global.BGoSgfCommandsView = function (domContainer, viewModel, languagePack) {

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

        me.undoButton.className = 'bgo-sgf-undo-button';
        me.passButton.className = 'bgo-sgf-pass-button';
        me.resignButton.className = 'bgo-sgf-resign-button';

        me.undoButton.innerText = languagePack.CommandButtonUndo;
        me.passButton.innerText = languagePack.CommandButtonPass;
        me.resignButton.innerText = languagePack.CommandButtonResign;

        me.undoButton.onclick = function () { viewModel.undo(); };
        me.passButton.onclick = function () { viewModel.pass(); };
        me.resignButton.onclick = function () { viewModel.resign(); };

        domContainer.appendChild(me.undoButton);
        domContainer.appendChild(me.passButton);
        domContainer.appendChild(me.resignButton);

        return this;
    };
}(window, document));