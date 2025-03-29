import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DanhMucMonAnStore } from '../danhmucmonan/store/danh-muc-mon-an.store';
import { AddoreditMAComponent } from './addoreditMA/addoreditMA.component';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { DanhmucmonanService } from './services/danhmucmonan.service';
import { DanhMucMonAn } from '../../../../models/DanhMucMonAn';
@Component({
  selector: 'app-danhmucmonan',
  templateUrl: './danhmucmonan.component.html',
  styleUrl: './danhmucmonan.component.scss'
})
export class DanhmucmonanComponent implements OnInit {
  constructor(private store: DanhMucMonAnStore, private dialog: MatDialog, private notification: NzNotificationService, private danhmucmonanService: DanhmucmonanService) {}
  danhMucMonAnPaging: DanhMucMonAn[] = [];
  itemsSearch: any[] = [];

  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.danhMucMonAnPaging);  
  }

  searchForm: any = {
    tenDanhMuc: '',
  }; 

  search(){
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = 1;
    this.searchForm.PageSize = 20;
    this.danhmucmonanService.getDanhMucMonAn(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.danhMucMonAnPaging = res.data.data;
        },
        error: (err: any) => {
          alert('Lấy dữ liệu thất bại');
        }
      }
    )
  }

  reset(){
    this.searchForm.tenDanhMuc = '';
    this.search()
  }

  openAddPopup(): void {
    const dialogRef = this.dialog.open(AddoreditMAComponent, {
      width: '400px',
      data: {}, // Không truyền dữ liệu vì là Thêm
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.danhmucmonanService.addDanhMucMonAn(result).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                // alert('Thêm mới thành công');
                this.searchForm.tenDanhMuc = '';
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
        //   'Them moi thanh cong', // Nội dung
        //   {
        //     nzDuration: 3000, // Thời gian hiển thị (ms)
        //     nzPlacement: 'topRight', // Đặt vị trí là góc trên phải
        //   }
        // );
      }
      else{
        alert('Thêm mới thất bại');
        // this.notification.error(
        //   'Thành công', // Tiêu đề
        //   'Them moi that bai', // Nội dung
        //   {
        //     nzDuration: 3000, // Thời gian hiển thị (ms)
        //     nzPlacement: 'topRight', // Đặt vị trí là góc trên phải
        //   }
        // );
      }
    })
  }

  openEditPopup(item: any): void {
    const dialogRef = this.dialog.open(AddoreditMAComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Sửa:', result);
        this.danhmucmonanService.updateDanhMucMonAn(item.id, result).subscribe(
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
        data: { message: `Bạn có chắc chắn muốn xóa "${item.tenDanhMuc}" không?` },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.danhmucmonanService.deleteDanhMucMonAn(item.id).subscribe(
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
