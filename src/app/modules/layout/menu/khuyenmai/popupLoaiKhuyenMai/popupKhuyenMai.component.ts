import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-popupKhuyenMai',
  templateUrl: './popupKhuyenMai.component.html',
  styleUrls: ['./popupKhuyenMai.component.scss']
})
export class PopupKhuyenMaiComponent {
  @Input() formData = {
    tenKhuyenMai: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    giaTri: 0
  };

  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();


  constructor(
  ) {}

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    this.save.emit(this.formData); 
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
   this.close.emit();
  }
}
