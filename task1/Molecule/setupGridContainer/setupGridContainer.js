import { createElement } from "../../utilityFunction.js";
export const setupGridContainer = () => {
  const container =
    document.getElementById("card-container") ||
    createElement("div", { id: "card-container" });

  container.innerHTML = "";
  Object.assign(container.style, {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    padding: "20px",
  });

  return container;
};
