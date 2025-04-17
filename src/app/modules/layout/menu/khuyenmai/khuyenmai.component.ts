import { Component, OnInit } from '@angular/core';
import { KhuyenMaiStore } from './store/khuyen-mai.store';
import { AddoreditKhuyenMaiComponent } from './addoredit/addoreditKhuyenMai.component';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { khuyenmaiService } from './services/khuyenmai.service';
import { KhuyenMai } from '../../../../models/KhuyenMai';



@Component({
  selector: 'app-khuyenmai',
  templateUrl: './khuyenmai.component.html',
  styleUrl: './khuyenmai.component.scss'
})
export class KhuyenmaiComponent implements OnInit {
  constructor(private store: KhuyenMaiStore, 
    private dialog: MatDialog, private notification: NzNotificationService, 
    private khuyenmaiService: khuyenmaiService) {}
  khuyenMaiPaging: KhuyenMai[] = [];
  itemsSearch: any[] = [];

  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.khuyenMaiPaging);
  }
  searchForm: any = {
    // ma: '',
    tenKhuyenMai: ''
  };
  search() {
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = 1;
    this.searchForm.PageSize = 20;
    this.khuyenmaiService.getKhuyenMai(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.khuyenMaiPaging = res.data.data;
        },
        error: (err: any) => {
          alert('Lấy dữ liệu thất bại');
        }
      }
    )
  }
  reset() {
    this.searchForm.tenKhuyenMai = '';
    this.search()
  }
 openAddPopup(): void {
    const dialogRef = this.dialog.open(AddoreditKhuyenMaiComponent, {
      width: '400px',
      data: {}, // Không truyền dữ liệu vì là Thêm
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('Thêm mới:', result);
        this.khuyenmaiService.addKhuyenMai(result).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                // alert('Thêm mới thành công');
                this.searchForm.tenKhuyenMai = '';
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
    const dialogRef = this.dialog.open(AddoreditKhuyenMaiComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.khuyenmaiService.updateKhuyenMai(item.id, result).subscribe(
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
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenKhuyenMai}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.khuyenmaiService.deleteKhuyenMai(item.id).subscribe(
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
