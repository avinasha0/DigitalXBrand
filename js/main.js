// DigitalXBrand Website JavaScript
// Main functionality for all pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollToTop();
    initSmoothScroll();
    initContactForm();
    initPortfolioFilter();
    initPortfolioModal();
    initTestimonialSlider();
    initAnimations();
    initMobileDropdown();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/98', 'shadow-xl');
            navbar.classList.remove('bg-white/95');
        } else {
            navbar.classList.add('bg-white/95');
            navbar.classList.remove('bg-white/98', 'shadow-xl');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (isOpen) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
    }

    // Active link highlighting
    function updateActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-primary-600');
            link.classList.add('text-gray-700');
            
            if (link.getAttribute('href') === currentPath.split('/').pop() || 
                (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active', 'text-primary-600');
                link.classList.remove('text-gray-700');
            }
        });
    }

    updateActiveLink();
    window.addEventListener('popstate', updateActiveLink);
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate reCAPTCHA (only if reCAPTCHA is properly configured)
            let recaptchaResponse = '';
            if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse) {
                recaptchaResponse = grecaptcha.getResponse();
                if (!recaptchaResponse) {
                    showNotification('Please complete the reCAPTCHA verification.', 'error');
                    return;
                }
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value,
                fullName: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
                recaptcha: recaptchaResponse
            };
            
                // Send email using SMTP via serverless function
                sendEmailViaSMTP(formData)
                    .then(function(response) {
                        console.log('SUCCESS!', response);
                        
                        if (response.success) {
                            // Show success message
                            showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                            contactForm.reset();
                        } else {
                            // Show error message from response
                            showNotification(response.message || 'Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                        }
                        
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    })
                    .catch(function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                        
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
        });
    }
}

// SMTP Email sending function
async function sendEmailViaSMTP(formData) {
    try {
        const response = await fetch('send-email-simple.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        // Return the result directly (success or error)
        return result;
    } catch (error) {
        console.error('SMTP error:', error);
        
        // Fallback to mailto if SMTP fails
        return await sendEmailViaMailto(formData);
    }
}

// Netlify Forms fallback
async function sendEmailViaNetlifyForms(formData) {
    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'form-name': 'contact',
                'name': formData.fullName,
                'email': formData.email,
                'phone': formData.phone,
                'company': formData.company,
                'service': formData.service,
                'budget': formData.budget,
                'message': formData.message
            })
        });
        
        if (response.ok) {
            return { success: true, message: 'Email sent via Netlify Forms' };
        } else {
            throw new Error('Netlify Forms failed');
        }
    } catch (error) {
        console.error('Netlify Forms error:', error);
        throw error;
    }
}

// EmailJS fallback
async function sendEmailViaEmailJS(formData) {
    return new Promise((resolve, reject) => {
        emailjs.init('YOUR_PUBLIC_KEY');
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(function(response) {
                resolve({ success: true, message: 'Email sent via EmailJS' });
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

// Mailto fallback
async function sendEmailViaMailto(formData) {
    // Instead of opening mailto, show a helpful message
    return { 
        success: false, 
        message: 'Email service temporarily unavailable. Please contact us directly at aavi10111@gmail.com or try again later.' 
    };
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary-600', 'text-white'));
                filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));
                this.classList.add('active', 'bg-primary-600', 'text-white');
                this.classList.remove('bg-gray-200', 'text-gray-700');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Portfolio modal functionality
function initPortfolioModal() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    // Sample project data
    const projectData = {
        'ecommerce-platform': {
            title: 'E-Commerce Platform',
            category: 'Web Development',
            year: '2024',
            description: 'A comprehensive e-commerce solution built with modern technologies, featuring advanced product management, secure payment processing, and an intuitive admin dashboard.',
            longDescription: 'This project involved creating a full-stack e-commerce platform from scratch. The platform includes user authentication, product catalog with advanced filtering, shopping cart functionality, secure payment integration with Stripe, order management, and a comprehensive admin dashboard for managing products, orders, and customers.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'JWT', 'Redux'],
            features: [
                'Responsive design for all devices',
                'Advanced product filtering and search',
                'Secure payment processing',
                'User authentication and authorization',
                'Admin dashboard for management',
                'Order tracking and history',
                'Email notifications',
                'Inventory management'
            ],
            challenges: 'The main challenge was implementing real-time inventory updates and ensuring secure payment processing while maintaining a smooth user experience.',
            results: 'The platform successfully handles over 1000 concurrent users and processes 500+ orders daily with 99.9% uptime.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format',
            liveUrl: '#',
            githubUrl: '#'
        },
        'fashion-store': {
            title: 'Fashion Store',
            category: 'E-Commerce',
            year: '2024',
            description: 'A beautiful and trendy fashion e-commerce website with advanced product filtering, wishlist functionality, and seamless checkout experience.',
            longDescription: 'This fashion e-commerce platform was designed with a focus on visual appeal and user experience. It features a modern, clean design that showcases fashion products effectively, with advanced filtering options, size guides, and a streamlined checkout process.',
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'PayPal', 'Tailwind CSS', 'Vuex'],
            features: [
                'Trendy and modern design',
                'Advanced product filtering',
                'Wishlist functionality',
                'Size guide integration',
                'Multiple payment options',
                'Social media integration',
                'Product reviews and ratings',
                'Mobile-optimized checkout'
            ],
            challenges: 'Creating an intuitive size guide system and implementing smooth product filtering without page reloads.',
            results: 'Increased conversion rate by 35% and reduced cart abandonment by 28% compared to the previous platform.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&auto=format',
            liveUrl: '#',
            githubUrl: '#'
        },
        'food-delivery': {
            title: 'Food Delivery App',
            category: 'Mobile Apps',
            year: '2024',
            description: 'A cross-platform mobile application for food delivery with real-time tracking, payment integration, and restaurant management features.',
            longDescription: 'This mobile application connects customers with local restaurants, providing real-time order tracking, multiple payment options, and a comprehensive restaurant management system. The app works seamlessly on both iOS and Android platforms.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Maps API', 'Stripe', 'Node.js'],
            features: [
                'Real-time order tracking',
                'GPS-based restaurant discovery',
                'Multiple payment methods',
                'Push notifications',
                'Restaurant ratings and reviews',
                'Order history and favorites',
                'Delivery time estimation',
                'Multi-language support'
            ],
            challenges: 'Implementing real-time location tracking and ensuring smooth performance across different devices and network conditions.',
            results: 'Successfully launched in 3 cities with 10,000+ active users and 4.8-star average rating.',
            image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&auto=format',
            liveUrl: '#',
            githubUrl: '#'
        },
        'corporate-website': {
            title: 'Corporate Website',
            category: 'Corporate',
            year: '2023',
            description: 'A professional corporate website with modern design, CMS integration, and excellent performance optimized for business growth.',
            longDescription: 'This corporate website was designed to establish a strong online presence for a growing business. It features a clean, professional design with easy content management, SEO optimization, and fast loading times to support business growth and lead generation.',
            technologies: ['Next.js', 'WordPress', 'Tailwind CSS', 'AWS', 'Headless CMS'],
            features: [
                'Professional and clean design',
                'Easy content management',
                'SEO optimized',
                'Fast loading times',
                'Contact forms and lead capture',
                'Blog and news section',
                'Team and company information',
                'Mobile responsive design'
            ],
            challenges: 'Balancing design aesthetics with performance optimization and ensuring easy content management for non-technical users.',
            results: 'Improved page load speed by 60% and increased organic traffic by 45% within 6 months.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
            liveUrl: '#',
            githubUrl: '#'
        },
        'saas-dashboard': {
            title: 'SaaS Dashboard',
            category: 'Web Development',
            year: '2023',
            description: 'A comprehensive SaaS dashboard with analytics, user management, and real-time data visualization for business intelligence.',
            longDescription: 'This SaaS dashboard provides businesses with powerful analytics and management tools. It features real-time data visualization, user management, subscription handling, and comprehensive reporting capabilities to help businesses make data-driven decisions.',
            technologies: ['Angular', 'Express', 'PostgreSQL', 'Chart.js', 'D3.js', 'Socket.io'],
            features: [
                'Real-time data visualization',
                'User and subscription management',
                'Customizable dashboards',
                'Advanced analytics and reporting',
                'API integration capabilities',
                'Role-based access control',
                'Data export functionality',
                'Responsive design'
            ],
            challenges: 'Handling large datasets efficiently and creating intuitive data visualization components that work across different screen sizes.',
            results: 'Reduced data analysis time by 70% and improved user engagement by 50% for our clients.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
            liveUrl: '#',
            githubUrl: '#'
        },
        'electronics-store': {
            title: 'Electronics Store',
            category: 'E-Commerce',
            year: '2023',
            description: 'An electronics e-commerce platform with advanced product filtering, reviews, and inventory management for tech gadgets.',
            longDescription: 'This electronics e-commerce platform specializes in tech gadgets and electronics. It features advanced product filtering, detailed product specifications, customer reviews, and comprehensive inventory management to handle a large catalog of electronic products.',
            technologies: ['Shopify', 'Liquid', 'JavaScript', 'Stripe', 'Shopify API'],
            features: [
                'Advanced product filtering',
                'Detailed product specifications',
                'Customer reviews and ratings',
                'Inventory management',
                'Warranty information',
                'Product comparison tool',
                'Tech support integration',
                'Mobile-optimized shopping'
            ],
            challenges: 'Managing a large product catalog with complex specifications and implementing effective search and filtering functionality.',
            results: 'Increased average order value by 25% and improved customer satisfaction scores by 40%.',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&auto=format',
            liveUrl: '#',
            githubUrl: '#'
        }
    };
    
    if (modal && viewProjectBtns.length > 0) {
        // Open modal
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const project = projectData[projectId];
                
                if (project) {
                    modalTitle.textContent = project.title;
                    modalContent.innerHTML = generateProjectContent(project);
                    modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Generate project content for modal
function generateProjectContent(project) {
    return `
        <div class="space-y-6">
            <!-- Project Header -->
            <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/2">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg shadow-lg" onerror="this.src='https://via.placeholder.com/800x600/3b82f6/ffffff?text=${encodeURIComponent(project.title)}'">
                </div>
                <div class="md:w-1/2 space-y-4">
                    <div class="flex items-center gap-4">
                        <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">${project.category}</span>
                        <span class="text-gray-500">${project.year}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900">${project.title}</h3>
                    <p class="text-gray-600">${project.description}</p>
                    <div class="flex gap-4">
                        <a href="${project.liveUrl}" class="btn-primary" target="_blank">View Live Site</a>
                    </div>
                </div>
            </div>
            
            <!-- Project Details -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Technologies -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <!-- Key Features -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                    <ul class="space-y-2">
                        ${project.features.map(feature => `
                            <li class="flex items-center text-gray-600">
                                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- Project Description -->
            <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Project Overview</h4>
                <p class="text-gray-600 leading-relaxed">${project.longDescription}</p>
            </div>
            
            <!-- Challenges & Results -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Challenges</h4>
                    <p class="text-gray-600">${project.challenges}</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Results</h4>
                    <p class="text-gray-600">${project.results}</p>
                </div>
            </div>
        </div>
    `;
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonials.length > 0) {
        let currentIndex = 0;
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('hidden', i !== index);
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentIndex);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Auto-play (optional)
        setInterval(nextTestimonial, 5000);
        
        // Initialize
        showTestimonial(0);
    }
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all elements with stagger-animation class
    document.querySelectorAll('.stagger-animation > *').forEach(el => {
        observer.observe(el);
    });

    // Observe other animated elements
    document.querySelectorAll('.animate-fade-in-up, .animate-scale-in, .animate-fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
initScrollAnimations();

// Mobile dropdown functionality
function initMobileDropdown() {
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.closest('.mobile-dropdown');
            const content = dropdown.querySelector('.mobile-dropdown-content');
            const isOpen = content.classList.contains('show');
            
            // Close all other dropdowns
            document.querySelectorAll('.mobile-dropdown-content').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.classList.remove('show');
                    otherContent.classList.add('hide');
                    setTimeout(() => {
                        otherContent.classList.add('hidden');
                        otherContent.classList.remove('hide');
                    }, 300);
                }
            });
            
            // Reset all other toggle buttons
            document.querySelectorAll('.mobile-dropdown-toggle').forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                }
            });
            
            if (isOpen) {
                // Close current dropdown
                content.classList.remove('show');
                content.classList.add('hide');
                this.classList.remove('active');
                setTimeout(() => {
                    content.classList.add('hidden');
                    content.classList.remove('hide');
                }, 300);
            } else {
                // Open current dropdown
                content.classList.remove('hidden', 'hide');
                content.classList.add('show');
                this.classList.add('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-dropdown')) {
            document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
                content.classList.remove('show');
                content.classList.add('hide');
                setTimeout(() => {
                    content.classList.add('hidden');
                    content.classList.remove('hide');
                }, 300);
            });
            
            document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }
    });
}
