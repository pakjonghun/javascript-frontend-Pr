import Timer from "./timer.js";
import TimeBtn from "./timerBtn.js";
import Score from "./score.js";
import Field from "./field.js";
import Modal from "./model.js";
import Sound from "./sound.js";

const initSecond = 5;
const initCarrots = 5;
const initBugs = 10;
let isEnded = true;

const timeBtn = new TimeBtn();
const timer = new Timer(initSecond);
const score = new Score(initCarrots);
const field = new Field(initCarrots, initBugs);
const modal = new Modal();
const sound = new Sound();

modal.setOnClick(readyToRestart);
field.setOnItemClick(onItemClick);

function onItemClick(classList) {
  switch (true) {
    case classList.contains("carrot"):
      sound.carrotSound.play();
      score.onCarrotClick();
      if (!score.getCurCarrot()) {
        endGame("You win!");
      }
      break;
    case classList.contains("bug"):
      sound.bugSound.play();
      endGame("You lose!");
      break;

    default:
      break;
  }
}

const onTimerStart = () => {
  if (!timer.totalSecond) {
    endGame("You lose!");
    return;
  }

  timer.totalSecond--;
  const curTime = timer.getTimes();
  timer.render(curTime);
};

const onTimeBtnClick = () => {
  field.setIsPlaying(timeBtn.isPlay);
  score.reset(initCarrots);

  if (timeBtn.isPlay) {
    sound.bgSound.pause();
    timer.pause();
    return;
  }

  if (isEnded) {
    sound.bgSound.currentTime = 0;
    sound.bgSound.play();
    isEnded && field.render();
    isEnded = false;
  }

  sound.bgSound.play();
  timer.start(onTimerStart);
};

timeBtn.setOnClick(onTimeBtnClick);

function readyToRestart() {
  isEnded = true;
  field.clearField();
}

function endGame(message) {
  timer.pause();
  timer.reset(initSecond);
  timer.render(timer.getTimes());
  timeBtn.toggle();
  modal.updateMessage(message);
  modal.toggleModal();
  sound.bgSound.pause();
}
