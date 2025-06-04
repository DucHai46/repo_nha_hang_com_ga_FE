import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonOrderService } from '../../menugoimon/services/donorder.service';
import { take } from 'rxjs/operators';
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
    private donOrderService: DonOrderService
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
}
