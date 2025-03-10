import { createElement } from "../../utilityFunction.js";
import { createCounter } from "../../utilityFunction.js";
export const countAndCreateElement = () => {
    const counterElement = createElement(
      "h3",
      { id: "selected-counter" },
      "Selected: 0", // Initial count text
    );

    // const counter = createCounter(0, counterElement);

    const counter = createCounter(0, counterElement);
    console.log(counterElement); // Append the counter element to the document
    document.body.appendChild(counter.getElement());

    return counter;
  };