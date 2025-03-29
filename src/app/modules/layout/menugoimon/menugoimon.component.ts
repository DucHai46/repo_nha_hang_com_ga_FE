import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menugoimon',
  templateUrl: './menugoimon.component.html',
  styleUrls: ['./menugoimon.component.scss'],
})
export class MenugoimonComponent implements OnInit {

  itemsDanhMuc = [
    { ma: 'DM-001', ten: 'Món mới' },
    { ma: 'DM-002', ten: 'Đồ uống' },
    { ma: 'DM-003', ten: 'Combo' },
    { ma: 'DM-004', ten: 'Nước hoa quả' },
    { ma: 'DM-005', ten: 'Khai vị' },
    { ma: 'DM-006', ten: 'Cơm Singapore' },
    { ma: 'DM-007', ten: 'Cơm Đảo' },
    { ma: 'DM-008', ten: 'Cơm Hải Nam' },
    { ma: 'DM-009', ten: 'Cơm Chảo' },
    { ma: 'DM-010', ten: 'Xôi Miến' },
    { ma: 'DM-011', ten: 'Món chính' },
    { ma: 'DM-012', ten: 'Rau' },
    { ma: 'DM-013', ten: 'Bia Rượu' },
    { ma: 'DM-014', ten: 'Gọi thêm' },
  ];

  // selectedItem: any = this.itemsDanhMuc[0]; // Mặc định chọn danh mục đầu tiên

  itemsMonAn = [
    // Đồ uống
    { ma: 'MON-001', ten: 'Trà đá', hinhAnh: 'https://product.hstatic.net/200000385717/product/trada_c8f7b50295c5422684059c5d62342e96_1024x1024.jpg', gia: 12000, soLuong: 0, danhMuc: 'DM-002' },
    { ma: 'MON-002', ten: 'Bình trà đá (Lớn)', hinhAnh: 'https://product.hstatic.net/200000385717/product/binhtralon_29662284998a4b4e837c13323ec3f837_1024x1024.jpg', gia: 35000, soLuong: 0, danhMuc: 'DM-002' },
    { ma: 'MON-003', ten: 'Coca', hinhAnh: 'https://product.hstatic.net/200000385717/product/coca_942b88be6a294dff81b890487982cca5_grande.jpg', gia: 15000, soLuong: 0, danhMuc: 'DM-002' },
    { ma: 'MON-004', ten: 'Nước cam ép', hinhAnh: 'https://via.placeholder.com/150', gia: 25000, soLuong: 0, danhMuc: 'DM-004' },
    { ma: 'MON-005', ten: 'Sinh tố bơ', hinhAnh: 'https://via.placeholder.com/150', gia: 35000, soLuong: 0, danhMuc: 'DM-004' },
    { ma: 'MON-006', ten: 'Bia Tiger', hinhAnh: 'https://via.placeholder.com/150', gia: 25000, soLuong: 0, danhMuc: 'DM-013' },
    
    // Món khai vị
    { ma: 'MON-007', ten: 'Khoai tây chiên (S)', hinhAnh: 'https://img.pikbest.com/png-images/qiantu/hand-drawn-cute-french-fries-cartoon-character-vector-illustration_2528693.png!sw800', gia: 35000, soLuong: 0, danhMuc: 'DM-005' },
    { ma: 'MON-008', ten: 'Khoai tây chiên (L)', hinhAnh: 'https://img.pikbest.com/png-images/qiantu/hand-drawn-cute-french-fries-cartoon-character-vector-illustration_2528693.png!sw800', gia: 59000, soLuong: 0, danhMuc: 'DM-005' },
    { ma: 'MON-009', ten: 'Nem rán', hinhAnh: 'https://via.placeholder.com/150', gia: 25000, soLuong: 0, danhMuc: 'DM-005' },
    { ma: 'MON-010', ten: 'Chả giò', hinhAnh: 'https://via.placeholder.com/150', gia: 30000, soLuong: 0, danhMuc: 'DM-005' },
    
    // Các món chính
    { ma: 'MON-011', ten: 'Cơm gà Hải Nam', hinhAnh: 'https://product.hstatic.net/200000385717/product/com_ga_hai_nam_4dd0c831e07c40da8d30612a2b321b86_grande.jpg', gia: 65000, soLuong: 0, danhMuc: 'DM-008' },
    { ma: 'MON-012', ten: 'Cơm gà Singapore', hinhAnh: 'https://via.placeholder.com/150', gia: 70000, soLuong: 0, danhMuc: 'DM-006' },
    { ma: 'MON-013', ten: 'Cơm chảo hải sản', hinhAnh: 'https://via.placeholder.com/150', gia: 85000, soLuong: 0, danhMuc: 'DM-009' },
    { ma: 'MON-014', ten: 'Xôi gà', hinhAnh: 'https://via.placeholder.com/150', gia: 45000, soLuong: 0, danhMuc: 'DM-010' },
    
    // Combo
    { ma: 'MON-015', ten: 'Combo 1 người', hinhAnh: 'https://product.hstatic.net/200000385717/product/combo_1_2b666b1fba224b17b53898c57ce44565_grande.jpg', gia: 90000, soLuong: 0, danhMuc: 'DM-003' },
    { ma: 'MON-016', ten: 'Combo 2 người', hinhAnh: 'https://product.hstatic.net/200000385717/product/combo_2_5bc5ebce1f9e40d0848c7bf10602a499_grande.jpg', gia: 160000, soLuong: 0, danhMuc: 'DM-003' },
    
    // Món mới
    { ma: 'MON-017', ten: 'Gà không lối thoát', hinhAnh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3NFRX7bet2NWdC0ZTO6TDzqzrz7SirkcyA&s', gia: 150000, soLuong: 0, danhMuc: 'DM-001' },
    { ma: 'MON-018', ten: 'Gà nướng', hinhAnh: 'https://daynauan.info.vn/wp-content/uploads/2020/12/ga-nuong-mat-ong.jpg', gia: 120000, soLuong: 0, danhMuc: 'DM-001' },
    
    // Rau
    { ma: 'MON-019', ten: 'Rau muống xào', hinhAnh: 'https://via.placeholder.com/150', gia: 30000, soLuong: 0, danhMuc: 'DM-012' },
    { ma: 'MON-020', ten: 'Rau cải luộc', hinhAnh: 'https://via.placeholder.com/150', gia: 25000, soLuong: 0, danhMuc: 'DM-012' },
    
    // Gọi thêm
    { ma: 'MON-021', ten: 'Cơm trắng', hinhAnh: 'https://via.placeholder.com/150', gia: 10000, soLuong: 0, danhMuc: 'DM-014' },
    { ma: 'MON-022', ten: 'Trứng ốp la', hinhAnh: 'https://via.placeholder.com/150', gia: 15000, soLuong: 0, danhMuc: 'DM-014' }
];
  selectedItemsMA: any[] = [];
  
  constructor(public router: Router) {}
  ngOnInit() {
    const updatedSelectedItems = history.state?.updatedSelectedItems;
    if (updatedSelectedItems) {
      this.capNhatSoLuongMonAn(updatedSelectedItems);
      this.selectedItemsMA = updatedSelectedItems.filter((item: { soLuong: number; }) => item.soLuong > 0);
    }
  }

  // Cập nhật số lượng món từ selectedItemsMA vào itemsMonAn chính
  capNhatSoLuongMonAn(updatedSelectedItems: any[]) {
    updatedSelectedItems.forEach((updatedItem) => {
      const item = this.itemsMonAn.find((mon) => mon.ma === updatedItem.ma);
      if (item) item.soLuong = updatedItem.soLuong;
    });
  }

  // Lọc món ăn theo mã danh mục
  getMonAnTheoDanhMuc(maDanhMuc: string) {
    return this.itemsMonAn.filter((mon) => mon.danhMuc === maDanhMuc);
  }
  updateSelectedItemsMA(item: any) {
    const index = this.selectedItemsMA.findIndex((mon) => mon.ma === item.ma);
    if (index >= 0) {
      this.selectedItemsMA[index].soLuong = item.soLuong;
    } else if (item.soLuong > 0) {
      this.selectedItemsMA.push(item);
    }
    this.selectedItemsMA = this.selectedItemsMA.filter((mon) => mon.soLuong > 0);
  }

  // Hàm hiển thị nút tăng/giảm khi người dùng nhấn "+

  // Hàm tăng số lượng món ăn
  tangSoLuong(ma: string) {
    const item = this.itemsMonAn.find((mon: any) => mon.ma === ma);
    if (item) {
      item.soLuong += 1;  // Tăng số lượng
      this.updateSelectedItemsMA(item);  // Cập nhật danh sách món đã chọn
      console.log('Tăng số lượng:', item.soLuong);
    }
  }
  
  giamSoLuong(ma: string) {
    const item = this.itemsMonAn.find((mon: any) => mon.ma === ma);
    if (item) {
      if (item.soLuong > 1) {
        item.soLuong -= 1;
      } else {
        item.soLuong = 0;
      }
      this.updateSelectedItemsMA(item);  // Cập nhật danh sách món đã chọn
      console.log('Giảm số lượng:', item.soLuong);
    }
  }
  // Tính tổng tiền của các món đã được thêm
  tinhTongTien() {
    return this.itemsMonAn
      .filter((mon) => mon.soLuong > 0) // Chỉ tính các món có số lượng > 0
      .reduce((tong, mon) => tong + mon.gia * mon.soLuong, 0); // Tính tổng tiền
  }

  
  // Hàm kiểm tra xem có món nào đang được chọn hay không
  coMonAnDuocChon() {
    return this.itemsMonAn.some((mon) => mon.soLuong > 0);
  }
  // constructor(public router: Router) {}
  
  chuyenSangXacNhan() {
    this.router.navigate(['/xacnhangoimon'], {
      state: { selectedItemsMA: this.selectedItemsMA }, // Truyền selectedItemsMA
    });
  }
  

  // Hàm cuộn đến danh mục tương ứng khi click vào button danh mục

  isSticky = false;
  selectedItem: any;
  
  @HostListener('window:scroll', [])
  handleScroll() {
    const stickyWrapper = document.querySelector('.sticky-wrapper');
    const stickyDanhMuc = document.querySelector('.sticky-danh-muc');
  
    const stickyWrapperHeight = stickyWrapper?.clientHeight || 0;
    const danhMucHeight = stickyDanhMuc?.clientHeight || 0;
  
    this.isSticky = window.pageYOffset >= stickyWrapperHeight;
  
    // Giữ lại selectedItem nếu không thay đổi vị trí
    let currentCategory = this.selectedItem;
  
    this.itemsDanhMuc.forEach((category) => {
      const el = document.getElementById(category.ma);
      if (el) {
        const { top } = el.getBoundingClientRect();
        if (top >= danhMucHeight && top <= window.innerHeight / 2) {
          currentCategory = category;
        }
      }
    });
  
    // Nếu danh mục mới được highlight khác danh mục hiện tại, cuộn ngang để hiện button
    if (this.selectedItem !== currentCategory) {
      this.selectedItem = currentCategory;
  
      // Tìm nút button tương ứng với danh mục hiện tại
      const selectedButton = document.getElementById(`btn-${currentCategory.ma}`);
      selectedButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
  
  selectCategory(category: any, event: any) {
    this.selectedItem = category;
  
    // Tự cuộn thanh ngang để hiển thị danh mục được chọn
    const selectedButton = document.getElementById(`btn-${category.ma}`);
    selectedButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  
    const el = document.getElementById(category.ma);
    const stickyWrapperHeight = document.querySelector('.sticky-wrapper')?.clientHeight || 0;
    const danhMucHeight = document.querySelector('.sticky-danh-muc')?.clientHeight || 0;
  
    if (el) {
      const yOffset = el.getBoundingClientRect().top + window.pageYOffset - stickyWrapperHeight - danhMucHeight;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }

  
  
}
