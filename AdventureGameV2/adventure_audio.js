var audioModule = (function() {
	var Audio = document.getElementById('audio');
	var prevAudio = [];

	var startAudio = function(music, end, Loop) {
		audioDefault();
		Audio.src = 'audio/music/Undertale OST- ' + music + end;
		switch(end) {
			case '.mp3':
				Audio.type = 'audio/mpeg'
				break;
			case '.ogg':
				Audio.type = 'audio/ogg'
				break;
		}
		Audio.loop = Loop;
		Audio.play();
	};

	var audioDefault = function() {
		prevAudio = [Audio.src, Audio.type];
		var pos = prevAudio[0].search('audio');
		var part = prevAudio[0].slice(pos);
		part = part.replace(/%20/g, ' ');
		prevAudio[0] = part;
	};

	var setDefault = function() {
		Audio.src = prevAudio[0];
		Audio.type = prevAudio[1];
		Audio.play();
	};

	var checkAudio = function(music, end, Loop) {
		var tmp = Audio.src;
		tmp = tmp.replace(/%20/g, ' ');
		var pos1 = tmp.search(prevAudio[0]);
		var pos2 = tmp.search(music);
		if (pos1 === -1) {
			setDefault();
		} else if (pos2 === -1) {
			startAudio(music, end, Loop);
			audioDefault();
		}
	};

	var stopAudio = function() {
		Audio.pause();
	};

	return {
		startAudio: startAudio,
		setDefault: setDefault,
		audioDefault: audioDefault,
		checkAudio: checkAudio,
		stopAudio: stopAudio
	};
})();
//console.log();