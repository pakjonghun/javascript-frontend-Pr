export default class Timer {
  constructor(totalSecond) {
    this.timer = document.querySelector(".timer");
    this.totalSecond = totalSecond;
    this.interval;
    this.render(this.getTimes());
  }

  start = (actionFunc) => {
    this.interval = window.setInterval(actionFunc, 1000);
  };

  pause = () => {
    window.clearInterval(this.interval);
    this.interval = null;
  };

  reset = (second) => {
    this.totalSecond = second;
  };

  render = (content) => {
    this.timer.textContent = content;
  };

  getTimes = () => {
    const minute = Math.floor(this.totalSecond / 60);
    const second = this.totalSecond % 60;
    return `${minute}:${second}`;
  };
}
