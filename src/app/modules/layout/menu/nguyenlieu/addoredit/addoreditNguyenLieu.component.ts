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


  ngOnInit(): void {
    this.loaiNguyenLieuService.getLoaiNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.loaiNguyenLieu = res.data.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    this.tuDoService.getTuDo({}).subscribe({
      next: (res: any) => {
        this.tuDo = res.data.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    this.donViTinhService.getDonViTinh({}).subscribe({
      next: (res: any) => {
        this.donViTinh = res.data.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  // Form data model
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

  isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa

  constructor(
    private loaiNguyenLieuService: LoainguyenlieuService,
    private tuDoService: TuDoService,
    private donViTinhService: DonViTinhService,
    public dialogRef: MatDialogRef<AddoreditNguyenLieuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.item) {
      // Nếu có dữ liệu truyền vào, đây là chế độ Sửa
      this.isEditMode = true;
      this.formData = { ...data.item }; // Điền dữ liệu vào form
    }
  }

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    console.log(this.formData);
    this.dialogRef.close(this.formData); // Đóng popup và trả về dữ liệu
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(); // Đóng popup mà không trả về dữ liệu
  }
}
