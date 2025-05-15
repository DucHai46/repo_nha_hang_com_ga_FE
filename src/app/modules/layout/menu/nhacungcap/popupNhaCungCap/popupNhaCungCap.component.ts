import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-popupNhaCungCap',
  templateUrl: './popupNhaCungCap.component.html',
  styleUrls: ['./popupNhaCungCap.component.scss']
})
export class PopupNhaCungCapComponent {
  @Input() formData = {
    tenNhaCungCap: '',
    soDienThoai: '',
    diaChi: '',
  };
  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
  ) {}


  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    this.save.emit(this.formData); // Đóng popup và trả về dữ liệu
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
  onInputChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    value = value.replace(/[^0-9]/g, '');
    inputElement.value = value;
    this.formData.soDienThoai = value;
  }
}
