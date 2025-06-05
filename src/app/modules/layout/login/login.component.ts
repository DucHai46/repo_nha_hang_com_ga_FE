import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private notification: NzNotificationService) { }

  currentIndex: number = 0;
  isResetPassword: boolean = false;
  formData = {
    username: '',
    password: ''
  };

  ngOnInit() {
    this.formData = {
      username: '',
      password: ''
    };
  }
  login() {
    this.authService.login(this.formData).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/main/dashboard']);
          this.notification.success('Thông báo', 'Đăng nhập thành công');
        } else {
          this.notification.error('Lỗi', res.message);
        }
      },
      error: (err: any) => {
        this.notification.error('Lỗi', 'Đăng nhập thất bại');
      }
    });
  }
  resetPassword() {
    this.authService.resetPassword(this.formData.username).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.notification.create(
            'success',
            'Thông báo!',
            `${res.message}`,
            {
              nzClass: 'notification-success',    
              nzDuration: 2000
            }
          );          
          this.isResetPassword = false;
        } else {
          this.notification.create(
            'error',
            'Lỗi!',
            `${res.message}`,
            {
              nzClass: 'notification-error',    
              nzDuration: 2000
            }
          );
          this.isResetPassword = false;
        }
      },
      error: (err: any) => {
        this.notification.create(
          'error',
          'Lỗi!',
          'Đặt lại mật khẩu thất bại',
          {
            nzClass: 'notification-error',    
            nzDuration: 2000
          }
        );
      }
    });
  }
}
