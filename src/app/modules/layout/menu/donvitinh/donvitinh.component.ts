import { Component, OnInit } from '@angular/core';
import { DonViTinhStore } from './store/don-vi-tinh.store';
import { AddoreditDonViTinhComponent } from './addoredit/addoreditDonViTinh.component';
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
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.donViTinhPaging);
  }
  searchForm: any = {
    // ma: '',
    tenDonViTinh: ''
  };
  search() {
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = 1;
    this.searchForm.PageSize = 20;
    this.donvitinhService.getDonViTinh(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.donViTinhPaging = res.data.data;
        },
        error: (err: any) => {
          alert('Lấy dữ liệu thất bại');
        }
      }
    )
  }
  reset() {
    this.searchForm.tenDonViTinh = '';
    this.search()
  }
  // Hàm mở popup Thêm
  openAddPopup(): void {
    const dialogRef = this.dialog.open(AddoreditDonViTinhComponent, {
      width: '400px',
      data: {}, // Không truyền dữ liệu vì là Thêm
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('Thêm mới:', result);
        this.donvitinhService.addDonViTinh(result).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                // alert('Thêm mới thành công');
                this.searchForm.tenLoai = '';
                this.search();
              }
              else{
                alert('Thêm mới thất bại');
              }
            },
            error: (err: any) => {
              alert('Thêm mới thất bại');
            }
          }
        )
        // this.notification.success(
        //   'Thành công', // Tiêu đề
        //   'Thêm dữ liệu thành công', // Nội dung
        //   {
        //     nzDuration: 3000, // Thời gian hiển thị (ms)
        //     nzPlacement: 'topRight', // Đặt vị trí là góc trên phải
        //   }
        // );
      }
      else{
        // this.notification.error(
        //   'Thành công', // Tiêu đề
        //   'Thêm dữ liệu thất bại', // Nội dung
        //   {
        //     nzDuration: 3000, // Thời gian hiển thị (ms)
        //     nzPlacement: 'topRight', // Đặt vị trí là góc trên phải
        //   }
        // );
      }
    });
  }
  openEditPopup(item: any): void {
    const dialogRef = this.dialog.open(AddoreditDonViTinhComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donvitinhService.updateDonViTinh(item.id, result).subscribe(
          {
            next: (res: any) => {
              if(res.data){
                this.search();
              }
              else{
                alert('Sửa thất bại');
              }
            },
            error: (err: any) => {
              alert('Sửa thất bại');
            }
          }
        )
      }
    });
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
