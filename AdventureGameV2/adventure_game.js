var gameModule = (function() {
	var flame = 0;
	
	var changeFlame = function() {
		flame++;
		if (flame > 4) {
			flame = 0;
		}
		switch(flame){
			case 0:
				document.getElementById('homeFlame').style.backgroundImage = "url('img/animate/spr_homeflame_0.png')";
				break;
			case 1:
				document.getElementById('homeFlame').style.backgroundImage = "url('img/animate/spr_homeflame_1.png')";
				break;
			case 2:
				document.getElementById('homeFlame').style.backgroundImage = "url('img/animate/spr_homeflame_2.png')";
				break;
			case 3:
				document.getElementById('homeFlame').style.backgroundImage = "url('img/animate/spr_homeflame_3.png')";
				break;
			case 4:
				document.getElementById('homeFlame').style.backgroundImage = "url('img/animate/spr_homeflame_4.png')";
				break;
		}
	};

	var cellClassName = function(cell, state) {
		var tds = document.getElementsByTagName('td');
		var className = tds[cell].className;
		className = className.split(' ');// active|inactive|hover [item]
		className[0] = state;
		className = className.join(' ');
		tds[cell].className = className;
	};

	var removeActiveItem = function() {
		var tds = document.getElementsByTagName('td');
		for (var i = 0; i < tds.length; i++) {
			cellClassName(i, 'inactive');
		}
	};

	var eventDialog = function(dialog) {
		dialogModule.startDialogBox(dialog);
	};

	var activateEvents = function(bonus) {
		if (bonus == undefined) {
			var bonus = [];
		}

		for (var i = 0; i < bonus.length; i++){
			switch(bonus[i]) {
				case 'askToriel':
					gameWalls.livingRoom.interactions[0].args = [dialogs.torielAgain]
					break;
				case 'asgoreAskKey':
					gameWalls.Hallway3.interactions[0].args = [dialogs.getKey]
					break;
				case 'asgoreGetKey':
					gameplayModule.getItem('key');
					gameWalls.Hallway3.interactions[0].args = [dialogs.gotKey]
					break;
				case 'leavehouse':
					gameplayModule.removeItem('key');
					var newExit = gameWalls.Stairway.events.shift();
					newExit.args = [true];
					newExit.pos = {X:740,Y:256};
					gameWalls.Stairway.exits.push(newExit);
					document.getElementById('selected').innerHTML = '1';
					setTimeout(function() {eventDialog(dialogs.leaveHouse)},10);
					break;
				case 'homeEntrance':
					movementModule.transRoom(2);
					break;
				case 'getPie':
					gameplayModule.getItem('pie');
					gameWalls.Kitchen.interactions[0].args = [dialogs.takenPie]
					break;
				case 'toyKnife':
					gameWalls.sideRoom.exits[1].args[0] = true;
					gameWalls.ruinsView.interactions.splice(0,1);
					gameplayModule.getItem('toyKnife');
					document.getElementById('item').style.display = 'none';
			}
		}
	};

	var positionStyle = function() {
		document.getElementById('player').style.left = '700px';//700px
		document.getElementById('player').style.top = '400px';//400px
	};

	var saveGame = function() {
		var exdays = 5;
		var d = new Date();
		var setting = saveGameWalls;
		//d.setTime(d.getTime() + (exdays*24*60*60*1000));
		d.setTime(d.getTime() + (1000*60*exdays))
		var expires = "expires="+ d.toUTCString();
		var saveData = JSON.stringify(gameWalls.MyBedroom);
		document.cookie = setting '=' + saveData + ';' + expires + ';path=/';
	};

	var testSave = function() {
		var cookie = document.cookie;
		console.log(cookie);
		if (cookie == '') {
			document.getElementById('continue').className += ' no-save';
		}
	};

	var zIndexSetting = function() {
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++) {
			var id = divs[i].id;
			document.getElementById(id).style.display = 'inline';
			var topDiv = document.getElementById(id).offsetTop;
			console.log(id +':'+topDiv);
			document.getElementById(id).style.zIndex = topDiv;
			if (id !== 'bg' && id !== 'trans') {
				document.getElementById(id).style.display = 'none';
			}
		}
	};
	
	var init = function() {
		console.log('init');
		zIndexSetting();
		//events that do not change
		window.addEventListener('keydown', function() { movementModule.movePlayer(event); } );
		window.addEventListener('keyup', function() { movementModule.stopPlayer(event); } );
		document.getElementById('audio').onended = function() { audioModule.setDefault() };
		testSave();
		positionStyle();
	}();

	//action = the function name, arguments = all arguments for the function, context = object that has the function (window/gameplayModule/etc.)
	//can be build as {gameplayModule.start, []} or {start, [], gameplayModule}
	var callFunction = function(action, arguments = [], context = window) {
		var args = Array.prototype.slice.call(arguments);
		var nameSpaces = action.split('.');
		var func = nameSpaces.pop();
		for(var i = 0; i < nameSpaces.length; i++) {
			context = context[nameSpaces[i]];
		}
		return context[func].apply(context, args);
	};

	var checkCoords = function(e) {
		var rect = document.getElementById('canvas').getBoundingClientRect();
		var x = e.clientX;
		var y = e.clientY;
		document.getElementById('coords').innerHTML = 'X: ' + (x - rect.left) + ',Y: ' + (y - rect.top);
	};

	//debugging return. at very bottom only.
	return {
		changeFlame: changeFlame,
		activateEvents: activateEvents,
		removeActiveItem: removeActiveItem,
		callFunction:callFunction,
		checkCoords:checkCoords,
		cellClassName:cellClassName,
		saveGame:saveGame
	};
})();//https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

//dev based functions
function changeMode(mode) {
	if (mode === 'dev') {
		document.getElementById('trans').style.zIndex = '50';
		document.getElementById('canvas').style.zIndex = '5000';
		document.getElementById('devmode').style.display = 'inline';
		movementModule.changeTarget(true);
	} else if (mode === 'player') {
		document.getElementById('trans').style.zIndex = '5000';
		document.getElementById('canvas').style.zIndex = '-1';
		document.getElementById('devmode').style.display = 'none';
	}
}