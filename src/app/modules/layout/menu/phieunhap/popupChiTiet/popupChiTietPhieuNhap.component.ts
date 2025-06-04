import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NhaHangService } from '../../nhahang/services/nhahang.service';



@Component({
  selector: 'app-popupChiTietPhieuNhap',
  templateUrl: './popupChiTietPhieuNhap.component.html',
  styleUrls: ['./popupChiTietPhieuNhap.component.scss']
})
export class PopupChiTietPhieuNhapComponent implements OnInit {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng
  nhaHang: any;

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  constructor(private fileService: FileService
    , private nhaHangService: NhaHangService
  ) {}
  ngOnInit(): void {
    this.nhaHangService.getNhaHang({isActive: true}).subscribe({
      next: (res: any) => {
        this.nhaHang= res.data.data[0];
        console.log(this.nhaHang);
      },
      error: (err: any) => console.log(err)
    });
  }
  getTrangThaiText(code: number): string {
  switch (code) {
    case 0: return 'Hàng mới';
    case 1: return 'Đang sử dụng';
    case 2: return 'Đã sử dụng';
    default: return 'Không xác định';
  }
  }

}
