import { createElement } from "../../utilityFunction.js";

export const createLoadingSpinner = () => {
  const spinner = createElement("div", { id: "loading-spinner" });

  // Add spinner to the document body
  document.body.appendChild(spinner);
  return spinner;
};
