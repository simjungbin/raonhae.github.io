// 모든 배경 영상 음소거
document.querySelectorAll('video').forEach(video => {
    video.muted = true;
    video.volume = 0;
});

// Initialize animations on scroll
document.addEventListener("DOMContentLoaded", () => {
    // Navigation active state updates
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
        '.solution-text',
        '.solution-image-wrapper',
        '.analog-header',
        '.card',
        '.archive-intro',
        '.archive-cta-banner'
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

    // Product Hero Cassette Interactions
    const cassetteContainer = document.querySelector('.cassette-container');
    const floatingCassette = document.querySelector('.floating-cassette');
    const heroNewContent = document.querySelector('.hero-new-content');
    const summerAudio = document.getElementById('summerAudio');

    if (cassetteContainer && floatingCassette && heroNewContent && summerAudio) {
        // Interactive hover physics strictly on the image itself
        floatingCassette.addEventListener('mousemove', (e) => {
            const rect = floatingCassette.getBoundingClientRect();

            // Calculate center of the image
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Normalize distance from center (-1 to 1)
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);

            // Push away from mouse (max 10px translate, 2deg rotate)
            const moveX = -(deltaX * 10);
            const moveY = -(deltaY * 10);
            const rotate = -(deltaX * 2);

            cassetteContainer.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
        });

        floatingCassette.addEventListener('mouseleave', () => {
            cassetteContainer.style.transform = 'translate(0px, 0px) rotate(0deg)';
        });

        // Click to play interaction
        let isPlaying = false;
        floatingCassette.addEventListener('click', () => {
            if (isPlaying) {
                summerAudio.pause();
                heroNewContent.classList.remove('playing');
            } else {
                if (summerAudio.src && summerAudio.src !== window.location.href) {
                    summerAudio.play().catch(e => console.log('Playback prevented: ', e));
                } else {
                    console.log('Audio source not set. Add src to <audio id="summerAudio">.');
                }
                heroNewContent.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }

    // Sound button toggle
    const soundBtn = document.querySelector('.sound-btn');
    const soundIcon = document.getElementById('soundIcon');
    const heroVideo = document.querySelector('.hero-bg video');

    if (soundBtn && soundIcon) {
        let isMuted = false;
        soundBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            if (isMuted) {
                soundIcon.src = 'assets/off.png';
                soundIcon.alt = 'Sound Off';
                if (summerAudio) summerAudio.muted = true;
                if (heroVideo) heroVideo.muted = true;
            } else {
                soundIcon.src = 'assets/on.png';
                soundIcon.alt = 'Sound On';
                if (summerAudio) summerAudio.muted = false;
                if (heroVideo) heroVideo.muted = false;
            }
        });
    }

    // Story Intro Fade-up Animation
    const fadeUpElements = document.querySelectorAll('.fade-up-element');
    if (fadeUpElements.length > 0) {
        const fadeUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing once it has faded in
                    fadeUpObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeUpElements.forEach(el => {
            fadeUpObserver.observe(el);
        });
    }
});

// --- Features Sticky Scroll ---
(function () {
    const section = document.querySelector('.product-features-sticky');
    if (!section) return;

    const panels = section.querySelectorAll('.features-text-panel');
    const imageSlides = section.querySelectorAll('.features-image-slide');
    const dots = section.querySelectorAll('.features-indicator-dot');
    const totalPanels = panels.length;
    let currentIndex = -1;

    // 섹션 높이를 패널 수 × 100vh로 설정
    section.style.height = (totalPanels * window.innerHeight) + 'px';

    function activateIndex(index) {
        if (index === currentIndex) return;
        const prev = currentIndex;
        currentIndex = index;

        panels.forEach((p, i) => {
            p.classList.remove('active', 'exit-up');
            if (i === index) {
                p.classList.add('active');
            } else if (i === prev && prev < index) {
                p.classList.add('exit-up');
            }
        });

        imageSlides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });

        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }

    function onScroll() {
        const rect = section.getBoundingClientRect();
        const sectionTop = -rect.top; // 섹션 상단이 뷰포트 위로 얼마나 올라갔는지
        const scrollableHeight = section.offsetHeight - window.innerHeight;

        if (sectionTop <= 0) {
            activateIndex(0);
            return;
        }
        if (sectionTop >= scrollableHeight) {
            activateIndex(totalPanels - 1);
            return;
        }

        const index = Math.floor((sectionTop / scrollableHeight) * totalPanels);
        activateIndex(Math.min(index, totalPanels - 1));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        section.style.height = (totalPanels * window.innerHeight) + 'px';
        onScroll();
    });

    // 초기 실행
    activateIndex(0);
    onScroll();
})();
// --- Cassette Click Audio ---
(function () {
    const cassette = document.querySelector('.cassette-container');
    const audio = document.getElementById('summerAudio');
    const soundIcon = document.getElementById('soundIcon');
    const soundBtn = document.querySelector('.sound-btn');
    if (!cassette || !audio) return;

    let isPlaying = false;

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            if (soundIcon) soundIcon.src = 'assets/off.png';
        } else {
            audio.play().catch(e => console.log('재생 오류:', e));
            isPlaying = true;
            if (soundIcon) soundIcon.src = 'assets/on.png';
        }
    }

    cassette.addEventListener('click', togglePlay);
    if (soundBtn) soundBtn.addEventListener('click', togglePlay);
})();
// --- Fade In on Scroll ---
(function () {
    const targets = document.querySelectorAll(
        '.team-hero-content, .intro-quote, .intro-subtext, .section-divider, .member-item, .footer-container'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    targets.forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });
})();