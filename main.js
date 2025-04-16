/*
* De Haan Kookt - JavaScript Functionaliteit
* Interactieve elementen en animaties voor de high-end website
* 2025
*/

document.addEventListener('DOMContentLoaded', function() {
    // Variabelen
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const backToTopButton = document.querySelector('.back-to-top');
    const preloader = document.querySelector('.preloader');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const diagonalRevealElements = document.querySelectorAll('.diagonal-reveal');
    const lazyImages = document.querySelectorAll('.lazy-image');
    const contactForm = document.getElementById('contactForm');
    
    // Preloader
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hide');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    
    // Mobile Menu Toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Header Scroll Effect
    let lastScrollTop = 0;
    
    function handleHeaderOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.classList.remove('visible');
            } else {
                header.classList.add('visible');
            }
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleHeaderOnScroll);
    handleHeaderOnScroll(); // Initial check
    
    // Back to Top Button
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 700) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonial Slider
    if (testimonialTrack && testimonialSlides.length > 0) {
        let currentSlide = 0;
        const slideWidth = 100; // 100%
        
        function goToSlide(index) {
            if (index < 0) {
                index = testimonialSlides.length - 1;
            } else if (index >= testimonialSlides.length) {
                index = 0;
            }
            
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            // Update dots
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        if (testimonialNext) {
            testimonialNext.addEventListener('click', function() {
                goToSlide(currentSlide + 1);
            });
        }
        
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function() {
                goToSlide(currentSlide - 1);
            });
        }
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });
        
        // Auto advance slider
        let sliderInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 7000);
        
        // Pause auto advance on hover
        testimonialTrack.addEventListener('mouseenter', function() {
            clearInterval(sliderInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', function() {
            sliderInterval = setInterval(function() {
                goToSlide(currentSlide + 1);
            }, 7000);
        });
    }
    
    // Scroll Animation
    function animateOnScroll() {
        const triggerOffset = window.innerHeight * 0.85;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerOffset) {
                element.classList.add('animate');
            }
        });
        
        diagonalRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerOffset) {
                element.classList.add('reveal');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Apply scroll animation classes to elements
    document.querySelectorAll('.filosofie-content, .chef-content, .contact-info').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    document.querySelectorAll('.catering-gallery, .private-dining-gallery, .image-frame, .galerie-item, .timeline-item').forEach(element => {
        element.classList.add('diagonal-reveal');
    });
    
    // Set animation delay for staggered elements
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.galerie-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Lazy Load Images
    function lazyLoadImages() {
        lazyImages.forEach(image => {
            if (image.getBoundingClientRect().top < window.innerHeight + 300) {
                const src = image.getAttribute('data-src');
                if (src) {
                    image.src = src;
                    image.removeAttribute('data-src');
                    image.classList.add('loaded');
                }
            }
        });
    }
    
    window.addEventListener('scroll', lazyLoadImages);
    window.addEventListener('load', lazyLoadImages);
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        field.classList.add('error');
                        valid = false;
                    }
                }
            });
            
            if (valid) {
                // Form submission simulation
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Verzenden...';
                
                // Simulate form submission (replace with actual submission code)
                setTimeout(function() {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.textContent = 'Dank voor uw bericht. We nemen zo spoedig mogelijk contact met u op.';
                    
                    contactForm.appendChild(successMessage);
                    
                    setTimeout(function() {
                        successMessage.style.opacity = '0';
                        setTimeout(function() {
                            successMessage.remove();
                        }, 500);
                    }, 5000);
                }, 2000);
            }
        });
        
        // Clear error state on input
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Add Parallax Effect to Hero Section
    const heroSection = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-video');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }
    
    // Add hover effect for gallery items
    document.querySelectorAll('.gallery-item, .gallery-main, .gallery-left, .gallery-right img').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Initialize AOS (Animate On Scroll) alternative
    function initScrollEffects() {
        // Add classes to elements that should animate on scroll
        document.querySelectorAll('.section-header, .filosofie-text, .catering-description, .private-dining-description, .chef-description, .testimonial-content, .contact-intro').forEach(element => {
            if (!element.classList.contains('animate-on-scroll')) {
                element.classList.add('animate-on-scroll');
            }