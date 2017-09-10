var flag1;
var flag2;
var flag3;

var bg = document.querySelector(".field");
var bgArr = [ "images/bg1.gif", "images/bg2.gif", "images/bg3.gif", "images/bg4.gif" ];
var enemyArr = [""];

var hero1Name = document.querySelector(".data__hero1--name");
var hero2Name = document.querySelector(".data__hero2--name");

var heroChoice = document.getElementsByName("choice_img");

var infoPage = document.querySelector(".infopage");
var gamePage = document.querySelector(".gamepage");

var winnerTitle = document.querySelector(".winnerpage__title");
var winnerMessage = document.querySelector(".winnerpage__message");

function Hero( name, code, life, sprite ) { 

	this.name = name;
	this.code = code;
	this.life = life; 
	this.sprite = sprite;
}

function validation( form ) {
	
	var elems = form.elements;
	console.log( typeof elems.code.value ); // string
	
	var reg = /[0-9]{3}/;
	
	if ( !elems.code.value ) {
		
		alert( "Enter your code" );
		return;
		
	} else if ( !reg.test( elems.code.value )) {
		
		alert( "The code must consist of non-repeating three numerals" );
		return;
		
	} else if ( !elems.name.value ) {
		
		alert( "Enter your name" );
		return;
		
	} else {
		
		var arr = elems.code.value.split( "" );
		
		for ( var i = 0; i < arr.length; i++ ) {
			var x = arr[i];
			for ( j = 0; j < arr.length; j++ ) {
				if (( arr[j] == x ) && ( j != i )) {
					alert( "The code must consist of non-repeating three numerals" );
					return;
				}
			}
		}
		
	setField( form, arr );
	infoPage.style.display = "none"; // flex
	gamePage.style.display = "block";
	}
	
	elems.code.value = "";
	elems.name.value = "";
}

function setField( form, arr ) {
	
	var elems = form.elements;
	
	for ( var i = 0; i < 4; i++ ) {
		
		if ( elems.choice_bg[i].checked ) {
			bg.style.backgroundImage = "url('" + bgArr[i] + "')";
		}
	}
	
	var life1 = document.querySelector(".data__hero1--life"); // полоска жизней
	var life2 = document.querySelector(".data__hero2--life");

	createHeroes(elems.name.value, arr, life1, life2);
}

function createHeroes( name, code, life1, life2 ) {
	
    for ( var i = 0; i < heroChoice.length; i++ ) {
		
        if ( heroChoice[i].checked &&
			 heroChoice[i].value == 1 ) {
				 
			hero1 = new Hero( name, code, life1 );
			hero2 = new Hero( "GUILE", life2 );
			
			hero1Name.innerHTML = hero1.name;
			hero2Name.innerHTML = hero2.name;
			flag1 = true;
			
			
        } else if ( heroChoice[i].checked &&
					heroChoice[i].value == 2 ) {
						
			hero2 = new Hero( name, code, life2, sprite2 );
			hero1 = new Hero( "RYU", life1, sprite1 );
			
			hero2Name.innerHTML = hero2.name;
			hero1Name.innerHTML = hero1.name;
			flag1 = false;
			
        }
    }
	console.log("имя 1 героя " + hero1.name);
	console.log("код 1 героя " + hero1.code);
	console.log("имя 2 героя " + hero2.name);
	console.log("код 2 героя " + hero2.code);
}

