import { Component, OnInit } from '@angular/core';
import { GiamGiaStore } from './store/giam-gia.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { giamgiaService } from './services/giamgia.service';
import { GiamGia } from '../../../../models/GiamGia';


@Component({
  selector: 'app-giamgia',
  templateUrl: './giamgia.component.html',
  styleUrl: './giamgia.component.scss'
})
export class GiamgiaComponent implements OnInit {
  constructor(private store: GiamGiaStore, 
    private dialog: MatDialog, private notification: NzNotificationService, 
    private giamgiaService: giamgiaService) {}
  giamGiaPaging: GiamGia[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.giamGiaPaging);
  }
  searchForm: any = {
    // ma: '',
    tenGiamGia: ''
  };
  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.giamgiaService.getGiamGia(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.giamGiaPaging = res.data.data;
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
  reset() {
    this.searchForm.tenGiamGia = '';
    this.search()
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
      this.giamgiaService.updateGiamGia(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenGiamGia = '';
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
      this.giamgiaService.addGiamGia(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenGiamGia = '';
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
    this.formData = {
      ...item,
      ngayBatDau: this.formatDate(item.ngayBatDau),
      ngayKetThuc: this.formatDate(item.ngayKetThuc)
    }
  }
  formatDate(dateInput: string){
    const date= new Date(dateInput);
    return date.toISOString().split('T')[0];
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenGiamGia}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.giamgiaService.deleteGiamGia(item.id).subscribe(
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


}
