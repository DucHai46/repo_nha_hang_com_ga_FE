import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeClientStore } from '../store/home-client.store';
import { Observable } from 'rxjs';
import { KhachHangService } from '../../menu/khachhang/services/khachhang.service';
import { DonOrderService } from '../../menugoimon/services/donorder.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { PhuPhiService } from '../../menu/phuphi/services/phuphi.service';
import { LoaidonorderService } from '../../menu/loaidonorder/services/loaidonorder.service';
import { EmailService } from '../../../../core/services/email.service';
import { environment } from '../../../../enviroments/enviroment';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrl: './thanh-toan.component.scss'
})
export class ThanhToanComponent implements OnInit {
  cart$: Observable<any[]>;
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private homeClientStore: HomeClientStore,
    private khachHangService: KhachHangService,
    private donOrderService: DonOrderService,
    private notifyService: NzNotificationService,
    private phuPhiService: PhuPhiService,
    private loaiDonOrderService: LoaidonorderService,
    private router: Router,
    private emailService: EmailService
  ) {
    this.cart$ = this.homeClientStore.cart$;
    this.customerForm = this.fb.group({
      tenKhachHang: ['', Validators.required],
      diaChi: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      soDienThoai: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]]
    });
  }

  ngOnInit(): void { }

  getTotal(cart: any[]): number {
    return cart.reduce((total, c) => total + c.item.gia * c.quantity, 0);
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const data = this.customerForm.value;
      this.khachHangService.addKhachHang(data).subscribe({
        next: (khachHangRes: any) => {
          const khachHangId = khachHangRes?.data.id;
          this.cart$.pipe(
            take(1)
          ).subscribe(cart => {
            const chiTietDonOrder = [{
              monAns: cart.filter(c => c.item.loai === 'monan').map(c => ({
                monAn: c.item.id,
                monAn_trangThai: 0,
                soluong: c.quantity,
                giaTien: c.item.gia,
                moTa: c.item.moTa || ''
              })),
              comBos: cart.filter(c => c.item.loai === 'combo').map(c => ({
                combo: c.item.id,
                combo_trangThai: 0,
                soluong: c.quantity,
                giaTien: c.item.gia,
                moTa: c.item.moTa || ''
              })),
              trangThai: 0
            }];
            this.loaiDonOrderService.getLoaidonorder({ page: 1, size: 1 }).pipe(
              take(1)
            ).subscribe((loaiDonRes: any) => {
              const loaiDon = loaiDonRes?.data?.data.find((l: any) => l.ten === 'Đơn online')
              const donOrder = {
                tenDon: `Đơn của ${data.tenKhachHang}`,
                loaiDon: loaiDon ? loaiDon.id : '682c90ef2046cb04ec849881',
                ban: '',
                khachHang: khachHangId,
                trangThai: 0,
                chiTietDonOrder,
                tongTien: this.getTotal(cart)
              };
              this.donOrderService.addDonOrder(donOrder).pipe(
                take(1)
              ).subscribe({
                next: (donOrderRes: any) => {
                  this.notifyService.create(
                    'success',
                    'Thành công',
                    'Đặt hàng thành công!',
                    {
                      nzClass: 'notification-success',
                      nzDuration: 2000
                    }
                  );
                  this.emailService.sendEmail({
                    to: data.email,
                    subject: 'Đơn hàng của bạn đã được đặt thành công',
                    body: `Đơn hàng của bạn đã được đặt thành công. Mã đơn hàng là ${donOrderRes?.data?.id}, cảm ơn bạn đã đặt hàng!
                    Truy cập vào link để xem chi tiết đơn hàng: ${environment.webUrl}/home-client/thong-tin-don-hang/${donOrderRes?.data?.id}`,
                    isHtml: true
                  }).pipe(
                    take(1)
                  ).subscribe();
                  this.homeClientStore.clearCart();
                  this.router.navigate(['/home-client']);
                },
                error: () => {
                  this.notifyService.create(
                    'error',
                    'Lỗi',
                    'Tạo đơn hàng thất bại!',
                    {
                      nzClass: 'notification-error',
                      nzDuration: 2000
                    }
                  );
                }
              });
            });
          });
        },
        error: (err) => {
          this.notifyService.create(
            'error',
            'Lỗi',
            'Có lỗi xảy ra khi đặt hàng!',
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      });
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
