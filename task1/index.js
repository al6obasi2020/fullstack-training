import {
  createElement,
  hideLoadingSpinner,
  fetchCards,
  createCounter,
} from "./utilityFunction.js";
import { DarkModeToggle } from "./atoms/DarkModeToggle/DarkModeToggle.js";
import { generateCardHTML } from "./organism/generateCardHTML/generateCardHTML.js";
import { Button } from "./atoms/buttons/buttons.js";
import { API_URL, FALLBACK_IMAGE } from "./config.js";
import { CardList } from "./Templates/CardList/CardList.js";
import { setupGridContainer } from "./Molecule/setupGridContainer/setupGridContainer.js";
 document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <div class="navbar">
      <div class="navbar-logo">
          <img src="logo.png" alt="Logo" />
      </div>
      <div class="navbar-links">
          <a href="#home">Home</a>
          <a href="./pages/about.js">About</a>
          <a href="#services">Services</a>

      </div>
      <div class="navbar-toggle" id="navbar-toggle">
          <span></span><span></span><span></span>
      </div>
  </div>
`,
);

// Navbar Toggle Functionality
// Get navbar toggle button and the navbar links
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarLinks = document.querySelector(".navbar-links");
const body = document.body;

// Toggle the active class for navbar links and menu
navbarToggle.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  navbarToggle.classList.toggle("active");
  body.classList.toggle("menu-active");
});



// Create the sticky div to hold the buttons and counter
const divSticky = createElement("div", { className: "styleCounterSection" });

divSticky.classList.add("sticky-bottom-right");

// Function to create the element and then initialize the counter
const countAndCreateElement = () => {
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


const handleBtnCardClick = (card, wrapper, button, counter) => {
  card.toggleSelection();
  wrapper.style.backgroundColor = card.isSelected ? "#d1ffd1" : "#fff";
  button.setText(card.isSelected ? "Deselect" : "Select");

  if (card.isSelected) {
    counter.increment();
  } else {
    counter.decrement();
  }
};


const setupLayout = (cardList, counter) => {
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

  // Create the dark mode toggle button
  const darkModeToggle = new DarkModeToggle();

  // Clear and append elements to the sticky div
  divSticky.innerHTML = "";
  divSticky.appendChild(selectAllBtn.getElement());
  divSticky.appendChild(deselectAllBtn.getElement());
  divSticky.appendChild(counter.getElement());
  divSticky.appendChild(darkModeToggle.getElement());

  document.body.appendChild(divSticky);
};
/**
 * Page Class (Handles page layout and UI setup)
 */
class Page {
  constructor() {
    this.counter = countAndCreateElement();
    this.cardList = new CardList(this.counter);
  }

  init() {
    setupLayout(this.cardList, this.counter);
    this.cardList.loadCards();
  }
}

/**
 * Initialize Page
 */
const page = new Page();
page.init();
