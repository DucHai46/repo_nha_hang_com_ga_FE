import { Component } from '@angular/core';

@Component({
  selector: 'app-danhmucnguyenlieu',
  templateUrl: './danhmucnguyenlieu.component.html',
  styleUrl: './danhmucnguyenlieu.component.scss'
})
export class DanhmucnguyenlieuComponent {
  items = [
    { ma: 'DM-001', ten: 'Thực phẩm tươi sống', mota: 'Bao gồm thịt, cá, rau củ quả' },
    { ma: 'DM-002', ten: 'Gia vị', mota: 'Muối, đường, tiêu,...' },
    { ma: 'DM-003', ten: 'Đồ uống', mota: 'Nước ngọt, trà, cà phê, nước ép' }
  ];

}
