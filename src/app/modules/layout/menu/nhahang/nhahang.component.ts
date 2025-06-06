import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NhaHangStore } from './store/nha-hang.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { NhaHangService } from './services/nhahang.service';
import { NhaHang } from '../../../../models/NhaHang';
import { FileService } from '../../../../core/services/file.service';
@Component({
  selector: 'app-nhahang',
  templateUrl: './nhahang.component.html',
  styleUrl: './nhahang.component.scss'
})
export class NhaHangComponent implements OnInit {
  constructor(private store: NhaHangStore, private dialog: MatDialog, private notification: NzNotificationService, private nhaHangService: NhaHangService, private fileService: FileService) { }
  nhaHangPaging: NhaHang[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.nhaHangPaging);
  }

  searchForm: any = {
    label: '',
    isActive: null
  };

  search() {
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    if(this.searchForm.isActive == null){
      delete this.searchForm.isActive;
    }
    this.nhaHangService.getNhaHang(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.nhaHangPaging = res.data.data;
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
    this.searchForm.label = '';
    this.searchForm.isActive = null;
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
    this.isPopupGiaoDienOpen = false;
  }
  onSaveNhaHang(body: any): void {

    if (!body) return;

    if (this.isEditMode) {
      this.nhaHangService.updateNhaHang(body.id, body).subscribe({
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
      this.nhaHangService.addNhaHang(body).subscribe({
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
    this.isChiTietOpen = false;
    this.isEditMode = true;
    this.formData = {
      id: item.id,
      tenNhaHang: item.tenNhaHang,
      diaChi: item.diaChi,
      soDienThoai: item.soDienThoai,
      email: item.email,
      website: item.website,
      logo: item.logo,
      banner: item.banner,
      moTa: item.moTa,
      isActive: item.isActive
    }
  }

  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenNhaHang}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.nhaHangService.deleteNhaHang(item.id).subscribe(
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
    this.nhaHangService.getNhaHangById(item.id).subscribe((response: any) => {
      this.formData = response.data;
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

  toggleActive(item: any): void {
    const newStatus = !item.isActive;
    if (newStatus && this.nhaHangPaging.some(i => i.isActive)) {
      this.notification.create(
        'error',
        'Thông báo!',
        `Chỉ có thể có 1 nhà hàng được kích hoạt tại một thời điểm.`, {
        nzClass: 'notification-error',
        nzDuration: 2000
      });
    }
    else {
      item.isActive = newStatus;
      this.nhaHangService.updateNhaHang(item.id, item).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.search();
          } else { }
        },
        error: () => this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại`, {
          nzClass: 'notification-error',
          nzDuration: 2000
        })
      });
    }
  }

  isPopupGiaoDienOpen = false;
  selectedItem: any;
  openGiaoDienPopup(item: any): void {
    this.isPopupGiaoDienOpen = true;
    if (item.giaoDien) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
    this.isChiTietOpen = false;
    this.selectedItem = item;
    this.formData = {
      id: item.id,
      header: item.giaoDien.header,
      footer: item.giaoDien.footer,
      home: item.giaoDien.home,
      about: item.giaoDien.about
    }
  }

  onSaveGiaoDien(body: any): void {
    if (this.isEditMode) {
      this.nhaHangService.updateGiaoDien(this.selectedItem.id, body).subscribe({
        next: (res: any) => {
          this.isPopupGiaoDienOpen = false;
          this.selectedItem = null;
          this.search();
          this.notification.create(
            'success',
            'Thông báo!',
            `Cập nhật thành công`, {
            nzClass: 'notification-success',
            nzDuration: 2000
          });
        },
        error: () => this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại`, {
          nzClass: 'notification-error',
          nzDuration: 2000
        })
      });
    } else {
      this.nhaHangService.addGiaoDien(this.selectedItem.id, body).subscribe({
        next: (res: any) => {
          this.isPopupGiaoDienOpen = false;
          this.selectedItem = null;
          this.search();
          this.notification.create(
            'success',
            'Thông báo!',
            `Thêm mới thành công`, {
            nzClass: 'notification-success',
            nzDuration: 2000
          });
        },
        error: () => this.notification.create(
          'error',
          'Thông báo!',
          `Thêm mới thất bại`, {
          nzClass: 'notification-error',
          nzDuration: 2000
        })
      });
    }
  }
}
