import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popupPhuPhi',
  templateUrl: './popupPhuPhi.component.html',
  styleUrl: './popupPhuPhi.component.scss'
})
export class PopupPhuPhiComponent {
  @Input() formData = {
    tenPhuPhi: '',
    giaTri: 0,
    moTa: '',
    trangThai: 0,
  };

  @Input() isEditMode: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor() {}

  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }

}
