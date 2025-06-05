import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonOrderService } from '../../menugoimon/services/donorder.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    private router: Router,
    private dialog: MatDialog,
    private notification: NzNotificationService
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
      },
      error: (error: any) => {
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn hủy đơn hàng này?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donOrderService.huyDonOrder(this.donOrderId, this.donOrder?.tenDon).pipe(
          take(1)
        ).subscribe({
        next: () => {
          this.notification.create(
            'success',
            'Thông báo!',
            `Hủy đơn hàng thành công`,
            {
              nzClass: 'notification-success',    
              nzDuration: 2000
            }
          );          
          this.router.navigate(['home-client/thong-tin-don-hang',this.donOrderId]);
        },
        error: (error) => {
          this.notification.create(
            'error',
            'Thông báo!',
            `Có lỗi xảy ra khi hủy đơn hàng`,
            {
              nzClass: 'notification-error',    
              nzDuration: 2000
            }
          );
        }
      });
      }
    });
  }

  canConfirmOrder(): boolean {
    return this.donOrder?.trangThai === 2 || this.donOrder?.trangThai === 3;
  }

  confirmOrder(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn đã nhận đơn hàng này?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donOrderService.xacNhanDonOrder(this.donOrderId, this.donOrder?.tenDon).pipe(take(1)).subscribe({
        next: () => {
          this.notification.create(
            'success',
            'Thông báo!',
            `Xác nhận đơn hàng thành công`,
            {
              nzClass: 'notification-success',    
              nzDuration: 2000
            }
          );
          this.router.navigate(['home-client/thong-tin-don-hang',this.donOrderId]);
        },
        error: (error) => {
          this.notification.create(
            'error',
            'Thông báo!',
            `Có lỗi xảy ra khi xác nhận đơn hàng`,
            {
              nzClass: 'notification-error',    
              nzDuration: 2000
            }
          );
        }
      });
    }
    });
  }
}
