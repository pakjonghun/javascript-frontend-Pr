import GameBuilder, { Status } from "./game.js";
import Modal from "./model.js";

const modal = new Modal();
const game = new GameBuilder()
  .setDuration(10) //
  .setCarrot(3)
  .setBug(10)
  .build();

modal.setOnClick(readyToRestart);

const stopListener = (gameStatus) => {
  switch (gameStatus) {
    case Status.win:
      modal.setOnClick(readyToRestart);
      modal.updateMessage("이겼습니다!!");
      modal.toggleModal();
      break;
    case Status.lose:
      modal.setOnClick(readyToRestart);
      modal.updateMessage("졌네요!!");
      modal.toggleModal();
      break;
    case Status.pause:
      modal.setOnClick(null);
      modal.updateMessage("잠시 멈추었습니다.!!");
      modal.toggleModal();
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
