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
    console.log(0,newLocation.width,x)
    console.log(0,newLocation.height,y)
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
}




function winGame(){
    dialog.classList.toggle('none');
    message.textContent="이겼습니다."
    carrotCount= initCount
    stopTimer();
    isPlaying=false

}

function onTargetCLick(event){
    if(!isPlaying)return;

    const contain = event.target.classList;

    switch (true) {
        case contain.contains(BUG):
            loseGame();
            break;
        case contain.contains(CARROT):
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
