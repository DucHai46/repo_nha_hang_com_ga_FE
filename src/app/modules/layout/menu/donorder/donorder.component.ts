import { forkJoin } from 'rxjs';
import { HoaDonThanhToanService } from './../hoadonthanhtoan/services/hoadonthanhtoan.service';
import { KhachHangService } from './../khachhang/services/khachhang.service';
import { LoaiDonOrder } from './../../../../models/LoaiDonOrder';
import { BanAnService } from './../banan/services/banan.service';
import { Component, OnInit } from '@angular/core';
import { DonOrderStore } from './store/don-order.store';
import { MatDialog } from '@angular/material/dialog';
import { LoaidonorderService } from '../loaidonorder/services/loaidonorder.service';
import { DonOrderAdminService } from './services/donorderadmin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { OrderSignalRServiceService } from '../../../../core/services/OrderSignalRService.service';
import { FileService } from '../../../../core/services/file.service';



@Component({
  selector: 'app-donorder',
  templateUrl: './donorder.component.html',
  styleUrl: './donorder.component.scss'
})
export class DonorderComponent implements OnInit {
  constructor(
    private store: DonOrderStore,
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private donOrderService: DonOrderAdminService,
    private banAnService: BanAnService,
    private khachHangService: KhachHangService,
    private orderSignalRService: OrderSignalRServiceService,
    private hoaDonThanhToanService: HoaDonThanhToanService,
    private fileService: FileService,
    private loaiDonOrderService: LoaidonorderService,

  ) { }
  donOrderPaging: any[] = [];
  loaiDonOrder: any[] = [];
  banAn: any[] = [];
  khachHang: any[] = [];
  khachHangIds: any[] = [];
  hoaDons: any[] = [];

  paging: any = {
    page: 1,
    size: 10,
    total: 0,
  }
  totalPages = 0

  ngOnInit(): void {
    this.store.setItems$(this.donOrderPaging);
    this.khachHangService.getKhachHang({}).subscribe({
      next: (res: any) => {
        this.khachHang = res.data.data;
      }
    });

    this.loaiDonOrderService.getLoaidonorder({}).subscribe({
      next: (res: any) => {
        this.loaiDonOrder = res.data.data.map((loaiDon: any) => {
          return {
            id: loaiDon.id,
            tenloaiDon: loaiDon.tenLoaiDon
          };
        })
      }
    });

    this.hoaDonThanhToanService.getHoaDonThanhToan({}).subscribe({
      next: (res: any) => {
        this.hoaDons = res.data.data;
      }
    });

    this.search();
    this.orderSignalRService.startConnection();
    this.orderSignalRService.addOrderListener((message) => {
      this.notification.create(
        'success',
        'Thông báo!',
        `Có đơn mới: ${message}`,
        {
          nzClass: 'notification-success',
          nzDuration: 2000
        }
      );
      this.search();
    });
    this.orderSignalRService.addOrderListener2((message) => {
      this.notification.create(
        'success',
        'Thông báo!',
        `Nhắc bếp từ bàn số : ${message}`,
        {
          nzClass: 'notification-success',
          nzDuration: 2000
        }
      );
      this.search();
    });
    this.orderSignalRService.cancelOrderListener((message) => {
      this.notification.create(
        'success',
        'Thông báo!',
        `Đơn hàng ${message} đã bị hủy`,
        {
          nzClass: 'notification-success',
          nzDuration: 2000
        }
      );
      this.search();
    });

    this.orderSignalRService.confirmOrderListener((message) => {
      this.notification.create(
        'success',
        'Thông báo!',
        `Đơn hàng ${message} đã được giao tới khách hàng`,
        {
          nzClass: 'notification-success',
          nzDuration: 2000
        }
      );
      this.search();
    });
  }


  searchForm: any = {
    tenDon: '',
    khachHangs: '',
    loaiDon: '',
    ngayTaoDon: '',
  }

  searchKH: any = {
    tenKhachHang: '',
  }

  isThanhToan(item: any) {
    let isThanhToan = true;
    item.chiTietDonOrder.forEach((ct: any) => {
      if (ct.monAns.length > 0) {
        ct.monAns.forEach((ma: any) => {
          if (ma.monAn_trangThai == 0) {
            isThanhToan = false;
          }
        })
      }
      if (ct.comBos.length > 0) {
        ct.comBos.forEach((cb: any) => {
          if (cb.comBo_trangThai == 0) {
            isThanhToan = false;
          }
        })
      }
    })
    return isThanhToan;
  }

  isHoaDon(item: any) {
    const hoaDonExists = this.hoaDons.some((hd: any) => hd.donOrder.id === item.id);

    return !hoaDonExists;
  }

  search() {

    if (this.searchForm.khachHangs) {
      this.searchKH.isPaging = true;
      this.searchKH.PageNumber = this.paging.page;
      this.searchKH.PageSize = this.paging.size;
      this.searchKH.tenKhachHang = this.searchForm.khachHangs;
      this.khachHangService.getKhachHang(this.searchKH).subscribe({
        next: (res: any) => {
          this.khachHang = res.data.data;
          this.khachHangIds = res.data.data.map((kh: any) => kh.id);
          this.searchForm.khachHang = this.khachHangIds;
          this.searchDonOrder();
        }
      });
    } else {
      if (this.khachHangIds) {
        this.khachHangIds = [];
      }
      this.searchDonOrder();
    }
  }

  searchDonOrder() {
    if (this.searchForm.ngayTaoDon == '') {
      this.searchForm.ngayTaoDon = null;
    }
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.donOrderService.getDonOrder(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.donOrderPaging = res.data.data;
          this.paging.page = res.data.paging.currentPage;
          this.paging.size = res.data.paging.pageSize;
          this.paging.total = res.data.paging.totalRecords;
          this.totalPages = Math.ceil(this.paging.total / this.paging.size);
        },
        error: (err: any) => {
          this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
        }
      }
    )

  }


  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.paging.page = newPage;
    this.search();
  }

  changePageSize(newSize: number) {
    this.paging.size = newSize;
    this.paging.page = 1;
    this.search();
  }

  reset() {
    this.searchForm.tenDon = '';
    this.searchForm.loaiDon = '';
    this.searchForm.khachHangs = '';
    this.searchForm.ngayTaoDon = '';
    this.khachHangIds = [];
    this.searchForm.khachHang = [];
    this.search();
  }

  isPopupOpen = false;
  isAddMode = false;
  formData: any = {}
  formHoaDon: any = {};
  isChiTietOpen = false;
  isChiTietHoaDonOpen = false;

  Status = {
    trangThai: 3,
  }
  Id: string = '';

  loaiDonName: string = '';


  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true;
    this.formData = item;
  }

  openChiTietHoaDonPopup(): void {
    this.isChiTietHoaDonOpen = true;
    this.formData = this.formHoaDon;
  }
  closeChiTietHoaDon(): void {
    this.isChiTietHoaDonOpen = false;
    console.log("reload lại đơn order");
    this.search();
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.isAddMode = false;
  }

  closeChiTiet(): void {
    this.isChiTietOpen = false;
    this.search();
  }

  xacNhan(item: any): void {
    item.trangThai = 1;
    const status = {
      trangThai: 1,
    };
    this.donOrderService.updateStatusDonOrder(item.id, status).subscribe({
      next: (res: any) => {
        this.notification.create(
          'success',
          'Thông báo!',
          `Xác nhận đơn order thành công`,
          {
            nzClass: 'notification-success',
            nzDuration: 2000
          }
        ),
          this.search();
      },
      error: () => {
        this.notification.create(
          'error',
          'Thông báo!',
          `Xác nhận đơn order thất bại`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
  }

  isLoaiDon(item: any) {
    if (item.loaiDon && item.loaiDon.id) {
      if (item.loaiDon.name) {
        return item.loaiDon.name?.toLowerCase() === 'online';
      }
    }
    return false;
  }

  huyDon(item: any): void {
    this.updateDonOrderStatusOnlline(item.id, { trangThai: 5 });
    this.search();
  }

  isDaHuy(item: any): boolean {
    return item.trangThai === 0;
  }

  onSaveCongThuc(body: any): void {
    if (!body) return;

    if (this.isAddMode) {
      this.hoaDonThanhToanService.addHoaDonThanhToan(body).subscribe(
        {
          next: (res: any) => {
            if (res.data) {
              this.formHoaDon = res.data;
              this.closePopup();
              this.updateDonOrderStatusOnlline(this.formHoaDon.donOrder.id, { trangThai: 2 });
              this.hoaDonThanhToanService.getHoaDonThanhToan({}).subscribe({
                next: (res: any) => {
                  this.hoaDons = res.data.data;
                  this.search();
                }
              });
              // this.search();
              this.notification.create(
                'success',
                'Thông báo!',
                `Tạo hóa đơn thành công`,
                {
                  nzClass: 'notification-success',
                  nzDuration: 2000
                }
              );

              this.openChiTietHoaDonPopup();
            }
          },
          error: () => this.notification.create(
            'error',
            'Thông báo!',
            `Tạo hóa đơn thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          )
        });
      this.search();
    } else {

      const data = body.donOrder;

      this.hoaDonThanhToanService.updateHoaDonThanhToan(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.formHoaDon = res.data;
            this.searchForm.tenHoaDon = '';
            this.searchForm.nhanViens = '';
            this.searchForm.gioVao = '';
            this.searchForm.gioRa = '';

            this.updateDonOrderStatus(data);
            this.search();
            // this.openChiTietHoaDonPopup();
            this.notification.create(
              'success',
              'Thông báo!',
              `Thanh toán thành công`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
            this.openChiTietHoaDonPopup();
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Thanh toán thất bại`,
              {
                nzClass: 'notification-error',
                nzDuration: 2000
              }
            );
          }
        },
        error: () => {
          this.notification.create(
            'error',
            'Thông báo!',
            `Cập nhật thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      });
    }
  }

  updateDonOrderStatusOnlline(donOrderId: string, status: { trangThai: number }): void {
    this.donOrderService.updateStatusDonOrder(donOrderId, status).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.search();
          if (res.data) {
            this.search();
            if (res.data.ban.id) {
              const banId = res.data.ban.id;
              this.updateBanStatus(banId);
            }
          }

        }
      },
      error: () => {
        this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
  }


  updateDonOrderStatus(donOrderId: string): void {

    this.donOrderService.updateStatusDonOrder(donOrderId, this.Status).subscribe({
      next: (res: any) => {

        if (res.data) {
          this.search();
          if (res.data.ban.id) {
            const banId = res.data.ban.id;
            this.updateBanStatus(banId);
          }
        } else {
          this.notification.create(
            'error',
            'Thông báo!',
            `Không có dữ liệu đơn order`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      },
      error: () => {
        this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        );
      }
    });
  }

  updateBanStatus(banAnId: string): void {
    this.banAnService.getBanAnById(banAnId).subscribe({
      next: (res: any) => {
        const item = res.data;
        this.Id = item.id;
        item.trangThai = 0;
        item.loaiBan = item.loaiBan.id;
        this.banAnService.updateBanAn(this.Id, item).subscribe({
          next: (res: any) => {
          },
          error: () => {
            this.notification.create(
              'error',
              'Thông báo!',
              `Cập nhật thất bại`,
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

  openAddHoaDonPopup(item: any): void {
    this.isPopupOpen = true;
    this.isAddMode = true;
    this.formData = item;

    this.loaiDonName = item.loaiDon.name;

  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenDon}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donOrderService.deleteDonOrder(item.id).subscribe(
          {
            next: (res: any) => {
              this.search();
              this.notification.create(
                'success',
                'Thông báo!',
                `Xóa dữ liệu thành công`,
                {
                  nzClass: 'notification-success',
                  nzDuration: 2000
                }
              );
            },
            error: () => {
              this.notification.create(
                'error',
                'Thông báo!',
                `Xóa dữ liệu thất bại`,
                {
                  nzClass: 'notification-error',
                  nzDuration: 2000
                }
              );
            }
          }
        )
      } else {
        this.notification.create(
          'error',
          'Thông báo!',
          `Xóa dữ liệu thất bại`, {
          nzClass: 'notification-error',
          nzDuration: 2000
        }
        );
      }
    });
  }

  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }

  download(fileId: string): void {
    this.fileService.downloadFile(fileId).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);

        window.open(url, '_blank');

        window.URL.revokeObjectURL(url);
      }
    );
  }

}


