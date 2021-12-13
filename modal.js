const message = document.querySelector('.message');
const retry = document.querySelector('.retry');
const dialog = document.querySelector('.dialog');


function onRetry(){
    dialog.classList.toggle('none');
}

retry.addEventListener('click',onRetry);