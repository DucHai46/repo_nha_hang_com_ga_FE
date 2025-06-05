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
  @Input() isEditMode: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
  ) {}


  onSave(): void {
    this.save.emit(this.formData); 
  }

  onCancel(): void {
    this.close.emit(); 
  }
  onInputChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    value = value.replace(/[^0-9]/g, '');
    inputElement.value = value;
    this.formData.soDienThoai = value;
  }
}
