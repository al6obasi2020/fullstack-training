import { FALLBACK_IMAGE } from "../../config.js";

// Declare gridOptions at the top level so it's accessible globally
window.gridOptions = {
  columnDefs: [],
  rowData: [],
  pagination: true,
  paginationPageSize: 10,
  onGridReady: function(params) {
    window.gridApi = params.api;
    window.columnApi = params.columnApi;
  },
  getRowNodeId: function(data) {
    return data.id.toString();
  }
};

window.editCard = (id) => {
  if (!window.gridApi) {
    console.error('Grid API not initialized yet');
    return;
  }

  const rowNode = window.gridApi.getRowNode(id); // No need to convert to string
  if (rowNode) {
    const data = rowNode.data;
    const newName = prompt('Edit Name:', data.name);
    if (newName) {
      const updatedData = {...data, name: newName};
      window.gridApi.applyTransaction({ update: [updatedData] });
    }
  } else {
    console.error('Row not found with ID:', id);
  }
};

window.deleteCard = (id) => {
  if (!window.gridApi) {
    console.error('Grid API not initialized yet');
    return;
  }

  const rowNode = window.gridApi.getRowNode(id); // No need to convert to string
  if (rowNode) {
    window.gridApi.applyTransaction({ remove: [rowNode.data] });
  } else {
    console.error('Row not found with ID:', id);
  }
};
// Utility function to get data from data.json
const fetchData = async () => {
  const response = await fetch('./data.json');
  const data = await response.json();
  console.log("gggggggg", data.cards);
  return data.cards;
};

// Atomic Search & Filter Component (Atom)
class SearchFilter {
  constructor(onSearch) {
    this.onSearch = onSearch;
    this.render();
  }

  render() {
    this.filterContainer = document.createElement('div');
    this.filterContainer.classList.add('search-filter-container');

    // Search Input
    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.id = 'search';
    this.searchInput.placeholder = 'Search';
    this.searchInput.addEventListener('input', this.handleSearch.bind(this));

    // Filter Dropdown
    this.filterSelect = document.createElement('select');
    const options = ['All', 'Card', 'Spell'];
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      this.filterSelect.appendChild(optionElement);
    });
    this.filterSelect.addEventListener('change', this.handleFilter.bind(this));

    // Append to the container
    this.filterContainer.appendChild(this.searchInput);
    this.filterContainer.appendChild(this.filterSelect);

    // Append to the DOM (insert into card-container)
    document.getElementById('card-container').appendChild(this.filterContainer);
  }

  handleSearch(event) {
    this.onSearch(event.target.value, this.filterSelect.value);
  }

  handleFilter(event) {
    this.onSearch(this.searchInput.value, event.target.value);
  }
}

// AG Grid Initialization (Molecule)
export const initializeGrid = async () => {
  const rowData = await fetchData();

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Type', field: 'type', sortable: true, filter: true },
    {
      headerName: 'Image', field: 'image', sortable: true, filter: true,
      cellRenderer: (params) => {
        const imageUrl = params.data.imageUrl || FALLBACK_IMAGE;
        return `<img src="${imageUrl || FALLBACK_IMAGE}" style="width: 50px; height: 50px;" />`;
      }
    },
    {
      headerName: 'Actions', 
      cellRenderer: (params) => {
        console.log("Row ID for actions:", params.data.id);
        return `<button class="edit-btn" data-id="${params.data.id}">Edit</button>
                <button class="delete-btn" data-id="${params.data.id}">Delete</button>`;
      }
    }
  ];

  // Update the global gridOptions with our configurations
  window.gridOptions.columnDefs = columnDefs;
  window.gridOptions.rowData = rowData;

  // Create a grid container within #card-container
  const gridContainer = document.createElement('div');
  gridContainer.id = 'myGrid';
  gridContainer.classList.add('ag-theme-alpine');
  gridContainer.style.height = '500px';
  gridContainer.style.width = '100%';
  document.getElementById('card-container').appendChild(gridContainer);

  // Initialize the grid with our global options
  new agGrid.Grid(gridContainer, window.gridOptions);

  // Add event listeners for buttons
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn') || event.target.classList.contains('delete-btn')) {
      const id = event.target.getAttribute('data-id');
      
      if (id) {
        if (event.target.classList.contains('edit-btn')) {
          window.editCard(id); // Pass the ID as a string
        } else {
          window.deleteCard(id); // Pass the ID as a string
        }
      } else {
        console.error("No ID found on button");
      }
    }
  });

  // Initialize search and filter
  new SearchFilter((searchText, filterType) => {
    window.gridApi.setQuickFilter(searchText);
    if (filterType !== 'All') {
      const filterModel = {
        type: {
          type: 'equals',
          filter: filterType
        }
      };
      window.gridApi.setFilterModel(filterModel);
    } else {
      window.gridApi.setFilterModel(null);
    }
  });
};

// Add new card functionality (Molecule)
window.addCard = () => {
  if (!window.gridApi) {
    console.error('Grid API not initialized yet');
    return;
  }

  const newCard = {
    id: Math.floor(Math.random() * 10000),
    name: prompt('Enter card name:'),
    type: prompt('Enter card type:'),
    imageUrl: prompt('Enter image URL:')
  };

  if (newCard.name && newCard.type) {
    window.gridApi.applyTransaction({ add: [newCard] });
  }
};

// Initialize event listener for add button
document.addEventListener('DOMContentLoaded', () => {
  // Event Listeners (Organism)
  const addButton = document.createElement('button');
  addButton.id = 'addCard';
  addButton.textContent = 'Add Card';
  addButton.addEventListener('click', window.addCard);

  // Add the Add Card button inside card-container
  document.getElementById('card-container').appendChild(addButton);

  // Initialize the grid

});