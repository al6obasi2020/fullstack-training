// AboutPage.js
export default class AboutPage {
    constructor() {
        // Company data - centralized for easier management
        this.companyData = {
            title: 'About Us',
            intro: 'Welcome to the About Us page! Here\'s some detailed information about our company, mission, and values.',
            sections: [
                {
                    id: 'mission',
                    title: 'Our Mission',
                    content: 'Our mission is to provide the best services to our customers while promoting sustainability and innovation.',
                    icon: '🚀'
                },
                {
                    id: 'vision',
                    title: 'Our Vision',
                    content: 'Our vision is to be a global leader in our industry, setting standards for excellence, integrity, and customer satisfaction.',
                    icon: '🔭'
                },
                {
                    id: 'team',
                    title: 'Meet the Team',
                    content: 'Our team consists of experienced professionals who are passionate about delivering high-quality results.',
                    icon: '👥'
                },
                {
                    id: 'values',
                    title: 'Our Values',
                    content: 'Integrity, Innovation, Excellence, and Customer Focus guide everything we do.',
                    icon: '💎'
                }
            ]
        };
    }

    render() {
        const app = document.getElementById('card-container');

        // Clear previous content
        app.innerHTML = '';

        // Create main container for About Us
        const aboutContainer = document.createElement('div');
        aboutContainer.classList.add('about-container');

        // Add header with title and intro
        this.renderHeader(aboutContainer);
        
        // Add sections grid
        const sectionsGrid = document.createElement('div');
        sectionsGrid.classList.add('sections-grid');
        
        // Render each section
        this.companyData.sections.forEach(section => {
            sectionsGrid.appendChild(this.createSection(section));
        });
        
        aboutContainer.appendChild(sectionsGrid);
        
        // Add contact CTA
        this.renderContactCTA(aboutContainer);
        
        // Append to main container
        app.appendChild(aboutContainer);
    }
    
    renderHeader(container) {
        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');
        
        // Title
        const heading = document.createElement('h1');
        heading.textContent = this.companyData.title;
        headerContainer.appendChild(heading);

        // Introduction paragraph
        const introParagraph = document.createElement('p');
        introParagraph.classList.add('intro-text');
        introParagraph.textContent = this.companyData.intro;
        headerContainer.appendChild(introParagraph);
        
        container.appendChild(headerContainer);
    }

    // Enhanced method to create a section with a title, content and icon
    createSection(sectionData) {
        const section = document.createElement('div');
        section.classList.add('about-section');
        section.setAttribute('id', `section-${sectionData.id}`);
        
        // Add icon
        if (sectionData.icon) {
            const iconElement = document.createElement('div');
            iconElement.classList.add('section-icon');
            iconElement.textContent = sectionData.icon;
            section.appendChild(iconElement);
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('section-content');

        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = sectionData.title;
        contentWrapper.appendChild(sectionTitle);

        const sectionContent = document.createElement('p');
        sectionContent.textContent = sectionData.content;
        contentWrapper.appendChild(sectionContent);
        
        section.appendChild(contentWrapper);
        
        // Add animation class
        section.classList.add('fade-in');

        return section;
    }
    
    renderContactCTA(container) {
        const ctaContainer = document.createElement('div');
        ctaContainer.classList.add('cta-container');
        
        const ctaText = document.createElement('p');
        ctaText.textContent = 'Want to learn more about how we can help your business?';
        ctaContainer.appendChild(ctaText);
        
        const ctaButton = document.createElement('button');
        ctaButton.classList.add('cta-button');
        ctaButton.textContent = 'Contact Us';
        ctaButton.addEventListener('click', () => {
            // You could navigate to contact page or open a modal
            console.log('Contact button clicked');
        });
        ctaContainer.appendChild(ctaButton);
        
        container.appendChild(ctaContainer);
    }
}