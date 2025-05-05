import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private authService: AuthService) {}

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
            localStorage.setItem('token', res.token);
          }
          this.router.navigate(['/main']);
        },
        error: (err: any) => {
          alert('Đăng nhập thất bại');
        }
      });
  }
}
