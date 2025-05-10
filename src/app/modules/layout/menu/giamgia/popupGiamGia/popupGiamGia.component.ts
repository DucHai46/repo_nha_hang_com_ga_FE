import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-popupGiamGia',
  templateUrl: './popupGiamGia.component.html',
  styleUrls: ['./popupGiamGia.component.scss']
})
export class PopupGiamGiaComponent {
  @Input() formData = {
    tenGiamGia: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    giaTri: 0,
    moTa: '',
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
