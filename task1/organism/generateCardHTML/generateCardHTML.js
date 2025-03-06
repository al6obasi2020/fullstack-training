import { createElement } from "../../utilityFunction.js";
import { Button } from ".././../atoms/buttons/buttons.js";
export const generateCardHTML = (card, counter) => {
  const wrapper = createElement("div", {
    className: "card",
  });

  wrapper.addEventListener("mouseover", () => {
    wrapper.style.transform = "scale(1.02)";
  });

  wrapper.addEventListener("mouseout", () => {
    wrapper.style.transform = "scale(1)";
  });

  const img = createElement("img", {
    src: card.imageUrl,
    onerror: function () {
      this.src = FALLBACK_IMAGE;
    },

    alt: card.name,
    className: "img",
  });

  const content = createElement("div", { style: "flex-grow: 1;" });

  const title = createElement("h3", {}, card.name);
  const manaCost = createElement(
    "p",
    {},
    `Mana Cost: ${card.manaCost || "N/A"}`,
  );
  const powerToughness = createElement(
    "p",
    {},
    `P/T: ${card.power || "N/A"} / ${card.toughness || "N/A"}`,
  );

  const details = createElement("div", {
    className: "createElement",
  });
  details.innerHTML = `
        <p>Type: ${card.type}</p>
        <p>Rarity: ${card.rarity}</p>
        <p>Set: ${card.setName}</p>
        <p>Text: ${card.text || "No description"}</p>
        <p>Artist: ${card.artist}</p>
    `;

  const selectButton = new Button("Select", () =>
    handleBtnCardClick(card, wrapper, selectButton, counter),
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

  card.wrapper = wrapper;
  card.button = selectButton;

  return wrapper;
};
