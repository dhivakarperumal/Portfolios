/**
 * Portfolio - Main JavaScript
 * Author: Dhivakar P
 * Version: 3.0 - Enhanced Animations
 */

$(document).ready(function () {
    // Initialize all components
    initPreloader();
    initNavigation();
    initAOS();
    initTypingEffect();
    initSkillBars();
    initPortfolioFilter();
    initBackToTop();
    initParticles();
    initSmoothScroll();
    initScrollProgress();
    initCursorEffect();
    initTiltEffect();
    initTextReveal();
    initMagneticButtons();
    initCounterAnimation();
    initSectionAnimations();
});

/**
 * Preloader
 */
function initPreloader() {
    $(window).on('load', function () {
        setTimeout(function () {
            $('.preloader').addClass('hidden');
        }, 500);
    });

    // Fallback if load event doesn't fire
    setTimeout(function () {
        $('.preloader').addClass('hidden');
    }, 3000);
}

/**
 * Navigation - Sticky Header
 */
function initNavigation() {
    var header = $('#menu-jk');
    var homeSection = $('#home');
    var homeHeight = homeSection.length ? homeSection.outerHeight() : 600;

    function handleScroll() {
        var scrollPos = $(window).scrollTop();

        // Add/remove scrolled class based on scroll position
        if (scrollPos > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }

        // Update active nav link based on scroll position
        $('a.nav-link-custom').each(function () {
            var currLink = $(this);
            var href = currLink.attr('href');

            // Handle home link
            if (href === '#home' || href === '#') {
                if (scrollPos < homeHeight - 200) {
                    $('a.nav-link-custom').removeClass('active');
                    currLink.addClass('active');
                }
                return;
            }

            var refElement = $(href);

            if (refElement.length) {
                var sectionTop = refElement.offset().top - 150;
                var sectionBottom = sectionTop + refElement.outerHeight();

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('a.nav-link-custom').removeClass('active');
                    currLink.addClass('active');
                }
            }
        });
    }

    // Handle scroll event
    $(window).on('scroll', handleScroll);

    // Trigger on page load
    handleScroll();

    // Close mobile menu when clicking a link
    $('.nav-link-custom').on('click', function () {
        if ($(window).width() < 992) {
            $('#menu').removeClass('show');
            $('.small-menu i').removeClass('fa-times').addClass('fa-bars');
            $('.small-menu').attr('aria-expanded', 'false');
        }
    });

    // Mobile menu toggle
    $('.small-menu').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var menu = $('#menu');
        var icon = $(this).find('i');

        if (menu.hasClass('show')) {
            menu.removeClass('show');
            icon.removeClass('fa-times').addClass('fa-bars');
            $(this).attr('aria-expanded', 'false');
        } else {
            menu.addClass('show');
            icon.removeClass('fa-bars').addClass('fa-times');
            $(this).attr('aria-expanded', 'true');
        }
    });

    // Close menu when clicking outside
    $(document).on('click', function (e) {
        if ($(window).width() < 992) {
            if (!$(e.target).closest('.header').length) {
                $('#menu').removeClass('show');
                $('.small-menu i').removeClass('fa-times').addClass('fa-bars');
                $('.small-menu').attr('aria-expanded', 'false');
            }
        }
    });

    // Reset icon when menu is hidden
    $('#menu').on('hidden.bs.collapse', function () {
        $('.small-menu i').removeClass('fa-times').addClass('fa-bars');
    });
}

/**
 * AOS (Animate On Scroll) Initialization
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

/**
 * Typing Effect for Hero Section
 */
function initTypingEffect() {
    var typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    var words = [
        "React JS Developer",
        "React Native App Developer",
        "Full Stack Developer (MERN)",
        "Frontend Engineer",
        "Python Backend Developer"
    ];

    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 100;

    function type() {
        var currentWord = words[wordIndex];

        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Add cursor effect
        typedElement.classList.add('typing');

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1500);

    // Add CSS for cursor
    var style = document.createElement('style');
    style.textContent = `
        .typed-text::after {
            content: '|';
            animation: blink 0.7s infinite;
            color: #4ecdc4;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Skill Bars Animation
 */
function initSkillBars() {
    var skillBars = document.querySelectorAll('.skill-progress');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(function (bar) {
        observer.observe(bar);
    });
}

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.gallery_product');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(function (b) {
                b.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            var filter = this.getAttribute('data-filter');

            items.forEach(function (item) {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(function () {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(function () {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(function () {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Refresh AOS
            if (typeof AOS !== 'undefined') {
                setTimeout(function () {
                    AOS.refresh();
                }, 400);
            }
        });
    });

    // Add transition styles to gallery items
    items.forEach(function (item) {
        item.style.transition = 'all 0.3s ease';
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    var backToTop = document.getElementById('backToTop');

    if (!backToTop) return;

    // Show/hide button on scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Floating Particles Background
 */
function initParticles() {
    var particlesContainer = document.getElementById('particles');

    if (!particlesContainer) return;

    // Create floating particles
    for (var i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    var particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    var size = Math.random() * 5 + 2;
    var posX = Math.random() * 100;
    var posY = Math.random() * 100;
    var duration = Math.random() * 20 + 10;
    var delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;

    container.appendChild(particle);
}

// Add particle animation keyframes
var particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.5;
        }
        25% {
            transform: translate(50px, -50px) rotate(90deg);
            opacity: 0.8;
        }
        50% {
            transform: translate(100px, 0) rotate(180deg);
            opacity: 0.5;
        }
        75% {
            transform: translate(50px, 50px) rotate(270deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));

        if (target.length) {
            e.preventDefault();

            // Close mobile menu if open
            $('#menu').removeClass('show');

            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutQuart');
        }
    });
}

// jQuery easing function
$.easing.easeInOutQuart = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

/**
 * Form Submission Enhancement
 */
$(document).on('submit', '.contact-form', function (e) {
    var btn = $(this).find('.btn-submit');
    var originalText = btn.html();

    btn.html('<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>');
    btn.prop('disabled', true);

    // Re-enable after submission (Web3Forms handles redirect)
    setTimeout(function () {
        btn.html(originalText);
        btn.prop('disabled', false);
    }, 5000);
});

/**
 * Counter Animation for Stats (if needed)
 */
function animateCounter(element, target, duration) {
    var start = 0;
    var startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        var progress = Math.min((currentTime - startTime) / duration, 1);

        element.textContent = Math.floor(progress * target);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

/**
 * Parallax Effect for Hero Section
 */
$(window).on('scroll', function () {
    var scroll = $(window).scrollTop();

    if (scroll < window.innerHeight) {
        $('#home').css('--hero-parallax-y', (scroll * 0.3) + 'px');

        $('.profile-img-wrapper').css({
            'transform': 'translateY(' + (scroll * 0.1) + 'px)'
        });
    }
});

/**
 * Image Lazy Loading Enhancement
 */
document.addEventListener('DOMContentLoaded', function () {
    var lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function (img) {
            imageObserver.observe(img);
        });
    }
});

/**
 * Mobile Menu Toggle Enhancement
 */
// Duplicate small-menu handler removed — handled in initNavigation to avoid conflicts

/**
 * Navbar Link Hover Effect
 */
$('.nav-link-custom').hover(
    function () {
        $(this).addClass('hovered');
    },
    function () {
        $(this).removeClass('hovered');
    }
);

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    // Create progress bar element
    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Custom Cursor Effect
 */
function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    var cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    var cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    var mouseX = 0, mouseY = 0;
    var cursorX = 0, cursorY = 0;
    var followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        // Slower follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX - 4 + 'px';
        cursorFollower.style.top = followerY - 4 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scale cursor on hover
    var hoverElements = document.querySelectorAll('a, button, .btn, .gallery-item, .social-btn, .filter-btn');
    hoverElements.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#4ecdc4';
            cursorFollower.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', function () {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#6c63ff';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

/**
 * 3D Tilt Effect for Cards
 */
function initTiltEffect() {
    var tiltElements = document.querySelectorAll('.skills-card, .contact-card, .gallery-item, .timeline-content');

    tiltElements.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var centerX = rect.width / 2;
            var centerY = rect.height / 2;

            var rotateX = (y - centerY) / 20;
            var rotateY = (centerX - x) / 20;

            el.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
        });

        el.addEventListener('mouseleave', function () {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/**
 * Text Reveal Animation
 */
function initTextReveal() {
    // Add hover effect to section titles - keep them visible by default
    var sectionTitles = document.querySelectorAll('.session-title h2, .section-heading');

    sectionTitles.forEach(function (title) {
        title.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
        });
        title.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // Add CSS for title styling
    var style = document.createElement('style');
    style.textContent = `
        .session-title h2,
        .section-heading {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
    var magneticElements = document.querySelectorAll('.btn-glow, .btn-submit, .social-btn, .filter-btn');

    magneticElements.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
        });

        el.addEventListener('mouseleave', function () {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Counter Animation for Stats
 */
function initCounterAnimation() {
    var counters = document.querySelectorAll('.counter');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var targetValue = entry.target.getAttribute('data-target');
                var target = parseFloat(targetValue);
                var decimalPlaces = (targetValue.split('.')[1] || '').length;
                var duration = 2000;
                var start = 0;
                var startTime = null;

                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    var progress = Math.min((currentTime - startTime) / duration, 1);
                    var easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                    entry.target.textContent = (easeProgress * target).toFixed(decimalPlaces);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        entry.target.textContent = targetValue;
                    }
                }

                requestAnimationFrame(animate);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
        observer.observe(counter);
    });
}

/**
 * Section Reveal Animations
 */
function initSectionAnimations() {
    // Timeline items hover enhancement - don't override AOS animations
    var timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            var dot = this.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1.3)';
                dot.style.background = '#6c63ff';
                dot.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.5)';
            }
        });
        item.addEventListener('mouseleave', function () {
            var dot = this.querySelector('.timeline-dot');
            if (dot && !dot.classList.contains('active')) {
                dot.style.transform = '';
                dot.style.background = '';
                dot.style.boxShadow = '';
            }
        });
    });

    // Skill cards hover enhancement - don't override AOS animations
    var skillCards = document.querySelectorAll('.skills-card');
    skillCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 20px 60px rgba(108, 99, 255, 0.2)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
        });
    });

    // Contact cards hover enhancement - don't override AOS animations
    var contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 15px 40px rgba(108, 99, 255, 0.15)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Gallery items pop-in animation
    var galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function (item) {
        item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
}

/**
 * Ripple Effect for Buttons
 */
$(document).on('click', '.btn-glow, .btn-submit, .filter-btn', function (e) {
    var $this = $(this);
    var offset = $this.offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;

    var ripple = $('<span class="ripple-effect"></span>');
    ripple.css({
        left: x,
        top: y
    });

    $this.append(ripple);

    setTimeout(function () {
        ripple.remove();
    }, 600);
});

// Add ripple CSS
var rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleAnim 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes rippleAnim {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/**
 * Parallax Mouse Movement Effect
 */
$(document).on('mousemove', function (e) {
    var moveX = (e.pageX * -1 / 50);
    var moveY = (e.pageY * -1 / 50);

    $('.profile-ring').css({
        'transform': 'translate(' + moveX + 'px, ' + moveY + 'px)'
    });

    $('.profile-ring.ring-2').css({
        'transform': 'translate(' + (moveX * 1.5) + 'px, ' + (moveY * 1.5) + 'px)'
    });
});

/**
 * Intersection Observer for Fade In Elements
 */
document.addEventListener('DOMContentLoaded', function () {
    var fadeElements = document.querySelectorAll('.about-content, .info-list, .map-container, .footer-content');

    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        fadeObserver.observe(el);
    });
});

/**
 * Scroll-triggered Number Increment for Skills
 */
document.addEventListener('DOMContentLoaded', function () {
    var skillPercents = document.querySelectorAll('.skill-percent');

    var percentObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var target = parseInt(entry.target.textContent);
                var current = 0;
                var increment = target / 50;
                var timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + '%';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current) + '%';
                    }
                }, 30);
                percentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillPercents.forEach(function (el) {
        percentObserver.observe(el);
    });
});

/**
 * Hover Sound Effect (Optional - Uncomment to enable)
 */
// function playHoverSound() {
//     var audio = new Audio('assets/sounds/hover.mp3');
//     audio.volume = 0.1;
//     audio.play();
// }

// Console welcome message
console.log('%c Welcome to Dhivakar P\'s Portfolio! ',
    'background: linear-gradient(135deg, #6c63ff, #4ecdc4); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Powered by Advanced Animations v3.0 ',
    'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 12px; padding: 5px 15px; border-radius: 3px;');

/**
 * Mobile Project Lightbox Logic
 */
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('projectLightbox');
    if (!lightbox) return;

    const lbTitle = document.getElementById('plbTitle');
    const lbSub = document.getElementById('plbSub');
    const lbImg = document.getElementById('plbImg');
    const lbCounter = document.getElementById('plbCounter');
    const lbDots = document.getElementById('plbDots');
    const btnNext = document.getElementById('plbNext');
    const btnPrev = document.getElementById('plbPrev');
    const btnClose = document.getElementById('plbClose');

    let currentImages = [];
    let currentIndex = 0;
    let imageLoadToken = 0;

    // Open Lightbox
    document.querySelectorAll('.open-project-lightbox').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Get parent product card
            const product = this.closest('.gallery_product');
            if (!product) return;

            const title = product.getAttribute('data-project-title') || 'Project';
            const sub = product.getAttribute('data-project-sub') || '';
            const desc = product.getAttribute('data-project-desc');
            const badgeText = product.getAttribute('data-project-badge') || 'Project';
            const badgeIcon = product.getAttribute('data-project-badge-icon') || 'fas fa-image';
            const imagesRaw = product.getAttribute('data-project-images');
            
            if (!imagesRaw) return;

            try {
                currentImages = JSON.parse(imagesRaw);
                if (!Array.isArray(currentImages) || currentImages.length === 0 ||
                    currentImages.some(image => typeof image !== 'string' || image.length === 0)) {
                    console.error("Project screenshots must be a non-empty array of image paths.");
                    return;
                }
                
                currentIndex = 0;
                lbTitle.textContent = title;
                lbSub.textContent = sub;
                
                const plbDesc = document.getElementById('plbDesc');
                if (plbDesc) {
                    if (desc) {
                        plbDesc.textContent = desc;
                        plbDesc.classList.add('show');
                    } else {
                        plbDesc.textContent = '';
                        plbDesc.classList.remove('show');
                    }
                }
                
                const plbBadgeText = document.getElementById('plbBadgeText');
                const plbBadgeIcon = document.getElementById('plbBadgeIcon');
                
                if (plbBadgeText) plbBadgeText.textContent = badgeText;
                if (plbBadgeIcon) plbBadgeIcon.className = badgeIcon;
                
                showImage(currentIndex);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent background scrolling
            } catch (err) {
                console.error("Error parsing project images", err);
            }
        });
    });

    // Close Lightbox
    btnClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        imageLoadToken++;
        lbImg.onload = null;
        lbImg.onerror = null;
        lbImg.removeAttribute('src');
    }

    // Navigation
    btnNext.addEventListener('click', () => {
        if (currentImages.length < 2) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
    });

    btnPrev.addEventListener('click', () => {
        if (currentImages.length < 2) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
    });

    function showImage(index) {
        if (currentImages.length === 0) return;

        currentIndex = (index + currentImages.length) % currentImages.length;
        const imageIndex = currentIndex;
        const imagePath = currentImages[imageIndex];
        const loadToken = ++imageLoadToken;

        lbImg.style.opacity = '0';
        lbImg.onload = function () {
            if (loadToken === imageLoadToken) {
                lbImg.style.opacity = '1';
            }
        };
        lbImg.onerror = function () {
            if (loadToken === imageLoadToken) {
                lbImg.style.opacity = '1';
                console.error("Unable to load project screenshot:", imagePath);
            }
        };
        lbImg.src = imagePath;

        if (currentImages.length > 1) {
            btnNext.style.display = '';
            btnPrev.style.display = '';
            lbDots.style.display = '';
        } else {
            btnNext.style.display = 'none';
            btnPrev.style.display = 'none';
            lbDots.style.display = 'none';
        }

        lbCounter.textContent = `${imageIndex + 1} / ${currentImages.length}`;

        lbDots.innerHTML = '';
        if (currentImages.length > 1) {
            currentImages.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = `plb-dot ${i === imageIndex ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Show screenshot ${i + 1}`);
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    showImage(currentIndex);
                });
                lbDots.appendChild(dot);
            });
        }
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') btnNext.click();
        if (e.key === 'ArrowLeft') btnPrev.click();
    });
});
