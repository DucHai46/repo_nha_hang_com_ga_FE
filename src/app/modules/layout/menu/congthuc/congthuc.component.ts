import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { CongthucService } from './services/congthuc.service';
import { NguyenlieuService } from '../nguyenlieu/services/nguyenlieu.service';
import { NguyenLieu } from '../../../../models/NguyenLieu';
import { CongThucStore } from './store/cong-thuc.store';
import { FileService } from '../../../../core/services/file.service';

@Component({
  selector: 'app-congthuc',
  templateUrl: './congthuc.component.html',
  styleUrl: './congthuc.component.scss'
})
export class CongthucComponent implements OnInit {
  constructor(private store: CongThucStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private congThucService: CongthucService, 
    private fileService: FileService,
    private nguyenLieuService: NguyenlieuService) {}
  congThucPaging: any[] = []; 
  itemsSearch: any[] = [];
  nguyenLieu: NguyenLieu[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.congThucPaging);  

    this.search();
  }
  searchForm: any = {
    tenCongThuc: '',
  };
  search() {
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.congThucService.getCongThuc(this.searchForm).subscribe({
      next: (res: any) => {
        this.congThucPaging = res.data.data; 
        this.paging.page = res.data.paging.currentPage;
        this.paging.size = res.data.paging.pageSize;
        this.paging.total = res.data.paging.totalRecords;
        this.totalPages = Math.ceil(this.paging.total / this.paging.size);
      },
      error: (err: any) => {
        this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
      }
    });  
    console.log(this.congThucPaging);
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
    this.searchForm.tenCongThuc = '';
    this.search();
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

  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }
  closeChiTiet(): void {
    this.isChiTietOpen = false;
  }

  onSaveCongThuc(body: any): void {
    console.log(body);
  
    if (!body) return;
  
    if (this.isEditMode) {
      this.congThucService.updateCongThuc(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenCongThuc = '';
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
      this.congThucService.addCongThuc(body).subscribe({
        next: (res: any) => {
          
          if (res.data) {
            this.searchForm.tenCongThuc = '';
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
  
  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true; 
    this.congThucService.getCongThucById(item.id).subscribe((response: any) => {
    this.formData = response.data;  
    console.log(this.formData);
    });      

  }



  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenCongThuc}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.congThucService.deleteCongThuc(item.id).subscribe(
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
        error: () => {
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
      })
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



}
