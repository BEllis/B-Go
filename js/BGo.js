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
		
		self.checkForSuicide = function() {}; // Updates playableByBlack and playanbleByWhite depending on whether the move is illegal due to suicide.
		
		self.playMove = function() {
			
			if (self.state == BGoStoneState.empty)
			{
				self.state = viewModel.currentPlayer();
				self.moveNumber = viewModel.moveNumber++;
				
				var updateTouchingGroups = function(x,y) {

					var selfTouchingGroup = new StoneString(viewModel,x,y);
					
					// Get neighbour groups.
					var touchingGroupsReturnValue = new Array();
					var currentStoneString = null;
					if (x > 1) { currentStoneString = viewModel.getBoardState(x-1,y).stoneString; if (currentStoneString != null) { touchingGroupsReturnValue.push(currentStoneString); } };
					if (x < viewModel.boardSize) { currentStoneString = viewModel.getBoardState(x+1,y).stoneString; if (currentStoneString != null) { touchingGroupsReturnValue.push(currentStoneString); } };
					if (y > 1) { currentStoneString = viewModel.getBoardState(x,y-1).stoneString; if (currentStoneString != null) { touchingGroupsReturnValue.push(currentStoneString); } };
					if (y < viewModel.boardSize) { currentStoneString = viewModel.getBoardState(x,y+1).stoneString; if (currentStoneString != null) { touchingGroupsReturnValue.push(currentStoneString); } };
				
					// Find Duplicates
					var alreadyProcessed = new Array();
					var toRemove = new Array();
					for (var i = 0; i < touchingGroupsReturnValue.length; i++)
					{
						// Remove duplicate entries.
						if ($.inArray(touchingGroupsReturnValue[i], alreadyProcessed) == -1)
						{
							alreadyProcessed.push(touchingGroupsReturnValue[i]);
						}
						else
						{
							toRemove.push(i);
						}
					}
					
					// Remove duplicates
					for (var i = toRemove.length - 1; i >= 0; i--)
					{
						touchingGroupsReturnValue.splice(toRemove[i], 1);
					}
					
					// Update groups.
					for (var i = 0; i < touchingGroupsReturnValue.length; i++)
					{				
						
						// Subtract the liberty from all groups.
						touchingGroupsReturnValue[i].liberties.splice($.inArray(self, touchingGroupsReturnValue[i].liberties), 1);
						
						// Union friendly groups together.
						if (touchingGroupsReturnValue[i].owner == viewModel.currentPlayer())
						{
							selfTouchingGroup.union(touchingGroupsReturnValue[i]);
						}
					}
					
					return touchingGroupsReturnValue;
				};
				
				var captureGroup = function(capturedGroup) {
					
					for (var i = 0; i < capturedGroup.stones.length; i++)
					{
						capturedGroup.stones[i].previousState = capturedGroup.stones[i].state;
						capturedGroup.stones[i].state = BGoStoneState.empty;
						capturedGroup.stones[i].stringGroup = null;
						capturedGroup.stones[i].koobservable(capturedGroup.stones[i]);
					}
					
					capturedGroup.stones = null;
					capturedGroup.liberties = null;
				};
				
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
						
						// Check to see if playing here again is suicide.
						self.checkForSuicide();
					}
				}
			
				self.koobservable(self); // Alert the view that the model has changed.
				viewModel.togglePlayer(); 
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
		this.id = BGoMasterVM.push(this) - 1;
		this.bgoMasterVM = BGoMasterVM;
		this.boardSize = boardSize;
		this.komi = komi;
		this.handicap = handicap; 

		// Dynamic Data
		this.moveNumber = ko.observable(1);
		this.currentPlayer = ko.observable(BGoStoneState.black);
		this.blackCaptures = ko.observable(0);
		this.whiteCaptures = ko.observable(0);
		this.boardState = new Array();
		for (var y = 1; y <= boardSize; y++) {
			for (var x = 1; x <= boardSize; x++) {
				var newState = ko.observable(new GoPointState(this, x, y));
				newState().koobservable = newState;
				this.boardState.push(newState);
			}
		}
		
		this.getBoardState = function(x,y) { return this.boardState[(x - 1 + ((y - 1) * this.boardSize))](); };
		this.setBoardState = function(x,y, newState) { this.boardState[(x - 1 + ((y - 1) * this.boardSize))](newState); };
		
		// Behaviour
		this.togglePlayer = function() { this.currentPlayer((this.currentPlayer() == BGoStoneState.black ? BGoStoneState.white : BGoStoneState.black)); };
		this.userClick = function(x,y) {
						
			this.getBoardState(x,y).playMove();

		} 
		
		return this;
	}
			
	window.BGo = function(boardSize, komi, handicap) {
		
		if(false === (this instanceof BGo)) {
        	return new BGo(boardSize, komi, handicap);
    	}

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

		this.viewModel = new BGoViewModel(boardSize, komi, handicap);			
		return this;
	}
	
})();