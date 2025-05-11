import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-popupChucVu',
  templateUrl: './popupChucVu.component.html',
  styleUrls: ['./popupChucVu.component.scss']
})
export class PopupChucVuComponent {
  @Input() formData = {
    tenChucVu: '',
    moTa: '',
  };
  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
  ) { }


  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    this.save.emit(this.formData); // Đóng popup và trả về dữ liệu
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
}
