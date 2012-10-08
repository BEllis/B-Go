////////////////////////////////////////////////////////
//                B-Go HTML5 Go Client                // 
////////////////////////////////////////////////////////
//                                                    //
///////////////////////////////////////////////////////

//////////////////////////////////////////////////////
//                   BGo                            //
//////////////////////////////////////////////////////

(function() {

    // Static / Shared variables.
    var BGoStoneState = { black : 'black', white : 'white', empty : 'empty', ko : 'ko', capture : 'capture'};
    var BGoMasterVM = new Array();

	// Data Structures
	function GoPointState(viewModel, x, y)
	{	
		var self = this;
		self.previousState = BGoStoneState.empty;
		self.state = BGoStoneState.empty;
		self.playableByBlack = true;
		self.playableByWhite = true;
		self.moveNumber = 0;
		self.markUp = '';
		self.stoneString = null;
		self.x = x;
		self.y = y;
		
		var updateTouchingGroups = function(x,y) {

			return (function() {

				var selfTouchingGroup = new StoneString(viewModel,x,y);
				var stoneStrings = getNeighbourGroups(x,y); 
				
				// Update groups.
				for (var i = 0; i < stoneStrings.length; i++)
				{				
					
					// Subtract the liberty from all groups.
					stoneStrings[i].liberties.splice($.inArray(self, stoneStrings[i].liberties), 1);
					
					// Union friendly groups together.
					if (stoneStrings[i].owner == viewModel.currentPlayer())
					{
						selfTouchingGroup.union(stoneStrings[i]);
					}
				}
				
				return stoneStrings;
			})();
		}; 
		
		var captureGroup = function(capturedGroup) {
			
			(function() {
			
				// Mark stones as captured.
				for (var i = 0; i < capturedGroup.stones.length; i++)
				{
					capturedGroup.stones[i].capture();
				}
				
				capturedGroup.stones = null;
				capturedGroup.liberties = null;
				
			})();
		};
		
		var getNeighbourGroups = function(x,y) { 
			
			return (function() {
				// Get neighbour groups.
				var neighbourStoneStrings = new Array();
				var currentStoneString = null;
				if (x > 1) { currentStoneString = viewModel.getBoardState(x-1,y).stoneString; if (currentStoneString != null) { neighbourStoneStrings.push(currentStoneString); } };
				if (x < viewModel.boardSize) { currentStoneString = viewModel.getBoardState(x+1,y).stoneString; if (currentStoneString != null) { neighbourStoneStrings.push(currentStoneString); } };
				if (y > 1) { currentStoneString = viewModel.getBoardState(x,y-1).stoneString; if (currentStoneString != null) { neighbourStoneStrings.push(currentStoneString); } };
				if (y < viewModel.boardSize) { currentStoneString = viewModel.getBoardState(x,y+1).stoneString; if (currentStoneString != null) { neighbourStoneStrings.push(currentStoneString); } };
			
				// Find Duplicates
				var alreadyProcessed = new Array();
				var toRemove = new Array();
				for (var i = 0; i < neighbourStoneStrings.length; i++)
				{
					if ($.inArray(neighbourStoneStrings[i], alreadyProcessed) == -1)
					{
						alreadyProcessed.push(neighbourStoneStrings[i]);
					}
					else
					{
						toRemove.push(i);
					}
				}
				
				// Remove duplicates
				for (var i = toRemove.length - 1; i >= 0; i--)
				{
					neighbourStoneStrings.splice(toRemove[i], 1);
				}
				
				return neighbourStoneStrings;
			})();
		};
		
		self.checkForSuicide = function() {}; // TODO: Updates playableByBlack and playanbleByWhite depending on whether the move is illegal due to suicide.
		
		self.capture = function() {
			
			self.previousState = self.state;
			self.state = BGoStoneState.empty;
			self.stringGroup = null;
			// Add liberty to neighbour groups.
			
			self.koobservable(self);
			
		}
		
		self.playMove = function() {
			
			if (self.state == BGoStoneState.empty)
			{
				self.state = viewModel.currentPlayer();
				self.moveNumber = viewModel.moveNumber++;
				
				// Update groups + liberty count after playing here.
				var touchingGroups = updateTouchingGroups(self.x,self.y);
				
				for (var i = 0; i < touchingGroups.length; i++)
				{
					var touchingGroup = touchingGroups[i];
					
					// if any touching groups have one liberty left
					if (touchingGroup.liberties.length == 1)
					{
						// Check to see if playing here again is suicide.
						touchingGroup.liberties[0].checkForSuicide();
					}
					
					// if any of opponents touching groups have zero liberties, capture them, recheck liberties for legal move (Get groups + liberty count after playing there)
					if (touchingGroup.owner != viewModel.currentPlayer() && touchingGroup.liberties.length == 0)
					{
						// Capture them
						captureGroup(touchingGroup);
						
						alert('captured');
						
						// Check to see if playing here again is suicide.
						self.checkForSuicide();
					}
				}
			
				self.koobservable(self); // Alert the view that the model has changed. 
			}
		}
	}

	function StoneString(viewModel, x, y)
	{
		if(false === (this instanceof StoneString)) {
        	return new StoneString(viewModel);
    	}
    	
    	var self = this;
	    self.owner = viewModel.currentPlayer();
	    self.stones = new Array();
	    self.liberties = new Array();
	    self.union = function(other) {
	    	for (var i = 0; i < other.liberties.length; i++)
	    	{
	    		if ($.inArray(other.liberties[i], self.liberties) == -1)
	    		{
	    			self.liberties.push(other.liberties[i]);
	    		}
	    	}
	    	
	    	for (var i = 0; i < other.stones.length; i++)
	    	{
	    		other.stones[i].stoneString = self;
	    		self.stones.push(other.stones[i]);
	    	}
	    };
	    
    	var handleNeighbour = function(x2,y2) {
    		var point = viewModel.getBoardState(x2,y2);
    		if (point.state == BGoStoneState.empty && $.inArray(point, self.stones) == -1)
    		{
    			self.liberties.push(point);
    		}
    	}
    	
    	if (x > 1) { handleNeighbour(x-1,y); }
    	if (x < viewModel.boardSize) { handleNeighbour(x+1,y); }
    	if (y > 1) { handleNeighbour(x,y-1); }
    	if (y < viewModel.boardSize) { handleNeighbour(x,y+1); }
    	
    	self.stones.push(viewModel.getBoardState(x,y)); 
    	viewModel.getBoardState(x,y).stoneString = self;
		return self;
	}  

	function BGoViewModel(boardSize, komi, handicap)
	{
		if(false === (this instanceof BGoViewModel)) {
        	return new BGoViewModel(boardSize, komi, handicap);
    	}
		
		// Static Data
		var self = this;
		self.id = BGoMasterVM.push(self) - 1;
		self.bgoMasterVM = BGoMasterVM;
		self.boardSize = boardSize;
		self.komi = komi;
		self.handicap = handicap; 

		// Dynamic Data
		self.moveNumber = ko.observable(1);
		self.currentPlayer = ko.observable(BGoStoneState.black);
		self.blackCaptures = ko.observable(0);
		self.whiteCaptures = ko.observable(0);
		self.boardState = new Array();
		for (var y = 1; y <= boardSize; y++) {
			for (var x = 1; x <= boardSize; x++) {
				var newState = ko.observable(new GoPointState(self, x, y));
				newState().koobservable = newState;
				self.boardState.push(newState);
			}
		}
		
		self.getBoardState = function(x,y) { return self.boardState[(x - 1 + ((y - 1) * self.boardSize))](); };
		self.setBoardState = function(x,y, newState) { self.boardState[(x - 1 + ((y - 1) * self.boardSize))](newState); };
		
		// Behaviour
		self.togglePlayer = function() { self.currentPlayer((self.currentPlayer() == BGoStoneState.black ? BGoStoneState.white : BGoStoneState.black)); };
		self.userClick = function(x,y) {
						
			self.togglePlayer(); // Change turn
			self.getBoardState(x,y).playMove();

		} 
		
		return self;
	}
			
	window.BGo = function(boardSize, komi, handicap) {
		
		if(false === (this instanceof BGo)) {
        	return new BGo(boardSize, komi, handicap);
    	}
    	
    	var self = this;

		if (boardSize == undefined)
		{
			boardSize = 19;	
		}
		
		if (komi == undefined) {
			komi = 7.5;
		}
		
		if (handicap = undefined)
		{
			handicap = 0;
		}

		self.viewModel = new BGoViewModel(boardSize, komi, handicap);			
		return self;
	}
	
})();