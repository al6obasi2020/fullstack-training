import { createElement } from "../../utilityFunction.js";

export class DarkModeToggle {
  constructor() {
    this.button = createElement(
      "button",
      {
        className: "btn primary",
        id: "toggle-mode",
        onclick: () => this.toggleDarkMode(),
      },
      "Switch to Dark Mode",
    );
  }

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    this.button.textContent = body.classList.contains("dark-mode")
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  }

  getElement() {
    return this.button;
  }
}
