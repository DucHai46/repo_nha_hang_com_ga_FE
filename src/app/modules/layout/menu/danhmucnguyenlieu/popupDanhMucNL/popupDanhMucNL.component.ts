import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-popupDanhMucNL',
  templateUrl: './popupDanhMucNL.component.html',
  styleUrls: ['./popupDanhMucNL.component.scss']
})
export class PopupDanhMucNLComponent {
  @Input() formData = {
    tenDanhMuc: '',
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
