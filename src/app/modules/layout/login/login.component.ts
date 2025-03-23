import { Component, OnInit } from '@angular/core';

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

  currentIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      const section = document.getElementById('background-section');
      if (section) {
        section.style.backgroundImage = `url(${this.backgrounds[this.currentIndex]})`;
        this.currentIndex = (this.currentIndex + 1) % this.backgrounds.length; // Xoay vòng hình ảnh
      }
    }, 5000); // Đổi hình nền sau mỗi 5 giây
  }
}
