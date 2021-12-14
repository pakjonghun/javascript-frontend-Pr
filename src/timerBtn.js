export default class TimeBtn {
  constructor() {
    this.isPlay = false;
    this.fas = document.getElementById("fas");
    this.timerBtn = document.querySelector(".timerBtn");
    this.timerBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.toggle();
    });
  }

  setOnClick = (func) => {
    this.onClick = func;
  };

  toggle = () => {
    this.isPlay = !this.isPlay;
    this.fas.classList.toggle("fa-pause");
    this.fas.classList.toggle("fa-play");
  };
}
