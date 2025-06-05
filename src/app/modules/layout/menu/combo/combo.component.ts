import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { ComboService } from './services/combo.service'; 
import { MonAnService } from '../monan/services/monan.service'; 
import { MonAn } from '../../../../models/MonAn';
import { ComboStore } from './store/combo.store';
import { FileService } from '../../../../core/services/file.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrl: './combo.component.scss'
})
export class ComboComponent implements OnInit {
  constructor(private store: ComboStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private comboService: ComboService, 
    private fileService: FileService,
    private monanService: MonAnService) {}

    comboPaging: any[] = []; 
    itemsSearch: any[] = [];
    monAn: MonAn[] = [];
    paging: any = {
      page: 1,
      size: 10,
      total: 0
    };
    totalPages = 0;

    ngOnInit(): void {
      this.store.setItems$(this.comboPaging);
      this.search();
    }
    searchForm: any = {
      tenCombo: '',
      giaTien: '',
    };
    search() {
      this.searchForm.isPaging = true; 
      this.searchForm.PageNumber = this.paging.page;
      this.searchForm.PageSize = this.paging.size;
      this.comboService.getCombo(this.searchForm).subscribe({
        next: (res: any) => {
          this.comboPaging = res.data.data;
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
      this.searchForm.tenCombo = '';
      this.searchForm.giaTien = '';
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
    openChiTietPopup(item: any): void {
      this.isChiTietOpen = true; 
      this.formData = item;     
      console.log(this.formData);
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
        this.comboService.updateCombo(body.id, body).subscribe({
          next: (res: any) => {
            if (res.data) {
              this.searchForm.tenCombo = '';
              this.searchForm.giaTien = '';
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
        this.comboService.addCombo(body).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.data) {
              this.searchForm.tenCombo = '';
              this.searchForm.giaTien = '';
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
        data: { message: `Bạn có chắc chắn muốn xóa "${item.tenCombo}" không?` },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        this.comboService.deleteCombo(item.id).subscribe(
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
          }
        )
        } else {
          this.notification.create(
            'error',
            'Thông báo!',
            `Xóa dữ liệu thất bại`, {
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

