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
      this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
      this.searchForm.PageNumber = this.paging.page;
      this.searchForm.PageSize = this.paging.size;
      this.comboService.getCombo(this.searchForm).subscribe({
        next: (res: any) => {
          this.comboPaging = res.data.data; // Lưu toàn bộ dữ liệu
          console.log(this.comboPaging);
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
      this.paging.page = 1; // Reset về trang đầu khi thay đổi kích thước trang
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
        // Sửa bàn
        this.comboService.updateCombo(body.id, body).subscribe({
          next: (res: any) => {
            // console.log(res);
            if (res.data) {
              this.searchForm.tenCombo = '';
              this.searchForm.giaTien = '';
              this.search();
              this.closePopup();
            } else {
              alert('Cập nhật thất bại');
            }
          },
          error: () => alert('Cập nhật thất bại')
        });
      } else {
        // Thêm mới bàn
        this.comboService.addCombo(body).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.data) {
              this.searchForm.tenCombo = '';
              this.searchForm.giaTien = '';
              this.search();
              this.closePopup();
            } else {
              alert('Thêm mới thất bại');
            }
          },
          error: () => alert('Thêm mới thất bại')
        });
      }
    }
    openEditPopup(item: any): void {
      this.isPopupOpen = true;
      this.isEditMode = true;
      this.formData = item;
      console.log(item);
      // console.log(this.formData);
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
            }
          }
        )
          // this.notification.create(
          //   'success',
          //   'Thành công!',
          //   `Xóa dữ liệu thành công`, {
          //   nzClass: 'vnpt-qhkh-notification-success',
          // });
        } else {
          // this.notification.create(
          //   'error',
          //   'Thành công!',
          //   `Xóa dữ liệu thất bại`, {
          //   nzClass: 'vnpt-qhkh-notification-error',
          // });
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
          // Create object URL from blob
          const url = window.URL.createObjectURL(response);
          
          // Open preview in new tab
          window.open(url, '_blank');
          
          // Cleanup object URL after preview opens
          window.URL.revokeObjectURL(url);
        }
      );
    }
    



}

