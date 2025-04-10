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
        this.loaiTuDo = res.data.data;
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
      // Nếu có dữ liệu truyền vào, đây là chế độ Sửa
      this.isEditMode = true;
      this.formData = { ...data.item }; // Điền dữ liệu vào form
    }
  }

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    console.log(this.formData);
    this.dialogRef.close(this.formData); // Đóng popup và trả về dữ liệu
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(); // Đóng popup mà không trả về dữ liệu
  }
}
