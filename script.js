// Interactive scripts for SACOM Website
document.addEventListener("DOMContentLoaded", () => {
    
    // Smooth scroll for internal navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Console confirmation when initialized
    console.log("SACOM Website Loaded Successfully.");
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Hold preloader briefly so animation finishes cleanly
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 2000); // 2-second display time
});

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Copyright Year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Scroll-Triggered Counter Animation
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');
    let animated = false;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // Animation duration in milliseconds (2 seconds)
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, stepTime);
    };

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    counters.forEach(counter => startCounter(counter));
                    animated = true; // Prevents re-triggering once animated
                }
            });
        }, { threshold: 0.4 }); // Triggers when 40% of the section is visible

        observer.observe(statsSection);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // 1. Check saved theme from localStorage (or default to dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 2. Attach click listener to button if it exists on the page
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
});

// FLOATING BACK TO TOP SCROLL TOGGLE
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
}