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
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng

  // nhaHangItem: any;
  nhaHang: any ;

  // donOrderItem: any;
  donOrder: any ;

  // phuPhiItem: any;
  phuPhi: any ;

  // khuyenmaiItem: any;
  khuyenMai: any ;

  nhanVien: any;

  // Biến để lưu kết quả đếm món ăn
  // Biến để lưu kết quả đếm món ăn và combo
  foodCounts: { id: string; count: number; name: string; price: number; type: string }[] = [];
  listMonAns: any[] = [];
  listCombos: any[] = [];


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
        // this.nhaHangItem = this.nhaHangs.find((nh: any) => nh.id === this.formData.nhaHang.id);
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

    

    this.khuyenmaiService.getKhuyenMaiById(this.formData.khuyenMai.id).subscribe({
      next: (res: any) => {
        this.khuyenMai = res.data;
        // this.khuyenmaiItem = this.khuyenMais.find((km: any) => km.id === this.formData.khuyenMai.id);
        console.log(this.khuyenMai);
      },
    });
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
                type: 'monAn'
              });
            } else {
              // Nếu món ăn chưa tồn tại trong Map, thêm mới
              foodCountMap.set(foodId, { 
                count: soLuong,
                name: foodName,
                price: giaTien,
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
                type: 'comBo'
              });
            } else {
              // Nếu combo chưa tồn tại trong Map, thêm mới
              foodCountMap.set(comboId, { 
                count: soLuong,
                name: comboName,
                price: giaTien,
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
      type: data.type
    }));
    
    console.log('Danh sách món ăn và combo đã lọc và đếm:', this.foodCounts);
    
    // Tách riêng danh sách món ăn và combo nếu cần
    this.listMonAns = this.foodCounts.filter(item => item.type === 'monAn'); 
    this.listCombos = this.foodCounts.filter(item => item.type === 'comBo');
    
    console.log('Danh sách món ăn:', this.listMonAns);
    console.log('Danh sách combo:', this.listCombos);
  }

  closePopup() {
    console.log(this.formData);
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
    
  
  ) { }

  
}

