import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PhieuNhapStore } from './store/phieu-nhap.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { PhieuNhapService } from './services/phieunhap.service';

@Component({
  selector: 'app-phieunhap',
  templateUrl: './phieunhap.component.html',
  styleUrl: './phieunhap.component.scss'
})
export class PhieunhapComponent implements OnInit {
  constructor(private store: PhieuNhapStore,
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private phieuNhapService: PhieuNhapService) {}
  
  phieuNhapPaging: any[] = [];
  itemsSearch: any[] = [];  
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  }
  totalPages = 0
  
  ngOnInit(): void {
    this.store.setItems$(this.phieuNhapPaging);
    this.search();  
  }
  searchForm: any={
    tenPhieu:'',
  }
  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.phieuNhapService.getPhieuNhap(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.phieuNhapPaging = res.data.data;
          this.paging.page = res.data.paging.currentPage;
          this.paging.size = res.data.paging.pageSize;
          this.paging.total = res.data.paging.totalRecords;
          this.totalPages = Math.ceil(this.paging.total / this.paging.size);
        },
        error: (err: any) => {
          this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
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
    this.searchForm.tenPhieu='';
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
  closeChiTiet(): void {
    this.isChiTietOpen = false;
  }
  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }
  onSaveCongThuc(body: any): void {
    console.log(body);
    if (!body) return;
      // Thêm mới bàn
    this.phieuNhapService.addPhieuNhap(body).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.searchForm.tenPhieu = '';
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
        }else {
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
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenPhieu}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.phieuNhapService.deletePhieuNhap(item.id).subscribe(
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
        );
      }
    });
  }


}
