export default class Modal {
  constructor() {
    this.wrapper = document.querySelector(".wrapper");
    this.message = document.querySelector(".message");
    this.retryBtn = document.querySelector(".retryBtn");
    this.retryBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.toggleModal();
    });
  }

  toggleModal = () => {
    this.wrapper.classList.toggle("hide");
  };

  updateMessage = (content) => {
    this.message.textContent = content;
  };

  setOnClick = (func) => {
    this.onClick = func;
  };
}
