import { KhachHangService } from './../khachhang/services/khachhang.service';
import { LoaiDonOrder } from './../../../../models/LoaiDonOrder';
import { BanAnService } from './../banan/services/banan.service';
import { Component, OnInit } from '@angular/core';
import { DonOrderStore } from './store/don-order.store';
import { MatDialog } from '@angular/material/dialog';
import { LoaidonorderService } from '../loaidonorder/services/loaidonorder.service';
import { DonOrderService } from './services/donorder.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-donorder',
  templateUrl: './donorder.component.html',
  styleUrl: './donorder.component.scss'
})
export class DonorderComponent implements OnInit {
  constructor(
    private store: DonOrderStore,
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private donOrderService: DonOrderService,
    private loaiDonOrderService: LoaidonorderService,
    private banAnService: BanAnService,
    private khachHangService: KhachHangService,

  ) { }
  donOrderPaging: any[] = [];
  loaiDonOrder: any[] = [];
  banAn: any[] = [];
  khachHang: any[] = [];
  khachHangIds: any[] = [];

  paging: any = {
    page: 1,
    size: 10,
    total: 0,
  }
  totalPages = 0

  ngOnInit(): void {
    this.store.setItems$(this.donOrderPaging);
    // this.donOrderService.getDonOrder({}).subscribe({
    //   next: (res: any) => {
    //     this.donOrderPaging = res.data.data;
    //     console.log(this.donOrderPaging);
    //   }
    // });

    // this.loaiDonOrderService.getLoaidonorder({}).subscribe({
    //   next: (res: any) => {
    //     this.loaiDonOrder = res.data.data;
    //     console.log(this.loaiDonOrder);
    //   }
    // });

    // this.banAnService.getBanAn({}).subscribe({
    //   next: (res: any) => {
    //     this.banAn = res.data.data;
    //     console.log(this.banAn);
    //   }
    // });

    this.khachHangService.getKhachHang({}).subscribe({
      next: (res: any) => {
        this.khachHang = res.data.data;
        console.log(this.khachHang);
      }
    });

    this.search();
  }

  // Phương thức lấy danh sách ID khách hàng từ tên khách hàng
  // getKhachHangIdsByName(tenKhachHang: string): { khachHangIds: string[] } {
  //   if (!tenKhachHang || tenKhachHang.trim() === '') {
  //     return { khachHangIds: [] };
  //   }

  //   const tenKhachHangLowerCase = tenKhachHang.toLowerCase().trim();
  //   const filteredKhachHang = this.khachHang.filter(kh => 
  //     kh.tenKhachHang && kh.tenKhachHang.toLowerCase().includes(tenKhachHangLowerCase)
  //   );

  //   return { khachHangIds: filteredKhachHang.map(kh => kh.id) };
  // }

  searchForm: any = {
    tenDon: '',
    khachHangs: '',
  }

  searchKH: any = {
    tenKhachHang: '',
  }

  search() {

    console.log('Search form:', this.searchForm);
    if (this.searchForm.khachHangs) {
      this.searchKH.isPaging = true; // Lấy tất cả dữ liệu
      this.searchKH.PageNumber = this.paging.page;
      this.searchKH.PageSize = this.paging.size;
      this.searchKH.tenKhachHang = this.searchForm.khachHangs;
      this.khachHangService.getKhachHang(this.searchKH).subscribe({
        next: (res: any) => {
          this.khachHang = res.data.data;
          this.khachHangIds = res.data.data.map((kh: any) => kh.id);
          this.searchForm.khachHang = this.khachHangIds;
          this.searchDonOrder();
          // console.log(this.khachHang);
        }
      });
    } else {
      //   // Nếu không nhập tên khách hàng, xóa khachHangIds khỏi searchForm nếu có
      if (this.khachHangIds) {
        this.khachHangIds = [];
      }
      this.searchDonOrder();
    }
  }

  searchDonOrder() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    console.log(this.searchForm);
    this.donOrderService.getDonOrder(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.donOrderPaging = res.data.data;
          console.log(this.donOrderPaging);
          this.paging.page = res.data.paging.currentPage;
          this.paging.size = res.data.paging.pageSize;
          this.paging.total = res.data.paging.totalRecords;
          this.totalPages = Math.ceil(this.paging.total / this.paging.size);
        },
        error: (err: any) => {
          this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
        }
      }
    )
    // this.searchForm.khachHang = this.searchKH.tenKhachHang;

  }


  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.paging.page = newPage;
    this.search();
  }

  changePageSize(newSize: number) {
    this.paging.size = newSize;
    this.paging.page = 1; // Reset về trang đầu khi thay đổi kích thước trang
    this.search();
  }

  reset() {
    this.searchForm.tenDon = '';
    this.searchForm.khachHangs = '';
    this.khachHangIds = [];
    this.searchForm.khachHang = [];
    this.search();
  }

  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}
  isChiTietOpen = false;

  openAddPopup(): void {
    // console.log(this.loaiDonOrder);
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }

  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true;
    this.formData = item;
    console.log(this.formData);
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }

  closeChiTiet(): void {
    this.isChiTietOpen = false;
    this.search(); // load lại dữ liệu sau khi đóng chi tiết
  }

  onSaveCongThuc(body: any): void {
    console.log(body);
    if (!body) return;
    console.log(body);

    if (this.isEditMode) {
      // Sửa Đơn Order
      this.donOrderService.updateDonOrder(body.id, body).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.data) {
            this.searchForm.tenDon = '';
            this.searchForm.khachHang = '';
            this.search();
            this.closePopup();
            this.notification.create(
              'success',
              'Thông báo!',
              `Cập nhật thành công`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Cập nhật thất bại`,
              {
                nzClass: 'notification-error',
                nzDuration: 2000
              }
            );
          }
        },
        error: () => {
          this.notification.create(
            'error',
            'Thông báo!',
            `Cập nhật thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      });
    } else {
      // Trả về danh sách đơn order
      this.searchForm.tenDon = '';
      this.searchForm.khachHang = '';
      this.search();
    }
  }

  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = item;
    console.log(item);
    // console.log(this.formData);
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenDon}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donOrderService.deleteDonOrder(item.id).subscribe(
          {
            next: (res: any) => {
              this.search();
              this.notification.create(
                'success',
                'Thông báo!',
                `Xóa dữ liệu thành công`,
                {
                  nzClass: 'notification-success',
                  nzDuration: 2000
                }
              );
            },
            error: () => {
              this.notification.create(
                'error',
                'Thông báo!',
                `Xóa dữ liệu thất bại`,
                {
                  nzClass: 'notification-error',
                  nzDuration: 2000
                }
              );
            }
          }
        )
      } else {
        this.notification.create(
          'error',
          'Thông báo!',
          `Xóa dữ liệu thất bại`, {
          nzClass: 'notification-error',
          nzDuration: 2000
        }
        );
      }
    });
  } //
  // Trong donorder.component.ts thay thế phương thức updateFoodStatus

}


