


// Create the navigation bar
function createNavbar() {
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');

    navbar.innerHTML = `
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
    `;
    return navbar;
}

// Create the About page content
function createAboutContent() {
    const container = document.createElement('div');
    container.classList.add('container');

    const header = document.createElement('h1');
    header.innerText = "About Us";

    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = `
        <p>Welcome to our website! We are dedicated to providing you with the best services in the industry.</p>
        <p>Our mission is to innovate and improve every day, ensuring we meet the needs of our valued customers.</p>
        <p>Feel free to browse our site and learn more about what we offer. If you have any questions, don’t hesitate to reach out to us!</p>
    `;

    container.appendChild(header);
    container.appendChild(content);

    return container;
}

// Create the footer
function createFooter() {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = '&copy; 2025 Company Name | All rights reserved.';
    return footer;
}

// Append everything to the app container
function setupPage() {
    const app = document.getElementById('app');
    app.appendChild(createNavbar());
    app.appendChild(createAboutContent());
    app.appendChild(createFooter());
}

// Call the setupPage function when the page is loaded
document.addEventListener('DOMContentLoaded', setupPage);
 