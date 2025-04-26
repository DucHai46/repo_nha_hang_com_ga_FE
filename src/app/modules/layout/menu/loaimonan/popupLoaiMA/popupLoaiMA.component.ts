import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DanhmucmonanService } from '../../danhmucmonan/services/danhmucmonan.service';

@Component({
  selector: 'app-popupLoaiMA',
  templateUrl: './popupLoaiMA.component.html',
  styleUrls: ['./popupLoaiMA.component.scss']
})
export class PopupLoaiMAComponent implements OnInit {
  danhMucMonAn: any[] = [];  

  ngOnInit(): void {
    this.danhMucMonAnService.getDanhMucMonAn({}).subscribe({
      next: (res: any) => {
        this.danhMucMonAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenDanhMuc
        }));
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  // Form data model
  @Input() formData = {
    tenLoai: '',
    moTa: '',
    danhMucMonAn: {
      id: '',
      name: ''
    }
  };

  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
 constructor(
    private danhMucMonAnService: DanhmucmonanService,
  ) {}

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    const dataToSend = {
      ...this.formData,
      danhMucMonAn: {
        id: this.formData.danhMucMonAn.id,
        name: this.formData.danhMucMonAn.name
      }
    };
    this.save.emit(dataToSend);
  }
  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
}
