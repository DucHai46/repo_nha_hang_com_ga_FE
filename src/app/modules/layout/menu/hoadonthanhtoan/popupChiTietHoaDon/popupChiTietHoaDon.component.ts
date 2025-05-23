import { MonAnService } from './../../monan/services/monan.service';
import { PhuongThucThanhToanService } from './../../phuongthucthanhtoan/services/phuongthucthanhtoan.service';
import { NhanVienService } from './../../nhanvien/services/nhanvien.service';
import { khuyenmaiService } from './../../khuyenmai/services/khuyenmai.service';
import { PhuPhiService } from './../../phuphi/services/phuphi.service';
import { NhaHangService } from './../../nhahang/services/nhahang.service';
import { DonOrderService } from './../../../menugoimon/services/donorder.service';
import { ComboService } from '../../combo/services/combo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HoaDonThanhToanService } from '../services/hoadonthanhtoan.service';

@Component({
  selector: 'app-popupChiTietHoaDon',
  templateUrl: './popupChiTietHoaDon.component.html',
  styleUrl: './popupChiTietHoaDon.component.scss'
})
export class PopupChiTietHoaDonComponent implements OnInit {
  @Input() formData: any;     // Nhận dữ liệu hóa đơn từ bên ngoài
  @Input() form: any;
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng
  @Output() save = new EventEmitter<void>(); // Khi bấm nút lưu
  @Output() change = new EventEmitter<boolean>(); // Khi bấm nút đóng

  nhaHang: any ;

  donOrder: any ;

  phuPhi: any ;

  khuyenMai: any ;

  nhanVien: any;

  phuongThucThanhToan: any;
  thanhToan: boolean = false;

  // Biến để lưu kết quả đếm món ăn và combo
  foodCounts: { id: string; count: number; name: string; price: number; giamGias:number; type: string }[] = [];
  listMonAns: any[] = []; // danh sách món ăn sau khi lọc và đếm sl
  listCombos: any[] = []; // danh sách combo sau khi lọc và đếm sl

  dsMonAns: any; // Lưu danh sách món ăn có thêm trường giảm giá


  isClosePopup = false;

  ngOnInit(): void {
    console.log(this.formData);
   this.donOrderService.getDonOrderById(this.formData.donOrder.id).subscribe({
      next: (res: any) => {
        this.donOrder = res.data;
        console.log(this.donOrder);

        this.countFoodItems();
        
      },

      error: (err) => {
        console.error('Lỗi khi lấy thông tin đơn order:', err);
      }
    });
    
    this.nhaHangService.getNhaHangById(this.formData.nhaHang.id).subscribe({
      next: (res: any) => {
        this.nhaHang = res.data;
        this.loadNhaHangImages();
        console.log(this.nhaHang);
      },
    });

    this.nhanVienService.getNhanVienById(this.formData.nhanVien.id).subscribe({
      next: (res: any) => {
        this.nhanVien = res.data;
        console.log(this.nhanVien);
      },
    });

    this.phuPhiService.getPhuPhiById(this.formData.phuPhi.id).subscribe({
      next: (res: any) => {
        this.phuPhi = res.data;
        console.log(this.phuPhi);
      },
    });
 
    this.phuongThucThanhToanService.getPhuongThucThanhToanById(this.formData.phuongThucThanhToan.id).subscribe({
      next: (res: any) => {
        this.phuongThucThanhToan = res.data;
        console.log(this.phuongThucThanhToan);
        this.loadAllImages();
        if(this.phuongThucThanhToan.tenPhuongThuc == 'Chuyển khoản'){
          this.thanhToan = true;
        }
      },
    });

    this.khuyenmaiService.getKhuyenMaiById(this.formData.khuyenMai.id).subscribe({
      next: (res: any) => {
        this.khuyenMai = res.data;
        // this.khuyenmaiItem = this.khuyenMais.find((km: any) => km.id === this.formData.khuyenMai.id);
        console.log(this.khuyenMai);
      },
    });
  }

  onSave(){
    this.form = {
      id: this.formData.id,
      nhanVien: this.formData.nhanVien.id,
      donOrder: this.formData.donOrder.id,
      phuongThucThanhToan: this.formData.phuongThucThanhToan.id,
      nhaHang: this.formData.nhaHang.id,
      tenHoaDon: this.formData.tenHoaDon,
      // qrCode: this.formData.qrCode,
      qrCode: "Qr Code bên phương thức thanh toán",
      gioVao: this.formData.gioVao,
      gioRa: this.formData.gioRa,
      soNguoi: this.formData.soNguoi,
      khuyenMai: this.formData.khuyenMai.id,
      phuPhi: this.formData.phuPhi.id,
      trangthai: 1,
    };
    console.log(this.form);

    this.save.emit(this.form);

  }
  onChange(){
    const status = true;
    this.change.emit(status);
  }


  // Phương thức để lấy danh sách id món ăn, lọc trùng và đếm số lượng
  countFoodItems() {
    if (!this.donOrder || !this.donOrder.chiTietDonOrder || !Array.isArray(this.donOrder.chiTietDonOrder)) {
      console.log('Không có dữ liệu chi tiết đơn order hoặc cấu trúc không đúng');
      return;
    }
    // Tạo Map để lưu trữ số lượng của từng loại món ăn và combo theo id
    const foodCountMap = new Map<string, { count: number; name: string; price: number; type: string }>();
    
    // Duyệt qua từng chi tiết đơn order
    this.donOrder.chiTietDonOrder.forEach((chiTiet: any) => {
      // Xử lý các món ăn trong chi tiết đơn order
      if (chiTiet.monAns && Array.isArray(chiTiet.monAns)) {
        chiTiet.monAns.forEach((item: any) => {
          if (item.monAn && item.monAn.id) {
            const foodId = item.monAn.id;
            const foodName = item.monAn.name;
            const soLuong = item.soLuong;
            const giaTien = item.giaTien;
            
            if (foodCountMap.has(foodId)) {
              // Nếu món ăn đã tồn tại trong Map, tăng số lượng
              const currentCount = foodCountMap.get(foodId)!.count;
              foodCountMap.set(foodId, { 
                count: currentCount + soLuong,
                name: foodName,
                price: giaTien,
                // giamGias: 0,
                type: 'monAn'
              });
            } else {
              // Nếu món ăn chưa tồn tại trong Map, thêm mới
              foodCountMap.set(foodId, { 
                count: soLuong,
                name: foodName,
                price: giaTien,
                // giamGias: 0,
                type: 'monAn'
              });
            }
          }
        });
      }
      
      // Xử lý các combo trong chi tiết đơn order
      if (chiTiet.comBos && Array.isArray(chiTiet.comBos)) {
        chiTiet.comBos.forEach((item: any) => {
          if (item.comBo && item.comBo.id) {
            const comboId = item.comBo.id;
            const comboName = item.comBo.name;
            const soLuong = item.soLuong;
            const giaTien = item.giaTien;
            
            if (foodCountMap.has(comboId)) {
              // Nếu combo đã tồn tại trong Map, tăng số lượng
              const currentCount = foodCountMap.get(comboId)!.count;
              foodCountMap.set(comboId, { 
                count: currentCount + soLuong,
                name: comboName,
                price: giaTien,
                // giamGias: 0,
                type: 'comBo'
              });
            } else {
              // Nếu combo chưa tồn tại trong Map, thêm mới
              foodCountMap.set(comboId, { 
                count: soLuong,
                name: comboName,
                price: giaTien,
                // giamGias: 0,
                type: 'comBo'
              });
            }
          }
        });
      }
    });
    
    // Chuyển đổi Map thành mảng kết quả
    this.foodCounts = Array.from(foodCountMap.entries()).map(([id, data]) => ({
      id,
      count: data.count,
      name: data.name,
      price: data.price,
      giamGias: 0,
      type: data.type
    }));
    
    console.log('Danh sách món ăn và combo đã lọc và đếm:', this.foodCounts);
    
    // Tách riêng danh sách món ăn và combo nếu cần
    this.listMonAns = this.foodCounts.filter(item => item.type === 'monAn'); 
    this.listCombos = this.foodCounts.filter(item => item.type === 'comBo');

        for (let item of this.listMonAns) {
      this.monAnService.getMonAnById(item.id).subscribe({
        next: (res: any) => {
          // Kiểm tra dữ liệu trả về có đúng cấu trúc không
          if (res.data && res.data.giamGia) {
            // Lấy giá trị giảm giá
            item.giamGias = res.data.giamGia.giaTri;
            console.log(`Món ăn ${item.name} có giảm giá: ${item.giamGias}`);
            
            // Tính toán giá sau khi giảm nếu cần
            item.giaSauGiam = item.price * (1 - item.giamGias / 100);
          } else {
            // Nếu không có thông tin giảm giá, gán giá trị mặc định
            item.giamGias = 0;
            console.log(`Món ăn ${item.name} không có thông tin giảm giá`);
          }
        },
        error: (err) => {
          console.error(`Lỗi khi lấy thông tin giảm giá cho món ăn ${item.name}:`, err);
          // Gán giá trị mặc định khi có lỗi
          item.giamGias = 0;
          item.giaSauGiam = item.price;
        },
      });
    }
    
    console.log('Danh sách món ăn:', this.listMonAns);
    console.log('Danh sách combo:', this.listCombos);
  }

  closeChiTiet() {
    console.log(this.formData);
    // this.isClosePopup = false;
    this.close.emit();
  }

  constructor(
    private fileService: FileService,
    private notification: NzNotificationService,
    private hoaDonThanhToanService: HoaDonThanhToanService, // Thêm service vào đây
    private donOrderService: DonOrderService,
    private nhaHangService: NhaHangService,
    private phuPhiService: PhuPhiService,
    private khuyenmaiService: khuyenmaiService,
    private nhanVienService: NhanVienService,
    private phuongThucThanhToanService: PhuongThucThanhToanService,
    private monAnService: MonAnService,
  ) {}

  getImageUrl(hinhAnh: string): string {
    if (!hinhAnh) return '';

    try {
      const parsed = JSON.parse(hinhAnh);
      return `https://api.duchaibui.id.vn/api/files/download/${parsed.id}`;
    } catch {
      return ''; // hoặc ảnh mặc định nếu parse lỗi
    }
  }
  // Thêm biến này vào danh sách các biến của component
  imageUrls: { [key: string]: string } = {};
  imageUrl: { [key: string]: string } = {};

  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }
  // Thêm phương thức này vào component
  loadAllImages(): void {
    const parsed = this.parseJSON(this.phuongThucThanhToan.qrCode);
    if (parsed?.id && this.phuongThucThanhToan.id) {
      this.fileService.downloadFile(parsed.id).subscribe(
        (blob: Blob) => {
          const url = URL.createObjectURL(blob);
          this.imageUrls[this.phuongThucThanhToan.id] = url;
        },
        (error) => console.error('Lỗi tải ảnh QR code:', this.phuongThucThanhToan.tenPhuongThuc, error)
      );
    }
  }

  loadNhaHangImages(): void {
    const parsed = this.parseJSON(this.nhaHang.logo);
    if (parsed?.id && this.nhaHang.id) {
      this.fileService.downloadFile(parsed.id).subscribe(
        (blob: Blob) => {
          const url = URL.createObjectURL(blob);
          this.imageUrl[this.nhaHang.id] = url;
        },
        (error) => console.error('Lỗi tải ảnh logo nhà hàng:', this.nhaHang.tenNhaHang, error)
      );
    }
  }
  
}

