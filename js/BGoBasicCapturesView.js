/*jslint browser: true*/
/*global BGo, alert */

(function (global, document) {
    "use strict";

    global.BGoBasicCapturesView = function (playerColor, domContainer, viewModel) {

        var me = this;

        if (playerColor === BGo.Black) {
            viewModel.blackCaptures.subscribe(function (value) { domContainer.textContent = value; });
            domContainer.textContent = viewModel.blackCaptures();
        } else if (playerColor === BGo.White) {
            viewModel.whiteCaptures.subscribe(function (value) { domContainer.textContent = value; });
            domContainer.textContent = viewModel.whiteCaptures();
        } else {
            throw 'playerColor must be BGo.White or BGo.Black';
        }

        return this;
    };
}(window, document));