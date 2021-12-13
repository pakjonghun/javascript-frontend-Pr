const main = document.querySelector('main');
const newLocation =main.getBoundingClientRect();


function getRandomLocation(){
    const x =Math.floor(Math.random()*newLocation.width+1);
    const y = Math.floor(Math.random()*newLocation.height+1);
    return {x,y}
}

function renderItems(){
    const carrot = document.createElement('img');
    carrot.setAttribute('src',"./img/carrot.png");
    carrot.classList.add('absolute');
    const {x,y}=getRandomLocation();
    carrot.style.transform=`translate(${x-carrot.width/2}px,${y-carrot.height/2}px)`;
    main.appendChild(carrot);
}

renderItems()