export default class Sound {
  constructor() {
    this.bugSound = new Audio("./sound/bug_pull.mp3");
    this.carrotSound = new Audio("./sound/carrot_pull.mp3");
    this.bgSound = new Audio("./sound/bg.mp3");
    this.lose = new Audio("./sound/alert.wav");
    this.win = new Audio("./sound/game_win.mp3");
  }
}
