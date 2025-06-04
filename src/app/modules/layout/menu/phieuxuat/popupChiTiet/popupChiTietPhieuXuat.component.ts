import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NhaHangService } from '../../nhahang/services/nhahang.service';


@Component({
  selector: 'app-popupChiTietPhieuXuat',
  templateUrl: './popupChiTietPhieuXuat.component.html',
  styleUrls: ['./popupChiTietPhieuXuat.component.scss']
})
export class PopupChiTietPhieuXuatComponent implements OnInit  {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng
  nhaHang: any;

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  
  constructor(private fileService: FileService,
    private nhaHangService: NhaHangService
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

}
