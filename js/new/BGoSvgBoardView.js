/*jslint browser: true*/
/*global BGo, alert */

(function (global, document) {
    "use strict";

    global.BGoSvgBoardView = function (domContainer, viewModel) {

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
            pointState.owner.subscribe(function (value) {
                me.getPointElement(pointState.point).textContent = value;
            });

            pointState.ko.subscribe(function (value) {
                if (value) {
                    me.getPointElement(pointState.point).setAttribute('class', 'bgo-illegal-ko-move');
                } else {
                    me.getPointElement(pointState.point).setAttribute('class', '');
                }

            });
        });

        return me;
    };
}(window, document));