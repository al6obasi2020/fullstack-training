 
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
  navbarToggle.classList.toggle("active");https://github.com/al6obasi2020/fullstack-training/pull/1/conflict?name=task1%252Findex.js&ancestor_oid=3c415d0d39a9f163f367539c81d8a40143cdb824&base_oid=3f6a2390fafac5e47bf9bda81d4718d52180dcce&head_oid=542c661c001ef3017f7f98b43e7a88e9d23250ac
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
 
console.log('Hello World');

const API_URL = 'https://api.magicthegathering.io/v1/cards';
const FALLBACK_IMAGE = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card";

/**
 * Utility function to create HTML elements dynamically
 */
const createElement = (tag, attributes = {}, textContent = '') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element[key] = value;
    });
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
};

/**
 * Function to create and configure the grid container
 */
const setupGridContainer = () => {
    const container = document.getElementById('card-container') || createElement('div', { id: 'card-container' });

    container.innerHTML = '';
    Object.assign(container.style, {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        padding: '20px',
    });

    return container;
};

/**
 * Counter with Closure
 */
const createCounter = (count = 0) => {
    const counterElement = createElement('h3', { id: 'selected-counter' }, `Selected: ${count}`);

    return {
        getElement: () => counterElement,
        getCount: () => count,
        increment: () => {
            count++;
            counterElement.innerText = `Selected: ${count}`;
        },
        decrement: () => {
            if (count > 0) count--;
            counterElement.innerText = `Selected: ${count}`;
        },
        reset: () => {
            count = 0;
            counterElement.innerText = `Selected: ${count}`;
        }
    };
};

/**
 * Class for handling button creation and actions
 */
class Button {
    constructor(text, onClick, type = "primary") {
        this.button = createElement('button', {
            textContent: text,
            style: `
                background-color: ${type === "primary" ? 'var(--color-primary)' : "#28a745"};
                border-radius: 8px;
                border: none;
                box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
                color: white;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                margin: 10px;
                padding: 10px 15px;
                text-transform: uppercase;
                transition: all 0.3s ease-in-out;
            `
        });

        this.button.addEventListener("mouseover", () => {
            this.button.style.opacity = "0.9";
            this.button.style.boxShadow = "4px 4px 12px rgba(0, 0, 0, 0.2)";
        });

        this.button.addEventListener("mouseout", () => {
            this.button.style.opacity = "1";
            this.button.style.boxShadow = "2px 2px 8px rgba(0, 0, 0, 0.1)";
        });

        this.button.addEventListener('click', onClick);
    }

    getElement() {
        return this.button;
    }

    setText(text) {
        this.button.textContent = text;
    }
}

/**
 * Fetch Data from API
 */
const fetchCards = async (SIZE = 70) => {
    const spinner = createLoadingSpinner();
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.cards.slice(0, SIZE).map(card => new Card(card));
    } catch (error) {
        console.error('Error fetching cards:', error);
        return [];
    } finally {
        hideLoadingSpinner(spinner);
    }
 
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
