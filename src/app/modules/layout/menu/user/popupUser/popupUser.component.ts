import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateUser, User } from '../../../../../models/User';
import { NhanVienService } from '../../nhanvien/services/nhanvien.service';
@Component({
  selector: 'app-popupUser',
  templateUrl: './popupUser.component.html',
  styleUrls: ['./popupUser.component.scss']
})
export class PopupUserComponent implements OnInit {
  @Input() formData: User = {
    id: '',
    fullName: '',
    isActive: false,
    phanQuyen: '',
    nhanVienId: '',
  };

  createUser: CreateUser = {
    fullName: '',
    username: '',
    password: '',
    nhanVienId: '',
  };

  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(private nhanVienService: NhanVienService) { }
  nhanVien: any[] = [];
  ngOnInit(): void {
    console.log(this.formData);
    this.nhanVienService.getNhanVien({ isPaging: true, page: 1, size: 1000 }).subscribe(
      {
        next: (res: any) => {
          this.nhanVien = res.data.data;
        }
      }
    )
  }
  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    if (this.isEditMode) {
      this.save.emit(this.formData);
    } else {
      this.save.emit(this.createUser);
    }
  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit();
  }
}
