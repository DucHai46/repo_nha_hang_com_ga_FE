import { NhanVien } from './../../../../../models/NhanVien';
import { DonOrderAdminService } from './../services/donorderadmin.service';
import { PhuongThucThanhToanService } from './../../phuongthucthanhtoan/services/phuongthucthanhtoan.service';
import { khuyenmaiService } from './../../khuyenmai/services/khuyenmai.service';
import { PhuPhiService } from './../../phuphi/services/phuphi.service';
import { NhaHangService } from './../../nhahang/services/nhahang.service';
import { NhanVienService } from './../../nhanvien/services/nhanvien.service';
import { ComboService } from '../../combo/services/combo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-popupThanhToan',
  templateUrl: './popupThanhToan.component.html',
  styleUrl: './popupThanhToan.component.scss'
})
export class PopupThanhToanComponent implements OnInit {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Input() form: any; // Lưu dữ liệu để tạo hóa đơn 
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng
  @Output() save = new EventEmitter<any>(); // Emit sự kiện khi cập nhật trạng thái
  @Input() isAddMode: boolean = false;
  @Output() openChiTietHoaDon = new EventEmitter<void>();

  nhaHangs: any;

  phuPhi: any [] = [] ;

  khuyenMai: any [] = [] ;

  nhanVien: any;
  nhanViens: any;
  phuongThucThanhToan: any [] = [] ;

  donOrder: any;
  nhaHangId: any;

  searchPP: any = {
    isPaging: true,
    PageNumber: 1,
    PageSize: 10,
    trangThai: 1, 
  }

  searchKM: any = {
    isPaging: true,
    PageNumber: 1,
    PageSize: 10,
    trangThai: 1, 
  }

  searchNH: any = {
    isPaging: true,
    PageNumber: 1,
    PageSize: 10,
    isActive: true, 
  }
  isChiTietHoaDonOpen: boolean = false;
  isPopupOpen = false;

  isTenHoaDonUnValid = false;
  isSoNguoiUnValid = false;
  isPhuPhiUnValid = false;
  isKhuyenMaiUnValid = false;
  isPhuongThucThanhToanUnValid = false;
  
closeChiTiet() {
  this.isChiTietHoaDonOpen = false;
}
openChiTietHoaDonPopup(item: any): void {
    this.isChiTietHoaDonOpen = true;
    this.openChiTietHoaDon.emit(item);
  }


  onSave(): void {
    
    
    this.isTenHoaDonUnValid = !this.form.tenHoaDon;
    this.isSoNguoiUnValid = !this.form.soNguoi;
    this.isPhuPhiUnValid = !this.form.phuPhi;
    this.isKhuyenMaiUnValid = !this.form.khuyenMai;
    this.isPhuongThucThanhToanUnValid =!this.form.phuongThucThanhToan;

    if(this.isTenHoaDonUnValid || this.isSoNguoiUnValid || this.isPhuPhiUnValid || this.isKhuyenMaiUnValid || this.isPhuongThucThanhToanUnValid){
      return;
    }
    console.log(this.form);
    this.save.emit(this.form);
  }

  

  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }

  ngOnInit(): void {
    // this.nhaHangService.getNhaHang(this.searchNH).subscribe( {
    //   next: (res: any) => {
    //     this.nhaHang = res.data.data;
    //     this.nhaHangId = this.nhaHang.id;
    //     console.log(this.nhaHang.tenNhaHang);

    //     this.form = {
    //     nhaHangs: this.nhaHangId,
    //   };
    //   console.log(this.form);

    //     console.log(this.nhaHang);
    //     // console.log(this.formData);
    //   }, 
    // });

    this.nhaHangService.getNhaHang(this.searchNH).subscribe({
      next: (res: any) => {
        this.nhaHangs = res.data.data;
        console.log(this.nhaHangs);
        console.log(this.nhaHangs[0].id);
        this.form.nhaHang = this.nhaHangs[0].id;
        // console.log(this.form);
      },
    });
    const userInfo = JSON.parse(localStorage.getItem('userInfor') || '{}');
    this.nhanVien = {
      id: userInfo.id,
      name: userInfo.name,
    }
    console.log(this.nhanVien);
    console.log(this.nhanVien);
    this.nhanVienService.getNhanVienById(userInfo.nhanVienId).subscribe({
      next: (res: any) => {
        this.nhanViens = res.data;
        this.form.NhanVien = this.nhanViens.id;

        console.log(this.form.NhanVien);
        // // Lọc ra chỉ những nhân viên có chức vụ là Thu Ngân
        // this.nhanVien = allNhanVien.filter((nv: any) => nv.chucVu === 'Thu ngân');
        
        // console.log('Danh sách nhân viên Thu Ngân:', this.nhanVien);
        // if (this.nhanVien.length > 0) {
        //   console.log('ID nhân viên Thu Ngân đầu tiên:', this.nhanVien[0].id);
        // 
      },
    });

    this.phuPhiService.getPhuPhi(this.searchPP).subscribe({
      next: (res: any) => {
        this.phuPhi = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenPhuPhi,
          giaTri: item.giaTri
        }));
        console.log(this.phuPhi);
      },
    });

    this.khuyenmaiService.getKhuyenMai(this.searchKM).subscribe({
      next: (res: any) => {
        this.khuyenMai = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenKhuyenMai,
          giaTri: item.giaTri
        }))
        console.log(this.khuyenMai);
      },
    });

    this.phuongThucThanhToanService.getPhuongThucThanhToan({}).subscribe({
      next: (res: any) => {
        this.phuongThucThanhToan = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenPhuongThuc,
        }))
        console.log(this.phuongThucThanhToan);
      },
    });

    this.form = {
    // nhaHang: this.nhaHangs.id,
    donOrder: this.formData.id,
    gioVao: this.formData.createdDate,
    gioRa: new Date(),
    trangthai: 0,
  };
  console.log(this.form);

  }

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  constructor(
    private fileService: FileService,
    private notification: NzNotificationService,
    private donOrderService: DonOrderAdminService, // Thêm service vào đây
    private nhanVienService: NhanVienService,
    private nhaHangService: NhaHangService,
    private phuPhiService: PhuPhiService,
    private khuyenmaiService: khuyenmaiService,
    private phuongThucThanhToanService: PhuongThucThanhToanService,
    private donOrderAdminService: DonOrderAdminService,
  ) {}
}
