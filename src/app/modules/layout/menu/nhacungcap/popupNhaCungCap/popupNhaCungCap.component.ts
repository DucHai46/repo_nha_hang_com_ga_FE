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
  ) { }


  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    if (filteredValue.length > 11) {
      filteredValue = filteredValue.substring(0, 11);
    }
    inputElement.value = filteredValue;
    this.formData.soDienThoai = filteredValue;
  }
}
