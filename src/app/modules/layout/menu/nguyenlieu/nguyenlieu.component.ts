import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NguyenLieuStore } from './store/nguyen-lieu.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { NguyenlieuService } from './services/nguyenlieu.service';
import { LoainguyenlieuService } from '../loainguyenlieu/services/loainguyenlieu.service';
import { LoaiNguyenLieu } from '../../../../models/LoaiNguyenLieu';
import {TuDo} from '../../../../models/TuDo';
import { TuDoService } from '../tudo/services/tudo.service';
import { DonViTinh } from '../../../../models/DonViTinh';
import { DonViTinhService } from '../donvitinh/services/donvitinh.service';
import { TrangThaiNguyenLieu } from '../../../../models/TrangThaiNguyenLieu';


@Component({
  selector: 'app-nguyenlieu',
  templateUrl: './nguyenlieu.component.html',
  styleUrl: './nguyenlieu.component.scss'
})
export class NguyenlieuComponent implements OnInit {
  constructor(private store: NguyenLieuStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private nguyenlieuService: NguyenlieuService,
    private loaiNguyenLieuService: LoainguyenlieuService,
    private tuDoService: TuDoService,
    private donViTinhService: DonViTinhService) {}
  nguyenLieuPaging: any[] = []; 
  itemsSearch: any[] = [];
  loaiNguyenLieu: LoaiNguyenLieu[] = [];
  tuDo: TuDo[] = [];
  donViTinh: DonViTinh[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.nguyenLieuPaging);  
    this.loaiNguyenLieuService.getLoaiNguyenLieu({}).subscribe(
      {
        next: (res: any) => {
          this.loaiNguyenLieu = res.data.data;
        }
      }
    )
    this.tuDoService.getTuDo({}).subscribe(
      {
        next: (res: any) => {
          this.tuDo = res.data.data;
        }
      }
    )
    this.donViTinhService.getDonViTinh({}).subscribe(
      {
        next: (res: any) => {
          this.donViTinh = res.data.data;
        }
      }
    )
    this.search();
  }
  searchForm: any = {
    tenNguyenLieu: '',
    loaiNguyenLieuId: '',
    donViTinhId: '',
    tuDoId: '',
    trangThai: '',
  };
  search(){
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.nguyenlieuService.getNguyenLieu(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.nguyenLieuPaging = res.data.data;
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
  getTrangThaiName(trangThai: number): string {
    switch(trangThai) {
      case TrangThaiNguyenLieu.HangMoi: return 'Hàng mới';
      case TrangThaiNguyenLieu.DaQuaSuDung: return 'Đã qua sử dụng';
      default: return 'Không xác định';
    }
  }
  getTrangThaiClass(trangThai: number): string {
    switch (trangThai) {
      case TrangThaiNguyenLieu.HangMoi: return 'bg-green-500 border-green-500';
      case TrangThaiNguyenLieu.DaQuaSuDung: return 'bg-red-500 border-red-500';
      default: return 'text-gray-500';
    }
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
    this.searchForm.tenNguyenLieu = '';
    this.searchForm.loaiNguyenLieuId = '';
    this.searchForm.tuDoId = '';
    this.searchForm.donViTinhId = '';
    this.searchForm.trangThai = '';
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
      this.nguyenlieuService.updateNguyenLieu(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenNguyenLieu = '';
            this.searchForm.loaiNguyenLieuId = '';
            this.searchForm.tuDoId = '';
            this.searchForm.donViTinhId = '';
            this.searchForm.trangThai = '';
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
          `Cập nhật thất bại`, {
            nzClass: 'notification-error',  
            nzDuration: 2000
          }
        )
      });
    } else {
      // Thêm mới bàn
      this.nguyenlieuService.addNguyenLieu(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenNguyenLieu = '';
            this.searchForm.loaiNguyenLieuId = '';
            this.searchForm.tuDoId = '';
            this.searchForm.donViTinhId = '';
            this.searchForm.trangThai = '';
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
          `Thêm mới thất bại`, {
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
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenNguyenLieu}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.nguyenlieuService.deleteNguyenLieu(item.id).subscribe(
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
          error: () => this.notification.create(
            'error',
            'Thông báo!',
            `Xóa dữ liệu thất bại`,
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
          `Xóa dữ liệu thất bại`,
          {
            nzClass: 'notification-error',  
            nzDuration: 2000
          }
        );
      }
    });
  }
}
