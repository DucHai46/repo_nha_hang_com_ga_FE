import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { BanAnService } from './services/banan.service';
import { LoaiBanAnService } from '../loaibanan/services/loaibanan.service';
import { LoaiBanAn } from '../../../../models/LoaiBanAn';
import { BanAnStore } from './store/ban-an.store';
import { TrangThaiBan } from '../../../../models/TrangThaiBan';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-banan',
  templateUrl: './banan.component.html',
  styleUrl: './banan.component.scss'
})
export class BananComponent implements OnInit   {
  constructor(private store: BanAnStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private banAnService: BanAnService, 
    private loaiBanAnService: LoaiBanAnService) {}
  banAnPaging: any[] = []; 
  itemsSearch: any[] = [];
  loaiBanAn: LoaiBanAn[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.banAnPaging);  
    this.loaiBanAnService.getLoaiBanAn({}).subscribe({
      next: (res: any) => {
        this.loaiBanAn = res.data.data;
      }
    });
    this.search();
  }
  searchForm: any = {
    tenBan: '',
    idLoaiBan: '',
    trangThai: ''
  };
  getTrangThaiName(trangThai: number): string {
    switch(trangThai) {
      case TrangThaiBan.ConTrong: return 'Còn trống';
      case TrangThaiBan.DatTruoc: return 'Đặt trước';
      case TrangThaiBan.DangSuDung: return 'Đang sử dụng';
      default: return 'Không xác định';
    }
  }
  getTrangThaiClass(trangThai: number): string {
    switch (trangThai) {
      case TrangThaiBan.ConTrong:
        return 'bg-green-500 border-green-500';
      case TrangThaiBan.DatTruoc:
        return 'bg-yellow-500 border-yellow-500';
      case TrangThaiBan.DangSuDung:
        return 'bg-red-500 border-red-500';
      default:
        return 'text-gray-500 border-gray-500';
    }
  }

  search() {
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.banAnService.getBanAn(this.searchForm).subscribe({
      next: (res: any) => {
        this.banAnPaging = res.data.data; 
        this.paging.page = res.data.paging.currentPage;
        this.paging.size = res.data.paging.pageSize;
        this.paging.total = res.data.paging.totalRecords;
        this.totalPages = Math.ceil(this.paging.total / this.paging.size);
      },
      error: (err: any) => {
        this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
      }
    });  
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
    this.searchForm.tenBan = '';
    this.searchForm.idLoaiBan = '';
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
 
      this.banAnService.updateBanAn(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenBan = '';
            this.searchForm.idLoaiBan = '';
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
        error: () => {
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
      });
    } else {

      this.banAnService.addBanAn(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenBan = '';
            this.searchForm.idLoaiBan = '';
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
        error: () => {
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
      });
    }
  }


  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = item;
    console.log(item);
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenBan}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.banAnService.deleteBanAn(item.id).subscribe(
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
      });
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

  isQRPopupOpen = false;
  qrData = '';
  selectedTableName = '';

  
  downloadQR(item: any): void {
    const domain = window.location.origin;
    this.qrData = `${domain}/menugoimon/${item.id}`;
    this.selectedTableName = item.tenBan;
    this.isQRPopupOpen = true;
  }

  closeQRPopup(): void {
    this.isQRPopupOpen = false;
  }
}
