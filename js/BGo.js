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
		self.suicideForBlack = false;
		self.suicideForWhite = false;
		self.moveNumber = 0;
		self.markUp = '';
		self.stoneString = null;
		self.x = x;
		self.y = y;
		
		var updateTouchingStoneStrings = function(x,y) {

			return (function() {

				var selfTouchingStoneString = new StoneString(viewModel,x,y);
				var libertiesThatNeedRecheckingForSuicide = selfTouchingStoneString.liberties;
				var stoneStrings = self.getNeighbourStoneStrings();
				var joinedAnExistingGroup = false;
				
				// Update groups.
				for (var i = 0; i < stoneStrings.length; i++)
				{				
					
					// Subtract the liberty from all groups.
					stoneStrings[i].liberties.splice($.inArray(self, stoneStrings[i].liberties), 1);
					
					// Union friendly groups together.
					if (stoneStrings[i].owner == viewModel.currentPlayer())
					{
						joinedAnExistingGroup = true;
						selfTouchingStoneString.union(stoneStrings[i]);
					}
				}
				
				if (!joinedAnExistingGroup && selfTouchingStoneString.liberties.length == 1)
				{
					selfTouchingStoneString.liberties[0].checkForSuicide();
				}
				else
				{
					for (var i = 0; i < libertiesThatNeedRecheckingForSuicide.length; i++) {
						libertiesThatNeedRecheckingForSuicide[i].checkForSuicide();
					}
				}
				
				return stoneStrings;
			})();
		}; 
		
		self.getNeighbourStones = function() {
			return(function () {
				var neighbourStones = new Array();
				if (x > 1) { neighbourStones.push(viewModel.getBoardState(x-1,y)); };
				if (x < viewModel.boardSize) { neighbourStones.push(viewModel.getBoardState(x+1,y)); };
				if (y > 1) { neighbourStones.push(viewModel.getBoardState(x,y-1)); };
				if (y < viewModel.boardSize) { neighbourStones.push(viewModel.getBoardState(x,y+1)); };
				return neighbourStones;
			})();
		}
		
		self.getNeighbourStoneStrings = function() { 
			
			return (function() {
				
				var neighbourStoneStrings = new Array();
				var neighbourStones = self.getNeighbourStones();
				for (var i = 0; i < neighbourStones.length; i++)
				{
					var stoneString = neighbourStones[i].stoneString;
					
					// If there is a stone string on a neighbour and we haven't already added it,
					if (stoneString != null && $.inArray(stoneString, neighbourStoneStrings) == -1)
					{
						neighbourStoneStrings.push(stoneString);
					}
				}
				
				return neighbourStoneStrings;
			})();
		}; 
		
		self.moveIsLegalFor = function(color) {
			return (function() {
				if (self.state != BGoStoneState.empty)
				{
					return false;
				}
				
				if (color == BGoStoneState.black)
				{
					return !self.suicideForBlack;
				}
				else
				{
					return !self.suicideForWhite;
				}
			})();
		}  
		
		self.checkForSuicide = function() {
			// Updates suicideForBlack and suicideForWhite depending on whether the move is illegal due to suicide.
			(function() {
				var neighbourStones = self.getNeighbourStones();
				for (var i = 0; i < neighbourStones.length; i++) {
					if (neighbourStones[i].state == BGoStoneState.empty)
					{
						self.suicideForBlack = false;
						self.suicideForWhite = false;
						return;
					}
				}
				
				var neighbourStoneStrings = self.getNeighbourStoneStrings(self.x, self.y);
				var blackWouldBeCapturedByBlack = false;
				var whiteWouldBeCapturedByBlack = false;
				var blackWouldBeCapturedByWhite = false;
				var whiteWouldBeCapturedByWhite = false;
				
				var blackStoneStringCount = 0;
				var whiteStoneStringCount = 0;
				
				for (var i = 0; i < neighbourStoneStrings.length; i++)
				{
					// Check to see if playing here would capture any oppontent groups.
					var stoneString = neighbourStoneStrings[i];
					if (stoneString.owner == BGoStoneState.black) {
						blackWouldBeCapturedByBlack |= stoneString.isCapturedByPlayingHere(self, BGoStoneState.black);
					}
					else
					{
						whiteWouldBeCapturedByBlack |= stoneString.isCapturedByPlayingHere(self, BGoStoneState.black);
					}
					
					if (stoneString.owner == BGoStoneState.black) {
						blackWouldBeCapturedByWhite |= stoneString.isCapturedByPlayingHere(self, BGoStoneState.white);
					}
					else
					{
						whiteWouldBeCapturedByWhite |= stoneString.isCapturedByPlayingHere(self, BGoStoneState.white);
					}
					
					if (stoneString.owner == BGoStoneState.black)
					{
						blackStoneStringCount++;
					}
					else
					{
						whiteStoneStringCount++;
					}
				}
				
				self.suicideForBlack = (blackStoneStringCount == 0 && !whiteWouldBeCapturedByBlack) || (blackWouldBeCapturedByBlack && !whiteWouldBeCapturedByBlack);
				self.suicideForWhite = (whiteStoneStringCount == 0 && !blackWouldBeCapturedByWhite) || (whiteWouldBeCapturedByWhite && !blackWouldBeCapturedByWhite);
			})();
		}; 
		
		self.capture = function() {
			
			self.previousState = self.state;
			self.state = BGoStoneState.empty;
			self.stoneString = null;
			self.koobservable(self);
			
		}
		
		self.playMove = function(color, moveNumber) {
			
			var needToAddHash = true; // TODO: Identify under which scenario's we need a hash.
			// TODO: Trim viewmodel hashes if the board situation can never be repeated.
			
			self.state = color;
			self.moveNumber = moveNumber;
			
			// Update groups + liberty count after playing here.
			var touchingStoneStrings = updateTouchingStoneStrings(self.x,self.y);
			
			for (var i = 0; i < touchingStoneStrings.length; i++)
			{
				var touchingStoneString = touchingStoneStrings[i];
				
				// if any touching groups have one liberty left
				if (touchingStoneString.liberties.length == 1)
				{
					// Check to see if playing at the last liberty is suicide.
					touchingStoneString.liberties[0].checkForSuicide();
				}
				
				// if any of opponents touching groups have zero liberties, capture them, recheck liberties for legal move (Get groups + liberty count after playing there)
				if (touchingStoneString.owner != viewModel.currentPlayer() && touchingStoneString.liberties.length == 0)
				{
					// Capture them
					touchingStoneString.captureStoneString();
				}
			}
			
			if (needToAddHash)
			{
				viewModel.hashes.push(viewModel.generateHash());
			}
		
			self.koobservable(self); // Alert the view that the model has changed. 
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
	    
		self.captureStoneString = function() {
			
			(function() {
			
				// Mark stones as captured.
				for (var i = 0; i < self.stones.length; i++)
				{
					var stone = self.stones[i];
					stone.capture();
				}
				
				for (var i = 0; i < self.stones.length; i++)
				{
					var stone = self.stones[i];
					var neighbourStoneStrings = stone.getNeighbourStoneStrings();
					for (var j = 0; j < neighbourStoneStrings.length; j++)
					{
						neighbourStoneStrings[j].addLiberty(stone.x,stone.y);
					}
					
					stone.checkForSuicide();
				}
				
				if (self.owner == BGoStoneState.black)
				{
					viewModel.whiteCaptures(viewModel.whiteCaptures() + self.stones.length);
				}
				else
				{
					viewModel.blackCaptures(viewModel.blackCaptures() + self.stones.length);
				}
				
				self.stones = null;
				self.liberties = null;
				
			})();
		};
	    
	    self.addLiberty = function(x,y) {
	    	(function() {
	    		var point = viewModel.getBoardState(x,y);
	    		self.liberties.push(point);
	    		if (self.liberties.length == 2) {
	    			self.liberties[0].checkForSuicide();	
	    		}
	    	})();
	    }
	    
    	var handleNeighbour = function(x,y) {
    		var point = viewModel.getBoardState(x,y);
    		if (point.state == BGoStoneState.empty && $.inArray(point, self.stones) == -1)
    		{
    			self.liberties.push(point);
    		}
    	}
    	
    	self.isCapturedByPlayingHere = function(point, color) {
    		return (function() {
    			
    			// NOTE: Assume there are no empty points (this should be checked before calling this function.)
    			if (self.liberties.length > 1)
    			{
    				return false;
    			}
    			
    			if (self.liberties.length == 1 && self.owner != color)
    			{
    				return true;
    			}
    			
    			var stoneStrings = point.getNeighbourStoneStrings();
    			var captured = true;
    			for (var i = 0; i < stoneStrings.length; i++)
    			{
    				// If the placed stone is the same colour as this group and the other group is the same colour and it has more than one liberty left,
    				if (stoneStrings[i] != self && stoneStrings[i].owner == color && stoneStrings[i].owner == stoneStrings[i].owner && stoneStrings[i].liberties.length > 1)
    				{
    					// Alive
    					captured = false;
    				}
    			}
    			
    			return captured;
    			
    		})();
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
		self.hashes = new Array(); // needed for super-ko detection.
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
		
		self.clone = function() {
			// TODO: Return a clone of this view model.
		} 
		
		
		self.getBoardState = function(x,y) { return self.boardState[(x - 1 + ((y - 1) * self.boardSize))](); };
		
		self.wouldRepeatBoardState = function(x, y, color) {
			 // TODO: clone the board, play the move and get a hash?
			 if (self.canPlay(x,y)) {
			 	var clone = self.clone();
			 	clone.getBoardState(x,y).playMove(clone.currentPlayer(), clone.moveNumber++);
			 	var hash = clone.hashes[clone.hashes.length - 1];
			 	if ($.inArray(hash, self.hashes) != -1) {
			 		return true;
			 	}
			 }
			 
			 return false;
		}
		
		self.generateHash = function()
		{
			// TODO: Use a more efficient hashing algorithm.
			var hash = '';
			for (var i = 0; i < self.boardState.length; i++)
			{
				hash += self.boardState[i]().state.charAt(0);
			}
			
			return hash;
		}
		
		// Behaviour
		self.togglePlayer = function() { self.currentPlayer((self.currentPlayer() == BGoStoneState.black ? BGoStoneState.white : BGoStoneState.black)); };
		self.canPlay = function(x,y) {
			return self.getBoardState(x,y).moveIsLegalFor(self.currentPlayer());
		}
		
		self.userClick = function(x,y) {

			if (!self.canPlay(x,y))
			{
				return;
			}
			
			self.getBoardState(x,y).playMove(self.currentPlayer(), self.moveNumber++);
			self.togglePlayer(); // Change turn

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