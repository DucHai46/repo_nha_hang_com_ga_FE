import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-popupChucVu',
  templateUrl: './popupChucVu.component.html',
  styleUrls: ['./popupChucVu.component.scss']
})
export class PopupChucVuComponent implements OnInit {

  @Input() formData = {
    tenChucVu: '',
    moTa: '',
  };

  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
  ) { }


  ngOnInit(): void {
  }

  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }
}
