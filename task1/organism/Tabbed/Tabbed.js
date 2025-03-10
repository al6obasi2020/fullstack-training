import { createElement } from "../../utilityFunction.js";
import { Page } from "../../pages/Home.js";
import { Kanban } from "../kanban/kanban.js";
import { initializeGrid } from "../AgGrid/agGrid.js";
import { initializeCalendar } from "../calender/calender.js";



export class Tabs {
  constructor() {
    this.tabs = ['Cards', 'Kanban Board', 'Calendar', 'AG Grid'];  // List of tab names
    this.activeTab = this.tabs[0];  // Initially active tab
  }

  // Initialization function to start rendering
  init() {
    this.createStyles();  // Add styles directly to avoid requiring CSS file
    this.renderTabs();  // Render tabs
    this.showTabContent(this.activeTab);  // Show content for the active tab
  }

  // Create and inject CSS styles
  createStyles() {
    if (!document.getElementById('tabs-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'tabs-styles';
      styleElement.textContent = `
        .tabs {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .tabs-header {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 16px;
          border-bottom: 2px solid #eaeaea;
          padding-bottom: 4px;
        }

        .tab-button {
          padding: 12px 24px;
          background-color: #f5f5f5;
          border: none;
          border-radius: 4px 4px 0 0;
          font-size: 16px;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          background-color: #e3e3e3;
          color: #333;
        }

        .tab-button.active {
          background-color: #4285f4;
          color: white;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .tab-content {
          padding: 24px;
          border-radius: 4px;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          min-height: 300px;
        }

        @media (max-width: 768px) {
          .tabs-header {
            flex-direction: column;
            gap: 8px;
          }

          .tab-button {
            width: 100%;
            border-radius: 4px;
          }
        }
      `;
      document.head.appendChild(styleElement);
    }
  }

  // Function to render the tab buttons
  renderTabs() {
    let tabsContainer = document.querySelector('.tabs');  // Check for existing .tabs element

    if (!tabsContainer) {
      // If not found, create the container dynamically
      tabsContainer = createElement('div', { className: 'tabs' });
      document.body.appendChild(tabsContainer);  // Append it to the body or a specific parent
    }

    // Create or get the tabs header
    let tabsHeader = tabsContainer.querySelector('.tabs-header');
    if (!tabsHeader) {
      tabsHeader = createElement('div', { className: 'tabs-header' });
      tabsContainer.appendChild(tabsHeader);
    } else {
      tabsHeader.innerHTML = '';  // Clear previous content
    }

    // Loop through tabs and create a button for each
    this.tabs.forEach(tabName => {
      const tabButton = createElement('button', {
        className: 'tab-button',
        textContent: tabName
      });

      // If it's the active tab, add active class
      if (tabName === this.activeTab) {
        tabButton.classList.add('active');
      }

      // Set event listener for tab click
      tabButton.addEventListener('click', () => this.handleTabClick(tabName));
      tabsHeader.appendChild(tabButton);  // Append the tab button to the header
    });

    // Store reference to container
    this.tabsContainer = tabsContainer;
  }

  // Function to handle tab click and change active tab
  handleTabClick(tabName) {
    this.activeTab = tabName;  // Update the active tab

    // Update active tab button
    const tabButtons = this.tabsContainer.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      if (button.textContent === tabName) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

    this.showTabContent(tabName);  // Display the content for the clicked tab
  }

  // Function to display content for the active tab
  async showTabContent(tabName) {
    let content = document.querySelector('#card-container');
    content.innerHTML = '';  // Clear previous content
  
    let newContent = document.createElement('div');  // Ensure this is a valid DOM element

    if (tabName === 'AG Grid') {
      await initializeGrid();

    } else if (tabName === 'Kanban Board') {
      try {
        const kanban = new Kanban('kanban-board', './data.json');
        kanban.init();
      } catch (error) {
        newContent.innerHTML = `<h2>Kanban Content</h2><p>Error loading kanban content: ${error.message}</p>`;
      }
    } else if (tabName === 'Calendar') {
      // Initialize calendar
      initializeCalendar();
    } else if (tabName === 'Cards') {
      try {
        const pageInstance = new Page();
        pageInstance.init(newContent);
      } catch (error) {
        newContent.innerHTML = `<h2>Home Content</h2><p>Error loading home content: ${error.message}</p>`;
      }
    }
  
    content.appendChild(newContent);  // Append the content here
  }


  // Public method to hide the tabs component
  hide() {
    if (this.tabsContainer) {
      this.tabsContainer.style.display = 'none';
    }
  }

  // Public method to show the tabs component
  show() {
    if (this.tabsContainer) {
      this.tabsContainer.style.display = 'flex';
    }
  }

  // Method to set active tab programmatically
  setActiveTab(tabName) {
    if (this.tabs.includes(tabName)) {
      this.handleTabClick(tabName);
    }
  }
}
