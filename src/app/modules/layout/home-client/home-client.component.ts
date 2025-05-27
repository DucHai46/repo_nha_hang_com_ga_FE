import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit, AfterViewInit {
  isMenuOpen = false;
  currentSlide = 0;
  slides = [
    {
      image: 'https://theme.hstatic.net/200000385717/1000767290/14/slideshow_1.jpg?v=475',
      alt: 'Slide 1'
    },
    {
      image: 'https://theme.hstatic.net/200000385717/1000767290/14/slideshow_2.jpg?v=475',
      alt: 'Slide 2'
    },
    {
      image: 'https://theme.hstatic.net/200000385717/1000767290/14/slideshow_3.jpg?v=475',
      alt: 'Slide 3'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showSlide(this.currentSlide);
    this.startAutoSlide();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  showSlide(index: number) {
    const slides = document.querySelectorAll('[data-carousel-item]');
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('hidden');
        slide.classList.add('translate-x-0');
        slide.classList.remove('-translate-x-full');
        slide.classList.remove('translate-x-full');
      } else if (i < index) {
        slide.classList.remove('hidden');
        slide.classList.add('-translate-x-full');
        slide.classList.remove('translate-x-0');
        slide.classList.remove('translate-x-full');
      } else {
        slide.classList.remove('hidden');
        slide.classList.add('translate-x-full');
        slide.classList.remove('translate-x-0');
        slide.classList.remove('-translate-x-full');
      }
    });

    // Update indicators
    const indicators = document.querySelectorAll('[data-carousel-slide-to]');
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.setAttribute('aria-current', 'true');
        indicator.classList.add('bg-white');
        indicator.classList.remove('bg-white/50');
      } else {
        indicator.setAttribute('aria-current', 'false');
        indicator.classList.remove('bg-white');
        indicator.classList.add('bg-white/50');
      }
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.showSlide(this.currentSlide);
  }

  private startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
}
