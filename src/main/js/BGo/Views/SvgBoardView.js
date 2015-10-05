/*jslint browser: true*/
/*global BGo, alert */

define(['BGo', 'BGo/Views'], function (BGo) {

    function SvgBoardView(domContainer, viewModel) {

        var me = this,
            points = [],
            addElement = function (index) {
                var ele = domContainer.ownerDocument.createElement('div');
                ele.onclick = function () { viewModel.playMove(index); };
                points.push(ele);
            },
            i,
            j;

        for (i = 0; i < viewModel.numberOfPoints; i += 1) {
            addElement(i);
        }

        me.getPointElement = function (index) {
            return points[index];
        };

        viewModel.boardState.map(function (pointState) {
            pointState.owner.observe(function (value) {
                me.getPointElement(pointState.point).textContent = value;
            });

            pointState.ko.observe(function (value) {
                if (value) {
                    me.getPointElement(pointState.point).setAttribute('class', 'bgo-illegal-ko-move');
                } else {
                    me.getPointElement(pointState.point).setAttribute('class', '');
                }

            });
        });

        return me;
    };

    BGo.Game.prototype.withSvgBoardView = function (domContainer) {

        if (!this.viewModel) {
            BGo.ViewModel.createNew(this);
        }

        var viewModel = this.viewModel;
        var view = BGo.Views.SvgBoardView.createNew(domContainer, viewModel);
        return this;

    };

    BGo.Views.SvgBoardView = {};
    BGo.Views.SvgBoardView.createNew = function(domContainer, viewModel) {

        return new SvgBoardView(domContainer, viewModel);

    }

    return BGo.Views.SvgBoardView;

});
