import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';


@Component({
  selector: 'app-popupChiTietPhieuKiemKe',
  templateUrl: './popupChiTietPhieuKiemKe.component.html',
  styleUrls: ['./popupChiTietPhieuKiemKe.component.scss']
})
export class PopupChiTietPhieuKiemKeComponent  {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  constructor(private fileService: FileService) {}

}
