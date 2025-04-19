import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TuDoService } from '../../tudo/services/tudo.service';
import { DonViTinhService } from '../../donvitinh/services/donvitinh.service';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';

@Component({
  selector: 'app-addoreditNguyenLieu',
  templateUrl: './addoreditNguyenLieu.component.html',
  styleUrl: './addoreditNguyenLieu.component.scss'
})
export class AddoreditNguyenLieuComponent implements OnInit {
  loaiNguyenLieu: any[] = [];
  tuDo: any[] = [];
  donViTinh: any[] = [];

  formData = {
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

  isEditMode: boolean = false;

  constructor(
    private loaiNguyenLieuService: LoainguyenlieuService,
    private tuDoService: TuDoService,
    private donViTinhService: DonViTinhService,
    public dialogRef: MatDialogRef<AddoreditNguyenLieuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.item) {
      this.isEditMode = true;
      const item = data.item;

      this.formData = {
        ...item,
        loaiNguyenLieu: {
          id: item.loaiNguyenLieu.id,
          name: item.loaiNguyenLieu.tenLoai
        },
        tuDo: {
          id: item.tuDo.id,
          name: item.tuDo.tenTuDo
        },
        donViTinh: {
          id: item.donViTinh.id,
          name: item.donViTinh.tenDonViTinh
        }
      };
    }
  }

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

    this.dialogRef.close(dataToSend);
  }
  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(); // Đóng popup mà không trả về dữ liệu
  }
}
