import { Component, OnInit } from '@angular/core';
import { ThucDonService } from '../../../menu/thucdon/services/thucdon.service';
import { ThucDon } from '../../../../../models/ThucDon';
import { FileService } from '../../../../../core/services/file.service';
import { HomeClientStore } from '../../store/home-client.store';
import { FormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrl: './menu-client.component.scss'
})
export class MenuClientComponent implements OnInit {
  searchTerm: string = '';
  filteredItems: any[] = [];

  constructor(
    private thucDonService: ThucDonService,
    private fileService: FileService,
    private homeClientStore: HomeClientStore,
    private notificationService: NzNotificationService
  ) { }

  allItems: any[] = [];
  params = {
    IsPaging: false,
    trangThai: 1,
  }

  pageSize = 12;
  currentPage = 1;
  pagedItems: any[] = [];
  pages: (number | string)[] = [];
  totalPages = 1;

  ngOnInit(): void {
    this.homeClientStore.menuItems$.subscribe((menuItems) => {
      if (menuItems.length > 0) {
        this.allItems = menuItems;
        this.filteredItems = [...this.allItems];
        this.updatePaging();
      }
      else {
        this.thucDonService.getThucDon(this.params).subscribe({
          next: (res: any) => {
            if (res.result && res.data.data) {
              const thucDon: ThucDon = res.data.data[0];
              const combos = (thucDon.combos || []).map(c => ({
                id: c.id,
                ten: c.name,
                gia: c.giaTien,
                hinhAnh: c.hinhAnh,
                loai: 'combo'
              }));
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
                    id: m.id,
                    ten: m.tenMonAn,
                    gia: giaDaGiam,
                    giaGoc: giaGoc,
                    giamGia: giamGiaPercent,
                    soTienGiam: soTienGiam,
                    hinhAnh: m.hinhAnh,
                    loai: 'monan'
                  };
                })
              );
              this.allItems = [...combos, ...monLe];
              this.filteredItems = [...this.allItems];

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
              this.homeClientStore.setMenuItems(this.allItems);
              this.updatePaging();
            } else {
              this.allItems = [];
              this.filteredItems = [];
            }
          },
          error: (err: any) => {
            this.allItems = [];
            this.filteredItems = [];
          }
        });
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

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredItems = [...this.allItems];
    } else {
      const searchLower = this.searchTerm.toLowerCase().trim();
      this.filteredItems = this.allItems.filter(item =>
        item.ten.toLowerCase().includes(searchLower)
      );
    }
    this.currentPage = 1;
    this.updatePaging();
  }

  updatePaging() {
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize) || 1;
    this.pagedItems = this.filteredItems.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    this.pages = this.getPages();
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
    this.notificationService.success('Thêm vào giỏ hàng thành công', 'Thông báo', {
      nzDuration: 2000,
      nzStyle: {
        backgroundColor: '#4CAF50',
        color: '#fff'
      }
    });
  }
}
