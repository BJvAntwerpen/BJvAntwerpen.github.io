var dialogModule = (function() {
	var dialogBox = {
		box: document.getElementsByClassName('dialogBox')[1],
		img: document.getElementsByClassName('textFace')[1],
		text: document.getElementsByClassName('dialogText')[1],
		torielGlasses: document.getElementsByClassName('torielGlasses')[1],
		talker: '',
		usingDialog: false
	};
	var saveDialog = {};
	var tmpValues = {
		Interval: 0,
		Txt: ''
	};
	var timeout;
	var Side = '';
	var image = 0;
	var Counted = 0;
	var bonus = [];

	var dialogBoxDisplay = function() {
		if (tmpValues.Interval == 0) {
			dialogBox.text.innerHTML = '';
			clearTimeout(timeout);
			if (saveDialog.Count > 1 && Counted < (saveDialog.Count - 1)) {
				Counted++;
				startDialogBox(saveDialog);
			} else {
				showDialogBox('close');
				saveDialog.Count = 0;
				Counted = 0;
				afterDialog();
			}
		}
	};

	var dialogBoxSkip = function() {
		if (tmpValues.Interval != 0) {
			clearInterval(tmpValues.Interval);
			dialogBox.text.innerHTML = tmpValues.Txt
			tmpValues.Interval = 0;
			tmpValues.Txt = '';
		}
	};

	var animateTalking = function() {
		if (saveDialog.Talker[Counted] != 'blank') {
			if (tmpValues.Interval != 0) {
				if (image == 0) {
					if ((document.getElementById('torielReading').style.display) === "inline" && saveDialog.Talker[Counted] === 'Toriel') {
						document.getElementById('torielReading').style.backgroundImage = "url(img/animate/spr_chairiel_"+image+".png)";
					}
					dialogBox.img.style.backgroundImage = 'url(img/textFace/' + dialogBox.talker + '/spr_face_' + saveDialog.Sprite[Counted] + '_' + image + '.png)';
					image = 1;
				} else if (image == 1) {
					if ((document.getElementById('torielReading').style.display) === "inline" && saveDialog.Talker[Counted] === 'Toriel') {
						document.getElementById('torielReading').style.backgroundImage = "url(img/animate/spr_chairiel_"+image+".png)";
					}
					dialogBox.img.style.backgroundImage = 'url(img/textFace/' + dialogBox.talker + '/spr_face_' + saveDialog.Sprite[Counted] + '_' + image + '.png)';
					image = 0;
				}
				setTimeout(animateTalking, 200);
			} else if (tmpValues.Interval == 0 && dialogBox.box.open) {
				if (dialogBox.talker == 'Toriel') {
					var spr = saveDialog.Sprite[Counted];
					document.getElementById('torielReading').style.backgroundImage = "url(img/animate/spr_chairiel_0.png)";
					switch(spr) {
						case 'torieltalkside':
							var blink = 'blinkside'
							break;
						case 'torieltalk':
							var blink = 'blink'
							break;
					}
					switch(image) {
						case 0:
							dialogBox.img.style.backgroundImage = 'url(img/textFace/Toriel/spr_face_toriel' + blink + '_' + image + '.png)';
							image = 1;
							timeout = setTimeout(animateTalking, 3000);
							break;
						case 1:
							dialogBox.img.style.backgroundImage = 'url(img/textFace/Toriel/spr_face_toriel' + blink + '_' + image + '.png)';
							image = 2;
							timeout = setTimeout(animateTalking, 150);
							break;
						case 2:
							dialogBox.img.style.backgroundImage = 'url(img/textFace/Toriel/spr_face_toriel' + blink + '_' + image + '.png)';
							image = 0;
							timeout = setTimeout(animateTalking, 150);
							break;
					}
				} else {
					image = 0;
					dialogBox.img.style.backgroundImage = 'url(img/textFace/' + dialogBox.talker + '/spr_face_' + saveDialog.Sprite[Counted] + '_' + image + '.png)';
				}
			}
		} else if (saveDialog.Talker[Counted] == 'blank') {
			dialogBox.img.style.backgroundImage = '';
		}
	};
	
	var startDialogBox = function(currentDialog) {
		movementModule.changeControlMode('none');
		saveDialog = {};
		saveDialog.Talker = (currentDialog.Talker != undefined) ? currentDialog.Talker : 'Asriel';
		saveDialog.Sprite = (currentDialog.Sprite != undefined) ? currentDialog.Sprite : 'asriel_9';
		saveDialog.Text = (currentDialog.Text != undefined) ? currentDialog.Text : '* Next time, please insert some text.';
		saveDialog.Count = (currentDialog.Count != undefined) ? currentDialog.Count : 1;
		saveDialog.Side = (currentDialog.Side != undefined) ? currentDialog.Side : 'top';
		saveDialog.Extra = (currentDialog.Extra != undefined) ? currentDialog.Extra : [];
		var resText = saveDialog.Text[Counted].split('<br>');
		dialogBox.talker = saveDialog.Talker[Counted];
		setDialogBox(saveDialog.Side);
		showDialogBox('open');
		var i = 0;
		var j = 0;
		var interval = setInterval(function() {
			dialogBox.text.innerHTML += resText[i].charAt(j);
			j++
			if (j > resText[i].length && (i+1 >= resText.length)) {
				clearInterval(interval);
				tmpValues.Interval = 0;
				tmpValues.Txt = '';
			} else if (j > resText[i].length && (i+1 < resText.length)){
				i++;
				j = 0;
				dialogBox.text.innerHTML += '<br>';
			}
		}, 70);
		tmpValues.Interval = interval;
		tmpValues.Txt = currentDialog.Text[Counted];
		if (saveDialog.Talker[Counted] == "Toriel") {
			dialogBox.img.style.backgroundSize = "130px 100px";
		} else {
			dialogBox.img.style.backgroundSize = "100px 100px";
		}
		extraToDialog();
		animateTalking();
	};

	var extraToDialog = function() {
		var extraEvent = saveDialog.Extra;
		console.log(extraEvent);
		for (var i = 0; i < extraEvent.length; i++) {
			switch(extraEvent[i]) {
				case 'glasses':
					if (saveDialog.Talker[Counted] == "Toriel") {
						dialogBox.torielGlasses.style.display = "inline";
					} else {
						dialogBox.torielGlasses.style.display = "none";
					}
					break;
				case 'actionAskKey':
					saveDialog.Extra.splice(i,1);
					bonus.push('asgoreAskKey');
					break;
				case 'actionTalkToriel':
					saveDialog.Extra.splice(i,1);
					bonus.push('askToriel')
					break;
				case 'getKey':
					saveDialog.Extra.splice(i,1);
					bonus.push('asgoreGetKey');
					break;
				case 'actionGetPie':
					saveDialog.Extra.splice(i,1);
					bonus.push('getPie');
					break;
				case 'leavehouse':
					saveDialog.Extra.splice(i,1);
					bonus.push('leavehouse');
					break;
				case 'homeEntrance':
					saveDialog.Extra.splice(i,1);
					bonus.push('homeEntrance');
					break;
				case 'toyKnife':
					saveDialog.Extra.splice(i,1);
					bonus.push('toyKnife');
					break;
				default:
					dialogBox.torielGlasses.style.display = "none";
			}
		}
	};

	var setDialogBox = function(side) {
		switch(side) {
			case 'top':
				dialogBox.box.style.top = '1%';
				break;
			case 'bottom':
				dialogBox.box.style.top = '70%';
				break;
		}
	};

	var showDialogBox = function(state) {
		if (state == 'open') {
			if (dialogBox.usingDialog) {
				dialogBox.box.show();
			} else {
				dialogBox.box.style.display = 'inline-block';
			}
		} else if (state == 'close') {
			if (dialogBox.usingDialog) {
				dialogBox.box.close();
			} else {
				dialogBox.box.style.display = 'none';
			}
		}
	};

	var afterDialog = function() {
		gameModule.activateEvents(bonus);
		bonus = [];
		dialogBox.torielGlasses.style.display = "none";
		movementModule.changeControlMode('walking');
	};

	return {
		startDialogBox: startDialogBox,
		dialogBoxDisplay: dialogBoxDisplay,
		setDialogBox: setDialogBox,
		dialogBoxSkip: dialogBoxSkip
	};
})();
//console.log