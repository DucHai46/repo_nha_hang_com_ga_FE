import { Component, OnInit } from '@angular/core';
import { LoaiBanAnStore } from './store/loai-ban-an.store';
import { AddoreditLoaiBanComponent } from './addoredit/addoreditLoaiBan.component';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { LoaiBanAnService } from './services/loaibanan.service';
import { LoaiBanAn } from '../../../../models/LoaiBanAn';

@Component({
  selector: 'app-loaibanan',
  templateUrl: './loaibanan.component.html',
  styleUrl: './loaibanan.component.scss'
})
export class LoaibananComponent implements OnInit {
  constructor(private store: LoaiBanAnStore, private dialog: MatDialog, private notification: NzNotificationService, private loaibananService: LoaiBanAnService) {}
  loaiBanAnPaging: LoaiBanAn[] = [];
  itemsSearch: any[] = [];

  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.loaiBanAnPaging);
  }

  searchForm: any = {
    // ma: '',
    tenLoai: ''
  };

  search() {
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = 1;
    this.searchForm.PageSize = 20;
    this.loaibananService.getLoaiBanAn(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.loaiBanAnPaging = res.data.data;
        },
        error: (err: any) => {
          alert('Lấy dữ liệu thất bại');
        }
      }
    )
  }

  reset() {
    this.searchForm.tenLoai = '';
    this.search()
  }

  // Hàm mở popup Thêm
  openAddPopup(): void {
    const dialogRef = this.dialog.open(AddoreditLoaiBanComponent, {
      width: '400px',
      data: {}, // Không truyền dữ liệu vì là Thêm
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('Thêm mới:', result);
        this.loaibananService.addLoaiBanAn(result).subscribe(
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

  // Hàm mở popup Sửa
  openEditPopup(item: any): void {
    const dialogRef = this.dialog.open(AddoreditLoaiBanComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaibananService.updateLoaiBanAn(item.id, result).subscribe(
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

    // Hàm mở popup xác nhận xóa
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenLoai}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaibananService.deleteLoaiBanAn(item.id).subscribe(
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
