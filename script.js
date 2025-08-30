// Mobile menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

// Create close button
const closeButton = document.createElement('button');
closeButton.classList.add('close-menu');
closeButton.innerHTML = '&times;';
document.body.appendChild(closeButton);

function toggleMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  body.classList.toggle("no-scroll");
  
  // Toggle aria-expanded for accessibility
  const isExpanded = hamburger.classList.contains("active");
  hamburger.setAttribute("aria-expanded", isExpanded);
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  // Only close menu if we're on mobile
  if (window.innerWidth <= 768) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    hamburger.setAttribute("aria-expanded", "false");
  }
}));

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    toggleMenu();
  }
});

// Improve accessibility
hamburger.setAttribute("aria-label", "Toggle navigation menu");
hamburger.setAttribute("aria-expanded", "false");
closeButton.setAttribute("aria-label", "Close menu");

// Smooth scrolling for navigation links (only for anchor links that exist)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  // Check if the link is not a mobile menu link
  if (!anchor.classList.contains('nav-link') || window.innerWidth > 768) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#' && targetId !== '') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }
});

// Reveal animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 1s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .contact-form').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Form submission with FormSubmit
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Optional: Add loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // FormSubmit will handle the actual submission
      // You can keep the alert for immediate feedback
      setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  });
}

// Navbar background on scroll - only apply on desktop
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar && window.innerWidth > 768) { // Only apply on desktop
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      // Reset to your original gradient background
      navbar.style.background = 'linear-gradient(45deg, #a854ec, #1fe9db)';
      navbar.style.boxShadow = 'none';
    }
  }
});

// Profile image hover effect
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
  profileImage.addEventListener('mouseenter', () => {
    document.querySelectorAll('.floating-icon').forEach(icon => {
      icon.style.animationPlayState = 'paused';
    });
  });
  
  profileImage.addEventListener('mouseleave', () => {
    document.querySelectorAll('.floating-icon').forEach(icon => {
      icon.style.animationPlayState = 'running';
    });
  });
}

// Typewriter effect for hero title - only if element exists and is empty
function initTypewriter() {
  const subtitle = document.querySelector('.hero-subtitle');
  // Only run if the subtitle exists and doesn't already have content
  if (subtitle && !subtitle.textContent.trim()) {
    const titles = ["A Web Developer", "A UI/UX Designer", "A Problem Solver"];
    let currentIndex = 0;
    
    function typeWriter() {
      const currentTitle = titles[currentIndex];
      let charIndex = 0;
      
      function type() {
        if (charIndex < currentTitle.length) {
          subtitle.textContent = currentTitle.substring(0, charIndex + 1);
          charIndex++;
          setTimeout(type, 100);
        } else {
          setTimeout(erase, 2000);
        }
      }
      
      function erase() {
        if (charIndex > 0) {
          subtitle.textContent = currentTitle.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 50);
        } else {
          currentIndex = (currentIndex + 1) % titles.length;
          setTimeout(typeWriter, 500);
        }
      }
      
      type();
    }
    
    // Start typewriter after initial load
    setTimeout(typeWriter, 1000);
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initTypewriter);