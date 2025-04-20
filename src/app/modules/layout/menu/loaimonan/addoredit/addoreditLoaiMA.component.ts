import { Component, Inject, OnInit   } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DanhmucmonanService } from '../../danhmucmonan/services/danhmucmonan.service';

@Component({
  selector: 'app-addoredit-loai-ma',
  templateUrl: './addoreditLoaiMA.component.html',
  styleUrl: './addoreditLoaiMA.component.scss'
})
export class AddoreditLoaiMAComponent implements OnInit {
  danhMucMonAn: any[] = [];  

ngOnInit(): void {
    this.danhMucMonAnService.getDanhMucMonAn({}).subscribe({
      next: (res: any) => {
        this.danhMucMonAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenDanhMuc
        }));

        // Nếu đang ở chế độ sửa, gán lại object từ danh sách (để binding đúng)
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
  formData = {
    tenLoai: '',
    moTa: '',
    danhMucMonAn: {
      id: '',
      name: ''
    }
  };

  isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa

 constructor(
    private danhMucMonAnService: DanhmucmonanService,
    public dialogRef: MatDialogRef<AddoreditLoaiMAComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.item) {
      this.isEditMode = true;

      // Gán lại dữ liệu, chuẩn hóa field danhMucNguyenLieu về { id, name }
      this.formData = {
        ...data.item,
        danhMucMonAn: {
          id: data.item.danhMucMonAn.id,
          name: data.item.danhMucMonAn.tenDanhMuc
        }
      };
    }
  }

  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    const dataToSend = {
      ...this.formData,
      danhMucMonAn: {
        id: this.formData.danhMucMonAn.id,
        name: this.formData.danhMucMonAn.name
      }
    };
    this.dialogRef.close(dataToSend);
  }
  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.dialogRef.close(); // Đóng popup mà không trả về dữ liệu
  }
}
