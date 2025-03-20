import { Component, OnInit } from '@angular/core';
import { DanhMucNguyenLieuStore } from './store/danh-muc-nguyen-lieu.store';
import { AddoreditComponent } from './addoredit/addoredit.component';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-danhmucnguyenlieu',
  templateUrl: './danhmucnguyenlieu.component.html',
  styleUrl: './danhmucnguyenlieu.component.scss'
})
export class DanhmucnguyenlieuComponent implements OnInit {
  constructor(private store: DanhMucNguyenLieuStore, private dialog: MatDialog, private notification: NzNotificationService) {}

  items = [
    { ma: 'DM-001', ten: 'Thực phẩm tươi sống', moTa: 'Bao gồm thịt, cá, rau củ quả' },
    { ma: 'DM-002', ten: 'Gia vị', moTa: 'Muối, đường, tiêu,...' },
    { ma: 'DM-003', ten: 'Đồ uống', moTa: 'Nước ngọt, trà, cà phê, nước ép' }
  ];

  itemsSearch: any[] = [];
  ngOnInit(): void {
    this.itemsSearch = this.items;
    this.store.setItems$(this.items);
  }

  searchForm: any = {
    ma: '',
    ten: ''
  };

  search() {
    this.itemsSearch = this.items.filter(item => item.ma.includes(this.searchForm.ma) && item.ten.includes(this.searchForm.ten));
  }

  reset() {
    this.itemsSearch = this.items;
    this.searchForm.ma = '';
    this.searchForm.ten = '';
  }

  // Hàm mở popup Thêm
  openAddPopup(): void {
    const dialogRef = this.dialog.open(AddoreditComponent, {
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
    const dialogRef = this.dialog.open(AddoreditComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Sửa:', result);
        const index = this.items.findIndex((m) => m.ma === item.ma);
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
        this.items = this.items.filter((m) => m.ma !== item.ma); // Xóa khỏi danh sách
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
