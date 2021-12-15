"use strict";

import Field from "./field.js";
import Score from "./score.js";
import Timer from "./timer.js";
import TimeBtn from "./timerBtn.js";

export const ItemName = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export const Status = Object.freeze({
  start: "start",
  win: "win",
  lose: "lose",
  pause: "pause",
  restart: "restart",
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

  onItemClick = (itemName) => {
    switch (itemName) {
      case ItemName.carrot:
        this.score.onCarrotClick();
        this.stopListener && this.stopListener(ItemName.carrot);

        if (!this.score.getCurCarrot()) {
          this.end(Status.win);
        }
        break;

      case ItemName.bug:
        this.end(Status.lose);
        break;

      default:
        throw new Error("오류발생");
    }
  };

  setStopListener = (func) => {
    this.stopListener = func;
  };

  timeBtnAddFunc = () => {
    if (!this.timer.totalSecond) {
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
      this.timer.pause();
      this.stopListener && this.stopListener(Status.pause);
      return;
    }

    if (this.isEnded) {
      this.stopListener && this.stopListener(Status.start);
      this.field.render();
      this.score.reset(this.initCarrots);
      this.isEnded = false;
    }

    this.timer.start(this.timeBtnAddFunc);
    this.stopListener && this.stopListener(Status.restart);
  };

  end = (status) => {
    this.timer.pause();
    this.timer.reset(this.initSecond);
    this.timer.render(this.timer.getTimes());
    this.timeBtn.toggle();
    this.stopListener && this.stopListener(status);
  };
}
