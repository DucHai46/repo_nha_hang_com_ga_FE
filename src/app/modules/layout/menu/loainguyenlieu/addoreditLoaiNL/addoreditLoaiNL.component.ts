import { Component, Inject, OnInit   } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DanhmucnguyenlieuService } from '../../danhmucnguyenlieu/services/danhmucnguyenlieu.service';

@Component({
  selector: 'app-addoredit-loai-nl',
  templateUrl: './addoreditLoaiNL.component.html',
  styleUrl: './addoreditLoaiNL.component.scss'
})
export class AddoreditLoaiNLComponent implements OnInit {
  danhMucNguyenLieu: any[] = [];  

  ngOnInit(): void {
    this.danhMucNguyenLieuService.getDanhMucNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.danhMucNguyenLieu = res.data.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  // Form data model
  formData = {
    tenLoai: '',
    moTa: '',
    danhMucNguyenLieu: {
      id: '',
      name: ''
    }
  };

  isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa

  constructor(
    private danhMucNguyenLieuService: DanhmucnguyenlieuService,
    public dialogRef: MatDialogRef<AddoreditLoaiNLComponent>,
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
