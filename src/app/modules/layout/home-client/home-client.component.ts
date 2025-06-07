import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NhaHangService } from '../menu/nhahang/services/nhahang.service';
import { FileService } from '../../../core/services/file.service';
import { HomeClientStore } from './store/home-client.store';
import { GiaoDien } from '../../../models/GiaoDien';
import { Router } from '@angular/router';

interface Slide {
  image: string;
  alt: string;
}

interface CartItem {
  item: any;
  quantity: number;
}

interface HomeContent {
  image?: string;
  [key: string]: any;
}

interface HomeNhaHang {
  image?: string;
  content1?: HomeContent[];
  content2?: HomeContent[];
  [key: string]: any;
}

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit, AfterViewInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  showCart = false;
  currentSlide = 0;

  giaoDien: GiaoDien | null = null;
  cartItems: CartItem[] = [];
  cartCount = 0;

  readonly slides: Slide[] = [
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

  private autoSlideInterval: any;

  constructor(
    private nhaHangService: NhaHangService,
    private fileService: FileService,
    public homeClientStore: HomeClientStore,
    private notifyService: NzNotificationService,
    private router: Router
  ) {
    this.initializeCartSubscription();
  }

  ngOnInit(): void {
    this.setupScrollListener();
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
    this.loadGiaoDien();
  }

  ngOnDestroy(): void {
    this.cleanupScrollListener();
    this.cleanupAutoSlide();
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  thanhToan(): void {
    this.homeClientStore.cart$.subscribe(cart => {
      if (cart.length === 0) {
        this.notifyService.create(
          'error',
          'Thông báo!',
          `Giỏ hàng trống`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
        return;
      }
      this.router.navigate(['home-client/thanh-toan']);
    });
  }

  showSlide(index: number): void {
    this.updateSlideVisibility(index);
    this.updateSlideIndicators(index);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.showSlide(this.currentSlide);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getContrastColor(backgroundColor: string): string {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  private initializeCartSubscription(): void {
    this.homeClientStore.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);
    });
  }

  private setupScrollListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  private cleanupScrollListener(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  private onScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 0;
    }
  }

  private initializeCarousel(): void {
    this.showSlide(this.currentSlide);
    this.startAutoSlide();
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private cleanupAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private loadGiaoDien(): void {
    this.nhaHangService.getGiaoDien(null, true).subscribe({
      next: (res: any) => {
        this.giaoDien = res.data;
        this.convertAllImageFields();
      },
      error: (error) => {
        this.notifyService.error('Error', 'Failed to load interface data');
        console.error('Error loading giao dien:', error);
      }
    });
  }

  private updateSlideVisibility(index: number): void {
    const slides = document.querySelectorAll('[data-carousel-item]');
    slides.forEach((slide, i) => {
      slide.classList.remove('hidden');
      if (i === index) {
        slide.classList.add('translate-x-0');
        slide.classList.remove('-translate-x-full', 'translate-x-full');
      } else if (i < index) {
        slide.classList.add('-translate-x-full');
        slide.classList.remove('translate-x-0', 'translate-x-full');
      } else {
        slide.classList.add('translate-x-full');
        slide.classList.remove('translate-x-0', '-translate-x-full');
      }
    });
  }

  private updateSlideIndicators(index: number): void {
    const indicators = document.querySelectorAll('[data-carousel-slide-to]');
    indicators.forEach((indicator, i) => {
      const isActive = i === index;
      indicator.setAttribute('aria-current', isActive.toString());
      indicator.classList.toggle('bg-white', isActive);
      indicator.classList.toggle('bg-white/50', !isActive);
    });
  }

  private parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }

  private async convertImageField(imageField: string, updateCallback: (url: string) => void): Promise<void> {
    const parsed = this.parseJSON(imageField);
    if (!parsed?.id) return;

    try {
      const blob = await this.fileService.downloadFile(parsed.id).toPromise();
      if (blob) {
        const url = URL.createObjectURL(blob);
        updateCallback(url);
        this.homeClientStore.setGiaoDien(this.giaoDien || {});
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }

  private convertAllImageFields(): void {
    if (!this.giaoDien) return;

    if (this.giaoDien.header?.logo) {
      this.convertImageField(this.giaoDien.header.logo, (url) => {
        if (this.giaoDien?.header) {
          this.giaoDien.header.logo = url;
        }
      });
    }

    this.giaoDien.header?.imageSlider?.forEach((slider, idx) => {
      this.convertImageField(slider, (url) => {
        if (this.giaoDien?.header?.imageSlider) {
          this.giaoDien.header.imageSlider[idx] = url;
        }
      });
    });

    if (this.giaoDien.home?.image) {
      this.convertImageField(this.giaoDien.home.image, (url) => {
        if (this.giaoDien?.home) {
          this.giaoDien.home.image = url;
        }
      });
    }

    ['content1', 'content2'].forEach(contentKey => {
      const home = this.giaoDien?.home as HomeNhaHang;
      if (home?.[contentKey]) {
        home[contentKey]?.forEach((content: HomeContent) => {
          if (content.image) {
            this.convertImageField(content.image, (url) => {
              content.image = url;
            });
          }
        });
      }
    });

    this.giaoDien.about?.content?.forEach((content: HomeContent) => {
      if (content.image) {
        this.convertImageField(content.image, (url) => {
          content.image = url;
        });
      }
    });

    if (this.giaoDien.footer?.logo) {
      this.convertImageField(this.giaoDien.footer.logo, (url) => {
        if (this.giaoDien?.footer) {
          this.giaoDien.footer.logo = url;
        }
      });
    }
  }

  login() {
    this.router.navigate(['/login']);
  }
}
