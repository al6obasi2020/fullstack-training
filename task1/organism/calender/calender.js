// Create a new file called calendar.js

// Export the calendar initialization function
export function initializeCalendar() {
    // Get the existing card container
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) {
      console.error('Card container not found');
      return;
    }

    // Find or create the days div inside the card container
    let daysDiv = cardContainer.querySelector('.days');
    if (!daysDiv) {
      daysDiv = document.createElement('div');
      daysDiv.className = 'days';
      cardContainer.appendChild(daysDiv);
    }

    // Clear the days div
    daysDiv.innerHTML = '';

    // Create filters
      const filtersDiv = document.createElement('div');
    filtersDiv.id = 'filters';
    filtersDiv.innerHTML = `
      <select id="categoryFilter">
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <input type="text" id="searchInput" placeholder="Search events..." />
      <button id="searchButton">Search</button>
    `;
    daysDiv.appendChild(filtersDiv);

    // Create calendar container
    const calendarDiv = document.createElement('div');
    calendarDiv.id = 'calendar';
    calendarDiv.style.maxWidth = '900px';
    calendarDiv.style.margin = '50px auto';
    daysDiv.appendChild(calendarDiv);

    // Initialize the calendar
       const calendar = new FullCalendar.Calendar(calendarDiv, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        { title: 'Work Meeting', start: '2025-03-01', category: 'Work' },
        { title: 'Gym', start: '2025-03-02', category: 'Personal' },
        { title: 'Project Deadline', start: '2025-03-05', category: 'Work' },
        { title: 'Birthday Party', start: '2025-03-07', category: 'Personal' }
      ]
    });

    calendar.render();

    // Add filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (categoryFilter && searchInput && searchButton) {
      searchButton.addEventListener('click', function() {
        applyFilters(calendar, categoryFilter.value, searchInput.value);
      });
    }

    // Return the calendar instance for further manipulation if needed
    return calendar;
  }

  // Function to apply filters
  export function applyFilters(calendar, category, searchQuery) {
    category = category.toLowerCase();
    searchQuery = searchQuery.toLowerCase();

    const filteredEvents = calendar.getEvents().filter(event => {
      const matchesCategory = !category || event.extendedProps.category.toLowerCase() === category;
      const matchesSearch = !searchQuery || event.title.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    calendar.removeAllEvents();
    calendar.addEventSource(filteredEvents.map(event => ({
      title: event.title,
      start: event.start,
      category: event.extendedProps.category
    })));
  }