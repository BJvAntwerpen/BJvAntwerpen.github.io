var Location;
var code = "";
var items = {
	huisKey: false,
	kelderKey: false,
	dogSalad: false,
	pie: false,
	boat: false,
	wateringCan: false,
	wateringCanFilled: false,
	goldenCrown: false,
	Muns: 0
}
var itemsInfo = {
	huisKeyInfo: false,
	kelderKeyInfo: false,
	dogSaladInfo: false,
	pieInfo: false,
	boatInfo: false,
	wateringCanInfo: false,
	goldenCrownInfo: false
}
var actions = {
	dogSaladCollect: false,
	pieCollect: false,
	munsBedroom: false,
	givePie: false,
	waterFlowers: false,
	safeOpened: false
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*60*1000));
    var expires = "expires=" + d.toUTCString();
    console.log(expires);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 1.05);
       }
    }
}

function safeCode() {
	var i;
	for (i = 0; i < 4; i++) {
		code += Math.floor(Math.random() * 10);
	}
	console.log(code)
}

function play_Again() {
	document.getElementById('story1').innerHTML = "Tem: teM KNEw HooMan wouLD lIke tO Play aGAIN!";
	document.getElementById('buttonPlayAgain').style.display = "inline";
	setTimeout(reset, 5000);
}

function clear() {
	document.getElementById('shopInfo').innerHTML = "";
	document.getElementById('story1').innerHTML = "";
}

function getMuns() {
	items.Muns += 50;
	actions.munsBedroom = true;
	console.log('You found 50G')
	document.getElementById('story1').innerHTML = "U found 50G!"
	document.getElementById('Muns').style.display = "none";
	setTimeout(clear, 3000);
}

function getPie() {
	items.pie = true;
	itemsInfo.pieInfo = true;
	actions.pieCollect = true;
	console.log('collected a butterscotch-cinnamon pie')
	document.getElementById('Pie').style.display = "none";
	document.getElementById('story1').innerHTML = "U got a ButtErSCOtCH-ciNnamOn PiE!";
	setTimeout(clear, 3000);
}

function dog_Salad() {
	items.dogSalad = true;
	itemsInfo.dogSaladInfo = true;
	actions.dogSaladCollect = true;
	console.log('collected a dog salad')
	document.getElementById('story1').innerHTML = "U found dog salad";
	document.getElementById('dogSalad').style.display = "none";
	setTimeout(clear, 3000);
}

function openMenu() {
	var x = document.getElementsByTagName('button');
	var i;
	for (i=0; i<x.length; i++) {
		x[i].style.display = "none";
	}
	document.getElementById('Menu').style.backgroundColor = "rgba(75, 75, 75, 0.7)";
	document.getElementById('buttonMenuOpen').style.display = "none";
	document.getElementById('buttonReset').style.display = "inline";
	document.getElementById('confirmResetTrue').style.display = "none";
	document.getElementById('confirmResetFalse').style.display = "none";
	document.getElementById('buttonMenuClose').style.display = "inline";
	document.getElementById('itemList').style.display = "inline";
	document.getElementById('textConfirmReset').style.display = "none";
	console.log('MENU geopend');

	if (items.huisKey == true) {
		document.getElementById('item1').innerHTML = "Da fRONtdOOR KeY";
		document.getElementById('item1').style.backgroundColor = "green";
	} else if (itemsInfo.huisKeyInfo == true) {
			document.getElementById('item1').innerHTML = "Da fRONtdOOR KeY";
	} else {
		document.getElementById('item1').innerHTML = "??????????";
	}

	if (items.kelderKey == true) {
		document.getElementById('item2').innerHTML = "Da BASeMeNt KEy";
		document.getElementById('item2').style.backgroundColor = "green";
	} else if (itemsInfo.kelderKeyInfo == true) {
		document.getElementById('item2').innerHTML = "Da BASeMeNt KEy";
	} else {
		document.getElementById('item2').innerHTML = "??????????";
	}

	if (items.dogSalad == true) {
		document.getElementById('item3').innerHTML = "dOg SaLad";
		document.getElementById('item3').style.backgroundColor = "green";
	} else if (itemsInfo.dogSaladInfo == true) {
		document.getElementById('item3').innerHTML = "dOg SaLad";
		document.getElementById('item3').style.backgroundColor = "red";
	} else {
		document.getElementById('item3').innerHTML = "??????????";
	}

	if (items.pie == true) {
		document.getElementById('item4').innerHTML = "BUttErsCoTcH-ciNnAMoN PiE";
		document.getElementById('item4').style.backgroundColor = "green";
	} else if (itemsInfo.pieInfo == true) {
		document.getElementById('item4').innerHTML = "BUttErsCoTcH-ciNnAMoN PiE";
		document.getElementById('item4').style.backgroundColor = "red";
	} else {
		document.getElementById('item4').innerHTML = "??????????";
	}

	if (items.boat == true) {
		document.getElementById('item5').innerHTML = "BoaT";
		document.getElementById('item5').style.backgroundColor = "green";
	} else if (itemsInfo.boatInfo == true) {
		document.getElementById('item5').innerHTML = "BoaT";
	} else {
		document.getElementById('item5').innerHTML = "??????????";
	}

	if (items.wateringCan == true && items.wateringCanFilled == true) {
		document.getElementById('item6').innerHTML = "wAtEring caN (Filled)";
		document.getElementById('item6').style.backgroundColor = "green";
	} else if (items.wateringCan == true) {
		document.getElementById('item6').innerHTML = "wAtEring caN (Empty)";
		document.getElementById('item6').style.backgroundColor = "green";
	} else if (itemsInfo.wateringCanInfo == true) {
		document.getElementById('item6').innerHTML = "wAtEring caN (Empty)";
		document.getElementById('item6').style.backgroundColor = "red";
	} else {
		document.getElementById('item6').innerHTML = "??????????";
	}

	if (items.goldenCrown == true) {
		document.getElementById('item7').innerHTML = "gOLdEn croWn";
		document.getElementById('item7').style.backgroundColor = "green";
	} else if (itemsInfo.goldenCrownInfo == true) {
		document.getElementById('item7').innerHTML = "gOLdEn croWn";
		document.getElementById('item7').style.backgroundColor = "red";
	} else {
		document.getElementById('item7').innerHTML = "??????????";
	}
	document.getElementById('itemMuns').innerHTML = items.Muns + "G";
}

function closeMenu() {
	document.getElementById('Menu').style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById('buttonMenuOpen').style.display = "inline";
	document.getElementById('buttonReset').style.display = "none";
	document.getElementById('buttonMenuClose').style.display = "none";
	document.getElementById('itemList').style.display = "none";
	console.log('MENU gesloten');
	if (Location == "House") {
		document.getElementById('buttonGang').style.display = "inline";
		document.getElementById('buttonKeuken').style.display = "inline";
	} else if (Location == "Forest") {
		document.getElementById('buttonGang').style.display = "inline";
		document.getElementById('buttonStrand').style.display = "inline";
		document.getElementById('buttonTemVillage').style.display = "inline";
		document.getElementById('buttonMountain').style.display = "inline";
	} else if (Location == "Kitchen") {
		document.getElementById('buttonHuis').style.display = "inline";
		document.getElementById('buttonFillWateringCan').style.display = "inline";
		if (actions.pieCollect == true) {
			document.getElementById('Pie').style.display = "none";
		} else {
			document.getElementById('Pie').style.display = "inline";
		}
		if (actions.dogSaladCollect == true) {
			document.getElementById('dogSalad').style.display = "none";
		} else {
			document.getElementById('dogSalad').style.display = "inline";
		}
	} else if (Location == "Hallway") {
		document.getElementById('buttonHuis').style.display = "inline";
		document.getElementById('buttonKelder').style.display = "inline";
		document.getElementById('buttonSlaapkamer').style.display = "inline";
		document.getElementById('buttonWoud').style.display = "inline";
	} else if (Location == "Bedroom") {
		if (items.huisKey == true) {
			document.getElementById('actionFrontdoorKey').style.display = "none";
		} else {
			document.getElementById('actionFrontdoorKey').style.display = "inline";
		}
		if (actions.munsBedroom) {
			document.getElementById('Muns').style.display = "none";
		} else {
			document.getElementById('Muns').style.display = "inline";
		}
			document.getElementById('buttonGang').style.display = "inline";
			document.getElementById('buttonOpenSafe').style.display = "inline";
	} else if (Location == "Basement") {
		document.getElementById('buttonGang').style.display = "inline";
		document.getElementById('buttonSecretShop').style.display = "inline";
	} else if (Location == "Beach") {
		document.getElementById('buttonWoud').style.display = "inline";
		document.getElementById('buttonZee').style.display = "inline";
		if (items.boat == true) {
			document.getElementById('buttonSeaBoat').style,display = "inline";
		} else {
			document.getElementById('buttonSeaBoat').style.display = "none";
		}
	} else if (Location == "TemShop") {
		document.getElementById('buttonBackTemVillage').style.display = "inline";
		document.getElementById('buttonNormalBuy').style.display = "inline";
		document.getElementById('buttonNormalSell').style.display = "inline";
	} else if (Location == "TemVillage") {
		document.getElementById('buttonHut1').style.display = "inline";
		document.getElementById('buttonHut2').style.display = "inline";
		document.getElementById('buttonWoud').style.display = "inline";
		document.getElementById('buttonTemShop').style.display = "inline";
	} else if (Location == "Mountain") {
		document.getElementById('buttonWoud').style.display = "inline";
		document.getElementById('buttonVolcano').style.display = "inline";
		document.getElementById('buttonCastle').style.display = "inline";
		document.getElementById('buttonCave').style.display = "inline";
	} else if (Location == "Cave") {
		document.getElementById('buttonMountain').style.display = "inline";
	} else if (Location == "entranceCastle") {
		document.getElementById('buttonMountain').style.display = "inline";
		document.getElementById('buttonEnterCastle').style.display = "inline";
	} else if (Location == "Hut 1") {
		document.getElementById('buttonTemVillage').style.display = "inline";
		if (items.kelderKey == true) {
			document.getElementById('actionBasementKey').style.display = "none";
		} else {
			document.getElementById('actionBasementKey').style.display = "inline";
		}
	} else if (Location == "Hut 2") {
		document.getElementById('buttonTemVillage').style.display = "inline";
	} else if (Location == "Volcano") {
		document.getElementById('buttonMountain').style.display = "inline";
		document.getElementById('buttonJumpVolcano').style.display = "inline";
	} else if (Location == "secret Temshop") {
		document.getElementById('buttonBackBasement').style.display = "inline";
		document.getElementById('buttonSecretBuy').style.display = "inline";
		document.getElementById('buttonSecretSell').style.display = "inline";
	} else if (Location == "Castle") {
		document.getElementById('buttonCastle').style.display = "inline";
		document.getElementById('buttonGoldenFlowerField').style.display = "inline";
		document.getElementById('buttonThroneRoom').style.display = "inline";
	} else if (Location == "golden flower field") {
		document.getElementById('buttonEnterCastle').style.display = "inline";
		document.getElementById('buttonWaterFlowers').style.display = "inline";
		if (actions.waterFlowers == true) {
			document.getElementById('buttonRepeatCode').style.display = "inline";
		} else {
			document.getElementById('buttonRepeatCode').style.display = "none";
		}
	} else if (Location == "Throne room") {
		document.getElementById('buttonEnterCastle').style.display = "inline";
		document.getElementById('buttonKingQueen').style.display = "inline";
	}
}

function reset() {
	location.reload(true)
}

function confirmReset() {
	document.getElementById('confirmResetTrue').style.display = "inline";
	document.getElementById('confirmResetFalse').style.display = "inline";
	document.getElementById('textConfirmReset').style.display = "inline";
	document.getElementById('buttonMenuClose').style.display = "none";
	document.getElementById('itemList').style.display = "none";
	document.getElementById('buttonReset').style.display = "none";
}

function actionFrontdoorKey() {
	items.huisKey = true;
	itemsInfo.huisKeyInfo = true;
	document.getElementById('story1').innerHTML = "U founb da frontdoor key!";
	document.getElementById('actionFrontdoorKey').style.display = "none";
	setTimeout(clear, 3000);
}

function actionBasementKey() {
	items.kelderKey = true;
	itemsInfo.kelderKeyInfo = true;
	document.getElementById('story1').innerHTML = "U founb da basement key";
	document.getElementById('actionBasementKey').style.display = "none";
	setTimeout(clear, 3000);
}

function Story() {
	document.getElementById('music1').play();
	document.getElementById('musicStart').pause();
	document.getElementById('story1').innerHTML = "hOI!!";
	document.getElementById('story2').innerHTML = "Welcom t: DA TEM ADVENTURE GAME!<br>U r a Tem but u 4got your name."
	document.getElementById('storyLine').style.backgroundImage = "url('img/Temmie.png')";
	document.getElementById('storyLine').style.backgroundSize = "50% 100%";
	document.getElementById('storyLine').style.backgroundPosition = "305px 0px";
	document.getElementById('storyLine').style.backgroundRepeat = "no-repeat";
	document.getElementById('buttonNext').style.display = "inline";
	document.getElementById('buttonStart').style.display = "none";
	document.body.style.backgroundColor = "red";
	console.log('hOI!!');
}

function Start() {
	Location = "House";
	document.body.style.backgroundImage = "url('img/House.png')";
	document.body.style.backgroundColor = "white";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundSize = "100% 100%";
	document.getElementById('buttonGang').style.display = "inline";
	document.getElementById('buttonKeuken').style.display = "inline";
	document.getElementById('buttonMenuOpen').style.display = "inline";
	document.getElementById('locatie').style.display = "inline";
	document.getElementById('buttonNext').style.display = "none";
	document.getElementById('story1').innerHTML = "";
	document.getElementById('story2').innerHTML = "";
	document.getElementById('storyLine').style.backgroundImage = "";
}

function toDeurWoud() {
	if (items.huisKey == true) {
		toWoud();
		document.getElementById('buttonWoud').style.cursor = "pointer";
	} else {
		document.getElementById('story1').innerHTML = "A key is needeb!";
		console.log('A key is needeb!');
		itemsInfo.huisKeyInfo = true;
		setTimeout(clear, 3000);
	}
}

function toWoud() {
	Location = "Forest";
	document.getElementById('locatie').innerHTML = "Location: Forest";
	console.log('Player goes to "Forest"');
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonHuis').style.display = "none";
	document.getElementById('buttonKelder').style.display = "none";
	document.getElementById('buttonSlaapkamer').style.display = "none";
	document.getElementById('buttonVolcano').style.display = "none";
	document.getElementById('buttonCastle').style.display = "none";
	document.getElementById('buttonCave').style.display = "none";
	document.getElementById('buttonHut1Pie').style.display = "none";
	document.getElementById('buttonGang').style.display = "inline";
	document.getElementById('buttonStrand').style.display = "inline";
	document.getElementById('buttonTemVillage').style.display = "inline";
	document.getElementById('buttonHut1').style.display = "none";
	document.getElementById('buttonMountain').style.display = "inline";
	document.getElementById('buttonHut2').style.display = "none";
	document.getElementById('buttonZee').style.display = "none";
	document.getElementById('buttonTemShop').style.display = "none";
	document.getElementById('buttonSeaBoat').style.display = "none";
	document.getElementById('story1').innerHTML = "";
	document.body.style.backgroundColor = "magenta";
	document.body.style.backgroundImage = "";
}

function toKeuken() {
	Location = "Kitchen";
	console.log('Player goes to "Kitchen"');
	document.getElementById('story1').innerHTML = "";
	document.getElementById('locatie').innerHTML = "Location: Kitchen";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonKeuken').style.display = "none";
	document.getElementById('buttonGang').style.display = "none";
	document.getElementById('buttonHuis').style.display = "inline";
	document.getElementById('buttonFillWateringCan').style.display = "inline";
	document.body.style.backgroundImage = "url('img/Keuken.png')";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundSize = "100% 100%";
	if (actions.pieCollect == true) {
		document.getElementById('Pie').style.display = "none";
	} else {
		document.getElementById('Pie').style.display = "inline";
	}
	if (actions.dogSaladCollect == true) {
		document.getElementById('dogSalad').style.display = "none";
	} else {
		document.getElementById('dogSalad').style.display = "inline";
	}
}

function toGang() {
	Location = "Hallway";
	console.log('Player goes to "Hallway"');
	document.getElementById('locatie').innerHTML = "Location: Hallway";
	document.body.style.backgroundColor = "blue";
	document.body.style.backgroundImage = "url('img/Hallway.png')";
	document.getElementById('buttonWoud').style.display = "inline";
	document.getElementById('buttonKeuken').style.display = "none";
	document.getElementById('buttonGang').style.display = "none";
	document.getElementById('buttonHuis').style.display = "inline";
	document.getElementById('buttonKelder').style.display = "inline";
	document.getElementById('buttonSlaapkamer').style.display = "inline";
	document.getElementById('actionFrontdoorKey').style.display = "none";
	document.getElementById('buttonMountain').style.display = "none";
	document.getElementById('buttonTemVillage').style.display = "none";
	document.getElementById('buttonStrand').style.display = "none";
	document.getElementById('Muns').style.display = "none";
	document.getElementById('buttonOpenSafe').style.display = "none";
	document.getElementById('buttonSecretShop').style.display = "none";
	if (items.kelderKey == true) {
		document.getElementById('buttonKelder').style.cursor = "pointer";
	} else {
		document.getElementById('buttonKelder').style.cursor = "not-allowed";
	}
	if (items.huisKey) {
		document.getElementById('buttonWoud').style.cursor = "pointer";
	} else {
		document.getElementById('buttonWoud').style.cursor = "not-allowed";
	}
}

function toHuis() {
	Location = "House";
	console.log('Player goes to "House"');
	document.body.style.backgroundImage = "url('img/House.png')";
	document.getElementById('story1').innerHTML = "";
	document.getElementById('buttonKelder').style.display = "none";
	document.getElementById('Pie').style.display = "none";
	document.getElementById('dogSalad').style.display = "none";
	document.getElementById('buttonMountain').style.display = "none";
	document.getElementById('buttonSlaapkamer').style.display = "none";
	document.getElementById('buttonStrand').style.display = "none";
	document.getElementById('buttonTemVillage').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonGang').style.display = "inline";
	document.getElementById('buttonKeuken').style.display = "inline";
	document.getElementById('buttonHuis').style.display = "none";
	document.getElementById('buttonFillWateringCan').style.display = "none";
	document.getElementById('locatie').innerHTML = "Location: House";
}

function toDeurKelder() {
	if (items.kelderKey == true) {
		toKelder();
	} else {
		document.getElementById('story1').innerHTML = "A key is needeb!";
		console.log('A key is needeb!');
		itemsInfo.kelderKeyInfo = true;
		setTimeout(clear, 3000);
	}
}

function toKelder() {
	Location = "Basement";
	console.log('Player goes to "Basement"');
	document.body.style.backgroundImage = "";
	document.getElementById('story1').innerHTML = "";
	document.getElementById('locatie').innerHTML = "Location: Basement";
	document.getElementById('buttonKelder').style.display = "none";
	document.getElementById('buttonSlaapkamer').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonHuis').style.display = "none";
	document.getElementById('buttonSecretBuy').style.display = "none";
	document.getElementById('buttonSecretSell').style.display = "none";
	document.getElementById('buttonGang').style.display = "inline";
	document.getElementById('buttonSecretShop').style.display = "inline";
	document.body.style.backgroundColor = "blue";
}

function backBasement() {
	document.getElementById('buttonBackBasement').style.display = "none";
	document.getElementById('music2').pause();
	document.getElementById('music2').currentTime = 0;
	document.getElementById('music1').play();
	toKelder();
}

function secretShop() {
	Location = "secret Temshop";
	document.body.style.backgroundImage = "url('img/TemmieInWall.png')";
	document.getElementById('locatie').innerHTML = "Location: secret Temshop";
	document.getElementById('locatie').style.color = "white";
	document.body.style.backgroundColor = "gray";
	document.getElementById('buttonBackBasement').style.display = "inline";
	document.getElementById('buttonSecretShop').style.display = "none";
	document.getElementById('buttonGang').style.display = "none";
	document.getElementById('buttonSecretBuy').style.display = "inline";
	document.getElementById('buttonSecretSell').style.display = "inline";
	document.getElementById('music1').pause();
	document.getElementById('music1').currentTime = 0;
	document.getElementById('music2').play();
	console.log('Player found a secret shop');
}

function toSlaapkamer() {
	Location = "Bedroom";
	console.log('Player goes to "Bedroom"');
	document.body.style.backgroundImage = "url('img/bedroom.png')";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundSize = "100% 100%"
	document.getElementById('story1').innerHTML = "";
	document.getElementById('buttonHuis').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonKelder').style.display = "none";
	document.getElementById('buttonSlaapkamer').style.display = "none";
	document.getElementById('buttonOpenSafe').style.display = "inline";
	document.getElementById('buttonGang').style.display = "inline";
	document.getElementById('locatie').innerHTML = "Location: Bedroom";
	if (items.huisKey == true) {
		document.getElementById('actionFrontdoorKey').style.display = "none";
	} else {
		document.getElementById('actionFrontdoorKey').style.display = "inline";
	}
	if (actions.munsBedroom == true) {
		document.getElementById('Muns').style.display = "none";
	} else {
		document.getElementById('Muns').style.display = "inline";
	}
}

function fillWateringCan() {
	if (items.wateringCanFilled == false && items.wateringCan == true) {
		console.log('you fill the watering can');
		document.getElementById('story1').innerHTML = "u FILL tha WateRinG CaN";
		items.wateringCanFilled = true;
		setTimeout(clear, 3000);
	} else if (items.wateringCanFilled == true) {
		console.log('the watering can is already filled');
		document.getElementById('story1').innerHTML = "iT's AlrEADy fIllEd";
		setTimeout(clear, 3000);
	} else {
		document.getElementById('story1').innerHTML = "U NeEd A WateRinG CaN";
		itemsInfo.wateringCanInfo = true;
		setTimeout(clear, 3000);
	}
}

function toStrand() {
	Location = "Beach";
	console.log('Player goes to "Da beach"');
	document.getElementById('buttonGang').style.display = "none";
	document.getElementById('buttonMountain').style.display = "none";
	document.getElementById('buttonStrand').style.display = "none";
	document.getElementById('buttonTemVillage').style.display = "none";
	document.getElementById('buttonWoud').style.display = "inline";
	document.getElementById('buttonZee').style.display = "inline";
	document.getElementById('locatie').innerHTML = "Location: Da beach";
	if (items.boat == true) {
		document.getElementById('buttonSeaBoat').style.display = "inline";
	} else {
		document.getElementById('buttonSeaBoat').style.display = "none";
	}
}

function toZee() {
	if (items.boat == true) {
		document.getElementById('story1').innerHTML = "THa ROCks r toO pOiNty To PLacE tHa boAt oN";
	} else {
		console.log('Player goes to "Da sea"');
		document.getElementById('buttonWoud').style.display = "none";
		document.getElementById('buttonZee').style.display = "none";
		document.getElementById('buttonSeaBoat').style.display = "none";
		document.getElementById('buttonMenuOpen').style.display = "none";
		document.getElementById('locatie').innerHTML = "Location: Da sea";
		document.getElementById('story1').innerHTML = "U start t swim";
		setTimeout(zeeGameOver, 3000)
	}
}

function zeeGameOver() {
	document.getElementById('storyLine').style.backgroundImage = "url('img/Haai.jpg')";
	document.getElementById('storyLine').style.backgroundSize = "100% 100%";
	document.getElementById('storyLine').style.backgroundPosition = "0px 0px";
	document.getElementById('buttonMenuOpen').style.display = "none";
	document.getElementById('buttonGameOver').style.display = "inline";
	document.getElementById('musicGameOver').play();
	document.getElementById('music1').pause();
	document.getElementById('story1').innerHTML = "u gOt Eaten By A shARk ";
	document.getElementById('story2').innerHTML = "gaME OvEr<br>MAybE SOMeTINg lIKe A boaT mAy hElP";
}

function toTemVillage() {
	Location = "TemVillage";
	console.log('Player goes to "Tem village"')
	document.getElementById('buttonWoud').style.display = "inline";
	document.getElementById('buttonMountain').style.display = "none";
	document.getElementById('buttonStrand').style.display = "none";
	document.getElementById('buttonGang').style.display = "none";
	document.getElementById('actionBasementKey').style.display = "none";
	document.getElementById('buttonHut2').style.display = "inline";
	document.getElementById('buttonTemShop').style.display = "inline";
	document.getElementById('buttonTemVillage').style.display = "none";
	document.getElementById('locatie').innerHTML = "Location: Tem village";
	document.getElementById('storyLine').style.backgroundImage = "";
	document.getElementById('story1').innerHTML = "";
	if (actions.givePie == true) {
		document.getElementById('buttonHut1').style.display = "inline";
	} else {
		document.getElementById('buttonHut1Pie').style.display = "inline";
	}
}

function toHut1Pie() {
	if (items.pie == true) {
		items.pie = false;
		actions.givePie = true;
		document.getElementById('story1').innerHTML = "Tem: T!!!! FoR THa piE";
		document.getElementById('buttonHut1Pie').style.display = "none";
		document.getElementById('buttonHut1').style.display = "inline";
		setTimeout(clear, 3000);
	} else {
		document.getElementById('story1').innerHTML = "Tem: bRiNG tEm a piE";
		setTimeout(clear, 3000);
	}
}

function toHut1() {
	Location = "Hut 1";
	console.log('Player goes into "Hut 1"')
	document.getElementById('locatie').innerHTML = "Location: Hut 1";
	document.getElementById('story1').innerHTML = "";
	document.getElementById('buttonHut1').style.display = "none";
	document.getElementById('buttonHut2').style.display = "none";
	document.getElementById('buttonTemShop').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonTemVillage').style.display = "inline";
	if (items.kelderKey == true) {
		document.getElementById('actionBasementKey').style.display = "none";
	} else {
		document.getElementById('actionBasementKey').style.display = "inline"
	}
}

function toHut2() {
	Location = "Hut 2";
	console.log('Player goes into "Hut 2"')
	document.getElementById('story1').innerHTML = "";
	document.getElementById('buttonHut1').style.display = "none";
	document.getElementById('buttonHut1Pie').style.display = "none";
	document.getElementById('buttonHut2').style.display = "none";
	document.getElementById('buttonTemShop').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonTemVillage').style.display = "inline";
	document.getElementById('locatie').innerHTML = "Location: Hut 2";
}

function toTemShop() {
	Location = "TemShop";
	console.log('Player goes to "Da TEm SHop"')
	console.log('Tem: wELCoM to Da TEm sHop!!')
	document.getElementById('storyLine').style.backgroundImage = "url('img/TemShop.gif')";
	document.getElementById('storyLine').style.backgroundRepeat = "no-repeat";
	document.getElementById('storyLine').style.backgroundSize = "50% 100%";
	document.getElementById('storyLine').style.backgroundPosition = "305px 0px";
	document.getElementById('locatie').innerHTML = "Da Tem shop ";
	document.getElementById('story1').innerHTML = "";
	document.getElementById('buttonHut1').style.display = "none";
	document.getElementById('buttonHut1Pie').style.display = "none";
	document.getElementById('buttonHut2').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonTemShop').style.display = "none";
	document.getElementById('buttonBackTemVillage').style.display = "inline";
	document.getElementById('buttonNormalBuy').style.display = "inline";
	document.getElementById('buttonNormalSell').style.display = "inline";
	document.getElementById('music1').pause();
	document.getElementById('music1').currentTime = 0;
	document.getElementById('music2').play();
}

function Buy(plek) {
	if (plek == 'normal') {
		document.getElementById('buttonNormalBuy').style.display = "none";
		document.getElementById('Menu').style.backgroundColor = "rgba(75, 75, 75, 0.7)";
		document.getElementById('buttonNormalSell').style.display = "none";
		document.getElementById('buttonBackTemVillage').style.display = "none";
		document.getElementById('buttonBackNormal').style.display = "inline";
		document.getElementById('buyItem1').style.display = "inline";
		document.getElementById('buyItem2').style.display = "inline";
	} else if (plek == 'secret') {
		document.getElementById('story1').innerHTML = "Tem: Tem hAVe no ItemS tO SeLl";
		setTimeout(clear, 3000);
	}
	if (items.Muns >= 400 && items.boat == false) {
		document.getElementById('buyItem1').style.backgroundColor = "green";
	} else {
		document.getElementById('buyItem1').style.backgroundColor = "red";
	}
	if (items.Muns >= 200 && items.wateringCan == false) {
		document.getElementById('buyItem2').style.backgroundColor = "green";
	} else {
		document.getElementById('buyItem2').style.backgroundColor = "red";
	}
	itemsInfo.boatInfo = true;
}

function buyBoat() {
	if (items.Muns >= 400 && items.boat == false) {
		items.boat = true;
		items.Muns -= 400;
		console.log('Player bought a "boat"');
		document.getElementById('buyItem1').style.backgroundColor = "red";
		document.getElementById('shopInfo').innerHTML = "Tem: t!!!! FoR buyn thA BoAt";
		setTimeout(clear, 3000);
	} else if (items.boat == true) {
		document.getElementById('shopInfo').innerHTML = "Tem: mAkE sPace for ThAd iTeM";
		setTimeout(clear, 3000);
	} else {
		document.getElementById('shopInfo').innerHTML = "Tem: bring more muns";
		setTimeout(clear, 3000);
	}
}

function buyWateringCan() {
	if (items.Muns >= 200 && items.wateringCan == false) {
		items.wateringCan = true;
		items.Muns -= 200;
		console.log('Player bought a "watering can"');
		document.getElementById('buyItem2').style.backgroundColor = "red";
		document.getElementById('shopInfo').innerHTML = "Tem: t!!!! For buyIng thA WateriNG Can";
		setTimeout(clear, 3000);
	} else if (items.wateringCan == true) {
		document.getElementById('shopInfo').innerHTML = "Tem: mAkE sPace for ThAd iTeM";
		setTimeout(clear, 3000);
	} else {
		document.getElementById('shopInfo').innerHTML = "Tem: bring more muns";
		setTimeout(clear, 3000);
	}
}

function Sell(plek) {
	document.getElementById('Menu').style.backgroundColor = "rgba(75, 75, 75, 0.7)";
	if (plek == 'normal') {
		document.getElementById('buttonNormalBuy').style.display = "none";
		document.getElementById('buttonNormalSell').style.display = "none";
		document.getElementById('sellItem1').style.display = "inline";
		document.getElementById('buttonBackTemVillage').style.display = "none";
		document.getElementById('buttonBackNormal').style.display = "inline";
	} else if (plek == 'secret') {
		document.getElementById('buttonSecretBuy').style.display = "none";
		document.getElementById('buttonSecretSell').style.display = "none";
		document.getElementById('buttonBackBasement').style.display = "none";
		document.getElementById('sellCItem1').style.display = "inline";
		document.getElementById('buttonBackSecret').style.display = "inline";
	}
	if (items.dogSalad == true) {
		document.getElementById('sellItem1').style.backgroundColor = "green";
		document.getElementById('sellCItem1').style.backgroundColor = "green";
	} else {
		document.getElementById('sellItem1').style.backgroundColor = "red";
		document.getElementById('sellCItem1').style.backgroundColor = "red";
	}
}

function sellDogSalad(money) {
	if (items.dogSalad == true) {
		items.dogSalad = false;
		items.Muns += money;
		console.log('Player sold a "Dog Salad"')
		document.getElementById('shopInfo').innerHTML = "Tem: hErE r ur MuNs ";
		document.getElementById('sellItem1').style.backgroundColor = "red";
		document.getElementById('sellCItem1').style.backgroundColor = "red";
		setTimeout(clear, 3000);
	} else {
		document.getElementById('shopInfo').innerHTML = "Tem: u doNt hAVe THAd iTem";
		setTimeout(clear, 3000);
	}
}

function backTemShop(plek) {
	document.getElementById('Menu').style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById('shopInfo').innerHTML = "";
	if (plek == 'normal') {
		document.getElementById('buttonNormalBuy').style.display = "inline";
		document.getElementById('buttonNormalSell').style.display = "inline";
		document.getElementById('buttonBackTemVillage').style.display = "inline";
		document.getElementById('buttonBackNormal').style.display = "none";
		document.getElementById('buyItem1').style.display = "none";
		document.getElementById('buyItem2').style.display = "none";
		document.getElementById('sellItem1').style.display = "none";
	} else if (plek == 'secret') {
		document.getElementById('buttonSecretSell').style.display = "inline";
		document.getElementById('buttonSecretBuy').style.display = "inline";
		document.getElementById('buttonBackBasement').style.display = "inline";
		document.getElementById('buyItem1').style.display = "none";
		document.getElementById('sellCItem1').style.display = "none";
		document.getElementById('buttonBackSecret').style.display = "none";
	}
}

function backTemVillage() {
	console.log('Tem: coME BAcK LaTEr! ')
	document.getElementById('buttonBackTemVillage').style.display = "none";
	document.getElementById('buttonNormalSell').style.display = "none";
	document.getElementById('buttonNormalBuy').style.display = "none";
	document.getElementById('music2').pause();
	document.getElementById('music2').currentTime = 0;
	document.getElementById('music1').play();
	toTemVillage();
}

function toMountain() {
	Location = "Mountain";
	console.log('Player goes to "Mountain"');
	document.body.style.backgroundImage = "url('img/Mountain.png')";
	document.getElementById('locatie').style.color = "black";
	document.getElementById('locatie').innerHTML = "Location: Mountain";
	document.getElementById('buttonMountain').style.display = "none";
	document.getElementById('buttonStrand').style.display = "none";
	document.getElementById('buttonTemVillage').style.display = "none";
	document.getElementById('buttonGang').style.display = "none";
	document.getElementById('buttonJumpVolcano').style.display = "none";
	document.getElementById('buttonEnterCastle').style.display = "none";
	document.getElementById('buttonWoud').style.display = "inline";
	document.getElementById('buttonVolcano').style.display = "inline";
	document.getElementById('buttonCave').style.display = "inline";
	document.getElementById('buttonCastle').style.display = "inline";
}

function toCave() {
	document.body.style.backgroundImage = "url('img/Cave.png')";
	Location = "Cave";
	console.log('Player goes to "Cave"');
	document.getElementById('locatie').style.color = "white";
	document.getElementById('locatie').innerHTML = "Location: Cave";
	document.getElementById('buttonCave').style.display = "none";
	document.getElementById('buttonVolcano').style.display = "none";
	document.getElementById('buttonCastle').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonMountain').style.display = "inline";
}

function toCastle() {
	Location = "entranceCastle";
	console.log('Player goes to "Entrance castle"');
	document.getElementById('locatie').style.color = "white";
	document.body.style.backgroundImage = "url('img/Castle.jpg')";
	document.getElementById('locatie').innerHTML = "Location: Entrance castle";
	document.getElementById('buttonCave').style.display = "none";
	document.getElementById('buttonVolcano').style.display = "none";
	document.getElementById('buttonCastle').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonGoldenFlowerField').style.display = "none";
	document.getElementById('buttonThroneRoom').style.display = "none";
	document.getElementById('buttonMountain').style.display = "inline";
	document.getElementById('buttonEnterCastle').style.display = "inline";
}

function toVolcano() {
	Location = "Volcano";
	console.log('Player goes to "Volcano"');
	document.body.style.backgroundImage = "";
	document.getElementById('locatie').innerHTML = "Location: Volcano";
	document.getElementById('buttonCave').style.display = "none";
	document.getElementById('buttonVolcano').style.display = "none";
	document.getElementById('buttonCastle').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('buttonMountain').style.display = "inline";
	document.getElementById('buttonJumpVolcano').style.display = "inline";
}

function seaBoat() {
	document.getElementById('buttonZee').style.display = "none";
	document.getElementById('buttonSeaBoat').style.display = "none";
	document.getElementById('buttonWoud').style.display = "none";
	document.getElementById('story1').innerHTML = "Tem: TEm wOulD likE u to plAY wiTh Tem AGAin.<br>wOuld u Like To plAy agAin?";
	document.getElementById('buttonPlayAgain').style.display = "inline";
	document.getElementById('locatie').style.display = "none";
	document.getElementById('buttonMenuOpen').style.display = "none";
}

function jumpVolcano() {
	document.getElementById('buttonMountain').style.display = "none";
	document.getElementById('buttonMenuOpen').style.display = "none";
	document.getElementById('buttonJumpVolcano').style.display = "none";
	document.getElementById('buttonGameOver').style.display = "inline";
	document.getElementById('music1').pause();
	document.getElementById('musicGameOver').play();
	document.getElementById('story1').innerHTML = "U jUmPed in tHa vOlCano. u diED";
	document.getElementById('story2').innerHTML = "DiD u SEriOuSly juST Jump in ThA VOLCAnO?<br>WHY wOuld u JUmp iN tHa vOLcano";
}

function enterCastle() {
	Location = "Castle";
	document.getElementById('locatie').innerHTML = "Location: Castle";
	document.getElementById('locatie').style.color = "black";
	document.getElementById('buttonEnterCastle').style.display = "none";
	document.getElementById('buttonMountain').style.display = "none";
	document.getElementById('buttonWaterFlowers').style.display = "none";
	document.getElementById('buttonRepeatCode').style.display = "none";
	document.getElementById('buttonKingQueen').style.display = "none";
	document.getElementById('buttonCastle').style.display = "inline";
	document.getElementById('buttonGoldenFlowerField').style.display = "inline";
	document.getElementById('buttonThroneRoom').style.display = "inline";
	document.getElementById('story1').innerHTML = "";
	document.body.style.backgroundImage = "";
	document.body.style.backgroundColor = "fuchsia";
}

function toThroneRoom() {
	Location = "Throne room";
	/*document.body.style.backgroundImage = "url('img/ThroneRoom.png')";*/
	document.getElementById('locatie').innerHTML = "Location: Throne room";
	document.getElementById('buttonThroneRoom').style.display = "none";
	document.getElementById('buttonGoldenFlowerField').style.display = "none";
	document.getElementById('buttonCastle').style.display = "none";
	document.getElementById('buttonEnterCastle').style.display = "inline";
	document.getElementById('buttonKingQueen').style.display = "inline";
}

function toGoldenFlowerField() {
	Location = "golden flower field";
	document.getElementById('locatie').innerHTML = "Location: Golden flower field";
	document.getElementById('buttonGoldenFlowerField').style.display = "none";
	document.getElementById('buttonCastle').style.display = "none";
	document.getElementById('buttonThroneRoom').style.display = "none";
	document.getElementById('buttonEnterCastle').style.display = "inline";
	document.getElementById('buttonWaterFlowers').style.display = "inline";
	if (actions.waterFlowers == true) {
		document.getElementById('buttonRepeatCode').style.display = "inline";
	} else {
		document.getElementById('buttonRepeatCode').style.display = "none";
	}
}

function waterFlowers() {
	if (items.wateringCan == true && items.wateringCanFilled == true) {
		console.log('you water the flowers');
		document.getElementById('story1').innerHTML = "u WAtEr tha FloWers";
		setTimeout(getCode, 3000);
		items.wateringCanFilled = false;
		actions.waterFlowers = true;
		document.getElementById('buttonOpenSafe').style.border = "2px solid #66ff66";
	} else if (items.wateringCan == true) {
		console.log('You need to fill the watering can with water');
		document.getElementById('story1').innerHTML = "u NEEd To Fill it wIth WatER";
		setTimeout(clear, 3000);
	} else {
		console.log('You need a watering can')
		document.getElementById('story1').innerHTML = "U NeeD A wAteRiNg CAN";
		setTimeout(clear, 3000);
		itemsInfo.wateringCanInfo = true;
	}
}

function getCode() {
	console.log("the code is " + code)
	document.getElementById('story1').innerHTML = "ThA coDe iS: " + code + "<br>(there's a safe in the bedroom)";
	document.getElementById('buttonRepeatCode').style.display = "inline";
}

function openSafe() {
	document.getElementById('buttonOpenSafe').innerHTML = "Safe";
	if (actions.safeOpened == false) {
		var enteredCode = prompt("P!!!!!! eNtER Tha coDe","####");
		if (enteredCode == code) {
			document.getElementById('story1').innerHTML = "tha Safe oPeND.<br>U foUnD a GolDEN cRown.";
			console.log('you got a golden crown!');
			actions.safeOpened = true;
			items.goldenCrown = true;
		} else {
			alert("u EnTered tHA wrONg CODE");
			console.log('you entered the wrong code');
		}
	} else {
		document.getElementById('story1').innerHTML = "ThA sAfe iS ALrEady OpeN";
		setTimeout(clear, 3000);
	}
}

function becomeKingQueen() {
	if (items.goldenCrown == true) {
		console.log("you win");
		document.getElementById('locatie').style.display = "none";
		document.getElementById('buttonMenuOpen').style.display = "none";
		document.getElementById('buttonKingQueen').style.display = "none";
		document.getElementById('buttonEnterCastle').style.display = "none";
		document.getElementById('story1').innerHTML = "u deCIdE to become thA KinG...Errr LeaDER Of tHa TEmmIes";
		setTimeout(function() {
			document.getElementById('story1').innerHTML = "BUt u STill DoN't Know uR name so u thiNk of One.";
			setTimeout(function() {
				var name = prompt("Please think of a name","Bob");
				setTimeout(function() {
					if (name != "Bob") {
						document.getElementById('story1').innerHTML = "u ThoughT Of A horrIBlE name.<br>SO U kEeP Id At: Bob";
					} else {
						document.getElementById('story1').innerHTML = "U THouGht oF THa perfecT nAme: " + name;
					}
					document.getElementById('buttonPlayAgain').style.display = "inline";
				} ,2000);
			}, 5000);
		}, 5000);
	} else {
		document.getElementById('story1').innerHTML = "U nEed sometHing Like A crOWN to BeCoME kIng/quEeN";
		itemsInfo.goldenCrownInfo = true;
	}
}