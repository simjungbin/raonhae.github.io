// Initialize animations on scroll
document.addEventListener("DOMContentLoaded", () => {
    // Navigation active state updates
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            navLinks.forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero-bg img');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes
    const elementsToAnimate = [
        '.concept-text', 
        '.concept-images',
        '.analog-header',
        '.card',
        '.archive-item',
        '.cta-section'
    ];

    // Add initial styles dynamically so without JS things still show up
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
        .card:nth-child(1) { transition-delay: 0.1s; }
        .card:nth-child(2) { transition-delay: 0.3s; }
        .card:nth-child(3) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in-hidden');
            observer.observe(el);
        });
    });
});
