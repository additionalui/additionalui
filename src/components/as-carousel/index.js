class ASCarousel {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.slides = element.querySelectorAll('.hs-carousel-slide');
        this.paginationItems = element.querySelectorAll('.hs-carousel-pagination span');
        this.currentIndex = 0;
        this.isAutoPlay = options.isAutoPlay;
        this.loadingClasses = options.loadingClasses;
        this.transitionDuration = 700; // in milliseconds

        this.init();
    }

    init() {
        this.element.classList.remove(this.loadingClasses);
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
        });

        this.paginationItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        this.element.querySelector('.hs-carousel-prev').addEventListener('click', () => {
            this.prevSlide();
        });

        this.element.querySelector('.hs-carousel-next').addEventListener('click', () => {
            this.nextSlide();
        });

        if (this.isAutoPlay) {
            this.autoPlay();
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
        this.updatePagination();
    }

    prevSlide() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.slides.length - 1;
        }
        this.updateSlides();
        this.updatePagination();
    }

    nextSlide() {
        this.currentIndex++;
        if (this.currentIndex >= this.slides.length) {
            this.currentIndex = 0;
        }
        this.updateSlides();
        this.updatePagination();
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - this.currentIndex) * 100}%)`;
        });
    }

    updatePagination() {
        this.paginationItems.forEach((item, index) => {
            item.classList.toggle('hs-carousel-active', index === this.currentIndex);
        });
    }

    autoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 seconds
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-hs-carousel]');
    carousels.forEach((carousel) => {
        const options = JSON.parse(carousel.getAttribute('data-hs-carousel'));
        new HSCarousel(carousel, options);
    });
});

window.ASCarousel = new ASCarousel();
document.addEventListener('load', window.ASCarousel.init());