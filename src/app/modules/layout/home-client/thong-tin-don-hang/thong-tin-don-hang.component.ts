import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonOrderService } from '../../menugoimon/services/donorder.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thong-tin-don-hang',
  templateUrl: './thong-tin-don-hang.component.html',
  styleUrl: './thong-tin-don-hang.component.scss'
})
export class ThongTinDonHangComponent implements OnInit {
  donOrderId: any;
  donOrder: any;

  constructor(
    private route: ActivatedRoute,
    private donOrderService: DonOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1)
    ).subscribe(params => {
      this.donOrderId = params['id'];
    });
    this.donOrderService.getDonOrderById(this.donOrderId).pipe(
      take(1)
    ).subscribe({
      next: (donOrderRes: any) => {
        this.donOrder = donOrderRes?.data;
        console.log(this.donOrder);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  canCancelOrder(): boolean {
    if (!this.donOrder?.ngayTao) return false;
    
    const orderTime = new Date(this.donOrder.ngayTao);
    const currentTime = new Date();
    const diffInMinutes = (currentTime.getTime() - orderTime.getTime()) / (1000 * 60);
    
    return diffInMinutes <= 15 && this.donOrder?.trangThai === 0;
  }

  cancelOrder(): void {
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      this.donOrderService.huyDonOrder(this.donOrderId, this.donOrder?.tenDon).pipe(
        take(1)
      ).subscribe({
        next: () => {
          alert('Hủy đơn hàng thành công');
          this.router.navigate(['home-client/thong-tin-don-hang',this.donOrderId]);
        },
        error: (error) => {
          console.error('Lỗi khi hủy đơn hàng:', error);
          alert('Có lỗi xảy ra khi hủy đơn hàng');
        }
      });
    }
  }
}
