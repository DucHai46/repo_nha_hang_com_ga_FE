import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popupKhachhang',
  templateUrl: './popupKhachhang.component.html',
  styleUrl: './popupKhachhang.component.scss'
})
export class PopupKhachhangComponent {
  @Input() formData = {
    tenKhachHang: '',
    diaChi: '',
    email: '',
    soDienThoai: '',
  };

  @Input() isEditMode: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor() { }

  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }
} 
