import { Component, OnInit } from '@angular/core';
import { NhanVienStore } from './store/nhan-vien.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { NhanVienService } from './services/nhanvien.service';
import { NhanVien, NhanVienResponse } from '../../../../models/NhanVien';
import { ChucVuService } from '../chucvu/services/chucvu.service';
@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrl: './nhanvien.component.scss'
})
export class NhanVienComponent implements OnInit {
  constructor(private store: NhanVienStore, private dialog: MatDialog, private notification: NzNotificationService, private nhanvienService: NhanVienService, private chucVuService: ChucVuService) { }
  nhanVienPaging: NhanVienResponse[] = [];
  chucVu: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;

  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.nhanVienPaging);
    this.chucVuService.getChucVu({isPaging: false, PageNumber: 1, PageSize: 1000}).subscribe(
      {
        next: (res: any) => {
          this.chucVu = res.data.data;
        }
      }
    )
  }

  searchForm: any = {
    tenChucVu: '',
    chucVuId: '',
    soDienThoai: ''
  };

  search() {
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.nhanvienService.getNhanVien(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.nhanVienPaging = res.data.data;
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
    this.searchForm.tenChucVu = '';
    this.searchForm.chucVuId = '';
    this.searchForm.soDienThoai = '';
    this.search()
  }

  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}

  openAddPopup(): void {
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }
  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }
  onSaveNhanVien(body: any): void {

    if (!body) return;

    if (this.isEditMode) {
      this.nhanvienService.updateNhanVien(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.reset();
            this.closePopup();
            this.notification.create(
              'success',
              'Thông báo!',
              `Cập nhật thành công`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Cập nhật thất bại`,
              {
                nzClass: 'notification-error',
                nzDuration: 2000
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
            nzDuration: 2000
          }
        )
      });
    } else {
      this.nhanvienService.addNhanVien(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.reset();
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
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Thêm mới thất bại`,
              {
                nzClass: 'notification-error',
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
      });
    }
  }


  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = {
      id: item.id,
      tenNhanVien: item.tenNhanVien,
      soDienThoai: item.soDienThoai,
      email: item.email,
      diaChi: item.diaChi,
      ngaySinh: item.ngaySinh,
      chucVu: item.chucVu.id
    }
  }


  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenDanhMuc}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.nhanvienService.deleteNhanVien(item.id).subscribe(
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
                nzClass: 'notification-error',
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
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
  }
}
