export default class Score {
  constructor(initScore) {
    this.score = document.querySelector(".score");
    this.render(initScore);
  }

  render = (content) => {
    this.score.textContent = content;
  };

  onCarrotClick = () => {
    this.render(Number(this.score.textContent) - 1);
  };

  reset = (init) => {
    this.render(init);
  };

  getCurCarrot = () => {
    return Number(this.score.textContent);
  };
}
