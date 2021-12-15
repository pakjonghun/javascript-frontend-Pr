"use strict";

import GameBuilder, { ItemName, Status } from "./game.js";
import Sound from "./sound.js";
import Modal from "./model.js";
const sound = new Sound();

const modal = new Modal();
const game = new GameBuilder()
  .setDuration(10) //
  .setCarrot(3)
  .setBug(10)
  .build();

modal.setOnClick(readyToRestart);

const stopListener = (gameStatus) => {
  switch (gameStatus) {
    case Status.start:
      sound.bgSound.currentTime = 0;
      sound.bgSound.play();
      break;
    case Status.restart:
      sound.bgSound.play();
      break;
    case Status.win:
      openModal("이겼습니다!!");
      sound.win.play();
      break;
    case Status.lose:
      openModal("졌습니다.!!");
      sound.lose.play();
      break;
    case Status.pause:
      sound.bgSound.pause();
      break;
    case ItemName.carrot:
      sound.carrotSound.play();
      break;
    default:
      throw new Error("오류발생");
  }
};

game.setStopListener(stopListener);

function readyToRestart() {
  game.isEnded = true;
  game.field.clearField();
}

function openModal(message) {
  modal.setOnClick(readyToRestart);
  modal.updateMessage(message);
  modal.toggleModal();
  sound.bgSound.pause();
}
