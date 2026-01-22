/**
 * Portfolio - Main JavaScript
 * Author: Dhivakar P
 * Version: 2.0
 */

$(document).ready(function() {
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
});

/**
 * Preloader
 */
function initPreloader() {
    $(window).on('load', function() {
        setTimeout(function() {
            $('.preloader').addClass('hidden');
        }, 500);
    });

    // Fallback if load event doesn't fire
    setTimeout(function() {
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
        $('a.nav-link-custom').each(function() {
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
    $('.nav-link-custom').on('click', function() {
        if ($(window).width() < 768) {
            $('#menu').collapse('hide');
        }
    });

    // Mobile menu toggle icon animation
    $('.small-menu').on('click', function(e) {
        e.preventDefault();
        var icon = $(this).find('i');
        if (icon.hasClass('fa-bars')) {
            icon.removeClass('fa-bars').addClass('fa-times');
        } else {
            icon.removeClass('fa-times').addClass('fa-bars');
        }
    });

    // Reset icon when menu is hidden
    $('#menu').on('hidden.bs.collapse', function() {
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
        'React JS Developer',
        'Full Stack Developer',
        'Frontend Developer',
        'Python Developer',
        'Web Designer'
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

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.gallery_product');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            var filter = this.getAttribute('data-filter');

            items.forEach(function(item) {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(function() {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Refresh AOS
            if (typeof AOS !== 'undefined') {
                setTimeout(function() {
                    AOS.refresh();
                }, 400);
            }
        });
    });

    // Add transition styles to gallery items
    items.forEach(function(item) {
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
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function(e) {
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
    $('a[href^="#"]').on('click', function(e) {
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
$.easing.easeInOutQuart = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

/**
 * Form Submission Enhancement
 */
$(document).on('submit', '.contact-form', function(e) {
    var btn = $(this).find('.btn-submit');
    var originalText = btn.html();

    btn.html('<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>');
    btn.prop('disabled', true);

    // Re-enable after submission (Web3Forms handles redirect)
    setTimeout(function() {
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
$(window).on('scroll', function() {
    var scroll = $(window).scrollTop();

    if (scroll < window.innerHeight) {
        $('.home-cover').css({
            'transform': 'translateY(' + (scroll * 0.3) + 'px)'
        });

        $('.profile-img-wrapper').css({
            'transform': 'translateY(' + (scroll * 0.1) + 'px)'
        });
    }
});

/**
 * Image Lazy Loading Enhancement
 */
document.addEventListener('DOMContentLoaded', function() {
    var lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});

/**
 * Mobile Menu Toggle Enhancement
 */
$('.small-menu').on('click', function() {
    $(this).toggleClass('active');
});

/**
 * Navbar Link Hover Effect
 */
$('.nav-link-custom').hover(
    function() {
        $(this).addClass('hovered');
    },
    function() {
        $(this).removeClass('hovered');
    }
);

// Console welcome message
console.log('%c Welcome to Dhivakar P\'s Portfolio! ',
    'background: linear-gradient(135deg, #6c63ff, #4ecdc4); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
