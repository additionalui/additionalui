class ASCarousel {
    constructor(element, options) {
      this.el = element;
      this.options = options;
      this.events = {};
      this.currentIndex = 0;
      this.inner = this.el.querySelector(".as-carousel-body");
      this.slides = this.el.querySelectorAll(".as-carousel-slide");
      this.prev = this.el.querySelector(".as-carousel-prev");
      this.next = this.el.querySelector(".as-carousel-next");
      this.dots = this.el.querySelectorAll(".as-carousel-pagination > *");
      this.sliderWidth = this.inner.parentElement.clientWidth;
      this.touchX = { start: 0, end: 0 };
  
      this.init();
    }
  
    init() {
      this.createCollection(window.$asCarouselCollection, this);
      if (this.inner) {
        this.calculateWidth();
      }
      if (this.prev) {
        this.prev.addEventListener("click", () => {
          this.goToPrev();
          if (this.isAutoPlay) {
            this.resetTimer();
            this.setTimer();
          }
        });
      }
      if (this.next) {
        this.next.addEventListener("click", () => {
          this.goToNext();
          if (this.isAutoPlay) {
            this.resetTimer();
            this.setTimer();
          }
        });
      }
      if (this.dots) {
        this.dots.forEach((dot, index) => {
          dot.addEventListener("click", () => {
            this.goTo(index);
            if (this.isAutoPlay) {
              this.resetTimer();
              this.setTimer();
            }
          });
        });
      }
      if (this.slides.length) {
        this.addCurrentClass();
        if (!this.isInfiniteLoop) {
          this.addDisabledClass();
        }
        if (this.isAutoPlay) {
          this.autoPlay();
        }
      }
      if (this.inner) {
        setTimeout(() => {
          if (this.afterLoadingClassesAdd) {
            this.inner.classList.add(...this.afterLoadingClassesAdd);
          }
        });
      }
      this.el.classList.add("init");
      this.el.addEventListener("toucastart", (event) => {
        this.touchX.start = event.changedTouches[0].screenX;
      });
      this.el.addEventListener("touchend", (event) => {
        this.touchX.end = event.changedTouches[0].screenX;
        this.detectDirection();
      });
      this.observeResize();
    }
  
    createCollection(collection, instance) {
      collection.push({ id: instance.el.id || collection.length + 1, element: instance });
    }
  
    fireEvent(event, data = null) {
      if (this.events.hasOwnProperty(event)) {
        return this.events[event](data);
      }
    }
  
    on(event, callback) {
      this.events[event] = callback;
    }
  
    calculateWidth() {
      this.inner.style.width = `${this.sliderWidth * this.slides.length}px`;
      this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`;
      this.slides.forEach((slide) => {
        slide.style.width = `${this.sliderWidth}px`;
      });
    }
  
    addCurrentClass() {
      this.slides.forEach((slide, index) => {
        if (index === this.currentIndex) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
      if (this.dots) {
        this.dots.forEach((dot, index) => {
          if (index === this.currentIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }
    }
  
    addDisabledClass() {
      if (!this.prev || !this.next) return false;
      if (this.currentIndex === 0) {
        this.next.classList.remove("disabled");
        this.prev.classList.add("disabled");
      } else if (this.currentIndex === this.slides.length - 1) {
        this.prev.classList.remove("disabled");
        this.next.classList.add("disabled");
      } else {
        this.prev.classList.remove("disabled");
        this.next.classList.remove("disabled");
      }
    }
  
    autoPlay() {
      this.setTimer();
    }
  
    setTimer() {
      this.timer = setInterval(() => {
        if (this.currentIndex === this.slides.length - 1) {
          this.goTo(0);
        } else {
          this.goToNext();
        }
      }, this.speed);
    }
  
    resetTimer() {
      clearInterval(this.timer);
    }
  
    detectDirection() {
      const { start, end } = this.touchX;
      if (end < start) {
        this.goToNext();
      } else if (end > start) {
        this.goToPrev();
      }
    }
  
    observeResize() {
      new ResizeObserver(() => {
        this.recalculateWidth();
      }).observe(document.querySelector("body"));
    }
  
    recalculateWidth() {
      this.sliderWidth = this.inner.parentElement.clientWidth;
      this.calculateWidth();
    }
  
    goToPrev() {
      if (this.currentIndex === 0 && this.isInfiniteLoop) {
        this.currentIndex = this.slides.length - 1;
        this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`;
        this.addCurrentClass();
      } else if (this.currentIndex !== 0) {
        this.currentIndex -= 1;
        this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`;
        this.addCurrentClass();
        if (!this.isInfiniteLoop) {
          this.addDisabledClass();
        }
      }
    }
  
    goToNext() {
      if (this.currentIndex === this.slides.length - 1 && this.isInfiniteLoop) {
        this.currentIndex = 0;
        this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`;
        this.addCurrentClass();
      } else if (this.currentIndex < this.slides.length - 1) {
        this.currentIndex += 1;
        this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`;
        this.addCurrentClass();
        if (!this.isInfiniteLoop) {
          this.addDisabledClass();
        }
      }
    }
  
    goTo(index) {
      this.currentIndex = index;
      this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`;
      this.addCurrentClass();
    }
  
    static getInstance(selector, createIfNotExists) {
      const instance = window.$asCarouselCollection.find((item) => item.element.el === (typeof selector === "string" ? document.querySelector(selector) : selector));
      return instance ? (createIfNotExists ? instance : instance.element) : null;
    }
  
    static autoInit() {
      if (!window.$asCarouselCollection) {
        window.$asCarouselCollection = [];
      }
      document.querySelectorAll("[data-as-carousel]:not(.--prevent-on-load-init)").forEach((element) => {
        if (!window.$asCarouselCollection.find((item) => item.element.el === element)) {
          new ASCarousel(element);
        }
      });
    }
  }
  
  window.addEventListener("load", () => {
    ASCarousel.autoInit();
  });
  
  window.addEventListener("resize", () => {
    if (!window.$asCarouselCollection) return false;
    window.$asCarouselCollection.forEach((instance) => {
      instance.element.recalculateWidth();
    });
  });  