/*jslint browser: true*/
/*global BGo, alert */

define(['BGo', 'BGo/Views'], function (BGo) {
    "use strict";

    function BasicCapturesView(playerColor, domContainer, viewModel) {

        var me = this;

        if (playerColor === BGo.Black) {
            viewModel.blackCaptures.observe(function (value) { domContainer.textContent = value; });
            domContainer.textContent = viewModel.blackCaptures.get();
        } else if (playerColor === BGo.White) {
            viewModel.whiteCaptures.observe(function (value) { domContainer.textContent = value; });
            domContainer.textContent = viewModel.whiteCaptures.get();
        } else {
            throw 'playerColor must be BGo.White or BGo.Black';
        }

        return this;
    };

    BGo.Game.prototype.withBasicCapturesView = function (playerColor, domContainer) {

        if (!this.viewModel) {
            BGo.ViewModel.createNew(this);
        }

        var viewModel = this.viewModel;
        var view = BGo.Views.BasicCapturesView.createNew(playerColor, domContainer, viewModel);
        return this;

    };

    BGo.Views.BasicCapturesView = {};
    BGo.Views.BasicCapturesView.createNew = function(playerColor, domContainer, viewModel) {

        return new BasicCapturesView(playerColor, domContainer, viewModel);

    };

    return BGo.Views.BasicCapturesView;

});