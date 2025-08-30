// Navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
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
    });
}
// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
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

// Typewriter effect for hero title
function initTypewriter() {
    const titles = [" A Web Developer", " A UI/UX Designer", " A Problem Solver"];
    const subtitle = document.querySelector('.hero-subtitle');
    let currentIndex = 0;
    
    function typeWriter() {
        if (subtitle) {
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
    }
    
    // Start typewriter after initial load
    setTimeout(typeWriter, 1000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initTypewriter);