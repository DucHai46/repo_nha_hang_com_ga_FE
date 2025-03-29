import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-xacnhangoimon',
  templateUrl: './xacnhangoimon.component.html',
  styleUrl: './xacnhangoimon.component.scss'
})
export class XacnhangoimonComponent  {
  selectedItemsMA: any[] = [];

  constructor(public router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['selectedItemsMA']) {
      this.selectedItemsMA = navigation.extras.state['selectedItemsMA'];
    }
  }

  // Tăng số lượng món ăn
  tangSoLuong(ma: string) {
    const item = this.selectedItemsMA.find((mon) => mon.ma === ma);
    if (item) {
      item.soLuong += 1;
    }
  }

  // Giảm số lượng món ăn (và xóa nếu số lượng <= 0)
  giamSoLuong(ma: string) {
    const item = this.selectedItemsMA.find((mon) => mon.ma === ma);
    if (item && item.soLuong > 0) {
      item.soLuong -= 1;
    }
    // Xóa món nếu số lượng về 0
    if (item?.soLuong === 0) {
      this.selectedItemsMA = this.selectedItemsMA.filter((mon) => mon.ma !== ma);
    }
  }

  // Xóa tất cả món ăn
  xoaTatCa() {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tất cả các món đã chọn?");
    if (confirmDelete) {
      this.selectedItemsMA = [];
    }
  }

  // Tính tổng tiền
  tinhTongTien(): number {
    return this.selectedItemsMA.reduce((tong, mon) => tong + mon.gia * mon.soLuong, 0);
  }
  troVeMenugoimon() {
    this.router.navigate(['/menugoimon'], {
      state: { updatedSelectedItems: this.selectedItemsMA },  // Truyền lại danh sách đã cập nhật
    });
  }

}
