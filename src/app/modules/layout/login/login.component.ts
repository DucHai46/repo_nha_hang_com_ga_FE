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
  // Danh sách URL các background hình ảnh
  backgrounds: string[] = [
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg'
  ];

  constructor(private router: Router, private authService: AuthService, private notification: NzNotificationService) { }

  currentIndex: number = 0;

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
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/main']);
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
}
