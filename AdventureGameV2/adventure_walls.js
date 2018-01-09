//location: { 
	//walls:[[{X,Y}//start//,repeat],repeat if needed],  define the walls (stop walking event)
		//X: X position of a corner; Y: Yposition of a corner;
	//exits:[{area:{X,Y,W,H},event:'event',args:[if needed],pos:{X,Y}}],  define the exits (change room event)
		//area: position and size; event: what function to trigger (f.e. gameplayModule.start); pos: position to set player to;
	//interactions:[{area:{X,Y,W,H},event:'action', args:[if needed]}],  define the interactables ('Z' key)
		//area: position and size; event: what function to trigger (f.e. dialogModule.startDialogBox); args: arguments needed with the function
	//event:[{area:{X,Y,W,H},event:'action',args[if needed]}] }  define the events (triggers when walked into)
		//see "interactions"

var gameWalls = {
	MyBedroom: {
		walls:[//rgba(0,0,0,1)
			[
				{X:707,Y:734},//start
				{X:707,Y:663},
				{X:93,Y:663},
				{X:93,Y:272},
				{X:178,Y:272},
				{X:178,Y:216},
				{X:260,Y:216},
				{X:260,Y:238},
				{X:350,Y:238},
				{X:350,Y:268},
				{X:566,Y:268},
				{X:566,Y:290},
				{X:743,Y:290},
				{X:743,Y:420},
				{X:834,Y:420},
				{X:834,Y:483},
				{X:958,Y:483},
				{X:958,Y:663},
				{X:900,Y:663},
				{X:900,Y:734}
			]
		],
		exits:[//rgba(0,255,0,1)
			{
				area:{X:707,Y:722,W:191,H:10},
				event:'gameplayModule.toHallway',
				pos: {X:748,Y:305}
			}
		],
		interactions:[//rgba(255,0,255,1)
			{
				area:{X:259,Y:217,W:90,H:24},
				event:'audioModule.checkAudio',
				args:["Memory", ".mp3", false]
			}
		]
	},
	Hallway1: {
		walls:[
				[
					{X:0,Y:352},//start
					{X:698,Y:352},
					{X:698,Y:390},
					{X:814,Y:390},
					{X:814,Y:352},
					{X:1055,Y:352},
					{X:1055,Y:634},
					{X:0,Y:634}
				]
		],
		exits:[
			{
				area:{X:490,Y:340,W:88,H:14},
				event: 'gameplayModule.toRoom',
				args: ['Asriel'],
				pos: {X:1015,Y:612}
			},
			{
				area:{X:0,Y:353,W:10,H:280},
				event: 'gameplayModule.toStairway',
				pos: {X:1210,Y:465}
			},
			{
				area:{X:1040,Y:353,W:10,H:280},
				event: 'gameplayModule.changeHallwaySection',
				args: ['next'],
				pos: {X:256,Y:'Y'}//410
			}
		]
	},
	Hallway2: {
		walls:[
				[
					{X:0,Y:352},//start
					{X:84,Y:352},
					{X:84,Y:390},
					{X:196,Y:390},
					{X:196,Y:352},
					{X:452,Y:352},
					{X:452,Y:390},
					{X:526,Y:390},
					{X:526,Y:352},
					{X:1056,Y:352},
					{X:1056,Y:634},
					{X:0,Y:634}
				]
		],
		exits:[
			{
				area:{X:560,Y:340,W:88,H:14},
				event: 'gameplayModule.toRoom',
				args: ['Toriel'],
				pos: {X:600,Y:612}
			},
			{
				area:{X:0,Y:353,W:10,H:280},
				event: 'gameplayModule.changeHallwaySection',
				args: ['prev'],
				pos: {X:1212,Y:'Y'}//410
			},
			{
				area:{X:1040,Y:353,W:10,H:280},
				event: 'gameplayModule.changeHallwaySection',
				args: ['next'],
				pos: {X:256,Y:'Y'}//410
			}
		]
	},
	Hallway3: {
		walls:[
				[
					{X:0,Y:352},//start
					{X:310,Y:352},
					{X:310,Y:375},
					{X:390,Y:375},
					{X:390,Y:352},
					{X:936,Y:352},
					{X:936,Y:390},
					{X:980,Y:390},
					{X:980,Y:634},
					{X:0,Y:634}
				]
		],
		exits:[
			{
				area:{X:0,Y:353,W:10,H:280},
				event: 'gameplayModule.changeHallwaySection',
				args: ['prev'],
				pos: {X:1212,Y:'Y'}//410
			}
		],
		interactions:[
			{
				area:{X:424,Y:350,W:100,H:4},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.toAsgoreRoom
				]
			}
		]
	},
	TorielBedroom: {
		walls:[
				[
					{X:300,Y:734},
					{X:300,Y:680},
					{X:244,Y:680},
					{X:244,Y:610},
					{X:262,Y:610},
					{X:262,Y:532},
					{X:358,Y:532},
					{X:358,Y:400},
					{X:350,Y:400},
					{X:350,Y:265},
					{X:710,Y:265},
					{X:710,Y:250},
					{X:968,Y:250},
					{X:968,Y:620},
					{X:834,Y:620},
					{X:834,Y:680},
					{X:480,Y:680},
					{X:480,Y:734}
				]
		],
		exits:[
			{
				area:{X:300,Y:725,W:180,H:10},
				event: 'gameplayModule.toHallway',
				pos: {X:813,Y:305}
			}
		],
		interactions:[
			{
				area:{X:832,Y:618,W:136,H:64},
				event: 'dialogModule.startDialogBox',
				args: [dialogs.cactus]
			}
		]
	},
	Stairway: {
		walls:[
				[
					{X:0,Y:450},
					{X:123,Y:450},
					{X:123,Y:235},
					{X:227,Y:235},
					{X:227,Y:425},
					{X:738,Y:425},
					{X:738,Y:285},
					{X:668,Y:285},
					{X:668,Y:180},
					{X:800,Y:180},
					{X:800,Y:210},
					{X:930,Y:210},
					{X:930,Y:446},
					{X:1055,Y:446},
					{X:1055,Y:634},
					{X:930,Y:634},
					{X:930,Y:670},
					{X:585,Y:670},
					{X:585,Y:735},
					{X:460,Y:735},
					{X:460,Y:670},
					{X:123,Y:670},
					{X:123,Y:634},
					{X:0,Y:634}
				]
		],
		exits:[
			{
				area:{X:0,Y:450,W:10,H:180},
				event:'gameplayModule.toLivingRoom',
				pos:{X:1210,Y:460}
			},
			{
				area:{X:1040,Y:445,W:10,H:190},
				event:'gameplayModule.toHallway',
				pos: {X:256,Y:410}
			}
		],
		events:[
			{
				area:{X:460,Y:725,W:125,H:10},
				event:'gameplayModule.leaveHouse',
				args: [false]
			},
			{
				area:{X:670,Y:180,W:20,H:104},
				event:'dialogModule.startDialogBox',
				args: [
					dialogs.toBasement
				]
			}
		]
	},
	livingRoom: {
		walls:[
			[//walls
				{X:153,Y:0},
				{X:153,Y:182},
				{X:64,Y:182},
				{X:64,Y:670},
				{X:987,Y:670},
				{X:987,Y:626},
				{X:1054,Y:626},
				{X:1054,Y:442},
				{X:987,Y:442},
				{X:987,Y:220},
				{X:669,Y:220},
				{X:669,Y:235},
				{X:435,Y:235},
				{X:435,Y:183},
				{X:285,Y:183},
				{X:285,Y:0}
			],
			[//table
				{X:225,Y:592},
				{X:510,Y:592},
				{X:510,Y:545},
				{X:567,Y:545},
				{X:567,Y:485},
				{X:510,Y:485},
				{X:510,Y:460},
				{X:406,Y:460},
				{X:406,Y:415},
				{X:327,Y:415},
				{X:327,Y:460},
				{X:225,Y:460},
				{X:225,Y:492},
				{X:169,Y:492},
				{X:169,Y:537},
				{X:225,Y:537},
				{X:225,Y:592}
			]
		],
		exits:[
			{
				area: {X:152,Y:32,W:132,H:10},
				event: 'gameplayModule.toKitchen',
				pos: {X:565,Y:615}
			},
			{
				area: {X:1040,Y:443,W:10,H:183},
				event: 'gameplayModule.toStairway',
				pos: {X:266,Y:465}
			}
		],
		interactions:[
			{
				area: {X:355,Y:153,W:160,H:161},
				event: 'dialogModule.startDialogBox',//
				args: [
					dialogs.torielGlasses
				]
			},
			{
				area: {X:515,Y:172,W:75,H:65},
				event: "dialogModule.startDialogBox",
				args: [
					dialogs.homeFlame
				]
			}
		]
	},
	Kitchen: {
		walls:[
				[
					{X:250,Y:734},
					{X:250,Y:639},
					{X:106,Y:639},
					{X:106,Y:360},
					{X:953,Y:360},
					{X:953,Y:639},
					{X:464,Y:639},
					{X:464,Y:734}
				]
		],
		exits:[
			{
				area:{X:250,Y:724,W:214,H:10},
				event: 'gameplayModule.toLivingRoom',
				pos: {X:430,Y:5}
			}
		],
		interactions:[
			{
				area:{X:643,Y:351,W:119,H:10},
				event: 'dialogModule.startDialogBox',
				args: [
					dialogs.getPie
				]
			}
		]
	},
	homeEntrance: {
		walls:[
			[
				{X:63,Y:734},
				{X:63,Y:182},
				{X:137,Y:182},
				{X:137,Y:303},
				{X:915,Y:303},
				{X:915,Y:182},
				{X:989,Y:182},
				{X:989,Y:734}
			]
		],
		exits:[
			{
				area:{X:472,Y:295,W:110,H:10},
				event: 'gameplayModule.enterHouse',
				pos: {X:735,Y:610}
			},
			{
				area:{X:62,Y:717,W:928,H:15},
				event: 'gameplayModule.toTree',
				pos: {X:'X',Y:0}
			}
		]
	},
	Tree: {
		walls:[
			[
				{X:63,Y:0},
				{X:63,Y:493},
				{X:129,Y:493},
				{X:129,Y:554},
				{X:194,Y:554},
				{X:194,Y:615},
				{X:456,Y:615},
				{X:456,Y:734},
				{X:596,Y:734},
				{X:596,Y:615},
				{X:857,Y:615},
				{X:857,Y:554},
				{X:922,Y:554},
				{X:922,Y:493},
				{X:989,Y:493},
				{X:989,Y:0}
			]
		],
		exits:[
			{
				area:{X:64,Y:40,W:924,H:10},
				event: 'gameplayModule.homeEntrance',
				pos: {X:'X',Y:600}
			},
			{
				area:{X:456,Y:724,W:140,H:10},
				event: 'gameplayModule.toIntersection',
				pos: {X:735,Y:0}
			}
		],
		interactions:[
			{
				area:{X:440,Y:265,W:165,H:90},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.inspectTree
				]
			}
		]
	},
	Intersection: {
		walls:[
			[
				{X:326,Y:0},
				{X:326,Y:370},
				{X:0,Y:370},
				{X:0,Y:621},
				{X:1050,Y:621},
				{X:1050,Y:370},
				{X:726,Y:370},
				{X:726,Y:0}
			]
		],
		exits:[
			{
				area:{X:326,Y:40,W:398,H:10},
				event:'gameplayModule.toTree',
				pos:{X:740,Y:624}
			},
			{
				area:{X:1040,Y:371,W:10,H:250},
				event:'gameplayModule.toSideRoom',
				pos:{X:280,Y:485}
			},
			{
				area:{X:0,Y:371,W:10,H:250},
				event:'gameplayModule.toRuinsPuzzle',
				pos:{X:1223,Y:425}
			}
		]
	},
	sideRoom: {
		walls:[
			[
				{X:22,Y:476},
				{X:203,Y:476},
				{X:203,Y:324},
				{X:940,Y:324},
				{X:940,Y:641},
				{X:22,Y:641}
			]
		],
		exits:[
			{
				area:{X:24,Y:478,W:10,H:165},
				event:'gameplayModule.toIntersection',
				pos:{X:1220,Y:425}
			},
			{
				area:{X:683,Y:316,W:142,H:10},
				event:'gameplayModule.toRuinsView',
				pos:{X:740,Y:625},
				args:[false]
			}
		]
	},
	ruinsView: {
		walls: [
			[
				{X:458,Y:734},
				{X:458,Y:676},
				{X:64,Y:676},
				{X:64,Y:545},
				{X:989,Y:545},
				{X:989,Y:676},
				{X:594,Y:676},
				{X:594,Y:734}
			]
		],
		exits: [
			{
				area:{X:460,Y:725,W:130,H:10},
				event:'gameplayModule.toSideRoom',
				pos:{X:970,Y:278}
			}
		],
		interactions:[
			{
				area:{X:64,Y:545,W:50,H:35},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.toyKnife
				]
			},
			{
				area:{X:66,Y:542,W:920,H:5},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.view
				]
			}
		]
	},
	ruinsPuzzle: {
		walls:[
			[
				{X:1050,Y:565},
				{X:944,Y:565},
				{X:944,Y:650},
				{X:440,Y:650},
				{X:440,Y:730},
				{X:273,Y:730},
				{X:273,Y:650},
				{X:109,Y:650},
				{X:109,Y:479},
				{X:0,Y:479},
				{X:0,Y:350},
				{X:109,Y:350},
				{X:109,Y:165},
				{X:944,Y:165},
				{X:944,Y:420},
				{X:1050,Y:420}
			]
		],
		exits:[
			{
				area:{X:1040,Y:421,W:10,H:143},
				event:'gameplayModule.toIntersection',
				pos:{X:255,Y:420}
			},
			{
				area:{X:1,Y:1,W:1,H:1},
				event:'',
				pos:{X:0,Y:0}
			},
			{
				area:{X:1,Y:1,W:1,H:1},
				event:'',
				pos:{X:0,Y:0}
			}
		],
		interactions:[
			{
				area:{X:223,Y:90,W:54,H:77},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.WIP
				]
			},
			{
				area:{X:388,Y:90,W:54,H:77},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.WIP
				]			},
			{
				area:{X:554,Y:90,W:54,H:77},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.WIP
				]
			},
			{
				area:{X:720,Y:90,W:54,H:77},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.WIP
				]
			},
			{
				area:{X:775,Y:88,W:109,H:79},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.checkDoor
				]
			}
		],
		events:[
			{
				area:{X:0,Y:350,W:10,H:128},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.WIP
				]
			},
			{
				area:{X:274,Y:722,W:166,H:10},
				event:'dialogModule.startDialogBox',
				args:[
					dialogs.WIP
				]
			}
		]
	}
};