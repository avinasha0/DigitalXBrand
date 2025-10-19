// Component Loader Script - Standalone Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Components.js loaded successfully');
    
    // Load header component
    loadComponent('header', 'components/header.html');
    
    // Load footer component
    loadComponent('footer', 'components/footer.html');
    
    // Set active navigation link based on current page
    setActiveNavLink();
});

function loadComponent(containerId, componentPath) {
    console.log(`Loading component: ${containerId} from ${componentPath}`);
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }
    
    // Try fetch first (works with servers)
    fetch(componentPath)
        .then(response => {
            console.log(`Response for ${componentPath}:`, response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            console.log(`Successfully loaded ${componentPath}`);
            container.innerHTML = html;
            initializeComponent(containerId);
        })
        .catch(error => {
            console.log(`Fetch failed for ${componentPath}, trying alternative method:`, error.message);
            // Fallback: Load component content directly
            loadComponentFallback(containerId, componentPath);
        });
}

function loadComponentFallback(containerId, componentPath) {
    // For standalone operation, we'll embed the components directly
    const container = document.getElementById(containerId);
    
    if (containerId === 'header') {
        container.innerHTML = getHeaderHTML();
    } else if (containerId === 'footer') {
        container.innerHTML = getFooterHTML();
    }
    
    initializeComponent(containerId);
}

function initializeComponent(containerId) {
    // Re-initialize mobile menu functionality after loading
    if (containerId === 'header') {
        initializeMobileMenu();
    }
    
    // Re-initialize scroll to top functionality after loading
    if (containerId === 'footer') {
        initializeScrollToTop();
    }
}

function getHeaderHTML() {
    return `<nav class="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300" id="navbar">
        <div class="container-custom">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <a href="index.html" class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg">D</span>
                        </div>
                        <span class="text-xl font-bold text-gray-900">DigitalXBrand</span>
                    </a>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="index.html" class="nav-link text-gray-700 hover:text-primary-600 transition-colors duration-300">Home</a>
                        <a href="services.html" class="nav-link text-gray-700 hover:text-primary-600 transition-colors duration-300">Services</a>
                        <a href="portfolio.html" class="nav-link text-gray-700 hover:text-primary-600 transition-colors duration-300">Portfolio</a>
                        
                        <!-- Our Products Dropdown -->
                        <div class="relative group">
                            <button class="nav-link text-gray-700 hover:text-primary-600 transition-colors duration-300 flex items-center">
                                Our Products
                                <svg class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-2">
                                    <a href="https://leadformhub.com/" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                                        <div class="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                            LeadFormHub
                                        </div>
                                    </a>
                                    <a href="https://talentlit.com/" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                                        <div class="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                            TalentLit
                                        </div>
                                    </a>
                                    <a href="https://zviro.com/" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                                        <div class="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                            </svg>
                                            Zviro
                                        </div>
                                    </a>
                                    <a href="https://dukaantech.com/" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                                        <div class="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                            </svg>
                                            DukaanTech POS
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <a href="about.html" class="nav-link text-gray-700 hover:text-primary-600 transition-colors duration-300">About</a>
                        <a href="contact.html" class="nav-link text-gray-700 hover:text-primary-600 transition-colors duration-300">Contact</a>
                    </div>
                </div>
                
                <!-- CTA Button -->
                <div class="hidden md:block">
                    <a href="contact.html" class="btn-primary">Get Started</a>
                </div>
                
                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button type="button" class="mobile-menu-button text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600" id="mobile-menu-btn">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="md:hidden hidden" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="index.html" class="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-300">Home</a>
                <a href="services.html" class="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-300">Services</a>
                <a href="portfolio.html" class="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-300">Portfolio</a>
                
                <!-- Our Products Mobile Menu -->
                <div class="mobile-dropdown">
                    <button class="mobile-dropdown-toggle w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-300 flex items-center justify-between">
                        <span>Our Products</span>
                        <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-content hidden">
                        <a href="https://leadformhub.com/" target="_blank" rel="noopener noreferrer" class="block px-6 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-300">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                LeadFormHub
                            </div>
                        </a>
                        <a href="https://talentlit.com/" target="_blank" rel="noopener noreferrer" class="block px-6 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-300">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                TalentLit
                            </div>
                        </a>
                        <a href="https://zviro.com/" target="_blank" rel="noopener noreferrer" class="block px-6 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-300">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                Zviro
                            </div>
                        </a>
                        <a href="https://dukaantech.com/" target="_blank" rel="noopener noreferrer" class="block px-6 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-300">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                                DukaanTech POS
                            </div>
                        </a>
                    </div>
                </div>
                
                <a href="about.html" class="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-300">About</a>
                <a href="contact.html" class="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-300">Contact</a>
                <a href="contact.html" class="block px-3 py-2 btn-primary text-center">Get Started</a>
            </div>
        </div>
    </nav>`;
}

function getFooterHTML() {
    return `<footer class="bg-secondary-900 text-white">
        <div class="container-custom">
            <div class="py-16">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Company Info -->
                    <div class="lg:col-span-2">
                        <div class="flex items-center space-x-2 mb-6">
                            <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                                <span class="text-white font-bold text-lg">D</span>
                            </div>
                            <span class="text-xl font-bold">DigitalXBrand</span>
                        </div>
                        <p class="text-gray-300 mb-6 max-w-md">
                            We create stunning, responsive websites and digital solutions that drive business growth and engage your audience.
                        </p>
                        <div class="flex space-x-4">
                            <a href="https://www.facebook.com/digitalxbrand/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/digitalxbrand_ig/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/digitalxbrand/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Quick Links -->
                    <div>
                        <h3 class="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul class="space-y-3">
                            <li><a href="index.html" class="text-gray-300 hover:text-white transition-colors duration-300">Home</a></li>
                            <li><a href="services.html" class="text-gray-300 hover:text-white transition-colors duration-300">Services</a></li>
                            <li><a href="portfolio.html" class="text-gray-300 hover:text-white transition-colors duration-300">Portfolio</a></li>
                            <li><a href="about.html" class="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
                            <li><a href="contact.html" class="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>
                    
                    <!-- Services -->
                    <div>
                        <h3 class="text-lg font-semibold mb-6">Services</h3>
                        <ul class="space-y-3">
                            <li><a href="web-development.html" class="text-gray-300 hover:text-white transition-colors duration-300">Web Development</a></li>
                            <li><a href="ui-ux-design.html" class="text-gray-300 hover:text-white transition-colors duration-300">UI/UX Design</a></li>
                            <li><a href="digital-marketing.html" class="text-gray-300 hover:text-white transition-colors duration-300">Digital Marketing</a></li>
                            <li><a href="seo-services.html" class="text-gray-300 hover:text-white transition-colors duration-300">SEO Services</a></li>
                            <li><a href="maintenance.html" class="text-gray-300 hover:text-white transition-colors duration-300">Maintenance</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Footer -->
            <div class="border-t border-secondary-800 py-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-400 text-sm">
                        © 2024 DigitalXBrand. All rights reserved.
                    </p>
                    <div class="flex space-x-6 mt-4 md:mt-0">
                        <a href="privacy.html" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
                        <a href="terms.html" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button id="scroll-to-top" class="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-110 hidden z-50">
        <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>`;
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('text-primary-600', 'font-medium');
            link.classList.remove('text-gray-700');
        } else {
            link.classList.remove('text-primary-600', 'font-medium');
            link.classList.add('text-gray-700');
        }
    });
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Mobile dropdown functionality
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content) {
                content.classList.toggle('hidden');
                const arrow = this.querySelector('svg');
                if (arrow) {
                    arrow.classList.toggle('rotate-180');
                }
            }
        });
    });
}

function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        });
        
        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
