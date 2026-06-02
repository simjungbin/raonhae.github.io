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

    // Special observer for product-intro section to start when 20-30% (25%) of it enters the viewport
    const productIntro = document.querySelector('.product-intro');
    if (productIntro) {
        const introText = productIntro.querySelector('.product-intro-text');
        const introImage = productIntro.querySelector('.product-intro-image');
        
        if (introText && introImage) {
            introText.classList.add('fade-in-hidden');
            introImage.classList.add('fade-in-hidden');
            
            const introObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        introText.classList.remove('fade-in-hidden');
                        introImage.classList.remove('fade-in-hidden');
                        introText.classList.add('fade-in-visible');
                        introImage.classList.add('fade-in-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.25 // starts when 25% (20~30%) of the section enters the viewport
            });
            introObserver.observe(productIntro);
        }
    }

    // Special observer for FEATURES section to start when 20-30% (25%) enters the viewport
    const productFeatures = document.querySelector('.product-features');
    if (productFeatures) {
        const title = productFeatures.querySelector('.section-title');
        const cards = productFeatures.querySelectorAll('.feature-card');
        
        if (title && cards.length > 0) {
            title.classList.add('fade-in-hidden');
            cards.forEach(card => card.classList.add('fade-in-hidden'));
            
            const featuresObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        title.classList.remove('fade-in-hidden');
                        title.classList.add('fade-in-visible');
                        
                        cards.forEach(card => {
                            card.classList.remove('fade-in-hidden');
                            card.classList.add('fade-in-visible');
                        });
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.25 // starts when 25% (20~30%) of the section enters the viewport
            });
            
            featuresObserver.observe(productFeatures);
        }
    }

    // Special observer for Video Showcase section
    const productVideoShowcase = document.querySelector('.product-video-showcase');
    if (productVideoShowcase) {
        productVideoShowcase.classList.add('fade-in-hidden');

        const videoObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    productVideoShowcase.classList.remove('fade-in-hidden');
                    productVideoShowcase.classList.add('fade-in-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.12
        });

        videoObserver.observe(productVideoShowcase);
    }


    // Special observer for WHAT'S INSIDE section to start when 20-30% (25%) enters the viewport
    const productInside = document.querySelector('.product-inside');
    if (productInside) {
        const title = productInside.querySelector('.section-title');
        const cards = productInside.querySelectorAll('.inside-card');
        
        if (title && cards.length > 0) {
            title.classList.add('fade-in-hidden');
            cards.forEach(card => card.classList.add('fade-in-hidden'));
            
            const insideObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        title.classList.remove('fade-in-hidden');
                        title.classList.add('fade-in-visible');
                        
                        cards.forEach(card => {
                            card.classList.remove('fade-in-hidden');
                            card.classList.add('fade-in-visible');
                        });
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.25 // starts when 25% (20~30%) of the section enters the viewport
            });
            
            insideObserver.observe(productInside);
        }
    }

    // Special observer for product-cta section to start when 20-30% (25%) enters the viewport
    const productCta = document.querySelector('.product-cta');
    if (productCta) {
        const ctaText = productCta.querySelector('.cta-text');
        const ctaActions = productCta.querySelector('.cta-actions');
        
        if (ctaText && ctaActions) {
            ctaText.classList.add('fade-in-hidden');
            ctaActions.classList.add('fade-in-hidden');
            
            const ctaObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        ctaText.classList.remove('fade-in-hidden');
                        ctaActions.classList.remove('fade-in-hidden');
                        ctaText.classList.add('fade-in-visible');
                        ctaActions.classList.add('fade-in-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.25 // starts when 25% (20~30%) of the section enters the viewport
            });
            
            ctaObserver.observe(productCta);
        }
    }

    // Special observer for Footer section to start when it enters the viewport
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerContainer = footer.querySelector('.footer-container');
        if (footerContainer) {
            footerContainer.classList.add('fade-in-hidden');
            
            const footerObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        footerContainer.classList.remove('fade-in-hidden');
                        footerContainer.classList.add('fade-in-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1 // triggers quickly when footer starts to enter
            });
            
            footerObserver.observe(footer);
        }
    }

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

            const startObserver = () => {
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
            };

            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(startObserver);
            } else {
                startObserver();
            }
        }
    }
});
