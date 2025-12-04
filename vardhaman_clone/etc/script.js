document.addEventListener('DOMContentLoaded', function () {
    // Sticky Header
    const header = document.getElementById('sticky-header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navbar.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dropdown Toggle for Mobile.
    const dropdowns = document.querySelectorAll('.has-dropdown > a');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
            }
        });
    });
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

        // Auto slide
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }
});
