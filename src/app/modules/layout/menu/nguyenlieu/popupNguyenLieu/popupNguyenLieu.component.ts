import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TuDoService } from '../../tudo/services/tudo.service';
import { DonViTinhService } from '../../donvitinh/services/donvitinh.service';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';

@Component({
  selector: 'app-popupNguyenLieu',
  templateUrl: './popupNguyenLieu.component.html',
  styleUrls: ['./popupNguyenLieu.component.scss']
})
export class PopupNguyenLieuComponent implements OnInit {
  loaiNguyenLieu: any[] = [];
  tuDo: any[] = [];
  donViTinh: any[] = [];

  ngOnInit(): void {
    this.loaiNguyenLieuService.getLoaiNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.loaiNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai
        }));

        if (this.isEditMode) {
          const selected = this.loaiNguyenLieu.find(x => x.id === this.formData.loaiNguyenLieu.id);
          if (selected) {
            this.formData.loaiNguyenLieu = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    });

    this.tuDoService.getTuDo({}).subscribe({
      next: (res: any) => {
        this.tuDo = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenTuDo
        }));

        if (this.isEditMode) {
          const selected = this.tuDo.find(x => x.id === this.formData.tuDo.id);
          if (selected) {
            this.formData.tuDo = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    });

    this.donViTinhService.getDonViTinh({}).subscribe({
      next: (res: any) => {
        this.donViTinh = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenDonViTinh
        }));

        if (this.isEditMode) {
          const selected = this.donViTinh.find(x => x.id === this.formData.donViTinh.id);
          if (selected) {
            this.formData.donViTinh = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    });
  }
  // Form data model
  @Input() formData = {
    tenNguyenLieu: '',
    moTa: '',
    soLuong: 0,
    loaiNguyenLieu: {
      id: '',
      name: ''
    },
    tuDo: {
      id: '',
      name: ''
    },
    donViTinh: {
      id: '',
      name: ''
    },
    trangThai: 0
  };

  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

 constructor(
  private loaiNguyenLieuService: LoainguyenlieuService,
  private tuDoService: TuDoService,
  private donViTinhService: DonViTinhService,
  ) {}

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    const dataToSend = {
      ...this.formData,
      loaiNguyenLieu: {
        id: this.formData.loaiNguyenLieu.id,
        name: this.formData.loaiNguyenLieu.name
      },
      tuDo: {
        id: this.formData.tuDo.id,
        name: this.formData.tuDo.name
      },
      donViTinh: {
        id: this.formData.donViTinh.id,
        name: this.formData.donViTinh.name
      }
    };
    this.save.emit(dataToSend);
  }
  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
}
