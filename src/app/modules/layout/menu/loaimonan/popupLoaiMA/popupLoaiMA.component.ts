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
        if (this.isEditMode) {
          const categoryId = this.formData.danhMucMonAn.id;
          const selectedCategory = this.danhMucMonAn.find(
            (cat) => cat.id === categoryId
          );
          if (selectedCategory) {
            this.formData.danhMucMonAn = selectedCategory; 
          }
        }
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
  isDanhMucInValid =false;

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    this.isDanhMucInValid = !this.formData.danhMucMonAn || !this.formData.danhMucMonAn.id;
    if (this.isDanhMucInValid) {
      return; 
    }
    const dataToSend = {
      ...this.formData,
      danhMucMonAn:this.formData.danhMucMonAn.id
    };
    this.save.emit(dataToSend);
  }
  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
}
