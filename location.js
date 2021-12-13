const main = document.querySelector('main');
const newLocation =main.getBoundingClientRect();
const CARROT='carrot';
const BUG='bug';

function getRandomLocation(){
    const x =Math.floor(Math.random()*newLocation.width+1);
    const y = Math.floor(Math.random()*newLocation.height+1);
    return {x,y}
}

function randomItemMaker(item){
    const temp = document.createElement('img');
    temp.setAttribute('src',`./img/${item}.png`);
    temp.classList.add(`absolute`);
    temp.classList.add(item);
    const {x,y}=getRandomLocation();
    temp.style.transform=`translate(${x-temp.width/2}px,${y-temp.height/2}px)`;
    main.appendChild(temp);
}



function renderItems({bug,carrot}){
    const rest = document.querySelectorAll('.absolute');
    rest.forEach(item=>item.remove());


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
