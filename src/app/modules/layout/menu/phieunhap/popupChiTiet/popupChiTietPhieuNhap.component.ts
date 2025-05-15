import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';


@Component({
  selector: 'app-popupChiTietPhieuNhap',
  templateUrl: './popupChiTietPhieuNhap.component.html',
  styleUrls: ['./popupChiTietPhieuNhap.component.scss']
})
export class PopupChiTietPhieuNhapComponent  {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  constructor(private fileService: FileService) {}
  getTrangThaiText(code: number): string {
  switch (code) {
    case 0: return 'Hàng mới';
    case 1: return 'Đang sử dụng';
    case 2: return 'Đã sử dụng';
    default: return 'Không xác định';
  }
  }

}
