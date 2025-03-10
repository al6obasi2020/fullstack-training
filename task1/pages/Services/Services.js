// ServicesPage.js
export default class ServicesPage {
    constructor() {
        // Services data - centralized for easier management
        this.servicesData = {
            title: 'Our Services',
            intro: 'We offer a comprehensive range of professional services tailored to meet your specific needs. Explore our offerings below to see how we can help your business grow and succeed.',
            services: [
                {
                    id: 'consulting',
                    title: 'Strategic Consulting',
                    description: 'Our expert consultants work with you to analyze your business challenges and develop effective strategies for growth and optimization.',
                    icon: '📊',
                    features: [
                        'Business analysis and needs assessment',
                        'Strategic planning and roadmapping',
                        'Process optimization and efficiency improvements'
                    ]
                },
                {
                    id: 'development',
                    title: 'Custom Development',
                    description: 'We build tailored software solutions designed specifically for your unique business requirements and challenges.',
                    icon: '💻',
                    features: [
                        'Custom web and mobile applications',
                        'Enterprise software solutions',
                        'API development and integration'
                    ]
                },
                {
                    id: 'design',
                    title: 'UX/UI Design',
                    description: 'Our design team creates intuitive, engaging user experiences that delight your customers and strengthen your brand.',
                    icon: '🎨',
                    features: [
                        'User research and persona development',
                        'Wireframing and prototyping',
                        'Visual design and branding'
                    ]
                },
                {
                    id: 'support',
                    title: 'Ongoing Support',
                    description: 'We provide reliable technical support and maintenance to ensure your systems run smoothly and efficiently.',
                    icon: '🛠️',
                    features: [
                        '24/7 technical assistance',
                        'Regular maintenance and updates',
                        'Performance monitoring and optimization'
                    ]
                }
            ],
            testimonial: {
                quote: "Working with this team transformed our business operations. Their services exceeded our expectations in every way.",
                author: "Jane Smith",
                position: "CEO, Acme Corporation"
            }
        };
    }

    render() {
        const app = document.getElementById('card-container');
        
        // Clear previous content
        app.innerHTML = '';

        // Create main container for Services
        const servicesContainer = document.createElement('div');
        servicesContainer.classList.add('services-container');
        
        // Add header with title and intro
        this.renderHeader(servicesContainer);
        
        // Add services section
        this.renderServicesSection(servicesContainer);
        
        // Add testimonial section
        this.renderTestimonial(servicesContainer);
        
        // Add contact CTA
        this.renderContactCTA(servicesContainer);
        
        // Append to main container
        app.appendChild(servicesContainer);
    }
    
    renderHeader(container) {
        const headerContainer = document.createElement('div');
        headerContainer.classList.add('header-container');
        
        // Title
        const heading = document.createElement('h1');
        heading.textContent = this.servicesData.title;
        headerContainer.appendChild(heading);

        // Introduction paragraph
        const introParagraph = document.createElement('p');
        introParagraph.classList.add('intro-text');
        introParagraph.textContent = this.servicesData.intro;
        headerContainer.appendChild(introParagraph);
        
        container.appendChild(headerContainer);
    }

    renderServicesSection(container) {
        const servicesSection = document.createElement('div');
        servicesSection.classList.add('services-section');
        
        this.servicesData.services.forEach((service, index) => {
            const serviceCard = this.createServiceCard(service, index);
            servicesSection.appendChild(serviceCard);
        });
        
        container.appendChild(servicesSection);
    }
    
    createServiceCard(service, index) {
        const card = document.createElement('div');
        card.classList.add('service-card');
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.15}s`;
        card.setAttribute('id', `service-${service.id}`);
        
        // Service Icon
        const iconElement = document.createElement('div');
        iconElement.classList.add('service-icon');
        iconElement.textContent = service.icon;
        card.appendChild(iconElement);
        
        // Service Title
        const titleElement = document.createElement('h2');
        titleElement.textContent = service.title;
        card.appendChild(titleElement);
        
        // Service Description
        const descElement = document.createElement('p');
        descElement.classList.add('service-description');
        descElement.textContent = service.description;
        card.appendChild(descElement);
        
        // Service Features
        if (service.features && service.features.length) {
            const featuresList = document.createElement('ul');
            featuresList.classList.add('features-list');
            
            service.features.forEach(feature => {
                const featureItem = document.createElement('li');
                featureItem.textContent = feature;
                featuresList.appendChild(featureItem);
            });
            
            card.appendChild(featuresList);
        }
        
        // Learn more button
        const learnMoreBtn = document.createElement('button');
        learnMoreBtn.classList.add('learn-more-btn');
        learnMoreBtn.textContent = 'Learn More';
        learnMoreBtn.addEventListener('click', () => {
            console.log(`Learn more about ${service.title}`);
            // You could navigate to a detailed service page or open a modal
        });
        card.appendChild(learnMoreBtn);
        
        return card;
    }
    
    renderTestimonial(container) {
        const testimonialSection = document.createElement('div');
        testimonialSection.classList.add('testimonial-section');
        
        const quoteIcon = document.createElement('div');
        quoteIcon.classList.add('quote-icon');
        quoteIcon.innerHTML = '❝';
        testimonialSection.appendChild(quoteIcon);
        
        const quoteText = document.createElement('p');
        quoteText.classList.add('quote-text');
        quoteText.textContent = this.servicesData.testimonial.quote;
        testimonialSection.appendChild(quoteText);
        
        const authorInfo = document.createElement('div');
        authorInfo.classList.add('author-info');
        
        const authorName = document.createElement('strong');
        authorName.textContent = this.servicesData.testimonial.author;
        authorInfo.appendChild(authorName);
        
        const authorPosition = document.createElement('span');
        authorPosition.textContent = `, ${this.servicesData.testimonial.position}`;
        authorInfo.appendChild(authorPosition);
        
        testimonialSection.appendChild(authorInfo);
        container.appendChild(testimonialSection);
    }
    
    renderContactCTA(container) {
        const ctaContainer = document.createElement('div');
        ctaContainer.classList.add('cta-container');
        
        const ctaText = document.createElement('p');
        ctaText.textContent = 'Ready to elevate your business with our professional services?';
        ctaContainer.appendChild(ctaText);
        
        const ctaButton = document.createElement('button');
        ctaButton.classList.add('cta-button');
        ctaButton.textContent = 'Get a Free Consultation';
        ctaButton.addEventListener('click', () => {
            // You could navigate to contact page or open a modal
            console.log('Consultation button clicked');
        });
        ctaContainer.appendChild(ctaButton);
        
        container.appendChild(ctaContainer);
    }
}