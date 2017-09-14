// audio 
var mainSound1 = new Audio(); 
	mainSound1.src = "sound/main1.mp3";
	mainSound1.play();
	mainSound1.loop = true;

var mainSound2 = new Audio(); 
	mainSound2.src = "sound/main2.mp3";

var punchSound1 = new Audio(); 
	punchSound1.src = "sound/punch1.mp3";

var punchSound2 = new Audio(); 
	punchSound2.src = "sound/punch2.mp3";

var deadSound1 = new Audio(); 
	deadSound1.src = "sound/dead1.mp3";

var deadSound2 = new Audio(); 
	deadSound2.src = "sound/dead2.mp3";

var winSound = new Audio(); 
	winSound.src = "sound/win.mp3";

var loseSound = new Audio(); 
	loseSound.src = "sound/lose.mp3";

var errorSound = new Audio(); 
	errorSound.src = "sound/error.mp3";

var flag1;
var flag2;
var flag3;

var bg = document.querySelector(".field");
var bgArr = [ "images/bg1.gif", "images/bg2.gif", "images/bg3.gif", "images/bg4.gif" ]; // game location

var enemyArr = [""]; // array for storing the opponent's code

var hero1Name = document.querySelector(".data__hero1--name");
var hero2Name = document.querySelector(".data__hero2--name");

var heroChoice = document.getElementsByName("choice_img");

var infoPage = document.querySelector(".infopage");
var gamePage = document.querySelector(".gamepage");
var winnerPage = document.querySelector(".winnerpage");

var winnerTitle = document.querySelector(".winnerpage__title");
var winnerMessage = document.querySelector(".winnerpage__message");
var winnerImg = document.querySelector(".winnerpage__winner");
var winnerArr = [ "images/winner1.gif", "images/winner2.gif" ];

var newGame = document.querySelector(".winnerpage__button");


// constructor for creating heroes 
function Hero( name, code, life, sprite ) { 

	this.name = name;
	this.code = code;
	this.life = life; 
	this.sprite = sprite;
}


// form validation 
function validation( form ) {
	
	var elems = form.elements;
//	console.log( typeof elems.code.value ); // string
	
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
		mainSound1.pause();
		mainSound2.play();
		mainSound2.loop = true;
		infoPage.style.display = "none"; // flex
		gamePage.style.display = "block";
	}
	
	elems.code.value = "";
	elems.name.value = "";
}


// set location 
function setField( form, arr ) {
	
	var elems = form.elements;
	
	for ( var i = 0; i < 4; i++ ) {
		
		if ( elems.choice_bg[i].checked ) {
			bg.style.backgroundImage = "url('" + bgArr[i] + "')";
		}
	}
	
	var life1 = document.querySelector(".data__hero1--life"); // line of life
	var life2 = document.querySelector(".data__hero2--life");

	createHeroes(elems.name.value, arr, life1, life2);
}


// assign properties to heroes and call the constructor 
function createHeroes( name, code, life1, life2 ) {
	
    for ( var i = 0; i < heroChoice.length; i++ ) {
		
        if ( heroChoice[i].checked &&
			 heroChoice[i].value == 1 ) {
				 
			hero1 = new Hero( name, code, life1, sprite1 );
			hero2 = new Hero( "GUILE", setRandomCode(), life2, sprite2 );
			
			hero1Name.innerHTML = hero1.name;
			hero2Name.innerHTML = hero2.name;
			flag1 = true;
			
			typing( hero1 );
			setLife( hero1 );
			setLife( hero2 );
			
        } else if ( heroChoice[i].checked &&
					heroChoice[i].value == 2 ) {
						
			hero2 = new Hero( name, code, life2, sprite2 );
			hero1 = new Hero( "RYU", setRandomCode(), life1, sprite1 );
			
			hero2Name.innerHTML = hero2.name;
			hero1Name.innerHTML = hero1.name;
			flag1 = false;
			
			typing( hero2 );
			setLife( hero1 );
			setLife( hero2 );
        }
    }
	console.log("name 1 hero: " + hero1.name);
	console.log("code 1 hero: " + hero1.code);
	console.log("name 2 hero: " + hero2.name);
	console.log("code 2 hero: " + hero2.code);
}


// assign a code to an opponent 
function setRandomCode(){ 

	var arr = [];
	
	for ( var i = 0; i < 3; i++ ) {
		arr.push( Math.floor( Math.random() * 10 ));
	}
	return checkRandomCode( arr );
}


// checking the opponent's code 
function checkRandomCode( arr ){
	
	for ( var i = 0; i < arr.length; i++ ) {
		var x = arr[i];
		
		for ( j = 0; j < arr.length; j++ ) {
			if ( arr[j] == x && j != i ){
				return setRandomCode();
			} 
		}
	}
	return arr;
}


// sprites of heroes 
var sprite1 = document.getElementById( "hero1" );
var sprite2 = document.getElementById( "hero2" );


// hero 1 hitting animation
function getHit1() {
	
	hero1.sprite.classList.add("active1_hero1");
	hero2.sprite.classList.add("active2_hero2");
	
	setTimeout(function() {
		hero1.sprite.classList.remove("active1_hero1");
		hero2.sprite.classList.remove("active2_hero2");
	}, 200);
}


// animation of the hero's 1 death
function getLost1() {

	hero1.sprite.classList.add("active1_hero1");
	hero2.sprite.classList.add("active3_hero2");
	
	setTimeout(function() {
		hero1.sprite.classList.remove("active1_hero1");
	}, 200);
}


// hero 2 hitting animation
function getHit2() {

	hero2.sprite.classList.add("active1_hero2");
	hero1.sprite.classList.add("active2_hero1");

	setTimeout(function() {
		hero2.sprite.classList.remove("active1_hero2");
		hero1.sprite.classList.remove("active2_hero1");
	}, 100);
}


// animation of the hero's 2 death
function getLost2() {

	hero2.sprite.classList.add("active1_hero2");
	hero1.sprite.classList.add("active3_hero1");
	
	setTimeout(function() {
		hero2.sprite.classList.remove("active1_hero2");
	}, 200);
}


// variables for feedback section 
var message = document.querySelector( ".feedback__message" );
var punchField = document.querySelector( ".feedback__input--field" );
var punchBtn = document.querySelector( ".feedback__input--button" );


// display message animation 
function typing( hero ){
	
	// add an event listener when the button 'punch' is clicked
	punchBtn.addEventListener( "click", handler ); 
	
	flag2 = true;
	
	// assign a value to the flag3 
	if( hero == hero1 ){
		flag3 = true;
	} else {
		flag3 = false;
	}
	
	delAnimation();
	addAnimation();
	
	message.innerHTML = hero.name + ", time to punch your enemy!";
	message.style.color = "#00B945";
	punchBtn.style.backgroundColor = "#00B945";
	punchBtn.style.cursor = "pointer";
}


// display of the lives of the hero
function setLife( hero ){
	
	hero.life.style.transition = "2s";
	var x = 93.33;
	hero.life.style.width = hero.code.length * x + "px";
}


// adding animation
function addAnimation() {
	
	setTimeout(function() {
		message.classList.add("active");
	}, 100);
}


// delete animation
function delAnimation() {
	
	message.classList.remove("active");
}


// button 'punch' click handler
function handler() {
	
		if ( flag1 && !isNaN( parseFloat( punchField.value ) ) && isFinite(punchField.value) ) {
			
			// call checking the entered number
			punchTest( punchField.value, hero2 );
			punchField.value = "";
			return;
		} 
		if ( !flag1 && !isNaN( parseFloat(punchField.value) ) && isFinite(punchField.value) ) {
			
			// call checking the entered number
			punchTest( punchField.value, hero1 );
			punchField.value = "";
			return;
		}
}


// check the entered number
function punchTest( value, hero ) {
			
	punchBtn.removeEventListener( "click", handler );

	for ( var i = 0; i < hero.code.length; i++ ) {
		
		if ( hero.code[i] == value ) {
			hero.code.splice( i, 1 );

			if ( hero.code.length > 0 ){
				
				setTimeout(function(){
					setLife( hero );
					damage.wound(hero);
					
					if ( !flag3 ){
						getHit2();
						punchSound2.play();
					} 
					else {
						getHit1();
						punchSound1.play();
					}
				},5);
				
			} else {
				
				setLife( hero );
				damage.killed( hero );
				damage.enemySpeech( hero );
				mainSound2.pause();
				displayWinnerPage( hero );
				toWinnerPage();
				
				if ( !flag3 ) {
					getLost2();
					deadSound2.play();
					if ( flag1 ) {
						loseSound.play();
					} else {
						winSound.play();
					}
					
				} else {
					
					getLost1();
					deadSound1.play();
					
					if ( !flag1 ) {
						loseSound.play();
					} else {
						winSound.play();
					}
				}
				return;
			}
			
		} else {
			damage.past( hero );
			errorSound.play();
		}
	}
	
	setTimeout(function() { 
		if ( flag3 ) {
			flag3 = false;
		} else {
			flag3 = true;
		}
	}, 10);	
			 
	if( flag2 ) {
		
		setTimeout(function() {
			enemyPunch( hero );
			flag2 = false;
		}, 2500);
	}
	
	if ( !flag2 ) {
		
		setTimeout(function() {
			typing( hero );
		}, 2500);
	}
}


// displays the winner 
function displayWinnerPage( hero ){
	
	if ( hero == hero1 ){
		winnerTitle.innerHTML = "OUR WINNER IS " + hero2.name + "!!! CONGRATULATION!";
		winnerImg.style.backgroundImage = "url('" + winnerArr[1] + "')";
	} else {
		winnerTitle.innerHTML = "OUR WINNER IS " + hero1.name + "!!! CONGRATULATION!";
		winnerImg.style.backgroundImage = "url('" + winnerArr[0] + "')";
	}
}


// displays the 'winner page'
function toWinnerPage() {
	
	setTimeout(function() {
		gamePage.style.display = "none";
		winnerPage.style.display = "flex";
	}, 2500)
}


// an object that contains messages that reflect reaction to a punch
var damage = {
	
	past: function( heroName ) {
		delAnimation();
		addAnimation();
		message.innerHTML = "Unsuccessful attempt";
		message.style.color = "#B12C49";
		punchBtn.style.backgroundColor = "#B12C49";
		punchBtn.style.cursor = "wait";
	},
	
	wound: function( heroName ) {
		delAnimation();
		addAnimation();
		message.innerHTML = heroName.name + " was wounded";
		message.style.color = "#B12C49";
		punchBtn.style.backgroundColor = "#B12C49";
		punchBtn.style.cursor = "wait";
	},
	
	killed: function( heroName ) {
		addAnimation();
		message.innerHTML = heroName.name + " was killed";
		message.style.color = "#B12C49";
		punchBtn.style.backgroundColor = "#B12C49";
		punchBtn.style.cursor = "wait";
	},
	
	enemySpeech: function( heroName ) {
		delAnimation();
		addAnimation();
		winnerMessage.innerHTML = '"Don`t joke with me, ' + heroName.name + '!"';
		winnerMessage.classList.add("active");
	}
}


// display the message that the enemy is striking 
// and calling a function that will pick up a number for the punch
function enemyPunch( hero ) {
	
	delAnimation();
	addAnimation();
	
	message.innerHTML = hero.name + " strikes back";
	
	// calling a function that will pick up a number for the punch
	randomEnemyNumber(hero);
}


// pick up a number for the punch
function randomEnemyNumber( hero ) {
	
	var hit = Math.floor( Math.random() * 10 );
	
	if ( check(hit) ){
		randomEnemyNumber(hero);
		
	} else {
		
		enemyArr.push( hit );
		
		if( flag1 ) {
			
			setTimeout(function() {
				punchTest( hit, hero1 );
			}, 2500);
		}
		
		if( !flag1 ) {
			
			setTimeout(function() {
				punchTest( hit, hero2 );
			}, 2500);
		}
	}
}


// checking the number that the enemy picked up
function check( hit ) {

	for( var i = 0; i < enemyArr.length; i++ ){
		
		// if the number has already been - returned true
		if ( hit == enemyArr[i] )
			return true;
	}	 
	return false;
}


// click button 'new game' handler
newGame.addEventListener( "click", startNewGame );


function startNewGame(){
	window.location.reload();
}