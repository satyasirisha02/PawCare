document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Slider elements
  const slides = document.querySelectorAll('.slider-slide');
  let currentSlide = 0;
  const slideInterval = 3000; // 3 seconds
  let sliderTimer;

  /* ==========================================================================
     1. Automatic Image Slider (No text overlay, smooth fade, 3s transition)
     ========================================================================== */
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlider() {
    sliderTimer = setInterval(nextSlide, slideInterval);
  }

  function stopSlider() {
    clearInterval(sliderTimer);
  }

  // Initialize and run slider
  if (slides.length > 0) {
    showSlide(currentSlide);
    startSlider();

    // Pause on hover for premium user experience
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      heroSlider.addEventListener('mouseenter', stopSlider);
      heroSlider.addEventListener('mouseleave', startSlider);
    }
  }

  /* ==========================================================================
     2. Responsive Mobile Menu
     ========================================================================== */
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = mainNav.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnToggle && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     3. Active Link Underline on Scroll (ScrollSpy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  function scrollSpy() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.main-nav a[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.main-nav a[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', scrollSpy);

  /* ==========================================================================
     4. Contact Form Handling (Validation and feedback messages)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Clear previous message
      formMessage.textContent = '';
      formMessage.style.color = '';

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const petType = contactForm.petType.value;
      const message = contactForm.message.value.trim();

      // Validate Fields
      if (!name) {
        showFeedback('Please enter your name.', 'error');
        contactForm.name.focus();
        return;
      }

      if (!email || !validateEmail(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        contactForm.email.focus();
        return;
      }

      if (!petType) {
        showFeedback('Please select your pet companion type.', 'error');
        contactForm.petType.focus();
        return;
      }

      if (!message) {
        showFeedback('Please write your message.', 'error');
        contactForm.message.focus();
        return;
      }

      // Success Feedback (matching lavender startup vibe)
      showFeedback('✨ Thank you! Your message was sent successfully. Our vet team will reply within 24 hours.', 'success');
      contactForm.reset();
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showFeedback(text, type) {
    formMessage.textContent = text;
    if (type === 'success') {
      formMessage.style.color = '#b991fa'; // Bright Lavender
    } else {
      formMessage.style.color = '#ff5e7e'; // Danger / warning pink
    }
  }
});
