import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popupCaLamViec',
  templateUrl: './popupCaLamViec.component.html',
  styleUrl: './popupCaLamViec.component.scss'
})
export class PopupCaLamViecComponent implements OnInit  {
  @Input() formData = {
    tenCaLamViec: '',
    gioVao: '',
    gioRa: '',
    moTa: '',
  };

  ngOnInit(): void {
  }
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  isTenCaLamViecUnvalid = false;
  isGioVaoUnvalid = false;
  isGioRaUnvalid = false;

  constructor() {}

  onSave(): void {
    this.isTenCaLamViecUnvalid = !this.formData.tenCaLamViec || this.formData.tenCaLamViec.trim() === '';
    this.isGioVaoUnvalid = !this.formData.gioVao;
    this.isGioRaUnvalid = !this.formData.gioRa;

    if (this.isTenCaLamViecUnvalid || this.isGioVaoUnvalid || this.isGioRaUnvalid) {
      return;
    }

    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }



}
