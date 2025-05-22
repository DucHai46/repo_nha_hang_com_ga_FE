import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateUser, User } from '../../../../../models/User';

@Component({
  selector: 'app-popupUser',
  templateUrl: './popupUser.component.html',
  styleUrls: ['./popupUser.component.scss']
})
export class PopupUserComponent {
  @Input() formData: User = {
    id: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    avatar: '',
    gender: false,
    dateOfBirth: '',
    isActive: false,
    phanQuyen: '',
  };

  createUser: CreateUser = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    avatar: '',
    gender: false,
    dateOfBirth: '',
    username: '',
    password: '',
  };

  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor() { }

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
