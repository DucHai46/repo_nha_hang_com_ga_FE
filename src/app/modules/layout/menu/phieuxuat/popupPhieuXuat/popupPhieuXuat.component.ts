import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';
import { NhanVienService } from '../../nhanvien/services/nhanvien.service';
import { DonViTinhService } from '../../donvitinh/services/donvitinh.service';
import { PhieuXuatService } from '../services/phieuxuat.service';
import { NguyenlieuService } from '../../nguyenlieu/services/nguyenlieu.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-popupPhieuXuat',
  templateUrl: './popupPhieuXuat.component.html',
  styleUrls: ['./popupPhieuXuat.component.scss']
})
export class PopupPhieuXuatComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() formData: any = {
    tenPhieu: '',
    nguoiNhan: '',
    lyDoXuat: '',
    diaDiem: '',
    ghiChu: '',
    nhanVien:'',
    loaiNguyenLieus: [],
  };

  loaiSelections: any[] = [
    {
      selectedLoaiId: '',
      selectedLoaiName: '',
      selectedNguyenLieuId: '',
      filteredNguyenLieu: [],
      nguyenLieus: []
    }
  ];
  loaiNguyenLieu: any[] = [];
  nhanVien: any;
  nhanViens: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
    private loaiNguyenLieuService: LoainguyenlieuService,
    private nhanVienService: NhanVienService,
    private notification: NzNotificationService,
    private phieuXuatService: PhieuXuatService,
    private nguyenLieuService: NguyenlieuService,
    private donViTinhService: DonViTinhService
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

  addLoaiSelection(): void {
    this.loaiSelections.push({
      selectedLoaiId: '',
      selectedLoaiName: '',
      filteredNguyenLieu: [],
      nguyenLieus: []
    });
  }
  addNguyenLieuSelection(index: number): void {
    this.loaiSelections[index].nguyenLieus.push({
      nguyenLieu: {
        id: '',
        name: '',
        soLuong: 0,
        donViTinh: {
          id: '',
          name: ''
        },
        soLuongBanDau:0,
        soLuongXuat:0,
        chenhLech:0,  
      }
    });
  }
  onLoaiNguyenLieuChange(index: number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].selectedLoaiName = this.loaiNguyenLieu.find(l => l.id === selectedLoaiId)?.name || '';
    this.nguyenLieuService.getNguyenLieu({loaiNguyenLieuId: this.loaiSelections[index].selectedLoaiId}).subscribe({
        next: (res: any) => {

        this.loaiSelections[index].filteredNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNguyenLieu,
          loaiNguyenLieuId: item.loaiNguyenLieu.id,
          donViTinh: {
            id: item.donViTinh.id,
            name: item.donViTinh.name
          },
          soLuong: item.soLuong,
          trangThai: item.trangThai
        }));
      },
      error: (err: any) => console.log(err)
    });
    this.loaiSelections[index].selectedNguyenLieuId = '';
    this.loaiSelections[index].nguyenLieus = [];
  }
    onTrangThaiNguyenLieuChange(index: number,trangThai1:number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].selectedLoaiName = this.loaiNguyenLieu.find(l => l.id === selectedLoaiId)?.name || '';
    this.nguyenLieuService.getNguyenLieu({loaiNguyenLieuId: this.loaiSelections[index].selectedLoaiId ,trangThai:trangThai1}).subscribe({
        next: (res: any) => {
        this.loaiSelections[index].filteredNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNguyenLieu,
          loaiNguyenLieuId: item.loaiNguyenLieu.id,
          donViTinh: {
            id: item.donViTinh.id,
            name: item.donViTinh.name
          },
          soLuong: item.soLuong,
          trangThai: item.trangThai
        }));
      },
      error: (err: any) => console.log(err)
    });
    this.loaiSelections[index].nguyenLieus = [];
    this.loaiSelections[index].nguyenLieus = [];

  }
  isLoaiDuplicate(selectedLoaiId: string, index: number): boolean {
    return this.loaiSelections.some((s, idx) => idx !== index && s.selectedLoaiId === selectedLoaiId);
  }
  isNguyenLieuDuplicate(nl: any, loaiIndex: number, nguyenLieuIndex: number): boolean {
    const loai = this.loaiSelections[loaiIndex];
    return loai.nguyenLieus.some((x: any, idx: number) => 
      idx !== nguyenLieuIndex  && x.nguyenLieu.id === nl.id
    );
  }
  updateChenhLech(loai: any): void {
    const soLuong = Number(loai.nguyenLieu.soLuong) || 0;
    const donGia = Number(loai.nguyenLieu.soLuongXuat) || 0;
      if (donGia < 0) {
        loai.nguyenLieu.soLuongXuat = 0;
    } else if (donGia > soLuong) {
        loai.nguyenLieu.soLuongXuat = soLuong;
    }
    loai.nguyenLieu.chenhLech = soLuong - loai.nguyenLieu.soLuongXuat;
    
  }
  updateNguyenLieuName(loai: any, item: any) {
    const found = loai.filteredNguyenLieu.find((nl: any) => nl.id === item.nguyenLieu.id);
    item.nguyenLieu.name = found?.name || '';
    item.nguyenLieu.donViTinh.name = found?.donViTinh.name || '';
    item.nguyenLieu.donViTinh.id = found?.donViTinh.id || '';
    item.nguyenLieu.soLuong = found?.soLuong || 0;
    item.nguyenLieu.soLuongXuat = 0;
    item.nguyenLieu.chenhLech = 0;
  }
  removeNguyenLieuInLoai(loaiIndex: number, nlIndex: number): void {
    this.loaiSelections[loaiIndex].nguyenLieus.splice(nlIndex, 1);
  }

  removeLoaiSelection(index: number): void {
    this.loaiSelections.splice(index, 1);
  }
  isNhanVienUnValid=false;
  isLyDoUnValid=false;
  onSave(): void {
    const allLoaiNguyenLieus = this.loaiSelections.map(loai => ({
      id: loai.selectedLoaiId,
      nguyenLieus: loai.nguyenLieus.map((item: any) => ({
        id: item.nguyenLieu.id,
        donViTinh:item.nguyenLieu.donViTinh.id,
        soLuong: item.nguyenLieu.soLuong,
        soLuongXuat: item.nguyenLieu.soLuongXuat,
        chenhLech: item.nguyenLieu.chenhLech,        
      }))
    }));
    this.isNhanVienUnValid=!this.formData.nhanVien;
    this.isLyDoUnValid=!this.formData.lyDoXuat;
    if(this.isNhanVienUnValid || this.isLyDoUnValid){
      return;
    }

    const dataToSend = {
      tenPhieu: this.formData.tenPhieu,
      nguoiNhan: this.formData.nguoiNhan,
      lyDoXuat: this.formData.lyDoXuat,
      diaDiem: this.formData.diaDiem,
      ghiChu: this.formData.ghiChu,
      nhanVien: this.formData.nhanVien||null,
      
      loaiNguyenLieus: allLoaiNguyenLieus
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
