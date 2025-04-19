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
      this.isEditMode = true;

      // Gán lại dữ liệu, chuẩn hóa field danhMucNguyenLieu về { id, name }
      this.formData = {
        ...data.item,
        danhMucNguyenLieu: {
          id: data.item.danhMucNguyenLieu.id,
          name: data.item.danhMucNguyenLieu.tenDanhMuc
        }
      };
    }
  }

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    const dataToSend = {
      ...this.formData,
      danhMucNguyenLieu: {
        id: this.formData.danhMucNguyenLieu.id,
        name: this.formData.danhMucNguyenLieu.name
      }
    };
    this.dialogRef.close(dataToSend);
  }
  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(); // Đóng popup mà không trả về dữ liệu
  }
}
