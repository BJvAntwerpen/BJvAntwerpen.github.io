var gameplayModule = (function() {
	var hallway = 1;
	var flameInterval,transInterval;
	var alpha = 0;

	var transition = function(time, half) {
		var timer = time*1000/4/20;
		transInterval = setInterval(function(){
			if (half === 'out') {//to black
				alpha += 0.05
			} else if (half === 'in') {//from black
				alpha -= 0.05
			}
			alpha = alpha.toFixed(2);
			alpha = Number(alpha);
			document.getElementById('trans').setAttribute('data-alpha',alpha);
			document.getElementById('trans').style.backgroundColor = 'rgba(0,0,0,'+alpha+')';	
		
			if (alpha <= 0 && half == 'in') {
				clearInterval(transInterval);
			} else if (alpha >= 1 && half == 'out') {
				clearInterval(transInterval);
			}		
		},timer);
	};

	var continueFromSave = function() {
		console.log('WIP');//load game from cookie 'save'
		//var cookie = decodeURIComponent(document.cookie);
		
		for (var name in gameWalls) {
			var storage = localStorage.getItem(name);
			//console.log('name');
			//console.log(name);MyBedroom
			//console.log('gameWalls[name]');
			//console.log(gameWalls[name]);content of 'MyBedroom'
			console.log(storage);
		}
		//cookie = JSON.parse(storage);
		
		/*
		decodeURIcomponent -> JSON.parse
		*/
	};

	var start = function() {
		document.getElementById('bg').style.backgroundImage = "url(img/Locations/AzzyBedroom.png)";
		document.getElementById('location').setAttribute('data-location', 'My bedroom');
		document.getElementById('locate').innerHTML = 'My bedroom';
		document.getElementById('inventory').style.display = 'table';
		document.getElementById('location').style.display = 'inline';
		document.getElementById('locate').style.display = 'inline';
		document.getElementById('menu').style.display = 'inline';
		document.getElementById('canvas').style.display = 'inline';
		document.getElementById('player').style.display = 'inline';
		document.getElementById('startNew').style.display = 'none';
		document.getElementById('continue').style.display = 'none';
		document.getElementById('autoSaveCheckbox').style.display = 'none';
		document.getElementById('autoSave').style.display = 'none';
		gameModule.saveGame();
		audioModule.startAudio('Home', '.mp3', true);
		audioModule.audioDefault();
		movementModule.changeControlMode('walking');
		movementModule.getRoom();
	};

	var toHallway = function() {
		switch(hallway){
			case 1:
				document.getElementById('bg').style.backgroundImage = "url('img/Locations/hallway1.png')";
				document.getElementById('location').setAttribute('data-location', 'Hallway 1');
				document.getElementById('locate').innerHTML = 'Hallway';
				document.getElementById('misc').style.display = "none";
				audioModule.checkAudio('Home', '.mp3', true);
				break;
			case 2:
				document.getElementById('bg').style.backgroundImage = "url('img/Locations/hallway2.png')";
				document.getElementById('location').setAttribute('data-location', 'Hallway 2');
				document.getElementById('locate').innerHTML = 'Hallway';
				document.getElementById('cactus').style.display = 'none';
				break;
			case 3:
				document.getElementById('bg').style.backgroundImage = "url('img/Locations/hallway3.png')";
				document.getElementById('location').setAttribute('data-location', 'Hallway 3');
				document.getElementById('locate').innerHTML = 'Hallway';
				break;
		}
	};

	var changeHallwaySection = function(direction) {
		switch(direction) {
			case 'next':
				if (hallway < 3) {
					hallway++;
				}
				break;
			case 'prev':
				if (hallway > 1) {
					hallway--;
				}
				break;
		}
		toHallway();
	};

	var toRoom = function(room) {
		switch(room) {
			case 'Asriel':
				document.getElementById('bg').style.backgroundImage = "url('img/Locations/AzzyBedroom.png')";
				document.getElementById('location').setAttribute('data-location', 'My bedroom');
				document.getElementById('locate').innerHTML = 'My bedroom';
				break;
			case 'Toriel':
				document.getElementById('bg').style.backgroundImage = "url('img/Locations/ToriBedroom.png')";
				document.getElementById('location').setAttribute('data-location', 'Mom\'s bedroom');
				document.getElementById('locate').innerHTML = 'Mom\'s bedroom';
				document.getElementById('cactus').style.display = 'inline';
				break;
		}
	};

	var toStairway = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/stairway.png')";
		document.getElementById('location').setAttribute('data-location', 'Stairway');
		document.getElementById('locate').innerHTML = 'Stairway';
		document.getElementById('misc').style.display = "inline";
		document.getElementById('misc').style.backgroundImage = 'url(img/misc/spr_railingpieceshort.png)';
		document.getElementById('misc').style.width = '18px';
		document.getElementById('misc').style.height = '138px';
		document.getElementById('misc').style.top = '34.5%';
		document.getElementById('misc').style.left = '62.9%';
		clearInterval(flameInterval);	
		document.getElementById('homeFlame').style.display = 'none';
		document.getElementById('torielReading').style.display = 'none';
		document.getElementById('table').style.display = 'none';
		document.getElementById('leftchair').style.display = 'none';
		document.getElementById('topchair').style.display = 'none';
		document.getElementById('rightchair').style.display = 'none';
	};

	var toLivingRoom = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/livingRoom.png')";
		document.getElementById('location').setAttribute('data-location', 'livingRoom');
		document.getElementById('locate').innerHTML = 'Livingroom';
		document.getElementById('pie').style.display = 'none';
		document.getElementById('misc').style.display = "none";
		document.getElementById('homeFlame').style.backgroundImage = "url('img/animate/spr_homeflame_0.png')";
		flameInterval = setInterval(gameModule.changeFlame,140);
		document.getElementById('homeFlame').style.display = 'inline';
		document.getElementById('torielReading').style.display = 'inline';
		document.getElementById('table').style.display = 'inline';
		document.getElementById('leftchair').style.display = 'inline';
		document.getElementById('topchair').style.display = 'inline';
		document.getElementById('rightchair').style.display = 'inline';
	};

	var toKitchen = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/kitchen.png')";
		document.getElementById('location').setAttribute('data-location', 'Kitchen');
		document.getElementById('locate').innerHTML = 'Kitchen';
		document.getElementById('pie').style.display = 'inline';
		clearInterval(flameInterval);
		document.getElementById('homeFlame').style.display = 'none';
		document.getElementById('torielReading').style.display = 'none';
		document.getElementById('table').style.display = 'none';
		document.getElementById('leftchair').style.display = 'none';
		document.getElementById('topchair').style.display = 'none';
		document.getElementById('rightchair').style.display = 'none';
	};

	var homeEntrance = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/homeEntrance.png')";
		document.getElementById('location').setAttribute('data-location', 'Home_entrance');
		document.getElementById('locate').innerHTML = 'Home entrance';
		document.getElementById('misc').style.display = "none";
		document.getElementById('tree').style.display = 'none';
		audioModule.checkAudio('Ruins', '.ogg', true);
	};

	var enterHouse = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/stairway.png')";
		document.getElementById('location').setAttribute('data-location', 'Stairway');
		document.getElementById('locate').innerHTML = 'Stairway';
		audioModule.checkAudio('Home', '.mp3', true);
	};

	var toTree = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/ruinsTree.png')";
		document.getElementById('location').setAttribute('data-location', 'Tree');
		document.getElementById('locate').innerHTML = 'Tree';
		document.getElementById('tree').style.display = 'inline';
		document.getElementById('misc').style.display = "inline";
		document.getElementById('misc').style.backgroundImage = 'url(img/misc/spr_nastytreebottom.png)';
		document.getElementById('misc').style.width = '240px';
		document.getElementById('misc').style.height = '120px';
		document.getElementById('misc').style.top = '36.4%';
		document.getElementById('misc').style.left = '42.4%';
		document.getElementById('misc').style.zIndex = '200';
	};

	var toIntersection = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/ruinsIntersection.png')";
		document.getElementById('location').setAttribute('data-location', 'Intersection');
		document.getElementById('locate').innerHTML = 'Intersection';
		document.getElementById('tree').style.display = 'none';
		document.getElementById('misc').style.display = "none";
	};

	var toSideRoom = function() {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/ruinsRoom.png')";
		document.getElementById('location').setAttribute('data-location', 'sideRoom');
		document.getElementById('locate').innerHTML = 'Side room';
		document.getElementById('item').style.display = 'none';
	};

	var toRuinsView = function(item) {
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/ruinsView.png')";
		document.getElementById('location').setAttribute('data-location', 'ruinsView');
		document.getElementById('locate').innerHTML = 'Ruins view';
		if (item === false) {
			setItem();
			document.getElementById('item').style.display = 'inline';
		}
	};

	var toRuinsPuzzle = function(){
		document.getElementById('bg').style.backgroundImage = "url('img/Locations/ruinsPuzzle01test.png')";
		document.getElementById('location').setAttribute('data-location', 'ruinsPuzzle');
		document.getElementById('locate').innerHTML = 'Ruins puzzle 01';
	};

	var leaveHouse = function(unlocked) {
		if (unlocked === false) {
			var tds = document.getElementsByTagName('td');
			for (var i = 0; i < tds.length; i++) {
				var tdClassName = tds[i].className;
				tdClassName = tdClassName.split(' ');
				if (tdClassName[0] === 'active' && tdClassName[1] === 'key' && tds[i].getAttribute('data-item') == 'key') {
					dialogModule.startDialogBox(dialogs.unlockDoor);
					return;
				}
			}
			dialogModule.startDialogBox(dialogs.checkDoor);
		} else {
			homeEntrance();
		}
	};

	var activeItem = function(cell, cellstate = 'inactive') {
		if (cellstate == 'inactive') {
			cell.className = 'active';
		}
	};

	var getItem = function(item) {
		/*var td = document.querySelectorAll('td');
		for (var i = 0; i < td.length; i++) {
			var collectItem = td[i].getAttribute('data-item');
			if (collectItem == item) {
				if (item == 'pie') {
					return;
				}
			}
		}*/
		// use if you can collect more than 1 time but only have 1 in inventory
		addItem(item);
	};

	var setItem = function() {
		var locate = document.getElementById('location').getAttribute('data-location');
		switch(locate) {
			case 'ruinsView':
				document.getElementById('item').style.backgroundImage = 'url(img/items/spr_toyknife.png)';
				document.getElementById('item').style.zIndex = '150';
				break;
		}
	};

	var removeItem = function(item) {
		var td = document.getElementsByTagName('td');
		for (var i = 0; i < td.length; i++) {
			var collectItem = td[i].getAttribute('data-item');
			if (collectItem == item) {
				td[i].setAttribute('data-item', 'no_item');
				td[i].className = 'inactive';
			}
		}
	};

	var addItem = function(item) {
		var td = document.querySelectorAll('td');
		for (var i = 0; i < td.length; i++) {
			var collectItem = td[i].getAttribute('data-item');
			if (collectItem == 'no_item') {
				td[i].setAttribute('data-item', item);
				switch(item) {
					case 'pie':
						td[i].className += ' pieslice';
						document.getElementById('pie').style.backgroundImage = 'url(img/misc/spr_bigpie_1.png)';
						break;
					case 'key':
						td[i].className += ' key';
						break;
					case 'toyKnife':
						td[i].className += ' toyknife';
						break;
				}
				break;
			}
		}		
	};

	return {
		transition:transition,
		start: start,
		continueFromSave:continueFromSave,
		toHallway: toHallway,
		changeHallwaySection: changeHallwaySection,
		toRoom: toRoom,
		toStairway: toStairway,
		toLivingRoom: toLivingRoom,
		toKitchen: toKitchen,
		leaveHouse: leaveHouse,
		homeEntrance: homeEntrance,
		enterHouse: enterHouse,
		toTree: toTree,
		toIntersection: toIntersection,
		toSideRoom: toSideRoom,
		toRuinsView: toRuinsView,
		toRuinsPuzzle: toRuinsPuzzle,
		getItem: getItem,
		activeItem: activeItem,
		removeItem: removeItem
	};
})();
//console.log