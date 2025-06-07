import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { dondatbanService } from './services/dondatban.service';
import { BanAnService } from '../banan/services/banan.service'; 
import { KhachHangService } from '../khachhang/services/khachhang.service';
import { DonDatBanStore } from './store/don-dat-ban.store';



@Component({
  selector: 'app-dondatban',
  templateUrl: './dondatban.component.html',
  styleUrl: './dondatban.component.scss'
})
export class DondatbanComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public notification: NzNotificationService,
    public store: DonDatBanStore,
    public donDatBanService: dondatbanService,
    public banAnService: BanAnService,
    public khachHangService: KhachHangService,
  ) { }
  donDatBanPaging: any[] = []; 
  itemsSearch: any[] = [];
  banAn: any[] = [];
  khachHang: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };
  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.donDatBanPaging);  
    this.khachHangService.getKhachHang({}).subscribe({
      next: (res: any) => {
        this.khachHang = res.data.data;
      }
    });
    this.banAnService.getBanAn({}).subscribe({
      next: (res: any) => {
        this.banAn = res.data.data;
      }
    })
    this.search();
  }
  searchForm: any={
    ban: '',
    khachHang: '',
    tuNgay: '',
    denNgay: '',
    tuGio: '',
    denGio: '',
  }
  search() {
    this.searchForm.isPaging = true;  
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.donDatBanService.getDonDatBan(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.donDatBanPaging = res.data.data;
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
    this.paging.page = 1; 
    this.search();
  }
  reset(){
    this.searchForm.ban = '';
    this.searchForm.khachHang='';
    this.searchForm.tuNgay = '';
    this.searchForm.denNgay = '';
    this.searchForm.tuGio = '';
    this.searchForm.denGio = '';
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

    if (!body) return;
  
    if (this.isEditMode) {
      this.donDatBanService.updateDonDatBan(body.id, body).subscribe({
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
      this.donDatBanService.addDonDatBan(body).subscribe({
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
    this.isEditMode = true;
    this.formData = { ...item };
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa đơn đặt "${item.ban.name}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.donDatBanService.deleteDonDatBan(item.id).subscribe(
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
          error: () => this.notification.create(
            'error',
            'Thông báo!',
            `Xóa dữ liệu thất bại`,
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
          `Xóa dữ liệu thất bại`,
          {
            nzClass: 'notification-error',  
            nzDuration: 2000
          }
        );
      }
    });
  }


}
