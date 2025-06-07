import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-popupKhuyenMai',
  templateUrl: './popupKhuyenMai.component.html',
  styleUrls: ['./popupKhuyenMai.component.scss']
})
export class PopupKhuyenMaiComponent implements OnInit {
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
  ngOnInit(): void {
    this.formData.ngayBatDau = this.toDateString(this.formData.ngayBatDau);
    this.formData.ngayKetThuc = this.toDateString(this.formData.ngayKetThuc);
  }
  toDateString(date: any): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSave(): void {
    this.save.emit(this.formData); 
  }

  onCancel(): void {
   this.close.emit();
  }
}
