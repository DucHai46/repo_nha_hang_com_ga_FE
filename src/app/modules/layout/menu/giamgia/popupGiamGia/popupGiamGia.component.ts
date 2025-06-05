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
