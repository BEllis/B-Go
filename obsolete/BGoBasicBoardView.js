//////////////////////////////////////////////////////////
//                 Basic Board View                     //
//////////////////////////////////////////////////////////

(function() {

    var BGoStoneState = { black : 'black', white : 'white', empty : 'empty', ko : 'ko', capture : 'capture'};
    var stoneSize = 18;

    // Setup custom bindings for MVVM
    ko.bindingHandlers.bgoBasicViewStoneStateChanged = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			// This will be called when the binding is first applied to an element
			// Set up any initial state, event handlers, etc. here
		},
		update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			// This will be called once when the binding is first applied to an element,
	        // and again whenever the associated observable changes value.
			// Update the DOM element based on the supplied values here.
			
			(function() {
			
				var state = ko.utils.unwrapObservable(valueAccessor());
				var re = element.raphaelElement;
				if (state.state == BGoStoneState.black || state.state == BGoStoneState.white)
				{
					// play stone
					
					if (state.state == BGoStoneState.black) {
						var fillCode = 'r(0.3,0.3)#DDD-#000';
					}
					else {
						var fillCode = 'r(0.3,0.3)#FFF-#888';
					}
					
					re.stop().attr({r:0, fill:fillCode, opacity:0.0}).animate({opacity:1.0}, 500).animate({r:stoneSize * 0.95,}, 1500, 'elastic').show().data('isVisible', true);
				}
	
				if (state.state == BGoStoneState.empty && (state.previousState == BGoStoneState.black || state.previousState == BGoStoneState.white))
				{
					// capture stone
					re.animate({r:0, opacity:0.0}, 1000, function() { if (state.state == BGoStoneState.empty) { re.hide().data('isVisible', false); } });
				}
				
			})();
		} 
	}; 
	
    ko.bindingHandlers.bgoBasicViewCurrentPlayerChanged = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			// This will be called when the binding is first applied to an element
			// Set up any initial state, event handlers, etc. here
		},
		update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			// This will be called once when the binding is first applied to an element,
	        // and again whenever the associated observable changes value.
			// Update the DOM element based on the supplied values here.
			
			var currentPlayer = ko.utils.unwrapObservable(valueAccessor());
			var re = element.raphaelElement;
			re.attr({fill:currentPlayer});
		}
	};
    
    function BasicBoardViewClass(boardElement, viewModel) {
    	
    	if (false === (this instanceof BasicBoardViewClass)) {
        	return new BasicBoardViewClass(boardElement, viewModel);
    	}
    	
    	var boardContainer = $(boardElement);
    	
    	(function(view, viewModel) {
    	
    		var boardSize = viewModel.boardSize;    		
		    var boardSizeInPixels = (boardSize + 1) * stoneSize * 2;
		    var boardLineThickness = 1;
			var stoneLineThickness = 0.5;
	 	    var paper = Raphael(boardContainer.get(0), boardContainer.width(), boardContainer.width());
	 	    paper.setViewBox(0,0,boardSizeInPixels,boardSizeInPixels);

	 	    // Board Background
	 	    paper.rect(0,0,boardSizeInPixels,boardSizeInPixels)
				.attr(
					{
						'fill'			: 'rgb(242,193,48)',
						'stroke'		: 'rgb(0,0,0)',
						'stroke-width'	: boardLineThickness
					});

			// Board Grid
			for (var i = 0; i < boardSize; i++) {

			    var drawGridLine = function(x1, y1, x2, y2) { paper.path("M" + x1 + "," + y1 + "L" + x2 + "," + y2).attr({stroke:'rgb(0,0,0)','stroke-width':boardLineThickness}); }
				var increment = ((i + 1) * stoneSize * 2);
				var near = (stoneSize * 2);
				var far = ((boardSize) * (stoneSize * 2));

				// Vertical Lines
				drawGridLine(increment, near, increment, far);
				
				// Horizontal Lines
				drawGridLine(near, increment, far, increment);

	        }
			
			// Board Coordinates
			(function() {
				var centerPrint = function(tb, x1,y1) {
					var bb = tb.getBBox();
					var newx = x1 - bb.x - (bb.width / 2)
					var newy = y1 - bb.y - (bb.height / 2);
					return tb.transform('t' + newx + ',' + newy);					
				}
					
				var coordinateFont = paper.getFont("Quivira");
				for (var i = 0; i < boardSize; i++)
				{
					var increment = ((i + 1) * stoneSize * 2);
					var textAdjustment = -15;
					centerPrint(paper.print(0, 0, String.fromCharCode(65 + i), coordinateFont, 12, 'middle', 0).attr({fill:'black'}), increment, (stoneSize / 2));
					centerPrint(paper.print(0, 0, String.fromCharCode(65 + i), coordinateFont, 12, 'middle', 0).attr({fill:'black'}), increment, boardSizeInPixels - (stoneSize / 2));
					centerPrint(paper.print(0, 0, i + 1, coordinateFont, 12, 'middle', 0).attr({fill:'black'}), (stoneSize / 2), increment);
					centerPrint(paper.print(0, 0, i + 1, coordinateFont, 12, 'middle', 0).attr({fill:'black'}), boardSizeInPixels - (stoneSize / 2), increment);
				}
			})();
	        
	        // Board Star Points
	        var drawStarPoint = function(x,y) { paper.circle(stoneSize * 2 * x, stoneSize * 2 * y, stoneSize / 3).attr({fill:'black'}); }
	        var drawCornerStarPoints = function(near, far) { drawStarPoint(near, near); drawStarPoint(far, near); drawStarPoint(near, far); drawStarPoint(far, far); }
	       	 
	        if (boardSize <= 9)
	        {
	       		var near = 3;
	       	}
	       	else
	       	{
	       		var near = 4;
	       	}
	       	
	       	var far = boardSize - (near - 1);
	        var middle = (boardSize + 1) / 2;

	        // Corners
	        if (boardSize > 7)
	        {
	        	drawCornerStarPoints(near, far);
	        }
	        	
	        // Center
	        if (boardSize >= 5)
	        {
	        	drawStarPoint(middle, middle);
	        }
	        	
	        if (boardSize >= 19)
	        {	
				// Edges
	        	drawStarPoint(middle, near);
	        	drawStarPoint(near, middle);
	        	drawStarPoint(middle, far);
	        	drawStarPoint(far, middle);
	        }
	        
	        // Add Stones
	        var stoneSizeRatio = 0.95;
	        view.stones = new Array();
	        for (var y = 1; y <= boardSize; y++) {
	        	for (var x = 1; x <= boardSize; x++) {
	        		(function(u,v) {
	        			var stone = paper.circle(u * stoneSize * 2,v * stoneSize * 2,stoneSize * 0.95).attr({fill:'white', stroke:'#333', 'stroke-width' : stoneLineThickness}).hide().data('isVisible', false);
	        			stone.node.raphaelElement = stone;
	        			$(stone.node).attr('data-bind', 'bgoBasicViewStoneStateChanged : bgoMasterVM[' + viewModel.id + '].boardState[' + (u - 1 + ((v - 1) * boardSize)) + ']');  
	        			view.stones.push(stone);
	        		})(x,y)
	        	}
	        }
			
			// Add movement placeholder
			var movePlaceHolder = paper.circle(0, 0, stoneSize * 0.95).attr({opacity: 0.3, fill:'white', stroke:'black', 'stroke-width' : stoneLineThickness}).hide();
			movePlaceHolder.node.raphaelElement = movePlaceHolder;
			$(movePlaceHolder.node).attr('data-bind', 'bgoBasicViewCurrentPlayerChanged : bgoMasterVM[' + viewModel.id + '].currentPlayer');
			var moveNotAllowedPlaceHolder = paper.circle(0, 0, stoneSize * 0.95).attr({opacity: 0.3, fill:'red', stroke:'red', 'stroke-width' : stoneLineThickness}).hide();
			
			view.showMovePlaceHolder = function(x, y) {
				movePlaceHolder.show();
				movePlaceHolder.animate({cx:x * stoneSize * 2,cy:y * stoneSize * 2}, 250, '>');
				moveNotAllowedPlaceHolder.animate({cx:x * stoneSize * 2,cy:y * stoneSize * 2}, 250, '>');
				if (!viewModel.canPlay(x,y))
				{
					moveNotAllowedPlaceHolder.show();
				}
				else
				{
					moveNotAllowedPlaceHolder.hide();
				}
			}
			
			view.hideMovePlaceHolder = function() {
				movePlaceHolder.hide();
			}
			
			view.hideMovePlaceHolder();
			
			// Add detection points
			view.detectionPoints = new Array();
	        for (var y = 1; y <= boardSize; y++) {
	        	for (var x = 1; x <= boardSize; x++) {
	        		view.detectionPoints.push(paper.rect((x * stoneSize * 2) - stoneSize,(y * stoneSize * 2) - stoneSize,stoneSize * 2,stoneSize * 2).attr({opacity:0.0, fill:'red', view:view}).click((function(u,v,vm) { return function() { vm.userClick(u,v); } })(x,y,viewModel)).mouseover((function(u,v,vm) { return function() { view.showMovePlaceHolder(u,v); } })(x,y,viewModel)));	
	        	}
	        }
		
		})(this, viewModel);
		
		ko.applyBindings(viewModel, boardContainer.node);
		
       	return this;
	};
	
    window.BGo.prototype.BasicBoardView = function(boardElement) {
    	this.basicBoardView = new BasicBoardViewClass(boardElement, this.viewModel);
    	return this;
    }
})();


(function() {
    function BasicStatusViewClass(boardElement, viewModel) {
    	if (false === (this instanceof BasicStatusViewClass)) {
        	return new BasicStatusViewClass(boardElement, viewModel);
    	}
    	
    	var boardContainer = $(boardElement);
    	boardContainer.append('<span data-bind="text: currentPlayer().charAt(0).toUpperCase() + currentPlayer().slice(1)"></span> to play.');
    	
    	ko.applyBindings(viewModel, boardContainer.node);
    }
    
    window.BGo.prototype.BasicStatusView = function(boardElement) {
    	this.basicStatusView = new BasicStatusViewClass(boardElement, this.viewModel);
    	return this;
    }
})();

(function() {
	
    function BasicScoreViewClass(boardElement, viewModel) {
    	if (false === (this instanceof BasicScoreViewClass)) {
        	return new BasicScoreViewClass(boardElement, viewModel);
    	}
    	
    	var boardContainer = $(boardElement);
    	
    	boardContainer.append('Black Captures: <span data-bind="text: blackCaptures"></span>');
    	boardContainer.append('</br>');
    	boardContainer.append('White Captures: <span data-bind="text: whiteCaptures"></span>');
    	
    	ko.applyBindings(viewModel, boardContainer.node); 
    }
    
    window.BGo.prototype.BasicScoreView = function(boardElement) {
    	this.basicScoreView = new BasicScoreViewClass(boardElement, this.viewModel);
    	return this;
    }
})();

(function() {
	
    function BasicControlPanelClass(boardElement, viewModel) {
    	if (false === (this instanceof BasicControlPanelClass)) {
        	return new BasicControlPanelClass(boardElement, viewModel);
    	}
    	
    	var boardContainer = $(boardElement);
    	
    	boardContainer.append('Black Captures: <span data-bind="text: blackCaptures"></span>');
    	boardContainer.append('</br>');
    	boardContainer.append('White Captures: <span data-bind="text: whiteCaptures"></span>');
    	
    	ko.applyBindings(viewModel, boardContainer.node); 
    }
    
    window.BGo.prototype.BasicControlPanel = function(boardElement) {
    	this.basicControlPanel = new BasicControlPanelClass(boardElement, this.viewModel);
    	return this;
    }
})();
