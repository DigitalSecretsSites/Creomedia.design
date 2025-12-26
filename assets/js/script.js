'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);


/**
 * Dynamic content loading - counter animations for stats section
 */

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statsCard = entry.target;
      const statsTitle = statsCard.querySelector('.stats-title');
      const targetValue = parseInt(statsTitle.textContent.replace(/[^0-9]/g, ''));
      const suffix = statsTitle.textContent.replace(/[0-9]/g, '');
      
      let count = 0;
      const duration = 2000; // Animation duration in ms
      const increment = targetValue / (duration / 16); // 16ms per frame ~ 60fps
      
      const counter = setInterval(() => {
        count += increment;
        if (count >= targetValue) {
          statsTitle.textContent = targetValue + suffix;
          clearInterval(counter);
        } else {
          statsTitle.textContent = Math.floor(count) + suffix;
        }
      }, 16);
      
      statsObserver.unobserve(statsCard); // Stop observing after animation
    }
  });
}, { threshold: 0.5 });

// Observe all stats cards
const statsCards = document.querySelectorAll('.stats-card');
statsCards.forEach(card => statsObserver.observe(card));


/**
 * Dynamic content - FAQ accordion functionality
 */

const faqButtons = document.querySelectorAll('.faq-btn');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const faqContent = faqItem.querySelector('.faq-content');
    
    // Close all other FAQ items
    faqButtons.forEach(btn => {
      if (btn !== button) {
        btn.parentElement.classList.remove('faq-active');
      }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('faq-active');
  });
});


/**
 * Dynamic content - testimonial carousel
 */

let currentTestimonial = 0;
const testimonialsList = document.querySelector('.testimonials-list');
const testimonialItems = document.querySelectorAll('.testimonials-card');

if (testimonialsList && testimonialItems.length > 0) {
  // Auto-rotate testimonials
  setInterval(() => {
    testimonialItems[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    testimonialItems[currentTestimonial].classList.add('active');
  }, 5000); // Change every 5 seconds
}


/**
 * Dynamic content - service card hover effects
 */

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('service-card-hover');
  });
  
  card.addEventListener('mouseleave', () => {
    card.classList.remove('service-card-hover');
  });
});


/**
 * Dynamic content - newsletter form validation
 */

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = form.querySelector('.email-field');
    const emailValue = emailInput.value;
    
    if (validateEmail(emailValue)) {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.classList.add('newsletter-success');
      successMessage.textContent = 'Thank you for subscribing!';
      successMessage.style.cssText = 'color: #4BB543; margin-top: 10px; text-align: center;';
      
      // Remove any existing messages
      const existingMessage = form.querySelector('.newsletter-success');
      if (existingMessage) existingMessage.remove();
      
      form.appendChild(successMessage);
      
      // Reset form
      form.reset();
      
      // Remove message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    } else {
      // Show error message
      emailInput.style.borderColor = '#e74c3c';
      setTimeout(() => {
        emailInput.style.borderColor = '';
      }, 2000);
    }
  });
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}


/**
 * Dynamic content - smooth scrolling for anchor links
 */

// Client logo carousel
const clientItems = document.querySelectorAll('.clients-item');

if (clientItems.length > 0) {
  // Add animation to client logos when page loads
  clientItems.forEach((item, index) => {
    // Set initial state
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Animate each item with a delay
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      item.style.opacity = '0.7';
      item.style.transform = 'translateY(0)';
      
      // Add hover effect
      item.addEventListener('mouseenter', () => {
        item.style.opacity = '1';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.opacity = '0.7';
      });
    }, 300 * index);
  });
  
  // Also add animation to client logo placeholders
  const clientPlaceholders = document.querySelectorAll('.client-logo-placeholder');
  clientPlaceholders.forEach((placeholder, index) => {
    // Add staggered animation
    setTimeout(() => {
      placeholder.style.transition = 'all 0.3s ease';
      placeholder.style.opacity = '0';
      placeholder.style.transform = 'scale(0.8)';
      
      // Animate after a delay
      setTimeout(() => {
        placeholder.style.opacity = '1';
        placeholder.style.transform = 'scale(1)';
      }, 100 * index);
    }, 300 * index);
  });
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href !== '#') {
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    }
  });
});


/**
 * Dynamic content - team card image rotation
 */

const teamCards = document.querySelectorAll('.team-card');

if (teamCards.length > 0) {
  teamCards.forEach(card => {
    const frontImage = card.querySelector('.img-cover:not(.team-back)');
    const backImage = card.querySelector('.img-cover.team-back');
    
    if (frontImage && backImage) {
      // Set up automatic rotation for each team card
      setInterval(() => {
        if (parseFloat(frontImage.style.opacity || '1') > 0.5) {
          // Fade out front image, fade in back image
          frontImage.style.opacity = '0';
          setTimeout(() => {
            backImage.style.opacity = '1';
          }, 300);
        } else {
          // Fade out back image, fade in front image
          backImage.style.opacity = '0';
          setTimeout(() => {
            frontImage.style.opacity = '1';
          }, 300);
        }
      }, 3000); // Rotate every 3 seconds
    }
  });
}