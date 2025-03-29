import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoaiNguyenLieuStore } from '../loainguyenlieu/store/loai-nguyen-lieu.store';
import { AddoreditLoaiNLComponent } from './addoreditLoaiNL/addoreditLoaiNL.component';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-loainguyenlieu',
  templateUrl: './loainguyenlieu.component.html',
  styleUrl: './loainguyenlieu.component.scss'
})
export class LoainguyenlieuComponent implements OnInit {
  constructor(private store: LoaiNguyenLieuStore, private dialog: MatDialog, private notification: NzNotificationService) {}
  items = [
    { ten: 'Gà ta', moTa: 'Gà thả vườn, thịt chắc và thơm ngon', danhMuc: 'Thịt' },
    { ten: 'Gà công nghiệp', moTa: 'Gà nuôi công nghiệp, thịt mềm hơn', danhMuc: 'Thịt' },
    { ten: 'Dưa leo', moTa: 'Dưa chuột tươi, giòn, dùng kèm món ăn', danhMuc: 'Rau củ' },
    { ten: 'Cà chua', moTa: 'Cà chua tươi, dùng trang trí và ăn kèm', danhMuc: 'Rau củ' },
    { ten: 'Nước tương đen', moTa: 'Nước tương đặc trưng của Singapore', danhMuc: 'Gia vị và nước chấm' },
    { ten: 'Tương ớt', moTa: 'Tương ớt cay, dùng làm nước chấm', danhMuc: 'Gia vị và nước chấm' }
  ];
  itemsSearch: any[] = [];
  ngOnInit(): void {
    this.itemsSearch = this.items;
    this.store.setItems$(this.items);  
  }
  searchForm: any = {
    ten: ''
  };
  search(){
    this.itemsSearch = this.items.filter(item => item.ten.includes(this.searchForm.ten));
  }
  reset(){
    this.itemsSearch = this.items;
    this.searchForm.ten = '';
  }
  openAddPopup(): void {
      const dialogRef = this.dialog.open(AddoreditLoaiNLComponent, {
        width: '400px',
        data: {}, // Không truyền dữ liệu vì là Thêm
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Thêm mới:', result);
          this.items.push(result); // Thêm vào danh sách
          this.itemsSearch = this.items;
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
          console.log('Sửa:', result);
          const index = this.items.findIndex((m) => m.ten === item.ten);
          if (index !== -1) {
            this.items[index] = result; // Cập nhật nguyên liệu trong danh sách
            this.itemsSearch = this.items;
            // this.notification.create(
            //   'success',
            //   'Thành công!',
            //   `Lưu dữ liệu thành công`, {
            //   nzClass: 'vnpt-qhkh-notification-success',
            // });
          }
          else{
            // this.notification.create(
            //   'error',
            //   'Thành công!',
            //   `Lưu dữ liệu thất bại`, {
            //   nzClass: 'vnpt-qhkh-notification-error',
            // });
          }
        }
      });
    }
  
      // Hàm mở popup xác nhận xóa
    openDeletePopup(item: any): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: { message: `Bạn có chắc chắn muốn xóa "${item.ten}" không?` },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Xóa:', item);
          this.items = this.items.filter((m) => m.ten !== item.ten); // Xóa khỏi danh sách
          this.itemsSearch = this.items;
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
