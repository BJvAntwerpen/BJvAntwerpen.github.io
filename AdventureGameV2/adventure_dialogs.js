// location/action: { Talker:['(all talkers)'], Sprite:['(all sprites)'], Text:['(all text)'], Count: (amount of talkers. only greater than 1)}

var dialogs = {
	WIP:{
		Talker:['Asriel'],
		Sprite:['asriel9'],
		Text:['* I can\'t continue.<br>* The next area is still a work in progress and I don\'t know if the developer of this \'game\' is making any progress at all.']
	},
	toBasement: {
		Talker:['Toriel', 'Asriel'],
		Sprite:['torieltalkside', 'asriel9'],
		Text:['* Asriel, you know you aren\'t allowed to go down there.', '* Sorry mom.'],
		Count: 2,
		Side: 'bottom',
		Extra: ['glasses']
	},
	checkDoor: {
		Talker:['Asriel'],
		Sprite:['asriel1'],
		Text:['* The door is locked.']
	},
	unlockDoor: {
		Talker: ['blank'],
		Sprite: ['blank'],
		Text: ['* You use the key to unlock the door.'],
		Extra: ['leavehouse']
	},
	leaveHouse: {
		Talker: ['Asriel', 'Toriel', 'Asriel'],
		Sprite: ['asriel0', 'torieltalkside', 'asriel0'],
		Text: ['* I\'m going.<br>* Bye mom.', '* Be careful and don\'t be late for dinner.', '* Ok mom.'],
		Count: 3,
		Extra: ['glasses', 'homeEntrance']
	},
	toAsgoreRoom: {
		Talker:['Asriel'],
		Sprite:['asriel9'],
		Text:['* It says: \'Do not disturb!\'.']
	},
	getKey: {
		Talker:['blank', 'Asgore', 'Asriel', 'Asgore' , 'Asriel', 'Asgore', 'blank', 'Asriel', 'Asgore'],
		Sprite:['blank', 'asgore0', 'asriel2', 'asgore0', 'asriel2', 'asgore0', 'blank', 'asriel6', 'asgore0'],
		Text:['* You knock on the door.', '* Who\'s there?', '* It\'s me, dad.', '* Oh, hello Asriel.<br>* How are you today?',
			'* Can I have the key so I can unlock the front door?<br>* I want to go explore.', '* Of course, Asriel.<br>* I\'ll slide the key under the door for you.',
			'* You hear the key sliding across the floor.<br>* You bent over to pick it up.', '* Thanks dad.', '* No problem<br>* Just make sure you\'re not late for dinner.'],
		Count: 9,
		Extra: ['getKey']
	},
	gotKey: {
		Talker:['Asriel'],
		Sprite:['asriel9'],
		Text:['* I shouldn\'t disturb my father anymore.<br>* I already have the key.']
	},
	getPie: {
		Talker:['Asriel', 'Toriel', 'blank'],
		Sprite:['asriel9', 'torieltalkside', 'blank'],
		Text:['* Mom, can I have a slice of pie?', '* Of course, my child.', '* You got a slice of pie.'],
		Count: 3,
		Extra: ['glasses', 'actionGetPie']
	},
	takenPie: {
		Talker:['Asriel'],
		Sprite:['asriel4'],
		Text:['* No, i\'m not getting another slice of pie.<br>* I\'m only allowed to have one.']
	},
	homeFlame: {
		Talker:['Asriel'],
		Sprite:['asriel6'],
		Text:['* That\'s mom\'s fire magic.<br>* It\'s pleasantly warm.'],
		Side: 'bottom'
	},
	torielGlasses: {
		Talker:['Toriel', 'Asriel', 'Toriel', 'Asriel', 'Toriel', 'Asriel'],
		Sprite:['torieltalk', 'asriel2', 'torieltalk', 'asriel3', 'torieltalk', 'asriel1'],
		Text:['* Hello there, my child. How are you doing?', '* I\'m fine mom, but i\'m bored.<br>* Can I go exploring?' , '* Of course, my child.<br>* But your father has locked the front door and kept the key.' , '* But dad is in an important meeting.<br>* I can\'t disturb them.', '* If you want to go explore, you will have to.<br>* Besides, I\'m sure they will understand.', '* Alright mom, if you say so.'],
		Count: 6,
		Side: 'bottom',
		Extra: ['glasses', 'actionAskKey', 'actionTalkToriel']
	},
	torielAgain: {
		Talker:['Toriel'],
		Sprite:['torieltalk'],
		Text:['* You should talk to your father.'],
		Side: 'bottom',
		Extra: ['glasses']
	},
	inspectTree: {
		Talker: ['Asriel'],
		Sprite: ['asriel9'],
		Text: ['* For some reason has this tree no leaves.<br>* Mom says that every time the tree grows any leaves, they fall right off.']
	},
	view: {
		Talker: ['Asriel'],
		Sprite: ['asriel0'],
		Text: ['* Wow.<br>* The view is amazing.']
	},
	toyKnife: {
		Talker: ['Asriel'],
		Sprite: ['asriel9'],
		Text: ['* Huh?<br>* A toy knife. How did that got here?<br>* Might as well take it.'],
		Extra: ['toyKnife']
	},
	cactus: {
		Talker: ['Asriel'],
		Sprite: ['asriel5'],
		Text: ['* It\'s a fake cactus. <br>* It even smells like pie']
	}
};