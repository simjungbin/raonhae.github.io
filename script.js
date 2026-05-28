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

    // Parallax effect for hero image/video
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero-bg img, .hero-bg video');
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

    // Typewriter effect initialization
    const typewriterContainer = document.getElementById('typewriter');
    if (typewriterContainer) {
        const textTarget = typewriterContainer.querySelector('.typewriter-text');
        const fullText = typewriterContainer.getAttribute('data-text') || '';
        
        const getParam = (styleName, fallback) => {
            const value = getComputedStyle(typewriterContainer).getPropertyValue(styleName).trim();
            return value ? parseInt(value, 10) : fallback;
        };

        const speed = getParam('--speed', 90);
        const pause = getParam('--pause', 1400);

        let currentIndex = 0;
        let isDeleting = false;
        let timeoutId = null;
        let isElementVisible = false;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            textTarget.textContent = fullText;
        } else {
            const handleTypewriter = () => {
                if (!isElementVisible) return;

                if (!isDeleting) {
                    textTarget.textContent = fullText.slice(0, currentIndex + 1);
                    currentIndex++;

                    if (currentIndex === fullText.length) {
                        isDeleting = true;
                        timeoutId = setTimeout(handleTypewriter, pause);
                    } else {
                        timeoutId = setTimeout(handleTypewriter, speed);
                    }
                } else {
                    textTarget.textContent = fullText.slice(0, currentIndex - 1);
                    currentIndex--;

                    if (currentIndex === 0) {
                        isDeleting = false;
                        timeoutId = setTimeout(handleTypewriter, speed * 3);
                    } else {
                        timeoutId = setTimeout(handleTypewriter, speed * 0.5);
                    }
                }
            };

            const typewriterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isElementVisible = entry.isIntersecting;
                    if (isElementVisible) {
                        clearTimeout(timeoutId);
                        handleTypewriter();
                    } else {
                        clearTimeout(timeoutId);
                    }
                });
            }, { threshold: 0.05 });

            typewriterObserver.observe(typewriterContainer);
        }
    }
});
