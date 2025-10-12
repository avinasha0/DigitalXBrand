// Component Loader Script
document.addEventListener('DOMContentLoaded', function() {
    // Load header component
    loadComponent('header', 'components/header.html');
    
    // Load footer component
    loadComponent('footer', 'components/footer.html');
    
    // Set active navigation link based on current page
    setActiveNavLink();
});

function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }
    
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            
            // Re-initialize mobile menu functionality after loading
            if (containerId === 'header') {
                initializeMobileMenu();
            }
            
            // Re-initialize scroll to top functionality after loading
            if (containerId === 'footer') {
                initializeScrollToTop();
            }
        })
        .catch(error => {
            console.error(`Error loading component ${componentPath}:`, error);
            container.innerHTML = `<div class="text-red-500 p-4">Error loading ${containerId} component</div>`;
        });
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
