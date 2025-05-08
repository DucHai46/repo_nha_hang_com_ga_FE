import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DanhmucnguyenlieuService } from '../../danhmucnguyenlieu/services/danhmucnguyenlieu.service';

@Component({
  selector: 'app-popupLoaiNL',
  templateUrl: './popupLoaiNL.component.html',
  styleUrls: ['./popupLoaiNL.component.scss']
})
export class PopupLoaiNLComponent implements OnInit {
  danhMucNguyenLieu: any[] = [];  

  ngOnInit(): void {
    this.danhMucNguyenLieuService.getDanhMucNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.danhMucNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenDanhMuc
        }));

        // Nếu đang ở chế độ sửa, gán lại object từ danh sách (để binding đúng)
        if (this.isEditMode) {
          const categoryId = this.formData.danhMucNguyenLieu.id;
          const selectedCategory = this.danhMucNguyenLieu.find(
            (cat) => cat.id === categoryId
          );
          if (selectedCategory) {
            this.formData.danhMucNguyenLieu = selectedCategory;
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
    danhMucNguyenLieu: {
      id: '',
      name: ''
    }
  };

  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

 constructor(
    private danhMucNguyenLieuService: DanhmucnguyenlieuService,
  ) {}

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    const dataToSend = {
      ...this.formData,
      danhMucNguyenLieu: this.formData.danhMucNguyenLieu.id
    };
    this.save.emit(dataToSend);
  }
  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
}
