const main = document.querySelector('main');
const newLocation =main.getBoundingClientRect();
const CARROT='carrot';
const BUG='bug';

function getRandomLocation(min,max){
    return Math.random() * (max - min) + min;
}

function randomItemMaker(item){
    const temp = document.createElement('img');
    temp.setAttribute('src',`./img/${item}.png`);
    temp.classList.add(`absolute`);
    temp.classList.add(item);
    const x=getRandomLocation(0,newLocation.width);
    const y = getRandomLocation(0,newLocation.height);
    temp.style.transform=`translate(${x<80?x:x-80}px,${y<80?y:y-80}px)`;
    main.appendChild(temp);
}



function renderItems({bug,carrot}){
    main.innerHTML=""


    for(let i = 0;i<bug;i++){
        randomItemMaker(BUG);
    }

    for(let i = 0;i<carrot;i++){
        randomItemMaker(CARROT);
    }
}

function loseGame(){
    dialog.classList.toggle('none');
    message.textContent="졌습니다."
    stopTimer();
    isPlaying=false;
    carrotCount= initCount;
    makeSounds('alert.wav').play();
    sounds.bg.pause();
}




function winGame(){
    dialog.classList.toggle('none');
    message.textContent="이겼습니다."
    carrotCount= initCount
    stopTimer();
    isPlaying=false
    makeSounds('game_win.mp3').play();
    sounds.bg.pause();

}

function onTargetCLick(event){
    if(!isPlaying)return;

    const contain = event.target.classList;

    switch (true) {
        case contain.contains(BUG):
            loseGame();
            break;
        case contain.contains(CARROT):
            makeSounds('carrot_pull.mp3').play();
            --carrotCount
            countRender();
            event.target.classList.add('none');

            if(!carrotCount)winGame();
            break;

        default:
            break;
    }
    
}

main.addEventListener('click',onTargetCLick)
