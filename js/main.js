document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize card interactions
    initializeCardInteractions();
    
    // Initialize scroll spy
    initializeScrollSpy();
});

function initializeSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = document.querySelector('button');
    
    function performSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            showAllCards();
            return;
        }
        
        const cards = document.querySelectorAll('.bg-white.rounded-lg.shadow');
        let hasResults = false;
        
        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.bg-vue-green')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(query) || 
                          description.includes(query) || 
                          tags.some(tag => tag.includes(query));
            
            card.style.display = matches ? 'block' : 'none';
            if (matches) hasResults = true;
        });

        // Update section visibility
        updateSectionVisibility();
    }

    function showAllCards() {
        document.querySelectorAll('.bg-white.rounded-lg.shadow').forEach(card => {
            card.style.display = 'block';
        });
        updateSectionVisibility();
    }

    function updateSectionVisibility() {
        document.querySelectorAll('section').forEach(section => {
            const visibleCards = Array.from(section.querySelectorAll('.bg-white.rounded-lg.shadow'))
                .filter(card => card.style.display !== 'none');
            section.style.display = visibleCards.length > 0 ? 'block' : 'none';
        });
    }

    searchButton.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a, footer a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    updateActiveLink(this);
                }
            }
        });
    });
}

function updateActiveLink(activeLink) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('bg-vue-dark');
        link.classList.add('hover:text-vue-light');
    });
    if (activeLink.closest('nav')) {
        activeLink.classList.add('bg-vue-dark');
        activeLink.classList.remove('hover:text-vue-light');
    }
}

function initializeCardInteractions() {
    document.querySelectorAll('.bg-white.rounded-lg.shadow').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('transform', 'scale-105', 'transition-transform', 'duration-200', 'shadow-xl');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('transform', 'scale-105', 'transition-transform', 'duration-200', 'shadow-xl');
        });
    });
}

function initializeScrollSpy() {
    let ticking = false;
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY + 100;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollPosition >= sectionTop && 
                        scrollPosition < sectionTop + sectionHeight) {
                        const correspondingLink = document.querySelector(`nav a[href="#${section.id}"]`);
                        if (correspondingLink) {
                            updateActiveLink(correspondingLink);
                        }
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}
