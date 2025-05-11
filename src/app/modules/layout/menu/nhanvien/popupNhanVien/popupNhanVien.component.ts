import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChucVuService } from '../../chucvu/services/chucvu.service';
@Component({
  selector: 'app-popupNhanVien',
  templateUrl: './popupNhanVien.component.html',
  styleUrls: ['./popupNhanVien.component.scss']
})
export class PopupNhanVienComponent implements OnInit {
  chucVuList: any[] = [];
  searchForm: any = {
    isPaging: false,
    PageNumber: 1,
    PageSize: 100,
  };

  constructor(private chucVuService: ChucVuService) { }

  ngOnInit(): void {
    this.chucVuService.getChucVu(this.searchForm).subscribe((res: any) => {
      this.chucVuList = res.data.data;
    });
  }

  @Input() formData = {
    tenNhanVien: '',
    soDienThoai: '',
    email: '',
    diaChi: '',
    ngaySinh: '',
    chucVu: '',
  };
  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    this.save.emit(this.formData); // Đóng popup và trả về dữ liệu
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
}
