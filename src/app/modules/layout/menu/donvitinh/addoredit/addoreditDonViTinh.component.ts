import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addoreditDonViTinh',
  templateUrl: './addoreditDonViTinh.component.html',
  styleUrl: './addoreditDonViTinh.component.scss'
})
export class AddoreditDonViTinhComponent {
// Form data model
  formData = {
    tenDonViTinh: '',
    moTa: '',
  };

  isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa

  constructor(
    public dialogRef: MatDialogRef<AddoreditDonViTinhComponent>,
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
    this.dialogRef.close(this.formData); // Đóng popup và trả về dữ liệu
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(); // Đóng popup mà không trả về dữ liệu
  }
}
