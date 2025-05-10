import { Component, OnInit } from '@angular/core';
import { DonViTinhStore } from './store/don-vi-tinh.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { DonViTinhService } from './services/donvitinh.service';
import { DonViTinh } from '../../../../models/DonViTinh';


@Component({
  selector: 'app-donvitinh',
  templateUrl: './donvitinh.component.html',
  styleUrl: './donvitinh.component.scss'
})
export class DonvitinhComponent implements OnInit {
  constructor(private store: DonViTinhStore, 
    private dialog: MatDialog, private notification: NzNotificationService, 
    private donvitinhService: DonViTinhService) {}
  donViTinhPaging: DonViTinh[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.donViTinhPaging);
  }
  searchForm: any = {
    // ma: '',
    tenDonViTinh: ''
  };
  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.donvitinhService.getDonViTinh(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.donViTinhPaging = res.data.data;
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
    this.searchForm.tenDonViTinh = '';
    this.search()
  }
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}
  // Hàm mở popup Thêm
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
      this.donvitinhService.updateDonViTinh(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenDonViTinh = '';
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
      this.donvitinhService.addDonViTinh(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenDonViTinh = '';
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



  // Hàm mở popup Sửa
  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = item;
  }

  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenLoai}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donvitinhService.deleteDonViTinh(item.id).subscribe(
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
        //   nzClass: 'notification-success',
        // });
      } else {
        // this.notification.create(
        //   'error',
        //   'Thành công!',
        //   `Xóa dữ liệu thất bại`, {
        //   nzClass: 'notification-error',
        // });
      }
    });
  }


}
