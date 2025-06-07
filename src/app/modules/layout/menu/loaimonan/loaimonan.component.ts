import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoaiMonAnStore } from './store/loai-mon-an.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { LoaimonanService } from './services/loaimonan.service';
import { DanhmucmonanService } from '../danhmucmonan/services/danhmucmonan.service';
import { DanhMucMonAn } from '../../../../models/DanhMucMonAn';

@Component({
  selector: 'app-loaimonan',
  templateUrl: './loaimonan.component.html',
  styleUrl: './loaimonan.component.scss'
})
export class LoaimonanComponent implements OnInit {
  constructor(private store: LoaiMonAnStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private loaimonanService: LoaimonanService, 
    private danhMucMonAnService: DanhmucmonanService) {}
  loaiMonAnPaging: any[] = []; 
  itemsSearch: any[] = [];
  danhMucMonAn: DanhMucMonAn[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.danhMucMonAnService.getDanhMucMonAn({}).subscribe(
      {
        next: (res: any) => {
          this.danhMucMonAn = res.data.data;
        }
      }
    )
    this.search();
  }
  searchForm: any = {
    tenLoai: '',
    danhMucMonAnId: ''
  };
  search(){
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.loaimonanService.getLoaiMonAn(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.loaiMonAnPaging = res.data.data;
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
  reset(){
    this.searchForm.tenLoai = '';
    this.searchForm.danhMucMonAnId = '';
    this.search();
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
      this.loaimonanService.updateLoaiMonAn(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenLoai = '';
            this.searchForm.danhMucMonAnId = '';
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
      this.loaimonanService.addLoaiMonAn(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenLoai = '';
            this.searchForm.danhMucMonAnId = '';
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
      });
    }
  }

  
    openEditPopup(item: any): void {
      this.isPopupOpen = true;
      this.isEditMode = true;
      this.formData = { ...item };
    }
  
    openDeletePopup(item: any): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: { message: `Bạn có chắc chắn muốn xóa "${item.tenLoai}" không?` },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        this.loaimonanService.deleteLoaiMonAn(item.id).subscribe(
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
        });
      }  
    });
  }
}
