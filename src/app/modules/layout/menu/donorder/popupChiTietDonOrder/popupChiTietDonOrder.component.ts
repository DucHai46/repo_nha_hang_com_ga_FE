import { ComboService } from './../../combo/services/combo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DonOrderAdminService } from '../services/donorderadmin.service';

@Component({
  selector: 'app-popupChiTietDonOrder',
  templateUrl: './popupChiTietDonOrder.component.html',
  styleUrl: './popupChiTietDonOrder.component.scss'
})
export class PopupChiTietDonOrderComponent implements OnInit {
  @Input() formData: any;   
  @Output() close = new EventEmitter<void>(); 
  @Output() updateStatus = new EventEmitter<any>();
  showPopup = false;
  popupX = 0;
  popupY = 0;
  hoveredItem: any;
  comBos: any[] = [];

  onMouseEnter(item: any) {

  }

  ngOnInit(): void {
    this.ComboService.getCombo({}).subscribe({
      next: (res: any) => {
        this.comBos = res.data.data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin combo:', err);
      }
    })
  }

  onMouseMove(event: MouseEvent, item: any) {

    this.hoveredItem = this.comBos.find((combo: any) => combo.id === item.comBo.id);
    this.updatePosition(event);
  }

  onMouseLeave() {
    this.hoveredItem = null;
  }

  private updatePosition(event: MouseEvent) {
    this.popupX = event.clientX + 15;
    this.popupY = event.clientY + 15;
  }
  closePopup() {
    this.close.emit();
  }

  constructor(
    private fileService: FileService,
    private notification: NzNotificationService,
    private donOrderService: DonOrderAdminService,  
    private ComboService: ComboService
  ) { }

  isDonOrderLocked(): boolean {
    return [0, 2, 3, 4, 5].includes(this.formData?.trangThai);
  }


  toggleFoodStatus(monAn: any, chiTietIndex: number, monAnIndex: number) {
    const newStatus = monAn.monAn_trangThai === 1 ? 0 : 1;
    monAn.monAn_trangThai = newStatus;

    const updatedOrder = { ...this.formData };

    updatedOrder.chiTietDonOrder[chiTietIndex].monAns[monAnIndex].monAn_trangThai = newStatus;
    if (!updatedOrder.id || typeof updatedOrder.id !== 'string' || updatedOrder.id.length !== 24) {
      this.notification.create(
        'error',
        'Thông báo!',
        `ID đơn order không hợp lệ: ${updatedOrder.id}`,
        {
          nzClass: 'notification-error',
          nzDuration: 2000
        }
      );
      return;
    }

    updatedOrder.loaiDon = updatedOrder.loaiDon.id;
    updatedOrder.ban = updatedOrder.ban.id;
    updatedOrder.khachHang = updatedOrder.khachHang.id;
    updatedOrder.chiTietDonOrder.forEach((chiTiet: any) => {
      chiTiet.comBos.forEach((comBo: any) => {
        comBo.comBo = comBo.comBo.id;
      });
      chiTiet.monAns.forEach((monAn: any) => {
        monAn.monAn = monAn.monAn.id;
      });
    })
    this.donOrderService.updateDonOrders(updatedOrder.id, updatedOrder).subscribe({
      next: (res: any) => {

        this.formData = res.data;
        this.notification.create(
          'success',
          'Thông báo!',
          `Cập nhật thành công`,
          {
            nzClass: 'notification-success',
            nzDuration: 2000
          }
        );
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật:', err);
        this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại: ${err.error?.message || 'Lỗi không xác định'}`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
  }

  toggleStatus(chiTiet: any, chiTietIndex: number) {

    const newStatus = chiTiet.trangThai === 1 ? 0 : 1;
    chiTiet.trangThai = newStatus;

    const updatedOrder = { ...this.formData };

    updatedOrder.chiTietDonOrder[chiTietIndex].trangThai = newStatus;

    if (!updatedOrder.id || typeof updatedOrder.id !== 'string' || updatedOrder.id.length !== 24) {
      this.notification.create(
        'error',
        'Thông báo!',
        `ID đơn order không hợp lệ: ${updatedOrder.id}`,
        {
          nzClass: 'notification-error',
          nzDuration: 2000
        }
      );
      return;
    }

    updatedOrder.loaiDon = updatedOrder.loaiDon.id;
    updatedOrder.ban = updatedOrder.ban.id;
    updatedOrder.khachHang = updatedOrder.khachHang.id;
    updatedOrder.chiTietDonOrder.forEach((chiTiet: any) => {
      chiTiet.comBos.forEach((comBo: any) => {
        comBo.comBo = comBo.comBo.id;
      });
      chiTiet.monAns.forEach((monAn: any) => {
        monAn.monAn = monAn.monAn.id;
      });
    })
    this.donOrderService.updateDonOrders(updatedOrder.id, updatedOrder).subscribe({
      next: (res: any) => {
        this.formData = res.data;
        this.notification.create(
          'success',
          'Thông báo!',
          `Cập nhật thành công`,
          {
            nzClass: 'notification-success',
            nzDuration: 2000
          }
        );
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật:', err);
        this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại: ${err.error?.message || 'Lỗi không xác định'}`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
  }

  toggleComboStatus(comBo: any, chiTietIndex: number, comBoIndex: number) {
    const newStatus = comBo.comBo_trangThai === 1 ? 0 : 1;
    comBo.comBo_trangThai = newStatus;

    const updatedOrder = { ...this.formData };

    updatedOrder.chiTietDonOrder[chiTietIndex].comBos[comBoIndex].comBo_trangThai = newStatus;

    if (!updatedOrder.id || typeof updatedOrder.id !== 'string' || updatedOrder.id.length !== 24) {
      this.notification.create(
        'error',
        'Thông báo!',
        `ID đơn order không hợp lệ: ${updatedOrder.id}`,
        {
          nzClass: 'notification-error',
          nzDuration: 2000
        }
      );
      return;
    }

    updatedOrder.loaiDon = updatedOrder.loaiDon.id;
    updatedOrder.ban = updatedOrder.ban.id;
    updatedOrder.khachHang = updatedOrder.khachHang.id;
    updatedOrder.chiTietDonOrder.forEach((chiTiet: any) => {
      chiTiet.comBos.forEach((comBo: any) => {
        comBo.comBo = comBo.comBo.id;
      });
      chiTiet.monAns.forEach((monAn: any) => {
        monAn.monAn = monAn.monAn.id;
      });
    })
    this.donOrderService.updateDonOrders(updatedOrder.id, updatedOrder).subscribe({
      next: (res: any) => {
        this.formData = res.data;
        this.notification.create(
          'success',
          'Thông báo!',
          `Cập nhật thành công`,
          {
            nzClass: 'notification-success',
            nzDuration: 2000
          }
        );
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật:', err);
        this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại: ${err.error?.message || 'Lỗi không xác định'}`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
  }
}
