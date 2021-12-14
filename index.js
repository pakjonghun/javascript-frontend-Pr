const start=document.querySelector('.start');
const time=document.querySelector('.time');
const count=document.querySelector('.count');
const play =document.querySelector('.fa-play');
const pause=document.querySelector('.fa-pause');

const sounds = {
    bg:new Audio('./sound/bg.mp3')
}


const initSecond = 3;
const initMilSecond=0;
const initCount = 3;

let interval;
let second=initSecond;
let milSecond=initMilSecond;
let carrotCount = initCount;
let isPlaying=false;

function handleTimer(){
    handleMilSecond();
    renderTime();
    if(!second){
        stopTimer();
        loseGame();
    }
}

function renderTimerButton(){
    play.classList.toggle('none');
    pause.classList.toggle('none');
}

function initializeButton(){
    if(play.classList.contains('none')){
        play.classList.remove('none');
    }

    if(!pause.classList.contains('none')){
        pause.classList.add('none');
    }
}

function countRender(){
    count.textContent=carrotCount;
}

function timerTrigger(){
    
    if(!isPlaying){
        sounds.bg.currentTime=0;
        sounds.bg.play();
        renderItems({bug:10,carrot:3});
        isPlaying=true;
    }

    if(!interval){
        sounds.bg.play();
        startTimer();
    }else{
        sounds.bg.pause();
        pauseTimer();

    }


    renderTimerButton();
    countRender();
}

function pauseTimer(){
    clearInterval(interval);
    interval=null;
}

function startTimer(){
    interval=setInterval(handleTimer,100);
}

function handleMilSecond(){
    if(milSecond===10){
        handleSecond();
        milSecond=0;
        return;
    }
    milSecond++
}

function handleSecond(){
    second--;
}

function stopTimer(){
    clearInterval(interval);
    second=initSecond;
    milSecond=initMilSecond;
    interval=null;
    initializeButton();
}

function renderTime(){
    const newSecond = String(second).length===1?`0${second}`:second;
    const newMilSecond = String(milSecond).length===1?`0${milSecond}`:milSecond

    time.textContent=`${newSecond}:${newMilSecond}`
}


function init(){
    start.addEventListener('click',timerTrigger);
}

init();