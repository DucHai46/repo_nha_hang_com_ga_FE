import { NhanVienService } from './../../nhanvien/services/nhanvien.service';
import { CaLamViecService } from './../../calamviec/services/calamviec.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-popupLichLamViec',
  templateUrl: './popupLichLamViec.component.html',
  styleUrl: './popupLichLamViec.component.scss'
})
export class PopupLichLamViecComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.formData);
    
    // Khởi tạo formData nếu đang tạo mới
    if (!this.isEditMode) {
      this.formData = {
        ngay: new Date(),
        chiTietLichLamViec: [
          {
            caLamViec: {
              id: '',
              name: ''
            },
            moTa: '',
            nhanVienCa: [
              {
                nhanVien: {
                  id: '',
                  name: ''
                },
                moTa: ''
              }
            ]
          }
        ],
        moTa: ''
      };
    }
    
    // Lấy danh sách nhân viên
    this.nhanVienService.getNhanVien({}).subscribe({
      next: (res: any) => {
        this.nhanVien = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNhanVien,    
        }))
        console.log(this.nhanVien);
      },
    });
  
    // Lấy danh sách ca làm việc
    this.caLamViecService.getCaLamViec({}).subscribe({
      next: (res: any) => {
        this.caLamViec = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenCaLamViec,
        }))
        console.log(this.caLamViec);
      },
    });
  }
  @Input() formData: any;

  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  // Khai báo các biến
  nhanVien: any[] = [];
  caLamViec: any[] = [];

  constructor(
    private caLamViecService: CaLamViecService,
    private notification: NzNotificationService,
    private nhanVienService: NhanVienService,

  ) {}

  //Hàm xử lý khi nhấn nút lưu
  onSave(): void {
    console.log(this.formData);
    const dataToSend = {
      id: this.formData.id, // Giữ lại ID nếu đang ở chế độ sửa
      ngay: this.formData.ngay,
      moTa: this.formData.moTa,
      chiTietLichLamViec: this.formData.chiTietLichLamViec.map((item: any) => ({
        caLamViec:  item.caLamViec.id,
        moTa: item.moTa,
        nhanVienCa: item.nhanVienCa.map((nv: any) => ({
          nhanVien: nv.nhanVien.id,
          moTa: nv.moTa
        }))
      }))
    }
    this.save.emit(dataToSend);
  }

  //Hàm xử lý khi nhấn nút "Hủy" - Cancel
  onCancel(): void {
    this.close.emit();
  }

/** Thêm ca làm việc mới */
addCa() {
  this.formData.chiTietLichLamViec = this.formData.chiTietLichLamViec || [];
  this.formData.chiTietLichLamViec.push({
    caLamViec: {
      id: '',
      name: ''
    },
    moTa: '',
    nhanVienCa: [
      { 
        nhanVien: {
          id: '',
          name: ''
        }, 
        moTa: '' 
      }
    ]
  });
}

/** Xóa một ca làm việc tại vị trí index */
removeCa(index: number) {
  if (this.formData.chiTietLichLamViec.length > 1) {
    this.formData.chiTietLichLamViec.splice(index, 1);
  } else {
    alert('Cần ít nhất một ca làm việc.');
  }
}

/** Thêm nhân viên vào ca làm việc thứ i */
addNhanVien(caIndex: number) {
  this.formData.chiTietLichLamViec[caIndex].nhanVienCa.push({
    nhanVien: {
      id: '',
      name: ''
    },
    moTa: ''
  });
}

/** Xóa nhân viên tại vị trí j trong ca làm việc thứ i */
removeNhanVien(caIndex: number, nvIndex: number) {
  const nhanVienList = this.formData.chiTietLichLamViec[caIndex].nhanVienCa;
  if (nhanVienList.length > 1) {
    nhanVienList.splice(nvIndex, 1);
  } else {
    alert('Mỗi ca cần có ít nhất một nhân viên.');
  }
}
}
