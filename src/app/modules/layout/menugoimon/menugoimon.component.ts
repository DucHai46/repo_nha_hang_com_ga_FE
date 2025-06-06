import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThucDonService } from '../menu/thucdon/services/thucdon.service';
import { LoaimonanService } from '../menu/loaimonan/services/loaimonan.service';
import { MonAnService } from '../menu/monan/services/monan.service';
import { ComboService } from '../menu/combo/services/combo.service';
import { LoaiMonAn } from '../../../models/LoaiMonAn';
import { ThucDon } from '../../../models/ThucDon';
import { MonAn } from '../../../models/MonAn';
import { FileService } from '../../../core/services/file.service';

@Component({
  selector: 'app-menugoimon',
  templateUrl: './menugoimon.component.html',
  styleUrls: ['./menugoimon.component.scss'],
})
export class MenugoimonComponent implements OnInit {
  itemsDanhMuc = [];
  itemsMonAn: any[] = [];
  selectedItemsMA: any[] = [];
  loaiMonAn: any[] = [];
  thucDon: any[] = [];
  itemsRoot2: any[] = [];
  combo: any[] = [];
  id: string = '';
  isSticky = false;
  selectedItem: any;
  itemsMonAnRoot: any[] = [];
  imageUrls: { [key: string]: string } = {};

  constructor(
    public router: Router,
    private thucDonService: ThucDonService,
    private loaiMonAnService: LoaimonanService,
    private monAnService: MonAnService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private comboService: ComboService
  ) { }

  ngOnInit() {
    const updatedSelectedItems = history.state?.updatedSelectedItems;

    this.thucDonService.getThucDon({ trangThai: 1 }).subscribe({
      next: async (res: any) => {
        this.thucDon = res.data.data;
        this.loaiMonAn = [
          { ma: "comboMonAn", ten: "combo" },
          ...this.thucDon[0].loaiMonAns.map((item: any) => ({
            ma: item.id,
            ten: item.name,
          })),
        ];
        this.itemsRoot2 = await this.taoDanhSachMonAn(this.thucDon);
        this.combo = await this.taoDanhSachCombo(this.thucDon);
        this.itemsMonAn = [...this.itemsRoot2, ...this.combo];
        this.loadAllImages();

        if (updatedSelectedItems) {
          this.capNhatSoLuongMonAn(updatedSelectedItems);
          this.selectedItemsMA = updatedSelectedItems.filter(
            (item: { soLuong: number }) => item.soLuong > 0
          );
        }
      },
      error: (err: any) => console.log(err),
    });
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  private taoDanhSachMonAn(thucDonData: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.monAnService.getMonAn({}).subscribe({
        next: (res: any) => {
          const monAnList = res.data.data;
          const danhSach: any[] = [];

          thucDonData.forEach((item: any) => {
            item.loaiMonAns.forEach((loaiMon: any) => {
              loaiMon.monAns.forEach((monAn: any) => {     
                const monAnInfo = monAnList.find((ma: any) => ma.id === monAn.id);
                if(monAnInfo!=null){
                  danhSach.push({
                    ma: monAn.id,
                    ten: monAn.tenMonAn,
                    hinhAnh: monAn.hinhAnh,
                    gia: monAn.giaTien,
                    soLuong: 0,
                    ghiChu: "",
                    danhMuc: loaiMon.id,
                    giamGia: monAnInfo.giamGia?.giaTri || 0
                  });
                }
              });
            });
          });
          resolve(danhSach);
        },
        error: (err: any) => {
          console.log(err);
          reject(err);
        }
      });
    });
  }

  private taoDanhSachCombo(thucDonData: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.comboService.getCombo({}).subscribe({
        next: (res: any) => {
          const comboList = res.data.data;
          const danhSach: any[] = [];

          thucDonData.forEach((item: any) => {
            item.combos?.forEach((loaiMon: any) => {
              const comboInfo = comboList.find((ma: any) => ma.id === loaiMon.id);
              if (comboInfo) {
                danhSach.push({
                  ma: loaiMon.id,
                  ten: String(loaiMon.name).trim(),
                  hinhAnh: loaiMon.hinhAnh,
                  gia: loaiMon.giaTien,
                  soLuong: 0,
                  giamGia: comboInfo.giamGia?.giaTri ?? 0,
                  ghiChu: "",
                  danhMuc: "comboMonAn"
                });
              }
            });
          });
          resolve(danhSach);
        },
        error: (err: any) => {
          console.log(err);
          reject(err);
        }
      });
    });
  }

  capNhatSoLuongMonAn(updatedSelectedItems: any[]) {
    updatedSelectedItems.forEach((updatedItem) => {
      const itemIndex = this.itemsMonAn.findIndex((mon) => mon.ma === updatedItem.ma);
      if (itemIndex >= 0) {
        this.itemsMonAn[itemIndex] = {
          ...this.itemsMonAn[itemIndex],
          soLuong: updatedItem.soLuong
        };
      }
    }); 
  }

  getMonAnTheoDanhMuc(maDanhMuc: string) {
    return this.itemsMonAn.filter((mon) => mon.danhMuc === maDanhMuc && mon.gia !== null);
  }

  updateSelectedItemsMA(item: any) {
    const index = this.selectedItemsMA.findIndex((mon) => mon.ma === item.ma);
    if (index >= 0) {
      this.selectedItemsMA[index].soLuong = item.soLuong;
    } else if (item.soLuong > 0) {
      this.selectedItemsMA.push(item);
    }
    this.selectedItemsMA = this.selectedItemsMA.filter((mon) => mon.soLuong > 0);
  }

  check(ma: string) {
    const item = this.itemsMonAn.filter((mon) => mon.danhMuc === ma);
    if (item.length>0) {
      return true;
    }
    return false;
  }

  tangSoLuong(ma: string) {
    const item = this.itemsMonAn.find((mon: any) => mon.ma === ma);
    if (item) {
      item.soLuong += 1;  
      this.updateSelectedItemsMA(item);  
      console.log('Tăng số lượng:', item);
    }
  }

  giamSoLuong(ma: string) {
    const item = this.itemsMonAn.find((mon: any) => mon.ma === ma);
    if (item) {
      if (item.soLuong > 1) {
        item.soLuong -= 1;
      } else {
        item.soLuong = 0;
      }
      this.updateSelectedItemsMA(item);
    }
  }

  tinhTongTien() {
    return this.itemsMonAn
      .filter((mon) => mon.soLuong > 0)
      .reduce((tong, mon) => tong + (mon.gia - (mon.giamGia ? mon.gia * mon.giamGia / 100 : 0)) * mon.soLuong, 0);
  }

  coMonAnDuocChon() {
    return this.itemsMonAn.some((mon) => mon.soLuong > 0);
  }

  chuyenSangXacNhan() {
    if (this.id == '' || this.id == null) {
      return;
    }
    this.router.navigate(['/xacnhangoimon'], {
      state: { selectedItemsMA: this.selectedItemsMA, id: this.id },
    });
  }

  chuyenSangChiTiet() {
    if (this.id == '' || this.id == null) {
      return;
    }
    this.router.navigate(['/chitietdon'], {
      state: { id: this.id },
    });
  }

  @HostListener('window:scroll', [])
  handleScroll() {
    const stickyWrapper = document.querySelector('.sticky-wrapper');
    const stickyDanhMuc = document.querySelector('.sticky-danh-muc');

    const stickyWrapperHeight = stickyWrapper?.clientHeight || 0;
    const danhMucHeight = stickyDanhMuc?.clientHeight || 0;

    this.isSticky = window.pageYOffset >= stickyWrapperHeight;

    let currentCategory = this.selectedItem;

    this.loaiMonAn.forEach((category) => {
      const el = document.getElementById(category.ma);
      if (el) {
        const { top } = el.getBoundingClientRect();
        if (top >= danhMucHeight && top <= window.innerHeight / 2) {
          currentCategory = category;
        }
      }
    });

    if (this.selectedItem !== currentCategory) {
      this.selectedItem = currentCategory;

      const selectedButton = document.getElementById(`btn-${currentCategory.ma}`);
      selectedButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  selectCategory(category: any, event: any) {
    this.selectedItem = category;

    const selectedButton = document.getElementById(`btn-${category.ma}`);
    selectedButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    const el = document.getElementById(category.ma);
    const stickyWrapperHeight = document.querySelector('.sticky-wrapper')?.clientHeight || 0;
    const danhMucHeight = document.querySelector('.sticky-danh-muc')?.clientHeight || 0;

    if (el) {
      const yOffset = el.getBoundingClientRect().top + window.pageYOffset - stickyWrapperHeight - danhMucHeight;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }

  searchMonAn(event: any) {
    const keyword = event.target.value.toLowerCase().trim();

    if (!this.itemsMonAnRoot || this.itemsMonAnRoot.length === 0) {
      this.itemsMonAnRoot = [...this.itemsMonAn]; 
    }

    if (keyword === '') {
      this.itemsMonAn = [...this.itemsMonAnRoot];
      return;
    }

    const filtered = this.itemsMonAnRoot.filter((mon: any) =>
      String(mon.ten).toLowerCase().includes(keyword)
    );


    if (filtered.length > 0) {
      this.itemsMonAn = filtered;
    } else {
      this.itemsMonAn = [...this.itemsMonAnRoot];
    }
  }

  getImageUrl(hinhAnh: string): string {
    if (!hinhAnh) return '';

    try {
      const parsed = JSON.parse(hinhAnh);
      return `https://api.duchaibui.id.vn/api/files/download/${parsed.id}`;
    } catch {
      return '';
    }
  }

  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }
  loadAllImages(): void {
    for (let category of this.loaiMonAn) {
      const danhSachMonAn = this.getMonAnTheoDanhMuc(category.ma);
      for (let item of danhSachMonAn) {
        const parsed = this.parseJSON(item.hinhAnh);
        if (parsed?.id && item.ma) {
          this.fileService.downloadFile(parsed.id).subscribe(
            (blob: Blob) => {
              const url = URL.createObjectURL(blob);
              this.imageUrls[item.ma] = url;
            },
            (error) => console.error('Lỗi tải ảnh:', item.tenMonAn, error)
          );
        }
      }
    }
  }

}
