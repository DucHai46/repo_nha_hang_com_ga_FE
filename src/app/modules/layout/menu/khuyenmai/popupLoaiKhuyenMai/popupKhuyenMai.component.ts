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
}
