import { createLoadingSpinner } from "./atoms/createLoadingSpinner/createLoadingSpinner.js";
import { API_URL, FALLBACK_IMAGE } from "./config.js";
import { Card } from "./organism/Card/Card.js";
import { Button } from "./atoms/buttons/buttons.js";

// Now you can use the constants
console.log(API_URL);
console.log(FALLBACK_IMAGE);

export const createElement = (
  tag,
  attributes = {},
  textContent = "",
  isDarkMode = false,
) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value;
  });
  if (textContent) {
    element.textContent = textContent;
  }

  // Apply dark mode class if needed
  if (isDarkMode) {
    element.classList.add("dark-mode-text");
  } else {
    element.classList.add("light-mode-text");
  }

  return element;
};

/**
 * Counter with Closure
 */

export const createCounter = (count = 0, counterElement) => {
  // Store the initial text and replace the count part later
  const initialText = counterElement.innerText; // "Selected: 0" or whatever was passed

  return {
    getElement: () => counterElement,
    getCount: () => count,
    increment: () => {
      count++;
      // Update the text content dynamically by replacing the count part
      counterElement.innerText = initialText.replace(/\d+/, count);
    },
    decrement: () => {
      if (count > 0) count--;
      // Update the text content dynamically by replacing the count part
      counterElement.innerText = initialText.replace(/\d+/, count);
    },
    reset: () => {
      count = 0;
      // Reset the text content back to the initial state
      counterElement.innerText = initialText.replace(/\d+/, count);
    },
  };
};

/**
 * Fetch Data from API
 */
export const fetchCards = async (SIZE = 70) => {
  const spinner = createLoadingSpinner();
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.cards.slice(0, SIZE).map((card) => new Card(card));
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  } finally {
    hideLoadingSpinner(spinner);
  }
};

/**
 * Hide the loading spinner
 */
export const hideLoadingSpinner = (spinner) => {
  if (spinner) {
    spinner.style.display = "none";
  }
};
