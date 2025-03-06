import {
  createElement,
  hideLoadingSpinner,
  fetchCards,
  createCounter,
} from "../../utilityFunction.js";
import { createLoadingSpinner } from "../../atoms/createLoadingSpinner/createLoadingSpinner.js";
import { Button } from "../../atoms/buttons/buttons.js";

import { API_URL, FALLBACK_IMAGE } from "../../config.js";

export class Card {
  constructor(data) {
    this.artist = data.artist;
    this.button = null;
    this.counter = data.counter;
    this.id = data.id;
    this.imageUrl = data.imageUrl || FALLBACK_IMAGE;
    this.isSelected = false;
    this.manaCost = data.manaCost;
    this.name = data.name;
    this.power = data.power;
    this.rarity = data.rarity;
    this.setName = data.setName;
    this.text = data.text;
    this.toughness = data.toughness;
    this.type = data.type;
    this.wrapper = null;
  }

  toggleSelection() {
    this.isSelected = !this.isSelected;
  }

  draw() {
    const wrapper = createElement("div", {
      className: "card",
      style: `
                align-items: center;
                background-color: white;
                border-radius: 8px;
                border: 1px solid #ccc;
                box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                display: flex;
                overflow: hidden;
                padding: 12px;
                position: relative;
                transition: transform 0.3s, background-color 0.3s;
            `,
    });

    wrapper.addEventListener("mouseover", () => {
      wrapper.style.transform = "scale(1.02)";
    });

    wrapper.addEventListener("mouseout", () => {
      wrapper.style.transform = "scale(1)";
    });

    const img = createElement("img", {
      src: this.imageUrl,
      onerror: function () {
        this.src = FALLBACK_IMAGE;
      },
      style:
        "width: 100px; height: auto; border-radius: 5px; margin-right: 15px;",
      alt: this.name,
    });

    const content = createElement("div", { style: "flex-grow: 1;" });

    const title = createElement("h3", {}, this.name);
    const manaCost = createElement(
      "p",
      {},
      `Mana Cost: ${this.manaCost || "N/A"}`,
    );
    const powerToughness = createElement(
      "p",
      {},
      `P/T: ${this.power || "N/A"} / ${this.toughness || "N/A"}`,
    );

    const details = createElement("div", {
      style: `
                background: rgba(255, 255, 255, 0.9);
                border-top: 1px solid #ccc;
                color: #333;
                display: none;
                font-size: 14px;
                left: 0;
                padding: 10px;
                position: absolute;
                text-align: left;
                top: 0;
                transition: bottom 0.3s ease-in-out;
                width: 100%;
            `,
    });
    details.innerHTML = `
            <p>Type: ${this.type}</p>
            <p>Rarity: ${this.rarity}</p>
            <p>Set: ${this.setName}</p>
            <p>Text: ${this.text || "No description"}</p>
            <p>Artist: ${this.artist}</p>
        `;

    const selectButton = new Button("Select", () =>
      handleBtnCardClick(this, wrapper, selectButton, this.counter),
    );
    const showMoreButton = new Button(
      "Show More",
      () => {
        details.style.display =
          details.style.display === "none" ? "block" : "none";
        showMoreButton.setText(
          details.style.display === "none" ? "Show More" : "Show Less",
        );
      },
      "secondary",
    );

    content.append(
      title,
      manaCost,
      powerToughness,
      selectButton.getElement(),
      showMoreButton.getElement(),
      details,
    );
    wrapper.append(img, content);

    this.wrapper = wrapper;
    this.button = selectButton;

    return wrapper;
  }
}
