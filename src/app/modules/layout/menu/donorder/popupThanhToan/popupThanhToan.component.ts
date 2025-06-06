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
  @Input() formData: any;    
  @Input() form: any; 
  @Output() close = new EventEmitter<void>(); 
  @Output() save = new EventEmitter<any>(); 
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
    this.save.emit(this.form);
  }

  

  onCancel(): void {
    this.close.emit(); 
  }

  ngOnInit(): void {
    

    this.nhaHangService.getNhaHang(this.searchNH).subscribe({
      next: (res: any) => {
        this.nhaHangs = res.data.data;
        this.form.nhaHang = this.nhaHangs[0].id;
      },
    });
    const userInfo = JSON.parse(localStorage.getItem('userInfor') || '{}');
    this.nhanVien = {
      id: userInfo.id,
      name: userInfo.name,
    }
    this.nhanVienService.getNhanVienById(userInfo.nhanVienId).subscribe({
      next: (res: any) => {
        this.nhanViens = res.data;
        this.form.NhanVien = this.nhanViens.id;

      },
    });

    this.phuPhiService.getPhuPhi(this.searchPP).subscribe({
      next: (res: any) => {
        this.phuPhi = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenPhuPhi,
          giaTri: item.giaTri
        }));
      },
    });



    this.khuyenmaiService.getKhuyenMai({trangThai:0}).subscribe({

      next: (res: any) => {
        this.khuyenMai = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenKhuyenMai,
          giaTri: item.giaTri
        }))
      },
    });

    this.phuongThucThanhToanService.getPhuongThucThanhToan({}).subscribe({
      next: (res: any) => {
        this.phuongThucThanhToan = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenPhuongThuc,
        }))
      },
    });

    this.form = {
    donOrder: this.formData.id,
    gioVao: this.formData.ngayTao,
    gioRa: new Date(),
    trangthai: 0,
  };

  }

  closePopup() {
    this.close.emit();
  }
  constructor(
    private nhanVienService: NhanVienService,
    private nhaHangService: NhaHangService,
    private phuPhiService: PhuPhiService,
    private khuyenmaiService: khuyenmaiService,
    private phuongThucThanhToanService: PhuongThucThanhToanService,
  ) {}
}
