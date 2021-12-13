const start=document.querySelector('.start');
const time=document.querySelector('.time');
const count=document.querySelector('.count');
const play =document.querySelector('.fa-play');
const pause=document.querySelector('.fa-pause');


const initSecond = 3;
const initMilSecond=0;

let interval;
let second=initSecond;
let milSecond=initMilSecond;

function handleTimer(){
    handleMilSecond();
    renderTime();
    if(!second)stopTimer();
}


function renderTimerButton(){
    play.classList.toggle('none');
    pause.classList.toggle('none');
}

function initializeButton(){
    console.log(play.classList.contains('none'));
    console.log(play.classList.value)
    if(play.classList.contains('none')){
        play.classList.remove('none');
    }

    if(!pause.classList.contains('none')){
        pause.classList.add('none');
    }
}

function timerTrigger(){
    if(!interval){
        startTimer();
    }else{
        pauseTimer();
    }
    renderTimerButton();
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