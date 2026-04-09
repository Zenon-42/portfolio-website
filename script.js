// Portfolio Website JavaScript

// Loading Page Functionality
function initLoadingPage() {
    const loadingPage = document.getElementById('loading-page');
    const progressFill = document.querySelector('.progress-fill');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingMessage = document.querySelector('.loading-message');
    
    if (!loadingPage) return;
    
    const messages = [
        'Initializing...',
        'Loading assets...',
        'Setting up portfolio...',
        'Preparing projects...',
        'Almost ready...'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10 + 1; // Much slower progress between 1-11
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Wait for all code lines to finish animating (last one starts at 3.5s + 0.5s duration = 4s)
            // Then wait additional 1-2 seconds for better UX
            setTimeout(() => {
                loadingMessage.textContent = 'Welcome!';
                setTimeout(() => {
                    loadingPage.classList.add('fade-out');
                    setTimeout(() => {
                        loadingPage.style.display = 'none';
                    }, 800);
                }, 1000); // Wait 1 second after "Welcome!" message
            }, 2000); // Wait 2 seconds after progress reaches 100%
        }
        
        // Update progress bar
        progressFill.style.width = progress + '%';
        loadingPercentage.textContent = Math.round(progress) + '%';
        
        // Update message with better timing
        if (progress >= 20 && messageIndex === 0) {
            messageIndex++;
            loadingMessage.textContent = messages[messageIndex];
        } else if (progress >= 40 && messageIndex === 1) {
            messageIndex++;
            loadingMessage.textContent = messages[messageIndex];
        } else if (progress >= 60 && messageIndex === 2) {
            messageIndex++;
            loadingMessage.textContent = messages[messageIndex];
        } else if (progress >= 80 && messageIndex === 3) {
            messageIndex++;
            loadingMessage.textContent = messages[messageIndex];
        }
        
    }, 500); // Much slower interval - 500ms between updates
}

// Initialize loading page when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Start loading page
    initLoadingPage();
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contact-form');
    const downloadResumeBtn = document.getElementById('download-resume');
    const viewResumeBtn = document.getElementById('view-resume');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Section switching functionality
    function switchSection(targetSection) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section with animation
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
            
            // Add entrance animation based on section
            const animationClass = getSectionAnimation(targetSection);
            targetElement.style.animation = animationClass;
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active');
            }
        });
    }

    // Get animation class for each section
    function getSectionAnimation(section) {
        const animations = {
            'home': 'fadeIn 0.5s ease-in-out',
            'projects': 'slideInFromLeft 0.6s ease-in-out',
            'resume': 'slideInFromRight 0.6s ease-in-out',
            'contact': 'slideInFromTop 0.6s ease-in-out'
        };
        return animations[section] || 'fadeIn 0.5s ease-in-out';
    }

    // Navigation link click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });

    // Brand logo click handler
    const brandLink = document.querySelector('.brand-link');
    if (brandLink) {
        brandLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection('home');
        });
    }

    // Hero button click handlers
    const heroButtons = document.querySelectorAll('.hero-links .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                switchSection(targetSection);
            }
        });
    });

    // Initialize EmailJS
    (function() {
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('ZWPVmnouxdHdphdDs');
    })();

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Prepare email template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'surojitbarik097@gmail.com' // Replace with your email
            };

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<div class="loading"></div> Sending...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.send('service_portfolio', 'template_xndwdd3', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                })
                .finally(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Resume download functionality
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Option 1: Direct download link (recommended)
            // Replace 'resume.pdf' with your actual resume filename
            const resumeUrl = 'Resume.pdf';
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Your_Name_Resume.pdf'; // Custom download filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('Resume download started!', 'success');
        });
    }

    // Resume view functionality
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Open resume in new tab
            // Replace 'resume.pdf' with your actual resume filename
            const resumeUrl = 'Resume.pdf';
            window.open(resumeUrl, '_blank');
            
            showNotification('Opening resume in new tab...', 'info');
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1rem;
            box-shadow: var(--shadow);
            z-index: 10000;
            max-width: 400px;
            animation: slideInFromRight 0.3s ease-out;
        `;

        // Add type-specific styling
        const typeColors = {
            'success': 'var(--success)',
            'error': 'var(--error)',
            'warning': 'var(--warning)',
            'info': 'var(--accent)'
        };

        notification.style.borderLeftColor = typeColors[type] || typeColors.info;
        notification.style.borderLeftWidth = '4px';

        // Add to DOM
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutToRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutToRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    switchSection('home');
                    break;
                case '2':
                    e.preventDefault();
                    switchSection('projects');
                    break;
                case '3':
                    e.preventDefault();
                    switchSection('resume');
                    break;
                case '4':
                    e.preventDefault();
                    switchSection('contact');
                    break;
            }
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.project-card, .stat, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutToRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-message {
            color: var(--text-primary);
            font-size: 0.9rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .notification-close:hover {
            background-color: var(--bg-tertiary);
            color: var(--text-primary);
        }
    `;
    document.head.appendChild(style);

    // Initialize with home section
    switchSection('home');

    // Add loading animation to buttons
    function addLoadingAnimation(button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<div class="loading"></div> Loading...';
        button.disabled = true;
        
        return function removeLoading() {
            button.innerHTML = originalContent;
            button.disabled = false;
        };
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing animation to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }

    console.log('Portfolio website loaded successfully! 🚀');
    console.log('Use Alt + 1-4 to navigate between sections');
});
