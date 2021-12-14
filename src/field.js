export default class Field {
  constructor(carrots, bugs) {
    this.field = document.querySelector(".field");
    this.carrots = carrots;
    this.bugs = bugs;
    this.field.addEventListener("click", (event) => {
      const target = event.target.classList;
      if (target.contains("absolute")) {
        if (!this.isPlaying) {
          target.add("hide");
          this.onClick && this.onClick(target);
        }
      }
    });
  }

  setOnItemClick(func) {
    this.onClick = func;
  }

  clearField = () => {
    this.field.innerHTML = "";
  };

  render = () => {
    this._locateItems("bug");
    this._locateItems("carrot");
  };

  setIsPlaying = (isPlaying) => {
    this.isPlaying = isPlaying;
  };

  _locateItems = (className) => {
    const number = className === "carrot" ? this.carrots : this.bugs;
    for (let i = 0; i < number; i++) {
      const item = this._createItem(className);
      this.field.appendChild(item);
    }
  };

  _getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  _getInFieldXY = () => {
    const x = this._getRandomNumber(0, this.field.clientWidth) - 80;
    const y = this._getRandomNumber(0, this.field.clientHeight) - 80;
    return { x: x < 80 ? x + 80 : x, y: y < 80 ? y + 80 : y };
  };

  _createItem = (className) => {
    const item = document.createElement("img");
    item.classList.add("absolute");
    item.classList.add(className);
    const basicSrc = (name) => `./img/${name}.png`;
    item.src = basicSrc(className);
    const { x, y } = this._getInFieldXY();
    item.style.transform = `translate(${x}px,${y}px)`;
    return item;
  };
}
