import { AuthService } from './../../../core/services/auth.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private router: Router, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {}

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
          if(res.token){
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('token', res.token);
            }
          }
          this.router.navigate(['/main']);
        },
        error: (err: any) => {
          alert('Đăng nhập thất bại');
        }
      });
  }
}
