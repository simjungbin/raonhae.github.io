document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const fadeUpElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a slight delay for elements that appear together
        const delay = entry.target.style.animationDelay || '0s';
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseFloat(delay) * 1000);
        
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeUpElements.forEach(element => {
    observer.observe(element);
  });
});
