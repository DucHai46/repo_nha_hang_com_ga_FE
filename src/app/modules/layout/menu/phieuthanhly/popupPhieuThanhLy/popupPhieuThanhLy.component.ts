import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';
import { NhanVienService } from '../../nhanvien/services/nhanvien.service';
import { DonViTinhService } from '../../donvitinh/services/donvitinh.service';
import { PhieuThanhLyService } from '../services/phieuthanhly.service';
import { NguyenlieuService } from '../../nguyenlieu/services/nguyenlieu.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-popupPhieuThanhLy',
  templateUrl: './popupPhieuThanhLy.component.html',
  styleUrls: ['./popupPhieuThanhLy.component.scss']
})
export class PopupPhieuThanhLyComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() formData: any = {
    tenPhieu: '',
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
    private phieuThanhLyService: PhieuThanhLyService,
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
    console.log(this.nhanVien);
    console.log(this.nhanVien);
    this.nhanVienService.getNhanVienById(userInfo.nhanVienId).subscribe({
      next: (res: any) => {
        this.nhanViens = res.data;
        this.formData.nhanVien = this.nhanViens.id;

        console.log(this.formData.nhanVien);
      },
    });

  }

  addLoaiSelection(): void {
    this.loaiSelections.push({
      selectedLoaiId: '',
      selectedLoaiName: '',
      filteredNguyenLieu: [{
        id: '',
        name: '',
        soLuong: 0,
        hanSuDung: '',
        donViTinh: {
          id: '',
          name: ''
        },
        soLuongBanDau:0,
        soLuongThanhLy:0,
        chenhLech:0,  
        lyDoThanhLy: ''
      }],

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
          donViTinh: {
            id: item.donViTinh.id,
            name: item.donViTinh.name
          },
          hanSuDung: item.hanSuDung,
          soLuong: item.soLuong,
        }));
      },
      error: (err: any) => console.log(err)
    });
  }

  isLoaiDuplicate(selectedLoaiId: string, index: number): boolean {
    return this.loaiSelections.some((s, idx) => idx !== index && s.selectedLoaiId === selectedLoaiId);
  }

  updateChenhLech(loai: any): void {
    const soLuong = Number(loai.soLuong) || 0;
    const donGia = Number(loai.soLuongThanhLy) || 0;
      if (donGia < 0) {
        loai.soLuongThanhLy = 0;
    } else if (donGia > soLuong) {
        loai.soLuongThanhLy = soLuong;
    }
    loai.chenhLech = soLuong - loai.soLuongThanhLy;
    
  }
  thanhLyToanBo(index:number): void {
    this.loaiSelections[index].filteredNguyenLieu.forEach((item: any) => {
      item.soLuongThanhLy = item.soLuong;
      this.updateChenhLech(item);
    });
  }
  removeNguyenLieuInLoai(loaiIndex: number, nlIndex: number): void {
    this.loaiSelections[loaiIndex].filteredNguyenLieu.splice(nlIndex, 1);
  }

  removeLoaiSelection(index: number): void {
    this.loaiSelections.splice(index, 1);
  }
  isNhanVienUnValid=false;
  onSave(): void {
    console.log(this.loaiSelections);
    const allLoaiNguyenLieus = this.loaiSelections.map(loai => ({
      id: loai.selectedLoaiId,
      nguyenLieus: loai.filteredNguyenLieu.map((item: any) => ({
        id: item.id,
        donViTinh:item.donViTinh.id,
        soLuong: item.soLuong,
        hanSuDung: item.hanSuDung,
        soLuongThanhLy: item.soLuongThanhLy,
        chenhLech: item.chenhLech,  
        lyDoThanhLy: item.lyDoThanhLy      
      }))
    }));
    this.isNhanVienUnValid=!this.formData.nhanVien;
    if(this.isNhanVienUnValid){
      return;
    }
    const dataToSend = {
      tenPhieu: this.formData.tenPhieu,
      diaDiem: this.formData.diaDiem,
      ghiChu: this.formData.ghiChu,
      nhanVien: this.formData.nhanVien||null,
      
      loaiNguyenLieus: allLoaiNguyenLieus
    };
    console.log(dataToSend);

    this.save.emit(dataToSend);

  }
  onCancel(): void {
    this.close.emit();
  }
  trackByIndex(index: number, item: any): any {
    return index;
  }



}
