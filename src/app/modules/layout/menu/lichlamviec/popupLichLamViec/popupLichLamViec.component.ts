import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popupLichLamViec',
  templateUrl: './popupLichLamViec.component.html',
  styleUrl: './popupLichLamViec.component.scss'
})
export class PopupLichLamViecComponent {
  @Input() formData = {
    tenCaLamViec: '',
    khungThoiGian: '',
    moTa: '',
  };

  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor() {}

  //Hàm xử lý khi nhấn nút lưu
  onSave(): void {
    this.save.emit(this.formData);
  }

  //Hàm xử lý khi nhấn nút "Hủy" - Cancel
  onCancel(): void {
    this.close.emit();
  }

}
