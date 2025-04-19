import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaiTuDoService } from '../../loaitudo/services/loaitudo.service';

@Component({
  selector: 'app-addoreditTuDo',
  templateUrl: './addoreditTuDo.component.html',
  styleUrl: './addoreditTuDo.component.scss'
})
export class AddoreditTuDoComponent implements OnInit {
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
  formData = {
    tenTuDo: '',
    moTa: '',
    loaiTuDo: {
      id: '',
      name: ''
    }
  };

  isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa

  constructor(
    private loaiTuDoService: LoaiTuDoService,
    public dialogRef: MatDialogRef<AddoreditTuDoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.item) {
      this.isEditMode = true;
  
      this.formData = {
        ...data.item,
        loaiTuDo: {
          id: data.item.loaiTuDo.id,
          name: data.item.loaiTuDo.tenLoai 
        }
      };
    }
  }

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    const dataToSend = {
      ...this.formData,
      danhMucNguyenLieu: {
        id: this.formData.loaiTuDo.id,
        name: this.formData.loaiTuDo.name
      }
    };
    this.dialogRef.close(dataToSend);
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(); // Đóng popup mà không trả về dữ liệu
  }
}
