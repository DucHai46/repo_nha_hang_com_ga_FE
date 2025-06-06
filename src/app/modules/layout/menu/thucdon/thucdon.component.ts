import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { ThucDonService } from './services/thucdon.service';
import { ThucDonStore } from './store/thuc-don.store';  
import { MonAnService } from '../monan/services/monan.service'; 
import { MonAn } from '../../../../models/MonAn';
import { FileService } from '../../../../core/services/file.service';
import { ComboService } from '../combo/services/combo.service';
import { Combo } from '../../../../models/Combo';
import { TrangThaiThucDon } from '../../../../models/TrangThaiThucDon';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-thucdon',
  templateUrl: './thucdon.component.html',
  styleUrl: './thucdon.component.scss'
})
export class ThucdonComponent {
  constructor(
    private store: ThucDonStore, 
    private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private thucDonService: ThucDonService, 
    private fileService: FileService,
    private monAnService: MonAnService,
    private comboService: ComboService
  ){}
  thucDonPaging: any[] = []
  itemsSearch: any[] = []
  monAn: MonAn[] = []
  combo: Combo[] = []
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  }
  totalPages = 0
  ngOnInit(): void {
    this.store.setItems$(this.thucDonPaging);
    this.search();
  }
  searchForm: any = {
    tenThucDon: '',
    loaiMonAnId: '',
    comboId: '',
    trangThai:''
  };
  search() {
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.thucDonService.getThucDon(this.searchForm).subscribe({
      next: (res: any) => {
        this.thucDonPaging = res.data.data; 
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
    this.searchForm.loaiMonAnId = '';
    this.searchForm.comboId = '';
    this.searchForm.tenThucDon = '';
    this.searchForm.trangThai = '';
    this.search();
  }
  
  getTrangThaiName(trangThai: number): string {
    switch(trangThai) {
      case TrangThaiThucDon.KhongHoatDong: return 'Không hoạt động';
      case TrangThaiThucDon.HoatDong: return 'Hoạt động';
      default: return 'Không xác định';
    }
  }
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}
  isChiTietOpen = false;  

  openAddPopup(): void {
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }
  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true; 
    this.formData = item;     
  }
  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }
  closeChiTiet(): void {
    this.isChiTietOpen = false;
  }
  onSaveCongThuc(body: any): void {
  
    if (!body) return;
  
    if (this.isEditMode) {
      this.thucDonService.updateThucDon(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.loaiMonAnId = '';
            this.searchForm.comboId = '';
            this.searchForm.tenThucDon = '';
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
      this.thucDonService.addThucDon(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.loaiMonAnId = '';
            this.searchForm.comboId = '';
            this.searchForm.tenThucDon = '';
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
  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = { ...item };
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenThucDon}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.thucDonService.deleteThucDon(item.id).subscribe(
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
          `Xóa thất bại`, {
            nzClass: 'notification-error',  
            nzDuration: 2000
          }
        )
      });
      }
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
        const url = window.URL.createObjectURL(response);
        
        window.open(url, '_blank');
        
        window.URL.revokeObjectURL(url);
      }
    );
  }
  toggleTrangThai(item: any): void {
    if (item.trangThai === 1) {
      const updatedItem = { ...item, trangThai: 0 };
      this.thucDonService.updateThucDon(item.id, updatedItem).subscribe({
        next: (res: any) => {
            if (res.data) {
              item.trangThai = 0;
            this.notification.create(
              'success',
              'Thông báo!',
              `Cập nhật thành công`, {
                nzClass: 'notification-success',  
                nzDuration: 2000
              }
            );
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Cập nhật thất bại`, {
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
      const dangHoatDong = this.thucDonPaging.find(x => x.trangThai === 1);
  
      const updateCalls = [];
  
      if (dangHoatDong) {
        const updateOff = {
          ...dangHoatDong,
          trangThai: 0
        };
        updateCalls.push(this.thucDonService.updateThucDon(dangHoatDong.id, updateOff));
      }
  
      const updateOn = {
        ...item,
        trangThai: 1
      };
      updateCalls.push(this.thucDonService.updateThucDon(item.id, updateOn));
  
      forkJoin(updateCalls).subscribe({
        next: (results: any) => {
          if (dangHoatDong) dangHoatDong.trangThai = 0;
          item.trangThai = 1;
          this.notification.create(
            'success',
            'Thông báo!',
            `Cập nhật thành công`, {
              nzClass: 'notification-success',  
              nzDuration: 2000  
            }
          );
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
    }
  }

}
