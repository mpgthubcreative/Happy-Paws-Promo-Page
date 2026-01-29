// Auto-activate card on scroll for mobile
const servicesCarousel = document.querySelector('.card-box');
const cards = document.querySelectorAll('.card');
function updateActiveCard() {
    if (window.innerWidth < 768 && servicesCarousel) {
        const containerCenter = servicesCarousel.scrollLeft + (servicesCarousel.clientWidth / 2);
        
        let closestCard = null;
        let closestDistance = Infinity;
        
        cards.forEach(card => {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(containerCenter - cardCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }
        });
        
        // Remove active from all cards
        cards.forEach(c => c.classList.remove('active'));
        
        // Add active to the centered card
        if (closestCard) {
            closestCard.classList.add('active');
        }
    }
}

// Listen to scroll events on the carousel
if (servicesCarousel) {
    servicesCarousel.addEventListener('scroll', updateActiveCard);
    // Initialize on load
    window.addEventListener('load', updateActiveCard);
    updateActiveCard();
}

// Card click interaction for mobile - allow clicking to manually activate
cards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Only apply on mobile
        if (window.innerWidth < 768) {
            // Don't toggle if clicking the Book Now button directly
            if (e.target.classList.contains('card-book-button')) {
                return;
            }
            
            e.preventDefault();
            
            // Remove active from all cards
            cards.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked card
            this.classList.add('active');
            
            // Scroll to center this card
            const cardLeft = this.offsetLeft;
            const cardWidth = this.offsetWidth;
            const containerWidth = servicesCarousel.clientWidth;
            const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
            
            servicesCarousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Mobile CTA - Show/Hide based on Promo Card Section
const stickyCTA = document.querySelector('.sticky-mobile-cta-container');
const promoCard = document.querySelector('.promo-card');

if (stickyCTA && promoCard) {
    function toggleStickyCTA() {
        const promoBottom = promoCard.getBoundingClientRect().bottom;
        
        // Hide when in promo card section, show when scrolled past
        if (promoBottom > 0) {
            stickyCTA.classList.add('hide');
            stickyCTA.classList.remove('show');
        } else {
            stickyCTA.classList.remove('hide');
            stickyCTA.classList.add('show');
        }
    }
    
    window.addEventListener('scroll', toggleStickyCTA);
    window.addEventListener('load', toggleStickyCTA);
    toggleStickyCTA();
}

// Service Card Mobile Touch/Click Interaction
cards.forEach(card => {
    // For mobile - toggle on click/touch
    card.addEventListener('click', function(e) {
        // Only toggle if not clicking the button
        if (!e.target.closest('.card-overlay-button')) {
            // Check if screen is mobile (less than 768px)
            if (window.innerWidth < 768) {
                // Close all other cards
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });
                // Toggle current card
                this.classList.toggle('active');
            }
        }
    });
});

// Close overlay when clicking outside on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth < 768) {
        if (!e.target.closest('.card')) {
            cards.forEach(card => {
                card.classList.remove('active');
            });
        }
    }
});

// Hide Main Header in Footer CTA Section on Desktop
const mainHeader = document.querySelector('.main-header');
const footerCTA = document.querySelector('.footer-cta-box');

if (mainHeader && footerCTA) {
    function toggleMainHeader() {
        const isDesktop = window.innerWidth >= 768;
        
        if (isDesktop) {
            const footerCTATop = footerCTA.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Hide header when footer CTA is in view
            if (footerCTATop < windowHeight) {
                mainHeader.style.transform = 'translateY(-100%)';
                mainHeader.style.transition = 'transform 0.3s ease';
            } else {
                mainHeader.style.transform = 'translateY(0)';
            }
        } else {
            // Reset for mobile
            mainHeader.style.transform = 'translateY(0)';
        }
    }
    
    window.addEventListener('scroll', toggleMainHeader);
    window.addEventListener('load', toggleMainHeader);
    window.addEventListener('resize', toggleMainHeader);
    toggleMainHeader();
}
