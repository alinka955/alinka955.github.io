// Create your global variables below:
var tracklist = ["Let's Go Up", "Shield", "Not Alone", "Concrete Evidence", "Freedom", "Brave", "A Root out of Dry Ground", "Lawgiver", "Disciples", "A Tender Plant"];
var volLevels = [];
const DEFAULT_COLOR = 'rgb(95, 147, 154)'

//Retrieve element nodes from DOM
var switchBtn = document.getElementById('switch-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var volumeUpBtn = document.getElementById('volume-up');
var volumeDownBtn = document.getElementById('volume-down');
const slider = document.querySelector('.slider');


let track_index = 0;
let isPlaying = false;
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');

function init() {
	for (let i=0; i<3; i++){
		let btn = document.getElementById("vl"+i);
		btn.style.backgroundColor = DEFAULT_COLOR;
	}
	for (let i=3; i<6; i++){
		let btn = document.getElementById("vl"+i);
		btn.style.backgroundColor = "white";
	}
};


volumeUpBtn.addEventListener('click', function onClick() {
	for(let i = 0; i<6; i++){
			let btn = document.getElementById("vl"+i);
			console.log(btn.style.backgroundColor);
			if(btn.style.backgroundColor=="white"){
				btn.style.backgroundColor = DEFAULT_COLOR;
				break;	
			}	
		}
	});

volumeDownBtn.addEventListener('click', function onClick() {
	for(let i = 5; i>=0; i--){
		let btn = document.getElementById("vl"+i);
		console.log(btn.style.backgroundColor);
		if(btn.style.backgroundColor==DEFAULT_COLOR){
			btn.style.backgroundColor = "white";
			break;		
		}
	}
  });

let sliderPosition = 0;
function switchPlay() {
	//console.log(switchBtn);
	if(switchBtn.firstChild.innerHTML == "play_arrow") {
		switchBtn.firstChild.innerHTML = "pause";
		//every time the pause is hit, start set interval
		updateTimer = setInterval(oneSecond, 1000);	
		isPlaying = true;	
			
	  }
	  else {
		switchBtn.firstChild.innerHTML = "play_arrow";
		isPlaying=false;	
		clearInterval(updateTimer);
	  }	 
	  
}

let countSec = 0;

function oneSecond(){
	let timestamp = document.getElementById("left");
	countSec++;
	let increment = secondsToMs(countSec);
	timestamp.innerHTML=increment;
	let position = countSec*(180/180);
	slider.value = position;
	
	if(countSec>=180){
		countSec=0;
		resetValues();
		nextSong();
	}
	nextBtn.addEventListener('click', (nextSong) => {
		countSec=0;
	
	})
	switchBtn.addEventListener('click', (switchPlay) => {

	}
	)
	prevBtn.addEventListener('click', (prevSong) => {
		countSec=0;
	
	})
	
}

let songCount = 0;



function nextSong() {
	
	//nextBtn.addEventListener('click', (nextSong) => {

	clearInterval(updateTimer);
	resetValues();
	updateTimer = setInterval(oneSecond, 1000);	

	
	
	//circular array
	songCount= (songCount+1)%tracklist.length;
	
	currentTrack = document.getElementById("track");
	currentTrack.innerHTML = tracklist[songCount];

	//console.log(currentTrack);

	//reset the time, reset the value of the range item to 0
	//use circular array to stop at 180 and change value in range tag
	
		
	//}
	//)
}
	

function resetValues() {
	let timestamp = document.getElementById("left");
	timestamp.innerHTML="0:00";
	slider.value = 0;
	
  }

let songBack = tracklist.length;

function prevSong() {
	clearInterval(updateTimer);
	resetValues();
	updateTimer = setInterval(oneSecond, 1000);	

	//circular array
	songBack = (songBack+1)%tracklist.length;
	
	let currentTrack = document.getElementById("track");
	currentTrack.innerHTML = tracklist[songBack];


}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);
    //console.log(`00${sec}`);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

switchBtn.addEventListener('click', switchPlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
curr_track.addEventListener("ended", nextSong);



init();