const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
audioContext.resume();

const audio = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audio);

const promise = audio.play();
function startAudio(){
    promise.then().catch(err=>console.log(err))
}


startAudio();



