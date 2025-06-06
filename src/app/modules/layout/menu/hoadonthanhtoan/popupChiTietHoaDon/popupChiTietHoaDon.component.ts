import { DonOrderAdminService } from './../../donorder/services/donorderadmin.service';
import { MonAnService } from './../../monan/services/monan.service';
import { PhuongThucThanhToanService } from './../../phuongthucthanhtoan/services/phuongthucthanhtoan.service';
import { NhanVienService } from './../../nhanvien/services/nhanvien.service';
import { khuyenmaiService } from './../../khuyenmai/services/khuyenmai.service';
import { PhuPhiService } from './../../phuphi/services/phuphi.service';
import { NhaHangService } from './../../nhahang/services/nhahang.service';
import { DonOrderService } from './../../../menugoimon/services/donorder.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HoaDonThanhToanService } from '../services/hoadonthanhtoan.service';

import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-popupChiTietHoaDon',
  templateUrl: './popupChiTietHoaDon.component.html',
  styleUrl: './popupChiTietHoaDon.component.scss'
})
export class PopupChiTietHoaDonComponent implements OnInit {
  @Input() formData: any;   
  @Input() form: any;
  @Output() close = new EventEmitter<void>(); 
  @Output() close1 = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>(); 
  @Output() change = new EventEmitter<boolean>(); 

  nhaHang: any ;

  donOrder: any ;

  phuPhi: any ;

  khuyenMai: any ;

  nhanVien: any;

  phuongThucThanhToan: any;
  thanhToan: boolean = false;

  foodCounts: { id: string; count: number; name: string; price: number; giamGias:number; type: string }[] = [];
  listMonAns: any[] = []; 
  listCombos: any[] = []; 

  dsMonAns: any; 

  donOrderId: any;

  isClosePopup = false;

  ngOnInit(): void {
   this.donOrderService.getDonOrderById(this.formData.donOrder.id).subscribe({
      next: (res: any) => {
        this.donOrder = res.data;

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
      },
    });

    this.nhanVienService.getNhanVienById(this.formData.nhanVien.id).subscribe({
      next: (res: any) => {
        this.nhanVien = res.data;
      },
    });

    this.phuPhiService.getPhuPhiById(this.formData.phuPhi.id).subscribe({
      next: (res: any) => {
        this.phuPhi = res.data;
      },
    });
 
    this.phuongThucThanhToanService.getPhuongThucThanhToanById(this.formData.phuongThucThanhToan.id).subscribe({
      next: (res: any) => {
        this.phuongThucThanhToan = res.data;
        this.loadAllImages();
      },
    });

    this.khuyenmaiService.getKhuyenMaiById(this.formData.khuyenMai.id).subscribe({
      next: (res: any) => {
        this.khuyenMai = res.data;
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
      qrCode: "Qr Code bên phương thức thanh toán",
      gioVao: this.formData.gioVao,
      gioRa: this.formData.gioRa,
      soNguoi: this.formData.soNguoi,
      khuyenMai: this.formData.khuyenMai.id,
      phuPhi: this.formData.phuPhi.id,
      trangthai: 1,
    };
    this.save.emit(this.form);
  }
  onChange(){
    const status = true;
    this.change.emit(status);
  }

  countFoodItems() {
    if (!this.donOrder || !this.donOrder.chiTietDonOrder || !Array.isArray(this.donOrder.chiTietDonOrder)) {
      return;
    }
    const foodCountMap = new Map<string, { count: number; name: string; price: number; type: string }>();
    
    this.donOrder.chiTietDonOrder.forEach((chiTiet: any) => {
      if (chiTiet.monAns && Array.isArray(chiTiet.monAns)) {
        chiTiet.monAns.forEach((item: any) => {
          if (item.monAn && item.monAn.id) {
            const foodId = item.monAn.id;
            const foodName = item.monAn.name;
            const soLuong = item.soLuong;
            const giaTien = item.giaTien;
            
            if (foodCountMap.has(foodId)) {
              const currentCount = foodCountMap.get(foodId)!.count;
              foodCountMap.set(foodId, { 
                count: currentCount + soLuong,
                name: foodName,
                price: giaTien,
                type: 'monAn'
              });
            } else {
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
      
      if (chiTiet.comBos && Array.isArray(chiTiet.comBos)) {
        chiTiet.comBos.forEach((item: any) => {
          if (item.comBo && item.comBo.id) {
            const comboId = item.comBo.id;
            const comboName = item.comBo.name;
            const soLuong = item.soLuong;
            const giaTien = item.giaTien;
            
            if (foodCountMap.has(comboId)) {
              const currentCount = foodCountMap.get(comboId)!.count;
              foodCountMap.set(comboId, { 
                count: currentCount + soLuong,
                name: comboName,
                price: giaTien,
                type: 'comBo'
              });
            } else {
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
    
    this.foodCounts = Array.from(foodCountMap.entries()).map(([id, data]) => ({
      id,
      count: data.count,
      name: data.name,
      price: data.price,
      giamGias: 0,
      type: data.type
    }));
    
    
    this.listMonAns = this.foodCounts.filter(item => item.type === 'monAn'); 
    this.listCombos = this.foodCounts.filter(item => item.type === 'comBo');

        for (let item of this.listMonAns) {
      this.monAnService.getMonAnById(item.id).subscribe({
        next: (res: any) => {
          if (res.data && res.data.giamGia) {
            item.giamGias = res.data.giamGia.giaTri;
            
            item.giaSauGiam = item.price * (1 - item.giamGias / 100);
          } else {
            item.giamGias = 0;
          }
        },
        error: (err) => {
          console.error(`Lỗi khi lấy thông tin giảm giá cho món ăn ${item.name}:`, err);
          item.giamGias = 0;
          item.giaSauGiam = item.price;
        },
      });
    }
  }

  updateDonOrderStatusOnlline(donOrderId: string, status: { trangThai: number }): void {
    this.donOrderAdminService.updateStatusDonOrder(donOrderId, status).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.notification.create(
            'success',
            'Thông báo!',
            `Cập nhật thành công`,
            {
              nzClass: 'notification-success',
              nzDuration: 2000
            }
          );
        } else {
          this.notification.create(
            'error',
            'Thông báo!',
            `Cập nhật thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      },
      error: () => {
        this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
}

  changeStatus() {
    this.donOrderService.getDonOrderById(this.formData.donOrder.id).subscribe({
      next: (res: any) => {
        if(res.data){
          this.donOrder = res.data;
          if(this.donOrder.loaiDon.name.toLowerCase() === 'offline'){
            this.updateDonOrderStatusOnlline(this.formData.donOrder.id, { trangThai: 4 });
          }
        }
      }
    });  
  }

  closeChiTiet() {
    this.close.emit();
    this.close1.emit();
  }

  constructor(
    private fileService: FileService,
    private donOrderService: DonOrderService,
    private nhaHangService: NhaHangService,
    private phuPhiService: PhuPhiService,
    private khuyenmaiService: khuyenmaiService,
    private nhanVienService: NhanVienService,
    private phuongThucThanhToanService: PhuongThucThanhToanService,
    private monAnService: MonAnService,
    private notification: NzNotificationService,
    private donOrderAdminService: DonOrderAdminService,
  ) {}

  getImageUrl(hinhAnh: string): string {
    if (!hinhAnh) return '';

    try {
      const parsed = JSON.parse(hinhAnh);
      return `https://api.duchaibui.id.vn/api/files/download/${parsed.id}`;
    } catch {
      return ''; 
    }
  }
  imageUrls: { [key: string]: string } = {};
  imageUrl: { [key: string]: string } = {};

  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }
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

  pdf(){
    const options = {
      filename: `HoaDon_${this.formData.id}_${new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        margins: { top: 10, right: 10, bottom: 10, left: 10 },
        pagebreak: { mode: ['css', 'legacy'] }
      },
      margin: [10, 10, 10, 10]  
    }

    const element: Element = document.getElementById('hoadon')!;
    html2pdf().from(element).set(options).save().then(() => {
      // Chờ xuất PDF xong mới đóng
      this.changeStatus();
      this.close.emit();
      this.close1.emit();
    });;

    // this.changeStatus();
    // this.close.emit();


  }
}

