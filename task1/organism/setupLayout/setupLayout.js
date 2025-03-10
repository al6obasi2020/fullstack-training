import { Button } from "../../atoms/buttons/buttons.js";
import { createElement } from "../../utilityFunction.js";

export const setupLayout = (cardList, counter) => {
    Object.assign(document.body.style, {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      margin: "20px",
    });

    // Create buttons
    const selectAllBtn = new Button("Select All", () => cardList.selectAll());
    const deselectAllBtn = new Button(
      "Deselect All",
      () => {
        cardList.deselectAll();
        counter.reset();
      },
      "secondary",
    );

    // Create the sticky div inside the function
    const divSticky = document.createElement("div");
     divSticky.classList.add("sticky-bottom-right");

    // Clear and append elements to the sticky div
    divSticky.innerHTML = "";
    divSticky.appendChild(selectAllBtn.getElement());
    divSticky.appendChild(deselectAllBtn.getElement());
    divSticky.appendChild(counter.getElement());

    document.body.appendChild(divSticky);
  };
