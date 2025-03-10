import { createLoadingSpinner } from "./atoms/createLoadingSpinner/createLoadingSpinner.js";
import { API_URL, FALLBACK_IMAGE } from "./config.js";
import { Card } from "./organism/Card/Card.js";
import { Button } from "./atoms/buttons/buttons.js";



export const createElement = (
  tag,
  attributes = {},
  textContent = "",

) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value;
  });
  if (textContent) {
    element.textContent = textContent;
  }

  // Apply dark mode class if needed


  return element;
};

/**
 * Counter with Closure
 */ export const createCounter = (initialCount = 0, counterElement) => {
  const storageKey = 'counterValue'; // Key for local storage
  const savedCount = parseInt(localStorage.getItem(storageKey), 10);

  // Use the saved count if it exists, otherwise fall back to the initial count
  let count = !isNaN(savedCount) ? savedCount : initialCount;

  // Store the initial text and replace the count part later
  const initialText = counterElement.innerText;

  // Initialize the element with the correct count
  counterElement.innerText = initialText.replace(/\d+/, count);

  // Function to save count to local storage
  const saveCountToStorage = () => {
    localStorage.setItem(storageKey, count);
  };

  return {
    getElement: () => counterElement,
    getCount: () => count,
    increment: () => {
      count++;
      counterElement.innerText = initialText.replace(/\d+/, count);
      saveCountToStorage();
    },
    decrement: () => {
      if (count > 0) count--;
      counterElement.innerText = initialText.replace(/\d+/, count);
      saveCountToStorage();
    },
    reset: () => {
      count = 0;
      counterElement.innerText = initialText.replace(/\d+/, count);
      saveCountToStorage();
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
