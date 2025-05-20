import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';
import { NhanVienService } from '../../nhanvien/services/nhanvien.service';
import { PhieuKiemKeService } from '../services/phieukiemke.service';
import { NguyenlieuService } from '../../nguyenlieu/services/nguyenlieu.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-popupPhieuKiemKe',
  templateUrl: './popupPhieuKiemKe.component.html',
  styleUrls: ['./popupPhieuKiemKe.component.scss']
})
export class PopupPhieuKiemKeComponent implements OnInit {
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
      filteredNguyenLieu: [
        // {
        //   id: '',
        //   name: '',
        //   soLuong: 0,
        //   soLuongThucTe:0,
        //   chenhLech:0,
        //   ghiChu:""  
        // }
      ]
    }
  ];
  loaiNguyenLieu: any[] = [];
  nhanVien: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
    private loaiNguyenLieuService: LoainguyenlieuService,
    private nhanVienService: NhanVienService,
    private notification: NzNotificationService,
    private phieuKiemKeService: PhieuKiemKeService,
    private nguyenLieuService: NguyenlieuService
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
    this.nhanVienService.getNhanVien({}).subscribe({
      next: (res: any) => {
        this.nhanVien = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNhanVien
        }));
      },
      error: (err: any) => console.log(err)
    });

  }

  addLoaiSelection(): void {
    this.loaiSelections.push({
      selectedLoaiId: '',
      selectedLoaiName: '',
      filteredNguyenLieu: [
        {
          id: '',
          name: '',
          soLuong: 0,
          soLuongThucTe:0,
          chenhLech:0,
          ghiChu:""  
        }
      ]
    });
  }
    onLoaiNguyenLieuChange(index: number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].selectedLoaiName = this.loaiNguyenLieu.find(l => l.id === selectedLoaiId)?.name || '';
    this.nguyenLieuService.getNguyenLieu({loaiNguyenLieuId: this.loaiSelections[index].selectedLoaiId}).subscribe({
      next: (res: any) => {
        // console.log(res.data.data);
        this.loaiSelections[index].filteredNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNguyenLieu,
          soLuong:item.soLuong,
        }));
        // console.log(this.loaiSelections[index].filteredMonAn);
      },
      error: (err: any) => console.log(err)
    });

  }
  isLoaiDuplicate(selectedLoaiId: string, index: number): boolean {
    return this.loaiSelections.some((s, idx) => idx !== index && s.selectedLoaiId === selectedLoaiId);
  }
  updateChenhLech(loai: any): void {
    const soLuong = Number(loai.soLuong) || 0;
    const donGia = Number(loai.soLuongThucTe) || 0;
    loai.chenhLech = soLuong - donGia;
  }
  removeNguyenLieuInLoai(loaiIndex: number, nlIndex: number): void {
    this.loaiSelections[loaiIndex].filteredNguyenLieu.splice(nlIndex, 1);
  }

  removeLoaiSelection(index: number): void {
    this.loaiSelections.splice(index, 1);
  }
  onSave(): void {
    console.log(this.loaiSelections);
    const allLoaiNguyenLieus = this.loaiSelections.map(loai => ({
      id: loai.selectedLoaiId,
      nguyenLieus: loai.filteredNguyenLieu.map((item: any) => ({
        id: item.id,
        soLuongThucTe: item.soLuongThucTe,
        chenhLech: item.chenhLech,
        ghiChu: item.ghiChu
        
      }))
    }));

    const dataToSend = {
      id: this.formData.id,
      tenPhieu: this.formData.tenPhieu,
      ghiChu: this.formData.ghiChu,
      diaDiem: this.formData.diaDiem,
      nhanVien: this.formData.nhanVien,
      
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
