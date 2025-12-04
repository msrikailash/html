// Sticky Header Collapse on Scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    // const topBar = document.querySelector('.top-bar'); // Keep top bar visible

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        // if (topBar) topBar.style.display = 'none';
    } else {
        header.classList.remove('scrolled');
        // if (topBar) topBar.style.display = 'block';
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');

if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });
}

// Mobile Dropdown Toggle
const hasDropdown = document.querySelectorAll('.has-dropdown');
hasDropdown.forEach(item => {
    item.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            this.classList.toggle('active');
        }
    });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Slider controls
const nextBtn = document.querySelector('.next-slide');
const prevBtn = document.querySelector('.prev-slide');

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Smooth scroll for anchor links
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
