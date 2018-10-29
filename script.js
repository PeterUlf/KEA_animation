window.addEventListener("load", sidenVises);

var timeLeftInit = 1000;
let antalAallerkener = 10;
var scoreMax = 50;
let antalPrutter = 4;
let pointGroentsag = 1;
let pointKoed = -3;
let hiScore = 0;
let mySettingEffektSound = true;
let mySettingMusic = true;
const audio_start = document.querySelector("#musik");
const audio_slut = document.querySelector("#musikSlut");
musikSlut



var timeLeft;
var score;
let gameRunning;


function sidenVises() {
    console.log("All resources finished loading!");
    //    console.log("mySettingMusic er nu " + mySettingMusic)
    document.getElementById("start").addEventListener("click", myStart);
    document.getElementById("gameover").addEventListener("click", myReplay);
    document.getElementById("settings").addEventListener("click", mySetting);

    document.getElementById("setting_effekt_sound").addEventListener("click", mySettingEffektSoundFc);
    document.getElementById("setting_music").addEventListener("click", mySettingMusicFc);
    //    document.querySelector("#start").classList.remove("hide");


    document.querySelector("#mad1").className = "mad";
    document.querySelector("#mad2").className = "mad";
    document.querySelector("#mad3").className = "mad";
    document.querySelector("#mad4").className = "mad";
    document.querySelector("#mad5").className = "mad";
    document.querySelector("#mad6").className = "mad";
    document.querySelector("#mad7").className = "mad";
    document.querySelector("#mad8").className = "mad";
    document.querySelector("#mad9").className = "mad";
    document.querySelector("#mad10").className = "mad";



}

function myStart() {
    timeLeft = timeLeftInit;
    score = 0;
    gameRunning = "igang";

    // console.log("functionen myStart");
    startSpil = setTimeout(myStartSpil, 2000);


    if (mySettingMusic == true) {
        console.log("mySettingMusic er nu " + mySettingMusic);


        //        audio_start = document.getElementById("musik");

        audio_start.volume = 0.3;
        audio_start.currentTime = 0;
        audio_start.play();
    }


    var start = document.getElementById("start");
    start.classList.add("hide");

    document.querySelector("#mad1").addEventListener('click', foodClick);
    document.querySelector("#mad2").addEventListener('click', foodClick);
    document.querySelector("#mad3").addEventListener('click', foodClick);
    document.querySelector("#mad4").addEventListener('click', foodClick);
    document.querySelector("#mad5").addEventListener('click', foodClick);
    document.querySelector("#mad6").addEventListener('click', foodClick);
    document.querySelector("#mad7").addEventListener('click', foodClick);
    document.querySelector("#mad8").addEventListener('click', foodClick);
    document.querySelector("#mad9").addEventListener('click', foodClick);
    document.querySelector("#mad10").addEventListener('click', foodClick);

    document.querySelector("#score").innerHTML = "Score: " + score;
    document.querySelector("#hi_score").innerHTML = "Hi-score " + hiScore;
}

function foodClick() {


    if (this.classList.contains("groentsag")) {
        this.classList.remove("groentsag");
        myGroentsagRemove();
        grow();
    }

    if (this.classList.contains("koed")) {
        this.classList.remove("koed");
        myKoedRemove();
        grow();
    }

}

function grow() {
    document.querySelector("#score").innerHTML = "Score " + score;
    document.querySelector("#hi_score").innerHTML = "Hi-score " + hiScore;
    document.querySelector("#point").className = "";
    window.requestAnimationFrame(function (time) {

        window.requestAnimationFrame(function (time) {
            document.querySelector("#point").className = "growAndDisapear";
        });
    });
}

function myGroentsagRemove() {
    console.log("mySettingMusic function i grøntsag remove" + mySettingMusic);
    score = score + pointGroentsag;
    if (hiScore <= score) {
        hiScore = score;
    }
    console.log("myGroentsagRemove kører point er " + score);
    document.getElementById("point").innerHTML = "+" + pointGroentsag;
    effekt("hapshaps");

    timeLeft = timeLeft + 100;
    if (timeLeft > timeLeftInit) {
        timeLeft = timeLeftInit;
    }

    if (score >= scoreMax) {
        gameRunning = "vundet";
        myGameover();


    }
    //    document.querySelector("#score").innerHTML = "Point " + point;
    updateTimeLeftFc();
}

function myKoedRemove() {
    console.log("koedRemove kører");
    document.getElementById("point").innerHTML = pointKoed;
    document.querySelector("#prut").className = "";
    window.requestAnimationFrame(function (time) {

        window.requestAnimationFrame(function (time) {
            document.querySelector("#prut").className = "prut_action";
        });
    });

    //nulstiller animationen gentegner animationen


    let prutNr = 'prut' + myRandom(antalPrutter);
    effekt(prutNr);
    score = score + pointKoed;
    timeLeft = timeLeft + 500;
    if (timeLeft > timeLeftInit) {
        timeLeft = timeLeftInit;
    }
    //    document.querySelector("#score").innerHTML = "Point " + point;
    updateTimeLeftFc();

}

function myStartSpil() {
    // Opdaterer tid tilbage
    timeLeftFc();
    //tilføjer grøntsag til tilfældigt madnr
    addMad();
    //fjerner grøntsag til tilfældigt madnr
    removeMad();
}

function timeLeftFc() {
    // console.log("timeLeftFc kører");

    if (timeLeft > 0) {
        updateTimeLeftFc();
        timeLeft--;

        if (gameRunning == "igang") {
            setTimeout(timeLeftFc, 10);
        }

    } else {
        //time is up
        gameRunning = "tabt";
        myGameover();
    }
}

function addMad() {
    // console.log("addMad kører ");
    let madNr = 'mad' + myRandom(antalAallerkener);
    let element = document.getElementById(madNr);
    if (Math.random() < 0.5 && element.className === 'mad') {
        element.classList.add("groentsag");
        effekt("haps");
    } else if (Math.random() > 0.5 && element.className === 'mad') {
        element.classList.add("koed");
        effekt("haps");
    }

    if (gameRunning == "igang") {
        setTimeout(addMad, 200);
    }
}

function removeMad() {
    // // console.log("removeMad kører ");
    let madNr = 'mad' + myRandom(antalAallerkener);
    var element = document.getElementById(madNr);
    if (element.classList.contains('groentsag'))
        element.classList.toggle('groentsag');
    if (element.classList.contains('koed'))
        element.classList.toggle('koed');
    if (gameRunning == "igang") {
        setTimeout(removeMad, 1000);
    }

}

function fade() {
    console.log("fadefunctionen");

    console.log("mySettingMusic function " + mySettingMusic);


    if (audio_start.volume > 0.1) {
        audio_start.volume -= 0.1;
        setTimeout(fade, 100);

    } else {

        audio_start.pause();
        let audio_slut = document.getElementById("musikSlut");
        audio_slut.volume = 0.2;
        audio_slut.play();




    }
}


//math random funtion fundet på nettet
function myRandom(num) {
    // console.log("functionenn myrandom");
    let tilfaeldigttal = Math.floor(Math.random() * num) + 1;
    return tilfaeldigttal;
}

function effekt(lyden) {
    if (mySettingEffektSound == true) {
        let audio = document.getElementById(lyden);
        audio.volume = 0.5;
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}


function updateTimeLeftFc() {
    //    console.log("updateTimeLeftFc");

    procentLeft = 1 - ((timeLeftInit - timeLeft) / timeLeftInit);
    lifeBarHeight = procentLeft * 30 + "vw";
    color = "hsl(" + (procentLeft * 126) + ", 49% , 50%)";
    document.getElementById("thermometer_udslag").style.height = lifeBarHeight;
    document.getElementById("thermometer_udslag").style.background = color;


}

function myGameover() {

    console.log("mySettingMusic function i gameover" + mySettingMusic);
    console.log("gameover med værdien " + gameRunning);
    hiScore = score;

    if (gameRunning == "vundet") {
        document.querySelector("#gameover").classList.remove("hide");
        document.querySelector("#gameover_screen").innerHTML = "<h1>Tillykke</h1><p>" + score + " point <br>...." + "men man prutter også af kål </p> ";
        document.querySelector("#gameover_screen").style.fontSize = "2rem";
        if (mySettingMusic == true) {
            fade();
        }
    } else if (gameRunning == "tabt") {

        document.querySelector("#gameover").classList.remove("hide");
        document.querySelector("#gameover_screen").innerHTML = "<h1>Game over</h1><p>Du fik " + score + " point</p>";
        //    gameRunning = false;
        if (mySettingMusic == true) {
            fade();
        }
    }
}

function myReplay() {
    console.log("replay function ");

    document.querySelector("#replay").classList.add("roter");


    document.querySelector("#replay").addEventListener("animationend", myEndFunction);

}

function myEndFunction() {
    document.querySelector("#replay").classList.remove("roter");
    document.querySelector("#gameover").classList.add("hide");
    sidenVises();
    myStart();
}

function mySetting() {
    console.log("setting function ");
    document.querySelector("#settings_screen").classList.toggle('hide');

}

function mySettingEffektSoundFc() {
    console.log("mySettingEffektSound function ");
    mySettingEffektSound = !mySettingEffektSound;
}


function mySettingMusicFc() {
    console.log("mySettingMusic function " + mySettingMusic);
    mySettingMusic = !mySettingMusic;


    if (mySettingMusic == false) {

        audio_start.pause();
    } else {
        audio_start.play();
    }

}
