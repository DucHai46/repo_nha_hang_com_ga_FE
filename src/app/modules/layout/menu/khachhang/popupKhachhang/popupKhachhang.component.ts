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

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    if (filteredValue.length > 11) {
      filteredValue = filteredValue.substring(0, 11);
    }
    inputElement.value = filteredValue;
    this.formData.soDienThoai = filteredValue;
  }
} 
