import { generateCardHTML } from "../../organism/generateCardHTML/generateCardHTML.js";
import { setupGridContainer } from "../../Molecule/setupGridContainer/setupGridContainer.js";
import { fetchCards } from "../../utilityFunction.js";

export class CardList {
  constructor(counter) {
    this.cards = [];
    this.counter = counter;
    this.storageKey = "selectedCards"; // Key for selected cards
    this.counterKey = "counterValue"; // Key for counter value
  }

  async loadCards() {
    this.cards = await fetchCards();

    // Get stored selection state and counter value from local storage
    const selectedIds = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    const savedCounterValue = parseInt(localStorage.getItem(this.counterKey)) || 0;

    // Update cards' selection state based on stored data
    this.cards.forEach((card) => {
      card.isSelected = selectedIds.includes(card.id);
    });

    // Set the counter value directly
    this.counter.reset(); // Reset counter before setting the value
    for (let i = 0; i < savedCounterValue; i++) {
      this.counter.increment();
    }

    this.draw();
  }

  draw() {
    const container = setupGridContainer();
    this.cards.forEach((card) => {
      const cardElement = generateCardHTML(card, this.counter);

      // Apply selection style if the card is already selected
      if (card.isSelected) {
        cardElement.style.backgroundColor = "#d1ffd1";
        card.button.setText("Deselect");
      }

      container.appendChild(cardElement);
    });

    document.body.appendChild(container);
  }

  selectAll() {
    const selectedIds = [];
    this.cards.forEach((card) => {
      if (!card.isSelected) {
        card.isSelected = true;
        card.wrapper.style.backgroundColor = "#d1ffd1";
        card.button.setText("Deselect");
        this.counter.increment();
      }
      selectedIds.push(card.id);
    });

    // Store the selected card IDs and counter value in local storage
    localStorage.setItem(this.storageKey, JSON.stringify(selectedIds));
    localStorage.setItem(this.counterKey, this.counter.getCount());
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

    // Clear the selection state and reset the counter in local storage
    localStorage.removeItem(this.storageKey);
    localStorage.setItem(this.counterKey, "0"); // Reset counter value
  }
}

// export class CardList {
//   constructor(counter) {
//     this.cards = [];
//     this.counter = counter;
//   }

//   async loadCards() {
//     this.cards = await fetchCards();
//     this.draw();
//   }

//   draw() {
//     const container = setupGridContainer();
//     this.cards.forEach((card) => {
//       container.appendChild(generateCardHTML(card, this.counter));
//     });

//     document.body.appendChild(container);
//   }

//   selectAll() {
//     this.cards.forEach((card) => {
//       if (!card.isSelected) {
//         card.isSelected = true;
//         card.wrapper.style.backgroundColor = "#d1ffd1";
//         card.button.setText("Deselect");
//         this.counter.increment();
//       }
//     });
//   }

//   deselectAll() {
//     this.cards.forEach((card) => {
//       if (card.isSelected) {
//         card.isSelected = false;
//         card.wrapper.style.backgroundColor = "#fff";
//         card.button.setText("Select");
//         this.counter.decrement();
//       }
//     });
//   }
// }
