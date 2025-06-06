import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TuDoService } from '../../tudo/services/tudo.service';
import { DonViTinhService } from '../../donvitinh/services/donvitinh.service';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';
import { NhaCungCapService } from '../../nhacungcap/services/nhacungcap.service';
import { NhanVienService } from '../../nhanvien/services/nhanvien.service';
import { PhieuNhapService } from '../services/phieunhap.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-popupPhieuNhap',
  templateUrl: './popupPhieuNhap.component.html',
  styleUrls: ['./popupPhieuNhap.component.scss']
})
export class PopupPhieuNhapComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() formData: any = {
    tenPhieu: '',
    nguyenLieus: [],
    tenNguoiGiao: '',
    nhaCungCap: '',
    dienGiai: '',
    diaDiem: '',
    ghiChu: '',
    nhanVien: '',
    tongTien: 0
  };
  nguyenLieuSelection: any[] = [
    {
      id: '',
      tenNguyenLieu: '',
      moTa: '',
      hanSuDung: '',
      soLuong:0,
      loaiNguyenLieu: '',
      donViTinh: '',
      tuDo: '',
      trangThai: 0,
      donGia: 0,
      thanhTien: 0
    }
  ];
  loaiNguyenLieu: any[] = [];
  tuDo: any[] = [];
  donViTinh: any[] = [];
  nhaCungCap: any[] = [];
  nhanVien: any;
  nhanViens: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
    private loaiNguyenLieuService: LoainguyenlieuService,
    private tuDoService: TuDoService,
    private donViTinhService: DonViTinhService,
    private nhaCungCapService: NhaCungCapService,
    private nhanVienService: NhanVienService,
    private notification: NzNotificationService
  ){}

  ngOnInit(): void {
    this.loaiNguyenLieuService.getLoaiNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.loaiNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai
        }));
      },
      error: (err: any) => console.log(err)
    });

    this.tuDoService.getTuDo({}).subscribe({
      next: (res: any) => {
        this.tuDo = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenTuDo
        }));
      },
      error: (err: any) => console.log(err)
    });

    this.donViTinhService.getDonViTinh({}).subscribe({
      next: (res: any) => {
        this.donViTinh = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenDonViTinh
        }));
      },
      error: (err: any) => console.log(err)
    });

    this.nhaCungCapService.getNhaCungCap({}).subscribe({
      next: (res: any) => {
        this.nhaCungCap = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNhaCungCap
        }));
      },
      error: (err: any) => console.log(err)
    });
    const userInfo = JSON.parse(localStorage.getItem('userInfor') || '{}');
    this.nhanVien = {
      id: userInfo.id,
      name: userInfo.name,
    }
    this.nhanVienService.getNhanVienById(userInfo.nhanVienId).subscribe({
      next: (res: any) => {
        this.nhanViens = res.data;
        this.formData.nhanVien = this.nhanViens.id;
      },
    });

  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    if (filteredValue.length > 11) {
      filteredValue = filteredValue.substring(0, 11);
    }
    inputElement.value = filteredValue;
    this.formData.tenPhieu = filteredValue;
  }


  addNguyenLieuRow(): void {
    this.nguyenLieuSelection.push({
      id: '',
      tenNguyenLieu: '',
      moTa: '',
      hanSuDung: '',
      soLuong:0,
      loaiNguyenLieu: '',
      donViTinh: '',
      tuDo: '',
      trangThai: 0,
      donGia: 0,
      thanhTien: 0
    });
  }
  updateThanhTien(loai: any): void {
    const soLuong = Number(loai.soLuong) || 0;
    const donGia = Number(loai.donGia) || 0;
    loai.thanhTien = soLuong * donGia;
    this.updateTongTien();
  }
  updateTongTien(): void {
  this.formData.tongTien = this.nguyenLieuSelection.reduce((total, item) => {
    return total + (Number(item.thanhTien) || 0);
  }, 0);
  }
  removeNguyenLieuSelection(index: number): void {
    this.nguyenLieuSelection.splice(index, 1);
  }
  isNhanVienUnvalid=false;
  isDienGiaiUnvalid=false;
  onSave(): void {
    const allNguyenLieus = this.nguyenLieuSelection.map(loai => ({
      id: loai.selectedLoaiId,
      tenNguyenLieu: loai.tenNguyenLieu,
      moTa: loai.moTa,
      hanSuDung: loai.hanSuDung,
      soLuong: loai.soLuong,
      loaiNguyenLieu: loai.loaiNguyenLieu,
      donViTinh: loai.donViTinh,
      tuDo: loai.tuDo,
      trangThai: loai.trangThai,
      donGia: loai.donGia,
      thanhTien: loai.thanhTien
    }));
    this.isNhanVienUnvalid = !this.formData.nhanVien;
    this.isDienGiaiUnvalid = !this.formData.dienGiai;
    if(this.isNhanVienUnvalid || this.isDienGiaiUnvalid){
      return;
    }

    const dataToSend = {
      id: this.formData.id,
      tenPhieu: this.formData.tenPhieu,
      tenNguoiGiao: this.formData.tenNguoiGiao,
      nhaCungCap: this.formData.nhaCungCap||null,
      dienGiai: this.formData.dienGiai,
      diaDiem: this.formData.diaDiem,
      tongTien: this.formData.tongTien,
      ghiChu: this.formData.ghiChu,
      nhanVien: this.formData.nhanVien||null,
      nguyenLieus: allNguyenLieus
    };

    this.save.emit(dataToSend);

  }
  onCancel(): void {
    this.close.emit();
  }
  trackByIndex(index: number, item: any): any {
    return index;
  }



}
