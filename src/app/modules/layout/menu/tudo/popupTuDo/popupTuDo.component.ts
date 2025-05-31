import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaiTuDoService } from '../../loaitudo/services/loaitudo.service';
@Component({
  selector: 'app-popupTuDo',
  templateUrl: './popupTuDo.component.html',
  styleUrls: ['./popupTuDo.component.scss']
})
export class PopupTuDoComponent implements OnInit {
  loaiTuDo: any[] = [];  

  ngOnInit(): void {
    this.loaiTuDoService.getLoaiTuDo({}).subscribe({
      next: (res: any) => {
        this.loaiTuDo = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai 
        }));
  
        if (this.isEditMode) {
          const categoryId = this.formData.loaiTuDo.id;
          const selectedCategory = this.loaiTuDo.find(
            (cat) => cat.id === categoryId
          );
          if (selectedCategory) {
            this.formData.loaiTuDo = selectedCategory; 
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
    tenTuDo: '',
    moTa: '',
    loaiTuDo: {
      id: '',
      name: ''
    }
  };

  @Input() isEditMode: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(
    private loaiTuDoService: LoaiTuDoService,
  ) {}
  isLoaiTuInValid= false;

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    this.isLoaiTuInValid = !this.formData.loaiTuDo || !this.formData.loaiTuDo.id;
    if (this.isLoaiTuInValid) {
      return; 
    }
    const dataToSend = {
      ...this.formData,
      loaiTuDo: this.formData.loaiTuDo.id
    };
    this.save.emit(dataToSend);
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
}
