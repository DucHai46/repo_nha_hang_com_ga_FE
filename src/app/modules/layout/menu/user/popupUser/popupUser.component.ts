import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateUser, User } from '../../../../../models/User';
import { NhanVienService } from '../../nhanvien/services/nhanvien.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

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

  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  nhanVien: any[] = [];
  isCheckingUsername = false;
  usernameError = '';
  private usernameSubject = new Subject<string>();

  constructor(
    private nhanVienService: NhanVienService,
    private userService: UserService
  ) {
    this.setupUsernameCheck();
  }

  private setupUsernameCheck() {
    this.usernameSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(username => {
        if (!username) {
          this.usernameError = '';
          return [];
        }
        this.isCheckingUsername = true;
        return this.userService.checkUsername(username);
      })
    ).subscribe({
      next: (response: any) => {
        this.isCheckingUsername = false;
        if (response.isSuccess == true) {
          this.usernameError = 'Tên đăng nhập đã tồn tại';
        } else {
          this.usernameError = '';
        }
      },
      error: () => {
        this.isCheckingUsername = false;
        this.usernameError = 'Có lỗi xảy ra khi kiểm tra tên đăng nhập';
      }
    });
  }

  onUsernameChange(username: string) {
    this.usernameSubject.next(username);
  }

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


  onSave(): void {
    if (this.isEditMode) {
      this.save.emit(this.formData);
    } else {
      this.save.emit(this.createUser);
    }
  }

 
  onCancel(): void {
    this.close.emit();
  }

  hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }
}
