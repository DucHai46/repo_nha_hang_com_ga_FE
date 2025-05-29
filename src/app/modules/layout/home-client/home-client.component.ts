import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NhaHangService } from '../menu/nhahang/services/nhahang.service';
import { FileService } from '../../../core/services/file.service';

interface GiaoDien {
  header?: HeaderNhaHang;
  home?: HomeNhaHang;
  about?: AboutNhaHang;
  footer?: FooterNhaHang;
}

interface HeaderNhaHang {
  logo?: string;
  backgroundColor?: string;
  imageSlider?: string[];
}

interface HomeNhaHang {
  title?: string;
  content?: string;
  image?: string;
  content1?: Content1[];
  content2?: Content2[];
}

interface Content1 {
  title?: string;
  content?: string;
  image?: string;
}

interface Content2 {
  title?: string;
  content?: string;
  image?: string;
}

interface AboutNhaHang {
  content?: ContentAbout[];
}

interface ContentAbout {
  title?: string;
  content?: string;
  image?: string;
}

interface FooterNhaHang {
  title?: string;
  content?: string;
  logo?: string;
  backgroundColor?: string;
  address?: string[];
  phone?: string[];
  email?: string[];
  social?: string[];
}

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

  constructor(private nhaHangService: NhaHangService, private fileService: FileService) { }

  ngOnInit() {

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
      // Header
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
              },
              (error) => console.error('Lỗi tải ảnh:', this.giaoDien?.header?.logo, error)
            );
          }
        }
        // Convert imageSlider array
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
                },
                (error) => console.error('Lỗi tải ảnh:', slider, error)
              );
            }
          });
        }
      }

      // Home
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
              },
              (error) => console.error('Lỗi tải ảnh:', this.giaoDien?.home?.image, error)
            );
          }
        }
        // Convert content1 images
        if (this.giaoDien.home.content1) {
          this.giaoDien.home.content1.forEach(content => {
            if (content.image) {
              const parsed = this.parseJSON(content.image);
              if (parsed?.id) {
                this.fileService.downloadFile(parsed.id).subscribe(
                  (blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    content.image = url;
                  },
                  (error) => console.error('Lỗi tải ảnh:', content.image, error)
                );
              }
            }
          });
        }
        // Convert content2 images
        if (this.giaoDien.home.content2) {
          this.giaoDien.home.content2.forEach(content => {
            if (content.image) {
              const parsed = this.parseJSON(content.image);
              if (parsed?.id) {
                this.fileService.downloadFile(parsed.id).subscribe(
                  (blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    content.image = url;
                  },
                  (error) => console.error('Lỗi tải ảnh:', content.image, error)
                );
              }
            }
          });
        }
      }

      // About
      if (this.giaoDien.about?.content) {
        this.giaoDien.about.content.forEach(content => {
          if (content.image) {
            const parsed = this.parseJSON(content.image);
            if (parsed?.id) {
              this.fileService.downloadFile(parsed.id).subscribe(
                (blob: Blob) => {
                  const url = URL.createObjectURL(blob);
                  content.image = url;
                },
                (error) => console.error('Lỗi tải ảnh:', content.image, error)
              );
            }
          }
        });
      }

      // Footer
      if (this.giaoDien.footer?.logo) {
        const parsed = this.parseJSON(this.giaoDien.footer.logo);
        if (parsed?.id) {
          this.fileService.downloadFile(parsed.id).subscribe(
            (blob: Blob) => {
              const url = URL.createObjectURL(blob);
              if (this.giaoDien?.footer) {
                this.giaoDien.footer.logo = url;
              }
            },
            (error) => console.error('Lỗi tải ảnh:', this.giaoDien?.footer?.logo, error)
          );
        }
      }
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
