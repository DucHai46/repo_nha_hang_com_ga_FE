import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PhanQuyenStore } from './store/phan-quyen.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { PhanQuyenService } from './services/phanquyen.service';
import { PhanQuyen } from '../../../../models/PhanQuyen';
import { FileService } from '../../../../core/services/file.service';
@Component({
  selector: 'app-phanquyen',
  templateUrl: './phanquyen.component.html',
  styleUrl: './phanquyen.component.scss'
})
export class PhanQuyenComponent implements OnInit {
  constructor(private store: PhanQuyenStore, private dialog: MatDialog, private notification: NzNotificationService, private phanQuyenService: PhanQuyenService, private fileService: FileService) { }
  phanQuyenPaging: PhanQuyen[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.phanQuyenPaging);
  }

  searchForm: any = {
    label: '',
  };

  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.phanQuyenService.getPhanQuyen(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.phanQuyenPaging = res.data.data;
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
    this.paging.page = 1; // Reset về trang đầu khi thay đổi kích thước trang
    this.search();
  }


  reset() {
    this.searchForm.label = '';
    this.search()
  }
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}

  openAddPopup(): void {
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.isChiTietOpen = false;
    this.formData = {};
  }
  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }
  onSavePhanQuyen(body: any): void {
    console.log(body);

    if (!body) return;

    if (this.isEditMode) {
      // Sửa bàn
      this.phanQuyenService.updatePhanQuyen(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenPhanQuyen = '';
            this.search();
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
      // Thêm mới bàn
      this.phanQuyenService.addPhanQuyen(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenPhanQuyen = '';
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
    this.isChiTietOpen = false;
    this.isEditMode = true;
    this.formData = {
      id: item.id,
      tenPhanQuyen: item.tenPhanQuyen,
      danhSachMenu: item.danhSachMenu,
      moTa: item.moTa
    }
  }

  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenPhanQuyen}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.phanQuyenService.deletePhanQuyen(item.id).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                this.search();
                this.notification.create(
                  'success',
                  'Thông báo!',
                  `Xóa dữ liệu thành công`, {
                  nzClass: 'notification-success',
                  nzDuration: 2000
                });
              } else {
                this.notification.create(
                  'error',
                  'Thông báo!',
                  `Xóa dữ liệu thất bại`, {
                  nzClass: 'notification-error',
                  nzDuration: 2000
                });
              }
            },
            error: () => this.notification.create(
              'error',
              'Thông báo!',
              `Xóa dữ liệu thất bại`, {
              nzClass: 'notification-error',
              nzDuration: 2000
            })
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

  isChiTietOpen = false;
  openChiTietPopup(item: any): void {
    this.isPopupOpen = true;
    this.isChiTietOpen = true;
    this.phanQuyenService.getPhanQuyenById(item.id).subscribe((response: any) => {
      this.formData = response.data;
      console.log(this.formData);
    });
  }

  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }

  download(fileId: string): void {
    this.fileService.downloadFile(fileId).subscribe(
      (response: Blob) => {
        // Create object URL from blob
        const url = window.URL.createObjectURL(response);

        // Open preview in new tab
        window.open(url, '_blank');

        // Cleanup object URL after preview opens
        window.URL.revokeObjectURL(url);
      }
    );
  }

  toggleActive(item: any): void {
    const newStatus = !item.isActive;
  }
}
