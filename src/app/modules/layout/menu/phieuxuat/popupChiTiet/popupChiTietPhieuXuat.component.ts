import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';


@Component({
  selector: 'app-popupChiTietPhieuXuat',
  templateUrl: './popupChiTietPhieuXuat.component.html',
  styleUrls: ['./popupChiTietPhieuXuat.component.scss']
})
export class PopupChiTietPhieuXuatComponent  {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  constructor(private fileService: FileService) {}

}
