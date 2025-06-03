import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popupCaLamViec',
  templateUrl: './popupCaLamViec.component.html',
  styleUrl: './popupCaLamViec.component.scss'
})
export class PopupCaLamViecComponent implements OnInit  {
  @Input() formData = {
    tenCaLamViec: '',
    // khungThoiGian: '',
    gioVao: '',
    gioRa: '',
    moTa: '',
  };

  ngOnInit(): void {
    console.log(this.formData); // Log dữ liệu đầu vào để kiểm tra giá trị đầu vào
  }
  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  isTenCaLamViecUnvalid = false;
  isGioVaoUnvalid = false;
  isGioRaUnvalid = false;

  constructor() {}

  //Hàm xử lý khi nhấn nút lưu
  onSave(): void {
    // Kiểm tra tính hợp lệ của dữ liệu
    this.isTenCaLamViecUnvalid = !this.formData.tenCaLamViec || this.formData.tenCaLamViec.trim() === '';
    this.isGioVaoUnvalid = !this.formData.gioVao;
    this.isGioRaUnvalid = !this.formData.gioRa;

    if (this.isTenCaLamViecUnvalid || this.isGioVaoUnvalid || this.isGioRaUnvalid) {
      return; // Không làm gì cả nếu dữ liệu không hợp lệ
    }

    this.save.emit(this.formData);
  }

  //Hàm xử lý khi nhấn nút "Hủy" - Cancel
  onCancel(): void {
    this.close.emit();
  }



}
