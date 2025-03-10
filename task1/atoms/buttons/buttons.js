import { createElement } from "../../utilityFunction.js";
export class Button {
  constructor(text, onClick, type = "primary") {
    this.button = createElement("button", {
      textContent: text,
    });

    this.button.className = `btn ${type}`;

    //   this.button.addEventListener("mouseover", () => {
    //     this.button.style.opacity = "0.9";
    //     this.button.style.boxShadow = "4px 4px 12px rgba(0, 0, 0, 0.2)";
    //   });

    //   this.button.addEventListener("mouseout", () => {
    //     this.button.style.opacity = "1";
    //     this.button.style.boxShadow = "2px 2px 8px rgba(0, 0, 0, 0.1)";
    //   });

    this.button.addEventListener("click", onClick);
  }

  getElement() {
    return this.button;
  }

  setText(text) {
    this.button.textContent = text;
  }
}
