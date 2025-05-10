import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoaiNguyenLieuStore } from '../loainguyenlieu/store/loai-nguyen-lieu.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { LoainguyenlieuService } from './services/loainguyenlieu.service';
import { DanhmucnguyenlieuService } from '../danhmucnguyenlieu/services/danhmucnguyenlieu.service';
import { DanhMucNguyenLieu } from '../../../../models/DanhMucNguyenLieu';
@Component({
  selector: 'app-loainguyenlieu',
  templateUrl: './loainguyenlieu.component.html',
  styleUrl: './loainguyenlieu.component.scss'
})
export class LoainguyenlieuComponent implements OnInit {
  constructor(private store: LoaiNguyenLieuStore, private dialog: MatDialog, private notification: NzNotificationService, private loainguyenlieuService: LoainguyenlieuService, private danhMucNguyenLieuService: DanhmucnguyenlieuService) {}
  loaiNguyenLieuPaging: any[] = []; 
  itemsSearch: any[] = [];
  danhMucNguyenLieu: DanhMucNguyenLieu[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.loaiNguyenLieuPaging);  
    this.danhMucNguyenLieuService.getDanhMucNguyenLieu({}).subscribe(
      {
        next: (res: any) => {
          this.danhMucNguyenLieu = res.data.data;
        }
      }
    )
    this.search();
  }

  searchForm: any = {
    tenLoai: '',
    danhMucNguyenLieuId: ''
  };
  search(){
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.loainguyenlieuService.getLoaiNguyenLieu(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.loaiNguyenLieuPaging = res.data.data;
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

  reset(){
    this.searchForm.tenLoai = '';
    this.searchForm.danhMucNguyenLieuId = '';
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
    console.log(body);
  
    if (!body) return;
  
    if (this.isEditMode) {
      // Sửa bàn
      this.loainguyenlieuService.updateLoaiNguyenLieu(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenLoai = '';
            this.searchForm.danhMucNguyenLieuId = '';
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
      // Thêm mới bàn
      this.loainguyenlieuService.addLoaiNguyenLieu(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenLoai = '';
            this.searchForm.danhMucNguyenLieuId = '';
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

  
    // Hàm mở popup Sửa
    openEditPopup(item: any): void {
      this.isPopupOpen = true;
      this.isEditMode = true;
      this.formData = item;
    }
  
  
      // Hàm mở popup xác nhận xóa
    openDeletePopup(item: any): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: { message: `Bạn có chắc chắn muốn xóa "${item.tenLoai}" không?` },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        this.loainguyenlieuService.deleteLoaiNguyenLieu(item.id).subscribe(
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
