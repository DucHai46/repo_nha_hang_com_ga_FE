import { Component, OnInit } from '@angular/core';
import { GiamGiaStore } from './store/giam-gia.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { giamgiaService } from './services/giamgia.service';
import { GiamGia } from '../../../../models/GiamGia';


@Component({
  selector: 'app-giamgia',
  templateUrl: './giamgia.component.html',
  styleUrl: './giamgia.component.scss'
})
export class GiamgiaComponent implements OnInit {
  constructor(private store: GiamGiaStore, 
    private dialog: MatDialog, private notification: NzNotificationService, 
    private giamgiaService: giamgiaService) {}
  giamGiaPaging: any[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.giamGiaPaging);
  }
  searchForm: any = {
    tenGiamGia: '',
    ngayBatDau: null,
    ngayKetThuc: null,
    trangThai: null
  };
  search() {
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    Object.keys(this.searchForm).forEach(key => {
      if (this.searchForm[key] === null) {
        delete this.searchForm[key];
      }
    });
    this.giamgiaService.getGiamGia(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.giamGiaPaging = res.data.data;
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
    this.searchForm.tenGiamGia = '';
    this.searchForm.ngayBatDau = null;
    this.searchForm.ngayKetThuc = null;
    this.searchForm.trangThai = null;
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
  onSaveCongThuc(body: any): void {
  
    if (!body) return;
  
    if (this.isEditMode) {
      this.giamgiaService.updateGiamGia(body.id, body).subscribe({
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
      this.giamgiaService.addGiamGia(body).subscribe({
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
      ...item,
      ngayBatDau: this.formatDate(item.ngayBatDau),
      ngayKetThuc: this.formatDate(item.ngayKetThuc)
    }
  }
  formatDate(dateInput: string){
    const date= new Date(dateInput);
    return date.toISOString().split('T')[0];
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenGiamGia}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.giamgiaService.deleteGiamGia(item.id).subscribe(
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
