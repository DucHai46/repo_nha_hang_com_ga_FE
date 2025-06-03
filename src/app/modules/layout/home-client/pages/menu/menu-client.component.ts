import { Component, OnInit } from '@angular/core';
import { ThucDonService } from '../../../menu/thucdon/services/thucdon.service';
import { ThucDon } from '../../../../../models/ThucDon';
import { FileService } from '../../../../../core/services/file.service';
import { HomeClientStore } from '../../store/home-client.store';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrl: './menu-client.component.scss'
})
export class MenuClientComponent implements OnInit {

  constructor(
    private thucDonService: ThucDonService,
    private fileService: FileService,
    private homeClientStore: HomeClientStore
  ) { }

  allItems: any[] = [];
  params = {
    IsPaging: false,
    trangThai: 1,
  }

  pageSize = 12; // Số sản phẩm mỗi trang
  currentPage = 1;
  pagedItems: any[] = [];
  pages: (number | string)[] = [];
  totalPages = 1;

  ngOnInit(): void {
    this.thucDonService.getThucDon(this.params).subscribe({
      next: (res: any) => {
        if(res.result && res.data.data) {
          const thucDon: ThucDon = res.data.data[0];
          // Lấy combo
          const combos = (thucDon.combos || []).map(c => ({
            ten: c.name,
            gia: c.giaTien,
            hinhAnh: c.hinhAnh
          }));
          // Lấy từng món lẻ
          const monLe = (thucDon.loaiMonAns || []).flatMap(loai =>
            (loai.monAns || []).map(m => {
              let giaGoc = Number(m.giaTien) || 0;
              let giamGiaPercent = Number(m.giamGia) || 0;
              let soTienGiam = 0;
              let giaDaGiam = giaGoc;
              if (giamGiaPercent > 0 && giamGiaPercent < 100) {
                soTienGiam = Math.round(giaGoc * giamGiaPercent / 100);
                giaDaGiam = giaGoc - soTienGiam;
              }
              return {
                ten: m.tenMonAn,
                gia: giaDaGiam,
                giaGoc: giaGoc,
                giamGia: giamGiaPercent,
                soTienGiam: soTienGiam,
                hinhAnh: m.hinhAnh
              };
            })
          );
          this.allItems = [...combos, ...monLe];

          // Gọi API lấy base64 cho từng ảnh
          this.allItems.forEach((item, idx) => {
            if (item.hinhAnh) {
              const parsed = this.parseJSON(item.hinhAnh);
              if (parsed?.id) {
                this.fileService.downloadFile(parsed.id).subscribe(
                  (blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    if (item.hinhAnh) {
                      item.hinhAnh = url;
                    }
                  },
                  (error) => console.error('Lỗi tải ảnh:', item.hinhAnh, error)
                );
              }
            } else {
              this.allItems[idx].hinhAnh = '';
            }
          });

          this.updatePaging();
        } else {
          this.allItems = [];
        }
      },
      error: (err: any) => {
        this.allItems = [];
      }
    });
  }

  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }

  updatePaging() {
    this.totalPages = Math.ceil(this.allItems.length / this.pageSize) || 1;
    this.pagedItems = this.allItems.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    console.log(this.pagedItems);
    console.log(this.totalPages);
    this.pages = this.getPages();
    console.log(this.pages);
  }

  goToPage(page: string) {
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > this.totalPages) return;
    this.currentPage = pageNumber;
    this.updatePaging();
  }

  getPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage, '...', this.totalPages);
      }
    }
    return pages;
  }

  addToCart(item: any) {
    this.homeClientStore.addToCart(item);
  }
}
