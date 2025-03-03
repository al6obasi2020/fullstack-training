import { generateCardHTML } from "../../organism/generateCardHTML/generateCardHTML.js";
import { setupGridContainer } from "../../Molecule/setupGridContainer/setupGridContainer.js";
import { fetchCards } from "../../utilityFunction.js";
export class CardList {
  constructor(counter) {
    this.cards = [];
    this.counter = counter;
  }

  async loadCards() {
    this.cards = await fetchCards();
    this.draw();
  }

  draw() {
    const container = setupGridContainer();
    this.cards.forEach((card) => {
      container.appendChild(generateCardHTML(card, this.counter));
    });

    document.body.appendChild(container);
  }

  selectAll() {
    this.cards.forEach((card) => {
      if (!card.isSelected) {
        card.isSelected = true;
        card.wrapper.style.backgroundColor = "#d1ffd1";
        card.button.setText("Deselect");
        this.counter.increment();
      }
    });
  }

  deselectAll() {
    this.cards.forEach((card) => {
      if (card.isSelected) {
        card.isSelected = false;
        card.wrapper.style.backgroundColor = "#fff";
        card.button.setText("Select");
        this.counter.decrement();
      }
    });
  }
}
