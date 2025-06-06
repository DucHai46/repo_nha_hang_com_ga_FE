import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/services/user.service';
import { NhanVienService } from '../nhanvien/services/nhanvien.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-userInfor',
  templateUrl: './userInfor.component.html',
  styleUrls: ['./userInfor.component.scss']
})
export class UserInforComponent implements OnInit {

  constructor(private userService: UserService, private nhanVienService: NhanVienService, private notification: NzNotificationService, private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      tenNhanVien: ['', Validators.required],
      diaChi: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      soDienThoai: ['', Validators.required],
      ngaySinh: ['', Validators.required]
    });

    this.accountForm = this.fb.group({
      userName: ['', Validators.required],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
    if (this.isChangingPassword) {
      this.accountForm.get('oldPassword')?.setValidators([Validators.required]);
      this.accountForm.get('newPassword')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.accountForm.get('confirmPassword')?.setValidators([Validators.required]);
      this.accountForm.setValidators([this.passwordMatchValidator, this.passwordNotSameValidator]);
    } else {
      this.accountForm.get('oldPassword')?.clearValidators();
      this.accountForm.get('newPassword')?.clearValidators();
      this.accountForm.get('confirmPassword')?.clearValidators();
      this.accountForm.clearValidators();
      this.accountForm.patchValue({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    this.accountForm.get('oldPassword')?.updateValueAndValidity();
    this.accountForm.get('newPassword')?.updateValueAndValidity();
    this.accountForm.get('confirmPassword')?.updateValueAndValidity();
    this.accountForm.updateValueAndValidity();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  passwordNotSameValidator(control: AbstractControl): ValidationErrors | null {
    const oldPassword = control.get('oldPassword');
    const newPassword = control.get('newPassword');

    if (oldPassword && newPassword && oldPassword.value === newPassword.value) {
      return { passwordSame: true };
    }
    return null;
  }

  nhanVien: any;
  userInfo: any;
  isActive = 'personal';
  personalForm: FormGroup;
  accountForm: FormGroup;
  isChangingPassword = false;

  ngOnInit() {
    const userInfor = JSON.parse(localStorage.getItem('userInfor') || '{}');
    this.nhanVienService.getNhanVienById(userInfor.nhanVienId).subscribe({
      next: (res: any) => {
        if (res) {
          this.nhanVien = res.data;
          this.personalForm.patchValue(this.nhanVien);
        }
      },
      error: (err: any) => {
      }
    });
    this.userService.getUserInfo(userInfor.id).subscribe({
      next: (res: any) => {
        if (res) {
          this.userInfo = res;
          this.accountForm.patchValue(this.userInfo);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  savePersonalInfo() {
    if (this.personalForm.valid) {
      const formData = {
        tenNhanVien: this.personalForm.value.tenNhanVien,
        soDienThoai: this.personalForm.value.soDienThoai,
        email: this.personalForm.value.email,
        diaChi: this.personalForm.value.diaChi,
        ngaySinh: this.personalForm.value.ngaySinh,
        chucVu: this.nhanVien.chucVu.id
      };
      this.nhanVienService.updateNhanVien(this.nhanVien.id, formData).subscribe({
        next: (res: any) => {
          if (res) {
            this.nhanVien = res.data;
            this.notification.create(
              'success',
              'Thông báo!',
              `Cập nhật thông tin thành công`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
          }
        },
        error: (err: any) => {
          this.notification.create(
            'error',
            'Thông báo!',
            `Cập nhật thông tin thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      });
    }
  }

  saveAccountInfo() {
    if (this.accountForm.valid) {
      const formData: any = {
        username: this.accountForm.value.userName
      };

      if (this.isChangingPassword) {
        formData.oldPassword = this.accountForm.value.oldPassword;
        formData.password = this.accountForm.value.newPassword;
      }


      this.userService.updateUser(this.userInfo.id, formData).subscribe({
        next: (res: any) => {
          if (!res.isSuccess) {
            this.notification.create(
              'error',
              'Thông báo!',
              res.message,
              {
                nzClass: 'notification-error',
                nzDuration: 2000
              }
            );
          }
          else {
            this.notification.create(
              'success',
              'Thông báo!',
              res.message,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
          }
        },
        error: (err: any) => {
          this.notification.create(
            'error',
            'Thông báo!',
            err.error.message || 'Cập nhật thông tin thất bại',
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      });
    }
  }
}

