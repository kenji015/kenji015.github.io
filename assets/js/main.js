// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('header nav');
  const overlay = document.getElementById('navOverlay');

  if (!menuToggle || !nav) return;

  function openNav() {
    nav.classList.add('active');
    if (overlay) overlay.classList.add('active');
  }

  function closeNav() {
    nav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  menuToggle.addEventListener('click', openNav);

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close menu when clicking on a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// Navbar scroll behavior
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('navscroll');
    } else {
      header.classList.remove('navscroll');
    }
  });
}

// Typewriter effect
function initTypewriter() {
  const typedTextSpan = document.querySelector('.typewriter');
  if (!typedTextSpan) return;

  const words = [
    'Web Developer',
    'Web Designer',
    'Photographer',
    'Script Writer'
  ];

  const typingDelay = 120;
  const erasingDelay = 100;
  const pauseDelay = 1000;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseDelay);
      } else {
        setTimeout(typeLoop, typingDelay);
      }
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeLoop, typingDelay);
      } else {
        setTimeout(typeLoop, erasingDelay);
      }
    }
  }

  if (words.length > 0) {
    setTimeout(typeLoop, 1000);
  }
}

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();

    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initTypewriter();
  setActiveNavLink();
  initScrollAnimations();
});