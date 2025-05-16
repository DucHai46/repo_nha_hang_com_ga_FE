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
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng
  @Output() updateStatus = new EventEmitter<any>(); // Emit sự kiện khi cập nhật trạng thái
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
        console.log(this.comBos);
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin combo:', err);
      }
    })
  }

  onMouseMove(event: MouseEvent, item: any) {

    this.hoveredItem = this.comBos.find((combo: any) => combo.id === item.comBo.id);
    console.log(this.hoveredItem);
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
    console.log(this.formData);
    this.close.emit();
  }

  constructor(
    private fileService: FileService,
    private notification: NzNotificationService,
    private donOrderService: DonOrderAdminService, // Thêm service vào đây
    private ComboService: ComboService
  ) { }

  // Phương thức xử lý thay đổi trạng thái món ăn
  toggleFoodStatus(monAn: any, chiTietIndex: number, monAnIndex: number) {
    // Đảo ngược trạng thái hiện tại (0: Đang chế biến, 1: Đã hoàn thành)
    const newStatus = monAn.monAn_trangThai === 1 ? 0 : 1;
    monAn.monAn_trangThai = newStatus;

    // Tạo bản sao của đơn order để cập nhật
    const updatedOrder = { ...this.formData };

    // Cập nhật trạng thái món ăn trong bản sao
    updatedOrder.chiTietDonOrder[chiTietIndex].monAns[monAnIndex].monAn_trangThai = newStatus;

    // Kiểm tra ID có hợp lệ không trước khi gửi request
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

    // Gọi trực tiếp API updateDonOrder
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
    this.donOrderService.updateDonOrder(updatedOrder.id, updatedOrder).subscribe({
      next: (res: any) => {
        console.log('Cập nhật trạng thái thành công', res);

        // Vẫn có thể emit sự kiện để thông báo cho component cha biết đã cập nhật thành công
        // this.updateStatus.emit(res);

        // Hiển thị thông báo
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

  // Phương thức xử lý thay đổi trạng thái chi tiết order
  toggleStatus(chiTiet: any, chiTietIndex: number) {
    // Đảo ngược trạng thái hiện tại (0: Đang chế biến, 1: Đã hoàn thành)
    const newStatus = chiTiet.trangThai === 1 ? 0 : 1;
    chiTiet.trangThai = newStatus;

    // Tạo bản sao của đơn order để cập nhật
    const updatedOrder = { ...this.formData };

    // Cập nhật trạng thái món ăn trong bản sao
    updatedOrder.chiTietDonOrder[chiTietIndex].trangThai = newStatus;

    // Kiểm tra ID có hợp lệ không trước khi gửi request
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

    // Gọi trực tiếp API updateDonOrder
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
    this.donOrderService.updateDonOrder(updatedOrder.id, updatedOrder).subscribe({
      next: (res: any) => {
        console.log('Cập nhật trạng thái thành công', res);

        // Vẫn có thể emit sự kiện để thông báo cho component cha biết đã cập nhật thành công
        // this.updateStatus.emit(res);

        // Hiển thị thông báo
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

  // Phương thức xử lý thay đổi trạng thái combo
  toggleComboStatus(comBo: any, chiTietIndex: number, comBoIndex: number) {
    // Đảo ngược trạng thái hiện tại (0: Đang chế biến, 1: Đã hoàn thành)
    const newStatus = comBo.comBo_trangThai === 1 ? 0 : 1;
    comBo.comBo_trangThai = newStatus;

    // Tạo bản sao của đơn order để cập nhật
    const updatedOrder = { ...this.formData };

    // Cập nhật trạng thái món ăn trong bản sao
    updatedOrder.chiTietDonOrder[chiTietIndex].comBos[comBoIndex].comBo_trangThai = newStatus;

    // Kiểm tra ID có hợp lệ không trước khi gửi request
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

    // Gọi trực tiếp API updateDonOrder
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
    this.donOrderService.updateDonOrder(updatedOrder.id, updatedOrder).subscribe({
      next: (res: any) => {
        console.log('Cập nhật trạng thái thành công', res);

        // Vẫn có thể emit sự kiện để thông báo cho component cha biết đã cập nhật thành công
        // this.updateStatus.emit(res);

        // Hiển thị thông báo
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
