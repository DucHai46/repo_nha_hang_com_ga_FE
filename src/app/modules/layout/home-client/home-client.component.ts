import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NhaHangService } from '../menu/nhahang/services/nhahang.service';
import { FileService } from '../../../core/services/file.service';
import { HomeClientStore } from './store/home-client.store';
import { GiaoDien } from '../../../models/GiaoDien';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit, AfterViewInit, OnDestroy {
  isMenuOpen = false;
  currentSlide = 0;
  isScrolled = false;
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

  cartCount = 0;
  cartItems: { item: any, quantity: number }[] = [];
  showCart = false;

  constructor(private nhaHangService: NhaHangService, private fileService: FileService, public homeClientStore: HomeClientStore, private notifyService: NzNotificationService, private router: Router) {
    this.homeClientStore.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 0;
    }
  }

  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }

  convertImageField(field: string | undefined): void {
    if (field) {
      const parsed = this.parseJSON(field);
      if (parsed?.id) {
        this.fileService.downloadFile(parsed.id).subscribe(
          (blob: Blob) => {
            const url = URL.createObjectURL(blob);
            return url;
          },
          (error) => console.error('Lỗi tải ảnh:', field, error)
        );
      }
    }
  }

  convertAllImageFields(): void {
    if (this.giaoDien) {
      if (this.giaoDien.header) {
        if (this.giaoDien.header.logo) {
          const parsed = this.parseJSON(this.giaoDien.header.logo);
          if (parsed?.id) {
            this.fileService.downloadFile(parsed.id).subscribe(
              (blob: Blob) => {
                const url = URL.createObjectURL(blob);
                if (this.giaoDien?.header) {
                  this.giaoDien.header.logo = url;
                }
                this.homeClientStore.setGiaoDien(this.giaoDien || {});
              },
              (error) => console.error('Lỗi tải ảnh:', this.giaoDien?.header?.logo, error)
            );
          }
        }
        if (this.giaoDien.header.imageSlider) {
          this.giaoDien.header.imageSlider.forEach((slider, idx) => {
            const parsed = this.parseJSON(slider);
            if (parsed?.id) {
              this.fileService.downloadFile(parsed.id).subscribe(
                (blob: Blob) => {
                  const url = URL.createObjectURL(blob);
                  if (this.giaoDien?.header?.imageSlider) {
                    this.giaoDien.header.imageSlider[idx] = url;
                  }
                  this.homeClientStore.setGiaoDien(this.giaoDien || {});
                },
                (error) => console.error('Lỗi tải ảnh:', slider, error)
              );
            }
          });
        }
      }

      if (this.giaoDien.home) {
        if (this.giaoDien.home.image) {
          const parsed = this.parseJSON(this.giaoDien.home.image);
          if (parsed?.id) {
            this.fileService.downloadFile(parsed.id).subscribe(
              (blob: Blob) => {
                const url = URL.createObjectURL(blob);
                if (this.giaoDien?.home) {
                  this.giaoDien.home.image = url;
                }
                this.homeClientStore.setGiaoDien(this.giaoDien || {});
              },
              (error) => console.error('Lỗi tải ảnh:', this.giaoDien?.home?.image, error)
            );
          }
        }
        if (this.giaoDien.home.content1) {
          this.giaoDien.home.content1.forEach(content => {
            if (content.image) {
              const parsed = this.parseJSON(content.image);
              if (parsed?.id) {
                this.fileService.downloadFile(parsed.id).subscribe(
                  (blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    content.image = url;
                    this.homeClientStore.setGiaoDien(this.giaoDien || {});
                  },
                  (error) => console.error('Lỗi tải ảnh:', content.image, error)
                );
              }
            }
          });
        }
        if (this.giaoDien.home.content2) {
          this.giaoDien.home.content2.forEach(content => {
            if (content.image) {
              const parsed = this.parseJSON(content.image);
              if (parsed?.id) {
                this.fileService.downloadFile(parsed.id).subscribe(
                  (blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    content.image = url;
                    this.homeClientStore.setGiaoDien(this.giaoDien || {});
                  },
                  (error) => console.error('Lỗi tải ảnh:', content.image, error)
                );
              }
            }
          });
        }
      }


      if (this.giaoDien.about?.content) {
        this.giaoDien.about.content.forEach(content => {
          if (content.image) {
            const parsed = this.parseJSON(content.image);
            if (parsed?.id) {
              this.fileService.downloadFile(parsed.id).subscribe(
                (blob: Blob) => {
                  const url = URL.createObjectURL(blob);
                  content.image = url;
                  this.homeClientStore.setGiaoDien(this.giaoDien || {});
                },
                (error) => console.error('Lỗi tải ảnh:', content.image, error)
              );
            }
          }
        });
      }


      if (this.giaoDien.footer?.logo) {
        const parsed = this.parseJSON(this.giaoDien.footer.logo);
        if (parsed?.id) {
          this.fileService.downloadFile(parsed.id).subscribe(
            (blob: Blob) => {
              const url = URL.createObjectURL(blob);
              if (this.giaoDien?.footer) {
                this.giaoDien.footer.logo = url;
              }
              this.homeClientStore.setGiaoDien(this.giaoDien || {});
            },
            (error) => console.error('Lỗi tải ảnh:', this.giaoDien?.footer?.logo, error)
          );
        }
      }
      this.homeClientStore.setGiaoDien(this.giaoDien || {});
    }
  }

  giaoDien: GiaoDien | null = null;
  ngAfterViewInit() {
    this.showSlide(this.currentSlide);
    this.startAutoSlide();
    this.nhaHangService.getGiaoDien(null, true).subscribe({
      next: (res: any) => {
        this.giaoDien = res.data;
        console.log(this.giaoDien);
        this.convertAllImageFields();
      }
    });
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
    }, 5000);
  }

  getContrastColor(backgroundColor: string): string {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  thanhToan() {
    this.router.navigate(['home-client/thanh-toan']);
  }
}
