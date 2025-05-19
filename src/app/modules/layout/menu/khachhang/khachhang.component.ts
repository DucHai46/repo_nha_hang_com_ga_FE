import { Component, OnInit } from '@angular/core';
import { KhachHangStore } from './store/khach-hang.store';
import { KhachHangService } from './services/khachhang.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { Result } from 'postcss';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrl: './khachhang.component.scss'
})
export class KhachhangComponent implements OnInit {
  constructor(
    private store: KhachHangStore,
    private khachhangService: KhachHangService,
    private dialog: MatDialog,
    private notification: NzNotificationService,
  ) { }
  khachHangPaging: any[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0,
  };
  totalPages = 0;
  ngOnInit(): void {
    // Khởi tạo component
    this.search();
    this.store.setItems$(this.khachHangPaging);
  }

  searchForm: any = {
    tenKhachHang: ''
  };

  search() {
    console.log(this.paging)
    this.searchForm.isPaging = true;
    this.searchForm.pageNumber = this.paging.page;
    this.searchForm.pageSize = this.paging.size;
    console.log(this.searchForm);
    this.khachhangService.getKhachHang(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.khachHangPaging = res.data.data;
          // console.log(this.khachHangPaging);
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
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.paging.page = newPage;
    this.search();
  }

  changePageSize(newSize: number) {
    this.paging.size = newSize;
    this.paging.page = 1;
    this.search();
  }

  reset() {
    this.searchForm.tenKhachHang = '';
    this.search();
  }

  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}

  openAddPopup() {
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }

  closePopup() {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }

  onSaveCongThuc(body: any): void {
    console.log(body);

    if (!body) return;

    if (this.isEditMode) {
      this.khachhangService.updateKhachHang(body.id, body).subscribe(
        {
          next: (res: any) => {
            if (res.data) {
              this.searchForm.tenKhachHang = '';
              this.search();
              this.closePopup();
              this.notification.create(
                'success',
                'Thông báo!',
                `Cập nhật thành công`,
                {
                  nzClass: 'notification-success',
                  nzDuration: 2000,
                }
              );
            }
          },
          error: () => this.notification.create(
            'error',
            'Thông báo!',
            `Cập nhật thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000,
            }
          )
        }
      );
    } else {
      // Add KH
      this.khachhangService.addKhachHang(body).subscribe(
        {
          next: (res: any) => {
            if (res.data) {
              this.searchForm.tenKhachHang = '';
              this.search();
              this.closePopup();
              this.notification.create(
                'success',
                'Thông báo!',
                `Thêm mới thành công`,
                {
                  nzClass: 'notification-success',
                  nzDuration: 2000
                }
              );
            }
          },
          error: () => this.notification.create(
            'error',
            'Thông báo!',
            `Thêm mới thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          )
        }
      );
    }
  }

  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = {
      id: item.id,
      tenKhachHang: item.tenKhachHang,
      diaChi: item.diaChi,
      email: item.email,
      soDienThoai: item.soDienThoai,
    }
  }

  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn xóa "${item.tenKhachHang}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.khachhangService.deleteKhachHang(item.id).subscribe(
          {
            next: (res: any) => {
              this.search();
              this.notification.create(
                'success',
                'Thông báo!',
                `Xóa thành công`,
                {
                  nzClass: 'notification-success',
                  nzDuration: 2000
                }
              );
            },
            error: () => this.notification.create(
              'error',
              'Thông báo!',
              `Xóa thất bại`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            )
          }
        )
      } else {
        this.notification.create(
          'error',
          'Thông báo!',
          `Xóa thất bại`,
          {
            nzClass: 'notification-success',
            nzDuration: 2000
          }
        )
      }
    });
  }
}
