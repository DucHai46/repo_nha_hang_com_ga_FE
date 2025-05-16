import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonOrderService } from '../services/donorder.service';
import { OrderSignalRServiceService } from '../../../../core/services/OrderSignalRService.service';

@Component({
  selector: 'app-chitietdon',
  templateUrl: './chitietdon.component.html',
  styleUrl: './chitietdon.component.scss'
})
export class ChitietdonComponent implements OnInit {
  donOrder: any[] = [];
  chiTietDonOrder: any[] = [];
  tongTien: number = 0;
  id: string = '';


  troVeMenugoimon() {
    this.router.navigate(['/menugoimon/' + this.id]);
  }

  ngOnInit(): void {
    this.search();
    this.orderSignalRService.startConnection();
    this.orderSignalRService.ChangeStatusOrderListener((message: any) => {
      this.search();
    });
  }

  constructor(public router: Router, private donOrderService: DonOrderService, private orderSignalRService: OrderSignalRServiceService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['id']) {
      this.id = navigation.extras.state['id'];
      console.log(this.id);
    }
  }

  search() {
    this.donOrderService.getDonOrder({}).subscribe(
      {
        next: (res: any) => {
          this.donOrder = res.data.data;
          // console.log(this.donOrder);
          const don = this.donOrder.find((td: any) => td.trangThai === 0 && td.ban.id === this.id);
          console.log(don);
          this.tongTien = don.tongTien;
          this.chiTietDonOrder = don.chiTietDonOrder;
          console.log(this.chiTietDonOrder);
        }
      }
    )
  }
}
