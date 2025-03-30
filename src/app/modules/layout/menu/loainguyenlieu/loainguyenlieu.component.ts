import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoaiNguyenLieuStore } from '../loainguyenlieu/store/loai-nguyen-lieu.store';
import { AddoreditLoaiNLComponent } from './addoreditLoaiNL/addoreditLoaiNL.component';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { LoainguyenlieuService } from './services/loainguyenlieu.service';
import { DanhmucnguyenlieuService } from '../danhmucnguyenlieu/services/danhmucnguyenlieu.service';
import { DanhMucNguyenLieu } from '../../../../models/DanhMucNguyenLieu';
@Component({
  selector: 'app-loainguyenlieu',
  templateUrl: './loainguyenlieu.component.html',
  styleUrl: './loainguyenlieu.component.scss'
})
export class LoainguyenlieuComponent implements OnInit {
  constructor(private store: LoaiNguyenLieuStore, private dialog: MatDialog, private notification: NzNotificationService, private loainguyenlieuService: LoainguyenlieuService, private danhMucNguyenLieuService: DanhmucnguyenlieuService) {}
  loaiNguyenLieuPaging: any[] = []; 
  itemsSearch: any[] = [];
  danhMucNguyenLieu: DanhMucNguyenLieu[] = [];
  ngOnInit(): void {
    this.store.setItems$(this.loaiNguyenLieuPaging);  
    this.danhMucNguyenLieuService.getDanhMucNguyenLieu({}).subscribe(
      {
        next: (res: any) => {
          this.danhMucNguyenLieu = res.data.data;
        }
      }
    )
    this.search();
  }

  searchForm: any = {
    tenLoai: '',
    danhMucNguyenLieuId: ''
  };
  search(){
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = 1;
    this.searchForm.PageSize = 20;
    this.loainguyenlieuService.getLoaiNguyenLieu(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.loaiNguyenLieuPaging = res.data.data;
        },
        error: (err: any) => {
          alert('Lấy dữ liệu thất bại');
        }
      }
    )  
  }
  reset(){
    this.searchForm.tenLoai = '';
    this.searchForm.danhMucNguyenLieuId = '';
    this.search();
  }

  openAddPopup(): void {
      const dialogRef = this.dialog.open(AddoreditLoaiNLComponent, {
        width: '400px',
        data: {}, // Không truyền dữ liệu vì là Thêm
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loainguyenlieuService.addLoaiNguyenLieu(result).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                // alert('Thêm mới thành công');
                this.searchForm.tenLoai = '';
                this.searchForm.danhMucNguyenLieuId = '';
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
      const dialogRef = this.dialog.open(AddoreditLoaiNLComponent, {
        width: '400px',
        data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        this.loainguyenlieuService.updateLoaiNguyenLieu(item.id, result).subscribe(
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
        this.loainguyenlieuService.deleteLoaiNguyenLieu(item.id).subscribe(
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
