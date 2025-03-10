import ServicesPage from "../../pages/Services/Services.js";
import AboutPage from "../../pages/about/about.js";
import { Page } from "../../pages/Home.js";
import { Tabs } from "../Tabbed/Tabbed.js";
import { createElement } from "../../utilityFunction.js";
import { Button } from "../../atoms/buttons/buttons.js";

export class Navbar {
    constructor(options = {}) {
         // Create styles for the navbar
        this.createStyles();

        const defaults = {
            logoSrc: 'atoms/logo/Quick.png',
            logoAlt: 'QuickFlow Logo',
            logoLink: 'atoms/logo/Quick.png',
            links: [
                { text: 'Home', href: '#home' },
                { text: 'About Us', href: '#about-us' },
                { text: 'Services', href: '#services' },
            ]
        };

        this.options = { ...defaults, ...options };
        this.navbar = createElement('nav', { className: 'navbar' });
        this.logoContainer = createElement('div', { className: 'logo-container' });
        this.logoLink = createElement('a', { href: this.options.logoLink });
        this.logo = createElement('img', {
            src: this.options.logoSrc,
            alt: this.options.logoAlt,
            className: 'nav-logo'
        });

        this.logoLink.appendChild(this.logo);
        this.logoContainer.appendChild(this.logoLink);

        this.navLinks = createElement('ul', { className: 'nav-links' });
        this.hamburger = createElement('div', { className: 'hamburger' });

        this.closeBtn = createElement('button', {
            className: 'close-menu-btn',
            textContent: '×'
        });
        this.closeBtn.addEventListener('click', () => this.toggleMenu());
        this.navLinks.appendChild(this.closeBtn);

        this.options.links.forEach(link => {
            const li = createElement('li');
            const a = createElement('a', {
                href: link.href,
                textContent: link.text,
                className: 'nav-link'
            });
            a.addEventListener('click', (event) => this.handleNavigation(event, link.text));
            li.appendChild(a);
            this.navLinks.appendChild(li);
        });

        this.hamburgerBtn = new Button('☰', () => this.toggleMenu(), 'hamburger-btn');
        this.hamburger.appendChild(this.hamburgerBtn.getElement());

        this.navbar.appendChild(this.logoContainer);
        this.navbar.appendChild(this.navLinks);
        this.navbar.appendChild(this.hamburger);

        this.overlay = createElement('div', { className: 'nav-overlay' });
        this.overlay.addEventListener('click', () => this.toggleMenu());
        document.body.appendChild(this.overlay);

        document.body.appendChild(this.navbar);

        // Initialize tabs instance
        this.tabsInstance = null;
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.navLinks.classList.contains('active')) {
                this.toggleMenu();
            }
        });

        // Handle initial page load
        window.addEventListener('load', () => {
            const page = window.location.hash.replace('#', '') || 'home';
            
            // Create tabs instance if this is the first load
            this.initializeTabs();
            
            // Handle visibility based on current page
            if (page === 'home' || page === '') {
                this.showTabs();
            } else {
                this.hideTabs();
            }
            
            // Simulate clicking on the correct nav link
            const navLink = document.querySelector(`a[href="#${page}"]`);
            if (navLink) {
                this.setActiveLink(navLink);
                // Load the appropriate content without triggering click event
                this.loadPageContent(page);
            } else {
                // Default to home if no matching link
                const homeLink = document.querySelector('a[href="#home"]');
                if (homeLink) {
                    this.setActiveLink(homeLink);
                    this.loadPageContent('home');
                }
            }
        });
    }
    
    // Create and inject CSS styles
    createStyles() {
        if (!document.getElementById('navbar-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'navbar-styles';
            styleElement.textContent = `
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                .logo-container {
                    display: flex;
                    align-items: center;
                }
                
                .nav-logo {
                    height: 40px;
                    width: auto;
                }
                
                .nav-links {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: 24px;
                }
                
                .nav-link {
                    color: #333;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 16px;
                    padding: 8px 0;
                    position: relative;
                    transition: color 0.3s;
                }
                
                .nav-link:hover {
                    color: #4285f4;
                }
                
                .nav-link.active {
                    color: #4285f4;
                }
                
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #4285f4;
                }
                
                .hamburger {
                    display: none;
                }
                
                .close-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    position: absolute;
                    top: 16px;
                    right: 16px;
                }
                
                .nav-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 999;
                }
                
                .nav-overlay.active {
                    display: block;
                }
                
                @media (max-width: 768px) {
                    .hamburger {
                        display: block;
                    }
                    
                    .nav-links {
                        position: fixed;
                        top: 0;
                        right: -300px;
                        width: 280px;
                        height: 100vh;
                        background-color: white;
                        flex-direction: column;
                        padding: 64px 24px 24px;
                        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
                        transition: right 0.3s ease;
                        z-index: 1000;
                    }
                    
                    .nav-links.active {
                        right: 0;
                    }
                    
                    .close-menu-btn {
                        display: block;
                    }
                }
                
                #app {
                    padding: 16px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
            `;
            document.head.appendChild(styleElement);
        }
    }

    // Initialize tabs component
    initializeTabs() {
        if (!this.tabsInstance) {
            this.tabsInstance = new Tabs();
            this.tabsInstance.init();
        }
    }

    // Define toggleMenu method
    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.overlay.classList.toggle('active');
    }
    
    // Show tabs component
    showTabs() {
        if (this.tabsInstance) {
            this.tabsInstance.show();
        }
    }
    
    // Hide tabs component
    hideTabs() {
        if (this.tabsInstance) {
            this.tabsInstance.hide();
        }
    }

    // Load page content without navigation event
    loadPageContent(pageId) {
        const app = document.getElementById('app');
        if (!app) return;
        
        // Clear existing content
        app.innerHTML = '';
        
        // Normalize page ID
        const normalizedPageId = pageId.toLowerCase().replace('-', ' ');
        
        // Load appropriate content
        if (normalizedPageId === 'home') {
            this.showTabs();
            const homePage = new Page()
            homePage.init();
            // We don't need to initialize the Page component here
            // since we're already displaying content through the Tabs component
        } else if (normalizedPageId === 'about us') {
            this.hideTabs();
            
            const aboutPage = new AboutPage();
            aboutPage.render();
        } else if (normalizedPageId === 'services') {
            this.hideTabs();

            const servicesPage = new ServicesPage();
            servicesPage.render();
        }
    }

    // Handle navigation click
    handleNavigation(event, page) {
        event.preventDefault();
        const pageId = page.toLowerCase().replace(' ', '-');
        
        // Update the active link
        this.setActiveLink(event.currentTarget);
        
        // Load the page content
        this.loadPageContent(pageId);
        
        // Update the URL hash without triggering another load
        const currentHash = window.location.hash.substring(1);
        if (currentHash !== pageId) {
            history.pushState(null, '', `#${pageId}`);
        }
        
        // Close the menu if open
        if (this.navLinks.classList.contains('active')) {
            this.toggleMenu();
        }
    }

    // Set active link styling
    setActiveLink(activeLink) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}