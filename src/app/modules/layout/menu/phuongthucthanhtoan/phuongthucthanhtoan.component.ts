import { Component } from '@angular/core';
import { PhuongThucThanhToanService } from './services/phuongthucthanhtoan.service';
import { PhuongThucThanhToanStore } from './store/phuong-thuc-thanh-toan.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { FileService } from '../../../../core/services/file.service';

@Component({
  selector: 'app-phuongthucthanhtoan',
  templateUrl: './phuongthucthanhtoan.component.html',
  styleUrl: './phuongthucthanhtoan.component.scss'
})
export class PhuongThucThanhToanComponent {
   constructor(
    private store: PhuongThucThanhToanStore, 
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private phuongThucThanhToanService: PhuongThucThanhToanService,
    private fileService: FileService,
  ) {}
  phuongThucThanhToanPaging: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0,
  };
  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.phuongThucThanhToanPaging);
    
  }

  searchForm: any = {
    tenPhuongThuc: ''
  };
  search() {
   this.searchForm.isPaging = true; 
   this.searchForm.pageNumber = this.paging.page;
   this.searchForm.pageSize = this.paging.size;
   this.phuongThucThanhToanService.getPhuongThucThanhToan(this.searchForm).subscribe(
    {
     next: (res: any) => {
      this.phuongThucThanhToanPaging = res.data.data;
      this.loadAllImages();
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

  changePage(newPage: number){
    if(newPage < 1 || newPage > this.totalPages) return;
    this.paging.page = newPage;
    this.search();
  }

  changePageSize(newSize: number){
    this.paging.size = newSize;
    this.paging.page = 1; 
    this.search();
  }

  reset(){
   this.searchForm.tenPhuongThuc = '';
   this.search(); 
  }

  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}

  openAddPopup(){
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }

  onSaveCongThuc(body: any): void {
    if(!body) return;

    if(this.isEditMode){
      this.phuongThucThanhToanService.updatePhuongThucThanhToan(body.id, body).subscribe(
        {
          next: (res: any) => {
            if(res.data) {
              this.searchForm.tenPhuongThuc = '';
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
              )
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
        }
      );
    } else {
      this.phuongThucThanhToanService.addPhuongThucThanhToan(body).subscribe(
        {
          next: (res: any) => {
            if(res.data) {
              this.searchForm.tenPhuongThuc = '';
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
    this.formData = {
      tenPhuongThuc: item.tenPhuongThuc,
      qrCode: item.qrCode,
      id: item.id,
      moTa: item.moTa,
    };
  }

  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '400px',
     data: { message: `Bạn có chắc chắn muốn xóa "${item.tenPhuongThuc}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
       this.phuongThucThanhToanService.deletePhuongThucThanhToan(item.id).subscribe(
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
        )
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
  imageUrls: { [key: string]: string } = {};
  loadAllImages(): void {
    for (let item of this.phuongThucThanhToanPaging) {
      const parsed = this.parseJSON(item.qrCode);
      if (parsed?.id && item.id) {
        this.fileService.downloadFile(parsed.id).subscribe(
          (blob: Blob) => {
            const url = URL.createObjectURL(blob);
            this.imageUrls[item.id] = url;
          },
          (error) => console.error('Lỗi tải ảnh cho', item.tenPhuongThuc, error)
        );
      }
    }
  }
}
