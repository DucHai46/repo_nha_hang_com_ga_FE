import { Component, OnInit } from '@angular/core';
import { ChucVuStore } from './store/chuc-vu.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { ChucVuService } from './services/chucvu.service';
import { ChucVu } from '../../../../models/ChucVu';

@Component({
  selector: 'app-chucvu',
  templateUrl: './chucvu.component.html',
  styleUrl: './chucvu.component.scss'
})
export class ChucVuComponent implements OnInit {
  constructor(private store: ChucVuStore, private dialog: MatDialog, private notification: NzNotificationService, private chucvuService: ChucVuService) { }
  chucVuPaging: ChucVu[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;

  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.chucVuPaging);
  }

  searchForm: any = {
    tenChucVu: ''
  };

  search() {
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.chucvuService.getChucVu(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.chucVuPaging = res.data.data;
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
  onSaveChucVu(body: any): void {
    console.log(body);

    if (!body) return;

    if (this.isEditMode) {
      this.chucvuService.updateChucVu(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenChucVu = '';
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
      this.chucvuService.addChucVu(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenChucVu = '';
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
    this.isEditMode = true;
    this.formData = {
      id: item.id,
      tenChucVu: item.tenChucVu,
      moTa: item.moTa
    };
  }


  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenDanhMuc}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chucvuService.deleteChucVu(item.id).subscribe(
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
