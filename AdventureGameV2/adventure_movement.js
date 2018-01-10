var movementModule = (function(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 5;
	var gameinterval;
	var playerData = {
		X: 0,
		Y: 0,
		Dir: 'd',//direction player is facing
		keys: []
	};
	var playerDiv = {
		div: document.getElementById('player'),
		X: 0,
		Y: 0
	};
	var keys = ['',''];
	var step,cell = 0;
	var stepCount = 10;
	var roomWalls, roomExits, roomInteractions, roomEvents, location, disU, disD, disR, disL, doName;
	var number = {};
	var waitTransRoom, dialogbox, autoSave = false;
	var controlMode = 'start';//walking, inv, none, start

	var changeControlMode = function(change) {
		controlMode = change;
	};

	var findPos = function() {
		var rect = canvas.getBoundingClientRect();

		playerDiv.X = document.getElementById('player').style.left;
		playerDiv.X = playerDiv.X.replace('px', '');
		playerDiv.X = Number(playerDiv.X);
		playerData.X = playerDiv.X - rect.left;
		
		playerDiv.Y = document.getElementById('player').style.top;
		playerDiv.Y = playerDiv.Y.replace('px', '');
		playerDiv.Y = Number(playerDiv.Y);
		playerData.Y = playerDiv.Y - rect.top;
		zIndexPlayer();
		hitboxPlayer();
	};

	var hitboxPlayer = function() {
		ctx.fillStyle = 'rgba(0,0,255,0.8)';
		ctx.fillRect(playerData.X -2, playerData.Y + 50, 59, 46);
	};

	var transRoom = function(num = undefined) {
		doName = (num !== undefined) ? num : doName;
		var alpha = document.getElementById('trans').getAttribute('data-alpha');
		var wait = document.getElementById('trans').getAttribute('data-wait');
		if (alpha === "0" && wait === 'false') {
			waitTransRoom = true;
			changeControlMode('none');
			document.getElementById('trans').setAttribute('data-wait','true');
			gameplayModule.transition(1,'out');
		} else if (alpha === "1" && wait === 'true') {
			waitTransRoom = false;
			document.getElementById('trans').setAttribute('data-wait','false');
			positionPlayer(roomExits[doName].pos);
			findPos();
			var args = (roomExits[doName].args !== undefined) ? roomExits[doName].args : undefined;
			gameModule.callFunction(roomExits[doName].event, args);
			document.getElementById('selected').innerHTML = '1';
			getRoom();
			selectNew();
			changeTarget(true);
			drawRoom();
			if (autoSave === true || autoSave === 'true') {
				gameModule.saveGame();
			}
			changeControlMode('walking');
			gameModule.cellClassName(cell, 'inactive');
			gameplayModule.transition(1,'in');

		}
	};

	var getRoom = function() {
		location = document.getElementById('location').getAttribute('data-location');
		if (location === 'start') {
			autoSave = (document.getElementById('autoSaveCheckbox').className).substr(0,5);
			autoSave = autoSave.split(' ');
			autoSave = autoSave[0];
		}
		switch(location) {//get current room
			default:
				roomWalls = [[{X:150,Y:100},{X:200,Y:100}],[{X:250,Y:100},{X:300,Y:100}],[{X:150,Y:200},{X:300,Y:200}]];
				roomExits = [{area:{X:135,Y:75,W:185,H:140}}];
				roomInteractions = [];
				roomEvents = [];
				break;
			case 'My bedroom':
				roomWalls = gameWalls.MyBedroom.walls;
				roomExits = gameWalls.MyBedroom.exits;
				roomInteractions = gameWalls.MyBedroom.interactions;
				roomEvents = [];
				break;
			case 'Hallway 1':
				roomWalls = gameWalls.Hallway1.walls;
				roomExits = gameWalls.Hallway1.exits;
				roomInteractions = [];
				roomEvents = [];
				break;
			case 'Hallway 2':
				roomWalls = gameWalls.Hallway2.walls;
				roomExits = gameWalls.Hallway2.exits;
				roomInteractions = [];
				roomEvents = [];
				break;
			case 'Hallway 3':
				roomWalls = gameWalls.Hallway3.walls;
				roomExits = gameWalls.Hallway3.exits;
				roomInteractions = gameWalls.Hallway3.interactions;
				roomEvents = [];
				break;
			case 'Mom\'s bedroom':
				roomWalls = gameWalls.TorielBedroom.walls;
				roomExits = gameWalls.TorielBedroom.exits;
				roomInteractions = gameWalls.TorielBedroom.interactions;
				roomEvents = [];
				break;
			case 'Stairway':
				roomWalls = gameWalls.Stairway.walls;
				roomExits = gameWalls.Stairway.exits;
				roomInteractions = [];
				roomEvents = gameWalls.Stairway.events;
				break;
			case 'livingRoom':
				roomWalls = gameWalls.livingRoom.walls;
				roomExits = gameWalls.livingRoom.exits;
				roomInteractions = gameWalls.livingRoom.interactions;
				roomEvents = [];
				break;
			case 'Kitchen':
				roomWalls = gameWalls.Kitchen.walls;
				roomExits = gameWalls.Kitchen.exits;
				roomInteractions = gameWalls.Kitchen.interactions;
				roomEvents = [];
				break;
			case 'Home_entrance':
				roomWalls = gameWalls.homeEntrance.walls;
				roomExits = gameWalls.homeEntrance.exits;
				roomInteractions = [];
				roomEvents = [];
				break;
			case 'Tree':
				roomWalls = gameWalls.Tree.walls;
				roomExits = gameWalls.Tree.exits;
				roomInteractions = gameWalls.Tree.interactions;
				roomEvents = [];
				break;
			case 'Intersection':
				roomWalls = gameWalls.Intersection.walls;
				roomExits = gameWalls.Intersection.exits;
				roomInteractions = [];
				roomEvents = [];
				break;
			case 'sideRoom':
				roomWalls = gameWalls.sideRoom.walls;
				roomExits = gameWalls.sideRoom.exits;
				roomInteractions = [];
				roomEvents = [];
				break;
			case 'ruinsView':
				roomWalls = gameWalls.ruinsView.walls;
				roomExits = gameWalls.ruinsView.exits;
				roomInteractions = gameWalls.ruinsView.interactions;
				roomEvents = [];
				break;
			case 'ruinsPuzzle':
				roomWalls = gameWalls.ruinsPuzzle.walls;
				roomExits = gameWalls.ruinsPuzzle.exits;
				roomInteractions = gameWalls.ruinsPuzzle.interactions;
				roomEvents = gameWalls.ruinsPuzzle.events;
				break
		}
	};

	var drawRoom = function() {
		var group = Number(document.getElementById('selected').getAttribute('data-group'));
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for (var j = 0; j < roomWalls.length; j++) {
			ctx.beginPath();//draw all walls of the room
			ctx.moveTo(roomWalls[j][0].X,roomWalls[j][0].Y);//start
			for (var i = 1; i < roomWalls[j].length; i++) {
				ctx.lineTo(roomWalls[j][i].X,roomWalls[j][i].Y);
			}
			ctx.strokeStyle = "rgba(255,255,255,1)";
			ctx.stroke();
		}

		if (roomEvents.length !== 0) {
			ctx.fillStyle = 'rgba(255,255,0,1)';//events
			for (i = 0; i < roomEvents.length; i++) {
				ctx.fillRect(roomEvents[i].area.X,roomEvents[i].area.Y,roomEvents[i].area.W,roomEvents[i].area.H);
			}
		}

		if (roomInteractions.length !== 0) {
			ctx.fillStyle = 'rgba(255,0,255,1)';//interactables
			//ctx.fillStyle = 'rgba(255,0,255,0.5)';
			for (i = 0; i < roomInteractions.length; i++) {
				ctx.fillRect(roomInteractions[i].area.X,roomInteractions[i].area.Y,roomInteractions[i].area.W,roomInteractions[i].area.H);
			}
		}

		ctx.fillStyle = 'rgba(0,255,0,1)';//draw all exits of the room
		for (i = 0; i < roomExits.length; i++) {
			ctx.fillRect(roomExits[i].area.X,roomExits[i].area.Y,roomExits[i].area.W,roomExits[i].area.H);
		}

		if (document.getElementById('devmode').style.display !== 'none') {
			var currentSelected = document.getElementById('selected').innerHTML;
			currentSelected = Number(currentSelected);
			var target = document.getElementById('target').innerHTML;
			switch(target){
				case 'wall':
					ctx.beginPath();
					ctx.moveTo(roomWalls[group-1][currentSelected-1].X,roomWalls[group-1][currentSelected-1].Y);
					ctx.lineTo(roomWalls[group-1][currentSelected].X,roomWalls[group-1][currentSelected].Y);
					ctx.strokeStyle = "rgba(0,255,255,1)";
					ctx.stroke();
					break;
				case 'exit':
					ctx.fillStyle = "rgba(0,255,255,1)";
					ctx.fillRect(roomExits[currentSelected-1].area.X,roomExits[currentSelected-1].area.Y,roomExits[currentSelected-1].area.W,roomExits[currentSelected-1].area.H);
					break;
				case 'interact':
					if (roomInteractions[0] !== undefined) {
						ctx.fillStyle = "rgba(0,255,255,1)";
						ctx.fillRect(roomInteractions[currentSelected-1].area.X,roomInteractions[currentSelected-1].area.Y,roomInteractions[currentSelected-1].area.W,roomInteractions[currentSelected-1].area.H);
					}
					break;
				case 'event':
					if (roomEvents[0] !== undefined) {
						ctx.fillStyle = "rgba(0,255,255,1)";
						ctx.fillRect(roomEvents[currentSelected-1].area.X,roomEvents[currentSelected-1].area.Y,roomEvents[currentSelected-1].area.W,roomEvents[currentSelected-1].area.H);
					}
					break;
			}
		}
	};

	var gameInterval = function() {
		checkDialogbox();
		if (waitTransRoom === true) {//wait for transition
			transRoom();
			return
		}
		drawRoom();
		if (controlMode === 'walking') {
			if (playerData.keys && (playerData.keys[87] === true || playerData.keys[38] === true)) {//u
				disU = testWall('u');
				playerDiv.div.style.top = ''+(playerDiv.Y+disU)+'px';
			}
			if (playerData.keys && (playerData.keys[83] === true || playerData.keys[40] === true)) {//d
				disD = testWall('d');
				playerDiv.div.style.top = ''+(playerDiv.Y+disD)+'px';
			}
			if (playerData.keys && (playerData.keys[65] === true || playerData.keys[37] === true)) {//l
				disL = testWall('l');
				playerDiv.div.style.left = ''+(playerDiv.X+disL)+'px';
			}
			if (playerData.keys && (playerData.keys[68] === true || playerData.keys[39] === true)) {//r
				disR = testWall('r');
				playerDiv.div.style.left = ''+(playerDiv.X+disR)+'px';
			}
		} else if (controlMode !== 'walking' && controlMode !== 'none') {
			menuControl();
		}

		var stopWalk = {//stop player from walking animation against a wall
			override: false
		};
		if (disU == 0) {
			stopWalk.keyCode = 38
			stopPlayer(stopWalk);
		}
		if (disD == 0) {
			stopWalk.keyCode = 40
			stopPlayer(stopWalk);
		}
		if (disR == 0) {
			stopWalk.keyCode = 39
			stopPlayer(stopWalk);
		}
		if (disL == 0) {
			stopWalk.keyCode = 37
			stopPlayer(stopWalk);
		}
		animatePlayer();
		findPos();
		if (playerData.keys && playerData.keys[90] === true && controlMode === 'walking') {
			playerData.keys[90] = false;
			testPixel();
		} else if (playerData.keys && playerData.keys[90] === true && dialogbox === 'open') {
			playerData.keys[90] = false;
			dialogModule.dialogBoxDisplay();
		} else if (playerData.keys && playerData.keys[88] === true && dialogbox === 'open') {
			playerData.keys[88] = false;
			dialogModule.dialogBoxSkip();
		} else if (playerData.keys && playerData.keys[90] === true && controlMode === 'inv') {
			playerData.keys[90] = false;
			gameModule.cellClassName(cell, 'active');
			changeControlMode('walking');
		} else if (playerData.keys && playerData.keys[90] === true && controlMode === 'start') {
			playerData.keys[90] = false;
			var selected = document.querySelector('.selected');
			if (selected.id === 'startNew') {
				gameplayModule.start();
			} else if (selected.id === 'continue') {
				gameplayModule.continueFromSave();
			} else if (selected.id === 'autoSaveCheckbox') {
				if (autoSave === false) {
					autoSave = true;
				} else {
					autoSave = false;
				}
				selected.className = '' + autoSave + ' selected';
				document.getElementById('autoSaveText').innerHTML = 'Auto-save: ' + autoSave;
			}
		}
	};

	var zIndexPlayer = function() {
		playerDiv.div.style.zIndex = playerData.Y;
	};

	var movePlayer = function(press) {
		console.log(press.keyCode);
		if (press.keyCode === 80) {
			audioModule.stopAudio();
		} else if (press.keyCode === 74) {
			changeMode('dev');
		} else if (press.keyCode === 75) {
			changeMode('player');
		} else if (press.keyCode === 67) {
			if (controlMode === 'walking') {
				cell = 0;
				changeControlMode('inv');
			} else if (controlMode === 'inv') {
				changeControlMode('walking');
				gameModule.removeActiveItem();
			}
		}
		playerData.keys = (playerData.keys || []);
		playerData.keys[press.keyCode] = true;
	};

	var menuControl = function() {
		if (controlMode === 'inv') {
			if (playerData.keys && (playerData.keys[87] === true || playerData.keys[38] === true)) {//u
				playerData.keys[87] = false;
				playerData.keys[38] = false;
				if (cell === 0) {
					cell = 6;
				} else if (cell === 1) {
					cell = 7;
				} else {
					cell -= 2;
				}
			} else if (playerData.keys && (playerData.keys[83] === true || playerData.keys[40] === true)) {//d
				playerData.keys[83] = false;
				playerData.keys[40] = false;
				if (cell === 6) {
					cell = 0;
				} else if (cell === 7) {
					cell = 1;
				} else {
					cell += 2;
				}
			} else if (playerData.keys && (playerData.keys[65] === true || playerData.keys[37] === true)) {//l
				playerData.keys[65] = false;
				playerData.keys[37] = false;
				if (cell === 0) {
					cell = 7;
				} else {
					cell -= 1;
				}
			} else if (playerData.keys && (playerData.keys[68] === true || playerData.keys[39] === true)) {//r
				playerData.keys[68] = false;
				playerData.keys[39] = false;
				if (cell === 7) {
					cell = 0;
				} else {
					cell += 1;
				}
			}
			animatePlayer();
			keys = ['',''];
			var tds = document.getElementsByTagName('td');
			for (var i = 0; i < tds.length; i++) {
				gameModule.cellClassName(i,'inactive');
			}
			gameModule.cellClassName(cell,'hover');
		} else if (controlMode === 'start') {
			var selected = document.querySelector('.selected');
			//autoSave = (document.getElementById('autoSaveCheckbox').className).substr(0,5);
			//autoSave = autoSave.split(' ');
			//autoSave = autoSave[0];
			if (playerData.keys && (playerData.keys[87] === true || playerData.keys[38] === true)) {//u
				playerData.keys[87] = false;
				playerData.keys[38] = false;
				
				if (document.getElementById('continue').className === 'btnMain no-save') {
					document.getElementById('startNew').className = 'btnMain selected';
					document.getElementById('continue').className = 'btnMain no-save';
					document.getElementById('autoSaveCheckbox').className = '' + autoSave + '';
				} else {
					if (selected.id === 'continue') {
						document.getElementById('startNew').className = 'btnMain selected';
						document.getElementById('continue').className = 'btnMain';
						document.getElementById('autoSaveCheckbox').className = '' + autoSave + '';
					} else if (selected.id === 'autoSaveCheckbox') {
						document.getElementById('startNew').className = 'btnMain';
						document.getElementById('continue').className = 'btnMain selected';
						document.getElementById('autoSaveCheckbox').className = '' + autoSave + '';
					}
				}
			} else if (playerData.keys && (playerData.keys[83] === true || playerData.keys[40] === true)) {//d
				playerData.keys[83] = false;
				playerData.keys[40] = false;
				if (document.getElementById('continue').className === 'btnMain no-save') {
					document.getElementById('startNew').className = 'btnMain';
					document.getElementById('autoSaveCheckbox').className = '' + autoSave + ' selected';
				} else {
					if (selected.id === 'startNew') {
						document.getElementById('startNew').className = 'btnMain';
						document.getElementById('continue').className = 'btnMain selected';
						document.getElementById('autoSaveCheckbox').className = '' + autoSave + '';
					} else if (selected.id === 'continue') {
						document.getElementById('startNew').className = 'btnMain';
						document.getElementById('continue').className = 'btnMain';
						document.getElementById('autoSaveCheckbox').className = '' + autoSave + ' selected';
					}
				}
			}
		}
	};

	var animatePlayer = function() {
		if (controlMode === 'none' || controlMode === 'inv' || controlMode === 'start') {
			if (keys[0] == 'u') {
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_u_0.png)';
			} else if (keys[0] == 'd') {
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_d_0.png)';
			} else if (keys[0] == 'r') {
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_r_0.png)';
			} else if (keys[0] == 'l') {
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_l_0.png)';
			}
			return;
		}
		if (playerData.keys && (playerData.keys[87] === true || playerData.keys[38] === true)) {//u
			if (keys[0] === '') {
				keys[0] = 'u';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_u_0.png)';
				step = 0;
				stepCount = 10;
			} else if (keys[1] === '' && (keys[0] !== 'u' && keys[0] !== 'd')) {
				keys[1] = 'u';
			}
		}
		if (playerData.keys && (playerData.keys[83] === true || playerData.keys[40] === true)) {//d
			if (keys[0] === '') {
				keys[0] = 'd';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_d_0.png)';
				step = 0;
				stepCount = 10;
			} else if (keys[1] === '' && (keys[0] !== 'd' && keys[0] !== 'u')) {
				keys[1] = 'd';
			}
		}
		if (playerData.keys && (playerData.keys[68] === true || playerData.keys[39] === true)) {//r
			if (keys[0] === '') {
				keys[0] = 'r';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_r_0.png)';
				step = 0;
				stepCount = 10;
			} else if (keys[1] === '' && (keys[0] !== 'r' && keys[0] !== 'l')) {
				keys[1] = 'r';
			}
		}
		if (playerData.keys && (playerData.keys[65] === true || playerData.keys[37] === true)) {//l
			if (keys[0] === '') {
				keys[0] = 'l';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_l_0.png)';
				step = 0;
				stepCount = 10;
			} else if (keys[1] === '' && (keys[0] !== 'l' && keys[0] !== 'r')) {
				keys[1] = 'l';
			}
		}
		switch(keys[0]) {
			case 'u':
				playerData.Dir = 'u';
				if (stepCount == 10) {
					playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_u_'+step+'.png)';
					step++;
				}
				break;
			case 'd':
				playerData.Dir = 'd';
				if (stepCount == 10) {
					playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_d_'+step+'.png)';
					step++;
				}
				break;
			case 'r':
				playerData.Dir = 'r';
				if (stepCount == 10) {
					if (step >= 2) {
						playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_r_'+(step-2)+'.png)';
						step++;
					} else {
						playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_r_'+step+'.png)';
						step++;
					}
				}
				break;
			case 'l':
				playerData.Dir = 'l';
				if (stepCount == 10) {
					if (step >= 2) {
						playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_l_'+(step-2)+'.png)';
						step++;
					} else {
						playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_l_'+step+'.png)';
						step++;
					}
				}
				break;
		}
		stepCount++;
		if (stepCount > 10) {
			stepCount = 0;
		}
		if (step > 3) {
			step = 0;
		}
	};

	var testWall = function(dir) {
		var j,i;
		if ((playerData.keys[87] === true || playerData.keys[38] === true) && dir === 'u') {//u
			loopU:
			for (j = -4.5; j < 0; j+=0.5) {
				var imageDataUp = ctx.getImageData(playerData.X -2, playerData.Y + 50, 59, Math.floor(j));
				for (i = 0; i < imageDataUp.data.length; i += 4) {
					if (imageDataUp.data[i+0] == 0 && imageDataUp.data[i+1] == 255 && imageDataUp.data[i+2] == 0) {
						var success = doAction('exit');
						if (success !== 'failed') {
							break loopU;
						} else {
							continue loopU;
						}
					} else if (imageDataUp.data[i+0] == 255 && imageDataUp.data[i+1] == 255 && imageDataUp.data[i+2] == 0) {
						doAction('event');
						continue loopU;
					} else if (imageDataUp.data[i+3] == 255) {
						continue loopU;
					}
				}
				return j;
			}
		}
		if ((playerData.keys[83] === true || playerData.keys[40] === true) && dir === 'd') {//d
			loopD:
			for (j = 4.5; j > 0; j-=0.5) {
				var imageDataDown = ctx.getImageData(playerData.X -2, playerData.Y + 96, 59, Math.ceil(j));
				for (i = 0; i < imageDataDown.data.length; i += 4) {
					if (imageDataDown.data[i+0] == 0 && imageDataDown.data[i+1] == 255 && imageDataDown.data[i+2] == 0) {
						var success = doAction('exit');
						if (success !== 'failed') {
							break loopD;
						} else {
							continue loopD;
						}
					} else if (imageDataDown.data[i+0] == 255 && imageDataDown.data[i+1] == 255 && imageDataDown.data[i+2] == 0) {
						doAction('event');
						continue loopD;
					} else if (imageDataDown.data[i+3] == 255) {
						continue loopD;
					}
				}
				return j;
			}
		}
		if ((playerData.keys[68] === true || playerData.keys[39] === true) && dir === 'r') {//r
			loopR:
			for (j = 4.5; j > 0; j-=0.5) {
				var imageDataRight = ctx.getImageData(playerData.X +57, playerData.Y + 50, Math.ceil(j), 46);
				for (i = 0; i < imageDataRight.data.length; i += 4) {
					if (imageDataRight.data[i+0] == 0 && imageDataRight.data[i+1] == 255 && imageDataRight.data[i+2] == 0) {
						var success = doAction('exit');
						if (success !== 'failed') {
							break loopR;
						} else {
							continue loopR;
						}
					} else if (imageDataRight.data[i+0] == 255 && imageDataRight.data[i+1] == 255 && imageDataRight.data[i+2] == 0) {
						doAction('event');
						continue loopR;
					} else if (imageDataRight.data[i+3] == 255) {
						continue loopR;
					}
				}
				return j;
			}
		}
		if ((playerData.keys[65] === true || playerData.keys[37] === true) && dir === 'l') {//l
			loopL:
			for (j = -4.5; j < 0; j+=0.5) {
				var imageDataLeft = ctx.getImageData(playerData.X -2, playerData.Y + 50, Math.floor(j), 46);
				for (i = 0; i < imageDataLeft.data.length; i += 4) {
					if (imageDataLeft.data[i+0] == 0 && imageDataLeft.data[i+1] == 255 && imageDataLeft.data[i+2] == 0) {
						var success = doAction('exit');
						if (success !== 'failed') {
							break loopL;
						} else {
							continue loopL;
						}
					} else if (imageDataLeft.data[i+0] == 255 && imageDataLeft.data[i+1] == 255 && imageDataLeft.data[i+2] == 0) {
						doAction('event');
						continue loopL;
					} else if (imageDataLeft.data[i+3] == 255) {
						continue loopL;
					}
				}
				return j;
			}
		}
		return 0;
	};

	var testPixel = function() {
		var j,i;
		if (playerData.Dir === 'u') {//u
			for (j = -2; j < 0; j++) {
				var imageDataUp = ctx.getImageData(playerData.X -2, playerData.Y + 50, 59, j);
				for (i = 0; i < imageDataUp.data.length; i += 4) {
					if (imageDataUp.data[i+0] === 255 && imageDataUp.data[i+1] === 0 && imageDataUp.data[i+2] === 255) {
						doAction('interact');
						return;
					}
				}
			}
		} else if (playerData.Dir === 'd') {//d
			for (j = 2; j > 0; j--) {
				var imageDataDown = ctx.getImageData(playerData.X -2, playerData.Y + 96, 59, j);
				for (i = 0; i < imageDataDown.data.length; i += 4) {
					if (imageDataDown.data[i+0] === 255 && imageDataDown.data[i+1] === 0 && imageDataDown.data[i+2] === 255) {
						doAction('interact');
						return;
					}
				}
			}
		} else if (playerData.Dir === 'l') {//l
			for (j = -2; j < 0; j++) {
				var imageDataLeft = ctx.getImageData(playerData.X -2, playerData.Y + 50, j, 46);
				for (i = 0; i < imageDataLeft.data.length; i += 4) {
					if (imageDataLeft.data[i+0] === 255 && imageDataLeft.data[i+1] === 0 && imageDataLeft.data[i+2] === 255) {
						doAction('interact');
						return;
					}
				}
			}
		} else if (playerData.Dir === 'r') {//r
			for (j = 2; j > 0; j--) {
				var imageDataRight = ctx.getImageData(playerData.X +57, playerData.Y + 50, j, 46);
				for (i = 0; i < imageDataRight.data.length; i += 4) {
					if (imageDataRight.data[i+0] === 255 && imageDataRight.data[i+1] === 0 && imageDataRight.data[i+2] === 255) {
						doAction('interact');
						return;
					}
				}
			}
		}
	};

	var stopPlayer = function(press) {
		if (press.override !== false) {
			playerData.keys[press.keyCode] = false;
		}
		if (press.keyCode === 87 || press.keyCode === 38) {//u
			if (keys[0] === 'u' && keys[1] !== '') {
				keys[0] = keys[1];
				keys[1] = '';
			} else if (keys[1] === 'u') {
				keys[1] = '';
			} else if (keys[0] === 'u' && keys[1] === '') {
				keys[0] = '';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_u_0.png)';
				step = 0;
				stepCount = 10;
			}
		}
		if (press.keyCode === 83 || press.keyCode === 40) {//d
			if (keys[0] === 'd' && keys[1] !== '') {
				keys[0] = keys[1];
				keys[1] = '';
			} else if (keys[1] === 'd') {
				keys[1] = '';
			} else if (keys[0] === 'd' && keys[1] === '') {
				keys[0] = '';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_d_0.png)';
				step = 0;
				stepCount = 10;
			}
		}
		if (press.keyCode === 68 || press.keyCode === 39) {//r
			if (keys[0] === 'r' && keys[1] !== '') {
				keys[0] = keys[1];
				keys[1] = '';
			} else if (keys[1] === 'r') {
				keys[1] = '';
			} else if (keys[0] === 'r' && keys[1] === '') {
				keys[0] = '';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_r_0.png)';
				step = 0;
				stepCount = 10;
			}
		}
		if (press.keyCode === 65 || press.keyCode === 37) {//l
			if (keys[0] === 'l' && keys[1] !== '') {
				keys[0] = keys[1];
				keys[1] = '';
			} else if (keys[1] === 'l') {
				keys[1] = '';
			} else if (keys[0] === 'l' && keys[1] === '') {
				keys[0] = '';
				playerDiv.div.style.backgroundImage = 'url(img/player/Asriel/spr_asriel_l_0.png)';
				step = 0;
				stepCount = 10;
			}
		}
	};

	var doAction = function(Action) {
		var correct = 0;
		var iLength,jLength,toCorrect;
		number = {};
		if (Action === "exit") {
			room = roomExits;
		} else if (Action === "interact") {
			room = roomInteractions;
		} else if (Action === "event") {
			room = roomEvents;
		} else {
			return;
		}
		if (playerData.Dir === 'u') {
			iLength = playerDiv.div.offsetWidth;//55
			jLength = 0;
			toCorrect = 300;
		} else if (playerData.Dir === 'd') {
			iLength = playerDiv.div.offsetWidth;
			jLength = 0;
			toCorrect = 300;
		}  else if (playerData.Dir === 'l') {
			iLength = 0;
			jLength = 44;
			toCorrect = 245;
		}  else if (playerData.Dir === 'r') {
			iLength = 0;
			jLength = 44;
			toCorrect = 245;
		}

		for (var i = 0; i <= (iLength + 4); i++) {
			for (var j = 0; j <= (jLength + 4); j++) {
				if (playerData.Dir === 'u') {
					var checkX = playerData.X - 2 + i;
					var checkY = playerData.Y + 50 - j;
				} else if (playerData.Dir === 'd') {
					var checkX = playerData.X - 2 + i;
					var checkY = playerData.Y + playerDiv.div.offsetHeight + 2 + j;
				}  else if (playerData.Dir === 'l') {
					var checkX = playerData.X - 2 - i;
					var checkY = playerData.Y + 50 + j;
				}  else if (playerData.Dir === 'r') {
					var checkX = playerData.X + playerDiv.div.offsetWidth + 2 + i;
					var checkY = playerData.Y + 50 + j;
				}
				for (var k = 0; k < room.length; k++) {
					if ((checkX >= room[k].area.X && checkX <= (room[k].area.X + room[k].area.W)) && (checkY >= room[k].area.Y && checkY <= (room[k].area.Y + room[k].area.H))) {
						correct++;
						if (number[k] !== undefined) {
							number[k] += 1;
						} else {
							number[k] = 1;
						}
					}
				}
			}
		}
		var tmpArray = [];
		for (var name in number) {
			tmpArray.push(number[name]);
		}
		var max = Math.max(...tmpArray);
		for (var name in number) {
			if (number[name] == max) {
				doName = name;
			}
		}

		if ((correct/toCorrect) >= 0.5) {
			if (Action === "exit") {
				transRoom(doName);
			} else if (Action === "interact") {
				var check = checkDialogbox();
				if (check === false) {
					var args = (room[doName].args) ? room[doName].args : undefined;
					gameModule.callFunction(room[doName].event, args);
					checkDialogbox();
				}
			} else if (Action === "event") {
				var check = checkDialogbox();
				if (check === false) {
					var args = (room[doName].args) ? room[doName].args : undefined;
					gameModule.callFunction(room[doName].event, args);
					checkDialogbox();
				}
			}
				
		} else {
			return 'failed';
		}
	};

	var checkDialogbox = function() {
		var check = document.getElementById('dialogBox');
		if (check.open === true) {
			dialogbox = 'open';
			return true;
		} else if (check.open === false) {
			dialogbox = 'closed';
			return false;
		}
	};

	var positionPlayer = function(pos) {
		if (pos.X !== 'X') {
			playerDiv.div.style.left = '' + pos.X + 'px';
		} else {
			playerDiv.div.style.left = '' + playerDiv.X + 'px';
		}

		if (pos.Y !== 'Y') {
			playerDiv.div.style.top = '' + pos.Y + 'px';
		} else {
			playerDiv.div.style.top = '' + playerDiv.Y + 'px';
		}
	};
	//dev tools (changing walls,exits,interactables,events hitbox while in-game for easier change in adventure_walls.js)
	var selectNew = function(set) {
		var currentSelected = Number(document.getElementById('selected').innerHTML);
		var target = document.getElementById('target').innerHTML;
		var group = Number(document.getElementById('selected').getAttribute('data-group'));
		switch(target){
			case 'wall':
				if (currentSelected < 1 || currentSelected > roomWalls[group-1].length-1) {
					currentSelected = 1;
				}
				if (set === 'next') {
					if (currentSelected < roomWalls[group-1].length-1) {
						currentSelected += 1;
					} else if (currentSelected === roomWalls[group-1].length-1){
						if (roomWalls[group] !== undefined) {
							document.getElementById('selected').setAttribute('data-group', group+1);
							currentSelected = 1;
						} else {
							currentSelected = 1;
							document.getElementById('selected').setAttribute('data-group', '1');
						}
						
					}
				} else if (set === 'prev') {
					if (currentSelected > 1) {
						currentSelected -= 1;
					} else if (currentSelected === 1){
						if (roomWalls[group-2] !== undefined) {
							document.getElementById('selected').setAttribute('data-group', group-1);
							currentSelected = roomWalls[group-2].length-1;
						} else {
							for (var i = 0; i < 1; i++) {
								for (var j = 0; j > -1; j++) {
									if (roomWalls[group-1+j] === undefined) {
										break;
									}
								}
							}
							currentSelected = roomWalls[group-1+(j-1)].length-1;
							document.getElementById('selected').setAttribute('data-group', 1+(j-1));
						}
						
					}
				}
				break;
			case 'exit':
				if (currentSelected < 1 || currentSelected > roomExits.length) {
					currentSelected = 1;
				}
				if (set === 'next') {
					if (currentSelected < roomExits.length) {
						currentSelected += 1;
					} else {
						currentSelected = 1;
					}
				} else if (set === 'prev') {
					if (currentSelected === 1) {
						currentSelected = roomExits.length;
					} else {
						currentSelected -= 1;
					}
				}
				break;
			case 'interact':
				if (roomInteractions[0] === undefined) {
					return;
				}
				if (currentSelected < 1 || currentSelected > roomInteractions.length) {
					currentSelected = 1;
				}
				if (set === 'next') {
					if (currentSelected < roomInteractions.length) {
						currentSelected += 1;
					} else {
						currentSelected = 1;
					}
				} else if (set === 'prev') {
					if (currentSelected === 1) {
						currentSelected = roomInteractions.length;
					} else {
						currentSelected -= 1;
					}
				}
				break;
			case 'event':
				if (roomEvents[0] === undefined) {
					return;
				}
				if (currentSelected < 1 || currentSelected > roomEvents.length) {
					currentSelected = 1;
				}
				if (set === 'next') {
					if (currentSelected < roomEvents.length) {
						currentSelected += 1;
					} else {
						currentSelected = 1;
					}
				} else if (set === 'prev') {
					if (currentSelected === 1) {
						currentSelected = roomEvents.length;
					} else {
						currentSelected -= 1;
					}
				}
				break;
		}
		document.getElementById('selected').innerHTML = ''+currentSelected+'';
		document.getElementById('inputX').value = '';
		document.getElementById('inputY').value = '';
		document.getElementById('inputW').value = '';
		document.getElementById('inputH').value = '';
		inputPlaceholder();
	};

	var inputPlaceholder = function() {
		var section = [];
		var currentSelected = document.getElementById('selected').innerHTML;
		var group = Number(document.getElementById('selected').getAttribute('data-group'));
		if (document.getElementById('target').innerHTML === 'wall') {
			section.push(roomWalls[group-1][currentSelected-1]);
			section.push(roomWalls[group-1][currentSelected]);
			if (section[0].X === section[1].X) {
				document.getElementById('inputX').placeholder = 'X:'+section[0].X;
				document.getElementById('inputY').placeholder = '';
				document.getElementById('inputW').placeholder = '';
				document.getElementById('inputH').placeholder = '';
				document.getElementById('inputX').disabled = false;
				document.getElementById('inputY').disabled = true;
				document.getElementById('inputW').disabled = true;
				document.getElementById('inputH').disabled = true;
			} else if (section[0].Y === section[1].Y) {
				document.getElementById('inputX').placeholder = '';
				document.getElementById('inputY').placeholder = 'Y:'+section[0].Y;
				document.getElementById('inputW').placeholder = '';
				document.getElementById('inputH').placeholder = '';
				document.getElementById('inputX').disabled = true;
				document.getElementById('inputY').disabled = false;
				document.getElementById('inputW').disabled = true;
				document.getElementById('inputH').disabled = true;
			}
		} else if (document.getElementById('target').innerHTML === 'exit') {
			section.push(roomExits[currentSelected-1]);
			document.getElementById('inputX').placeholder = 'X:'+section[0].area.X;
			document.getElementById('inputY').placeholder = 'Y:'+section[0].area.Y;
			document.getElementById('inputW').placeholder = 'W:'+section[0].area.W;
			document.getElementById('inputH').placeholder = 'H:'+section[0].area.H;
		} else if (document.getElementById('target').innerHTML === 'interact') {
			if (roomInteractions[0] !== undefined) {
				section.push(roomInteractions[currentSelected-1]);
				document.getElementById('inputX').placeholder = 'X:'+section[0].area.X;
				document.getElementById('inputY').placeholder = 'Y:'+section[0].area.Y;
				document.getElementById('inputW').placeholder = 'W:'+section[0].area.W;
				document.getElementById('inputH').placeholder = 'H:'+section[0].area.H;
			} else {
				document.getElementById('inputX').disabled = true;
				document.getElementById('inputY').disabled = true;
				document.getElementById('inputW').disabled = true;
				document.getElementById('inputH').disabled = true;
				document.getElementById('inputX').placeholder = 'none available';
				document.getElementById('inputY').placeholder = 'none available';
				document.getElementById('inputW').placeholder = 'none available';
				document.getElementById('inputH').placeholder = 'none available';
			}
		} else if (document.getElementById('target').innerHTML === 'event') {
			if (roomEvents[0] !== undefined) {
				section.push(roomEvents[currentSelected-1]);
				document.getElementById('inputX').placeholder = 'X:'+section[0].area.X;
				document.getElementById('inputY').placeholder = 'Y:'+section[0].area.Y;
				document.getElementById('inputW').placeholder = 'W:'+section[0].area.W;
				document.getElementById('inputH').placeholder = 'H:'+section[0].area.H;
			} else {
				document.getElementById('inputX').disabled = true;
				document.getElementById('inputY').disabled = true;
				document.getElementById('inputW').disabled = true;
				document.getElementById('inputH').disabled = true;
				document.getElementById('inputX').placeholder = 'none available';
				document.getElementById('inputY').placeholder = 'none available';
				document.getElementById('inputW').placeholder = 'none available';
				document.getElementById('inputH').placeholder = 'none available';
			}
		}
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].disabled === true) {
				inputs[i].className = 'disabled';
			} else {
				inputs[i].className = '';
			}
		}
	};

	var changeValue = function() {
		var currentSelected = Number(document.getElementById('selected').innerHTML);
		var target = document.getElementById('target').innerHTML;
		var group = Number(document.getElementById('selected').getAttribute('data-group'));
		var value = [];
		value.push(document.getElementById('inputX').value);
		value.push(document.getElementById('inputY').value);
		value.push(document.getElementById('inputW').value);
		value.push(document.getElementById('inputH').value);
		if (!testValue(value)) {
			document.getElementById('inputX').value = '';
			document.getElementById('inputY').value = '';
			document.getElementById('inputW').value = '';
			document.getElementById('inputH').value = '';
			return;
		}
		for (var i = 0; i < value.length; i++) {
			if (value[i] !== ''){
				value[i] = Number(value[i]);
			} else {
				if (target === 'exit') {
					if (i === 0) {
						value[0] = roomExits[currentSelected-1].area.X;
					} else if (i === 1) {
						value[1] = roomExits[currentSelected-1].area.Y;
					} else if (i === 2) {
						value[2] = roomExits[currentSelected-1].area.W;
					} else if (i === 3) {
						value[3] = roomExits[currentSelected-1].area.H;
					}
				} else if (target === 'interact') {
					if (i === 0) {
						value[0] = roomInteractions[currentSelected-1].area.X;
					} else if (i === 1) {
						value[1] = roomInteractions[currentSelected-1].area.Y;
					} else if (i === 2) {
						value[2] = roomInteractions[currentSelected-1].area.W;
					} else if (i === 3) {
						value[3] = roomInteractions[currentSelected-1].area.H;
					}
				} else if (target === 'event') {
					if (i === 0) {
						value[0] = roomEvents[currentSelected-1].area.X;
					} else if (i === 1) {
						value[1] = roomEvents[currentSelected-1].area.Y;
					} else if (i === 2) {
						value[2] = roomEvents[currentSelected-1].area.W;
					} else if (i === 3) {
						value[3] = roomEvents[currentSelected-1].area.H;
					}
				}
			}
		}
		if (target === 'wall') {
			if (document.getElementById('inputX').disabled === false) {
				roomWalls[group-1][currentSelected-1].X = value[0];
				roomWalls[group-1][currentSelected].X = value[0];
			} else if (document.getElementById('inputY').disabled === false) {
				roomWalls[group-1][currentSelected-1].Y = value[1];
				roomWalls[group-1][currentSelected].Y = value[1];
			}
		} else if (target === 'exit') {
			roomExits[currentSelected-1].area.X = value[0];
			roomExits[currentSelected-1].area.Y = value[1];
			roomExits[currentSelected-1].area.W = value[2];
			roomExits[currentSelected-1].area.H = value[3];
		} else if (target === 'interact') {
			roomInteractions[currentSelected-1].area.X = value[0];
			roomInteractions[currentSelected-1].area.Y = value[1];
			roomInteractions[currentSelected-1].area.W = value[2];
			roomInteractions[currentSelected-1].area.H = value[3];
		} else if (target === 'event') {
			roomEvents[currentSelected-1].area.X = value[0];
			roomEvents[currentSelected-1].area.Y = value[1];
			roomEvents[currentSelected-1].area.W = value[2];
			roomEvents[currentSelected-1].area.H = value[3];
		}
		document.getElementById('inputX').value = '';
		document.getElementById('inputY').value = '';
		document.getElementById('inputW').value = '';
		document.getElementById('inputH').value = '';
	};

	var testValue = function(value) {
		for (var i = 0; i < value.length; i++) {
			if (value[i].search(/[a-z]/) !== -1) {
				return false;
			}
		}
		return true;
	};

	var changeTarget = function(skip = false) {
		if (skip === true) {
			inputPlaceholder();
			return;
		}
		var target = document.getElementById('target').innerHTML;
		switch(target){
			case 'wall':
				document.getElementById('target').innerHTML = 'exit';
				document.getElementById('inputX').disabled = false;
				document.getElementById('inputY').disabled = false;
				document.getElementById('inputW').disabled = false;
				document.getElementById('inputH').disabled = false;
				document.getElementById('selected').innerHTML = '1';
				break;
			case 'exit':
				document.getElementById('target').innerHTML = 'interact';
				document.getElementById('inputX').disabled = false;
				document.getElementById('inputY').disabled = false;
				document.getElementById('inputW').disabled = false;
				document.getElementById('inputH').disabled = false;
				document.getElementById('selected').innerHTML = '1';
				break;
			case 'interact':
				document.getElementById('target').innerHTML = 'event';
				document.getElementById('inputX').disabled = false;
				document.getElementById('inputY').disabled = false;
				document.getElementById('inputW').disabled = false;
				document.getElementById('inputH').disabled = false;
				document.getElementById('selected').innerHTML = '1';
				break;
			case 'event':
				document.getElementById('target').innerHTML = 'wall';
				document.getElementById('inputX').disabled = false;
				document.getElementById('inputY').disabled = false;
				document.getElementById('inputW').disabled = true;
				document.getElementById('inputH').disabled = true;
				document.getElementById('selected').innerHTML = '1';
				break;
			default:
				document.getElementById('target').innerHTML = 'wall';
				document.getElementById('inputX').disabled = false;
				document.getElementById('inputY').disabled = false;
				document.getElementById('inputW').disabled = true;
				document.getElementById('inputH').disabled = true;
				document.getElementById('selected').innerHTML = '1';
		}
		inputPlaceholder();
	};
	//end dev tools
	getRoom();
	gameinterval = setInterval(gameInterval, 20);

	return {
		selectNew:selectNew,
		changeValue:changeValue,
		changeTarget:changeTarget,
		drawRoom:drawRoom,
		getRoom:getRoom,
		movePlayer:movePlayer,
		stopPlayer:stopPlayer,
		findPos:findPos,
		hitboxPlayer:hitboxPlayer,
		changeControlMode:changeControlMode,
		checkDialogbox:checkDialogbox,
		transRoom:transRoom
	};
})();
//console.log();