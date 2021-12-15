import Field from "./field.js";
import Score from "./score.js";
import Sound from "./sound.js";
import Timer from "./timer.js";
import TimeBtn from "./timerBtn.js";

const sound = new Sound();

export const Status = Object.freeze({
  win: "win",
  lose: "lose",
  pause: "pause",
});

export default class GameBuilder {
  setDuration(duration) {
    this.duration = duration;
    return this;
  }

  setCarrot(carrot) {
    this.carrot = carrot;
    return this;
  }

  setBug(bug) {
    this.bug = bug;
    return this;
  }

  build() {
    return new Game(this.duration, this.carrot, this.bug);
  }
}

class Game {
  constructor(initSecond, initCarrots, initBugs) {
    this.initSecond = initSecond;
    this.initCarrots = initCarrots;
    this.initBugs = initBugs;
    this.isEnded = true;
    this.timeBtn = new TimeBtn();
    this.timer = new Timer(initSecond);
    this.score = new Score(initCarrots);
    this.field = new Field(initCarrots, initBugs);
    this.field.setOnItemClick(this.onItemClick);
    this.timeBtn.setOnClick(this.onTimeBtnClick);
  }

  onItemClick = (classList) => {
    switch (true) {
      case classList.contains("carrot"):
        sound.carrotSound.play();
        this.score.onCarrotClick();
        if (!this.score.getCurCarrot()) {
          sound.win.play();
          sound.bgSound.pause();
          this.end(Status.lose);
        }
        break;
      case classList.contains("bug"):
        sound.bgSound.pause();
        sound.lose.play();
        this.end(Status.lose);
        break;

      default:
        break;
    }
  };

  setStopListener = (func) => {
    this.stopListener = func;
  };

  onTimerStart = () => {
    if (!this.timer.totalSecond) {
      sound.bgSound.pause();
      sound.lose.play();
      this.end(Status.lose);
      return;
    }

    this.timer.totalSecond--;
    const curTime = this.timer.getTimes();
    this.timer.render(curTime);
  };

  onTimeBtnClick = () => {
    this.field.setIsPlaying(this.timeBtn.isPlay);

    if (this.timeBtn.isPlay) {
      sound.bgSound.pause();
      this.timer.pause();
      this.stopListener && this.stopListener(Status.pause);
      return;
    }

    if (this.isEnded) {
      sound.bgSound.currentTime = 0;
      sound.bgSound.play();
      this.field.render();
      this.score.reset(this.initCarrots);
      this.isEnded = false;
    }

    sound.bgSound.play();
    this.timer.start(this.onTimerStart);
  };

  end = (status) => {
    this.timer.pause();
    this.timer.reset(this.initSecond);
    this.timer.render(this.timer.getTimes());
    this.timeBtn.toggle();
    this.stopListener && this.stopListener(status);
  };
}
