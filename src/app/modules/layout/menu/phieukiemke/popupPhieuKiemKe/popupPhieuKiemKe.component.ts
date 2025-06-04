import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';
import { NhanVienService } from '../../nhanvien/services/nhanvien.service';
import { PhieuKiemKeService } from '../services/phieukiemke.service';
import { PhieuXuatService } from '../../phieuxuat/services/phieuxuat.service';
import { PhieuNhapService } from '../../phieunhap/services/phieunhap.service';
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
  phieuNhap: any[] = [];
  phieuXuat: any[] = [];
  nhanVien: any;
  nhanViens: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
    private loaiNguyenLieuService: LoainguyenlieuService,
    private nhanVienService: NhanVienService,
    private notification: NzNotificationService,
    private phieuKiemKeService: PhieuKiemKeService,
    private nguyenLieuService: NguyenlieuService,
    private phieuNhapService: PhieuNhapService,
    private phieuXuatService: PhieuXuatService
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
    this.phieuNhapService.getPhieuNhap({}).subscribe({
      next: (res: any) => {
        this.phieuNhap=res.data.data;
        console.log("Phieu nhap:",this.phieuNhap);
      },
      error: (err: any) => console.log(err)
    });
    this.phieuXuatService.getPhieuXuat({}).subscribe({
      next: (res: any) => {
        this.phieuXuat=res.data.data;
        console.log("Phieu xuat:",this.phieuXuat);
      },
      error: (err: any) => console.log(err)
    });
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
      filteredNguyenLieu: [
        {
          id: '',
          name: '',
          soLuong: 0,
          soLuongNhap:0,
          soLuongXuat:0,
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

    this.nguyenLieuService.getNguyenLieu({ loaiNguyenLieuId: selectedLoaiId }).subscribe({
      next: (res: any) => {
        const nguyenLieuList = res.data.data.map((item: any) => {
          const nguyenLieuItem = {
            id: item.id,
            name: item.tenNguyenLieu,
            soLuong: item.soLuong,
            soLuongNhap: 0,
            soLuongXuat: 0
          };

          // Tính số lượng nhập từ phieuNhap
          if (this.phieuNhap) {
            this.phieuNhap.forEach((phieu: any) => {
              phieu.nguyenLieus.forEach((nl: any) => {
                if (nl.id === item.id) {
                  nguyenLieuItem.soLuongNhap += nl.soLuong;
                  console.log("So luong nhap:",nguyenLieuItem.soLuongNhap);
                }
              });
            });
          }

          // Tính số lượng xuất từ phieuXuat
          if (this.phieuXuat) {
            this.phieuXuat.forEach((phieu: any) => {
              phieu.loaiNguyenLieus.forEach((loai: any) => {
                loai.nguyenLieus.forEach((nl: any) => {
                  if (nl.id === item.id) {
                    nguyenLieuItem.soLuongXuat += nl.soLuongXuat;
                    console.log("So luong xuat",nguyenLieuItem.soLuongXuat);
                  }
                });
              });
            });
          }

          return nguyenLieuItem;
        });

        this.loaiSelections[index].filteredNguyenLieu = nguyenLieuList;
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
  isNhanVienUnValid=false;
  onSave(): void {
    console.log(this.loaiSelections);
    const allLoaiNguyenLieus = this.loaiSelections.map(loai => ({
      id: loai.selectedLoaiId,
      nguyenLieus: loai.filteredNguyenLieu.map((item: any) => ({
        id: item.id,
        soLuongThucTe: item.soLuongThucTe,
        soLuongNhap: item.soLuongNhap,
        soLuongXuat: item.soLuongXuat,
        chenhLech: item.chenhLech,
        ghiChu: item.ghiChu
        
      }))
    }));
    this.isNhanVienUnValid=!this.formData.nhanVien;
    if(this.isNhanVienUnValid){
      return;
    }

    const dataToSend = {
      id: this.formData.id,
      tenPhieu: this.formData.tenPhieu,
      ghiChu: this.formData.ghiChu,
      diaDiem: this.formData.diaDiem,
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
