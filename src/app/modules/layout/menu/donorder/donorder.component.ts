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
    private loaiDonOrderService: LoaidonorderService,
    private banAnService: BanAnService,
    private khachHangService: KhachHangService,
    private orderSignalRService: OrderSignalRServiceService,
    private hoaDonThanhToanService: HoaDonThanhToanService,
    private fileService: FileService,
    // private banAnService: BanAnService,

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
        console.log(this.khachHang);
      }
    });

    this.hoaDonThanhToanService.getHoaDonThanhToan({}).subscribe({
      next: (res: any) => {
        console.log(res.data.data);
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
      // this.search();
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
    // Kiểm tra xem đơn order này đã có hóa đơn chưa
    // Tìm trong mảng hoaDons xem có hóa đơn nào có donOrder.id trùng với item.id không
    const hoaDonExists = this.hoaDons.some((hd: any) => hd.donOrder.id === item.id);

    // Trả về ngược lại kết quả (true nếu chưa có hóa đơn, false nếu đã có)
    return !hoaDonExists;
  }

  search() {

    console.log('Search form:', this.searchForm);
    if (this.searchForm.khachHangs) {
      this.searchKH.isPaging = true; // Lấy tất cả dữ liệu
      this.searchKH.PageNumber = this.paging.page;
      this.searchKH.PageSize = this.paging.size;
      this.searchKH.tenKhachHang = this.searchForm.khachHangs;
      this.khachHangService.getKhachHang(this.searchKH).subscribe({
        next: (res: any) => {
          this.khachHang = res.data.data;
          this.khachHangIds = res.data.data.map((kh: any) => kh.id);
          this.searchForm.khachHang = this.khachHangIds;
          this.searchDonOrder();
          // console.log(this.khachHang);
        }
      });
    } else {
      //   // Nếu không nhập tên khách hàng, xóa khachHangIds khỏi searchForm nếu có
      if (this.khachHangIds) {
        this.khachHangIds = [];
      }
      this.searchDonOrder();
    }
  }

  searchDonOrder() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    console.log(this.searchForm);
    this.donOrderService.getDonOrder(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.donOrderPaging = res.data.data;
          console.log(this.donOrderPaging);
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
    // this.searchForm.khachHang = this.searchKH.tenKhachHang;
    // this.checkThanhToan();

  }


  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.paging.page = newPage;
    this.search();
  }

  changePageSize(newSize: number) {
    this.paging.size = newSize;
    this.paging.page = 1; // Reset về trang đầu khi thay đổi kích thước trang
    this.search();
  }

  reset() {
    this.searchForm.tenDon = '';
    this.searchForm.khachHangs = '';
    this.khachHangIds = [];
    this.searchForm.khachHang = [];
    this.search();
  }

  isPopupOpen = false;
  isAddMode = false; // Tạo hóa đơn
  formData: any = {}
  formHoaDon: any = {};
  isChiTietOpen = false;
  isChiTietHoaDonOpen = false;

  Status = {
    trangThai: 1,
  }
  Id: string = '';  

  // openAddPopup(): void {
  //   // console.log(this.loaiDonOrder);
  //   this.isPopupOpen = true;
  //   this.isEditMode = false;
  //   this.formData = {};
  // }

  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true;
    this.formData = item;
    console.log(this.formData);
  }

  openChiTietHoaDonPopup(): void {
    this.isChiTietHoaDonOpen = true;
    this.formData = this.formHoaDon; // Gán formData bằng formHoaDon
    console.log(this.formData);
  }
  closeChiTietHoaDon(): void {
    this.isChiTietHoaDonOpen = false;
    this.search(); // load lại dữ liệu sau khi đóng chi tiết
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.isAddMode = false;
  }

  closeChiTiet(): void {
    this.isChiTietOpen = false;
    this.search(); // load lại dữ liệu sau khi đóng chi tiết
  }

  onSaveCongThuc(body: any): void {
    console.log(body);
    if (!body) return;
    console.log(body);

    if (this.isAddMode) {
      // Tạo hóa đơn
      this.hoaDonThanhToanService.addHoaDonThanhToan(body).subscribe(
        {
          next: (res: any) => {
            if (res.data) {
              this.formHoaDon = res.data; // Lưu thông tin hóa đơn vào formHoaDon
              // this.formData.hoaDonThanhToans = [res.data]; // Gán danh sách hóa đơn vào formData
              // this.formData.hoaDonThanhToanId = res.data.id; // Gán ID hóa đơn vào formData
              this.closePopup();
              this.notification.create(
                'success',
                'Thông báo!',
                `Thêm mới thành công`,
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
            `Thêm mới thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          )
        });
    } else {

      // console.log(this.isEditMode);
      const data = body.donOrder;
      console.log(data);

     // Cập nhật trạng thái hóa đơn thanh toán
      this.hoaDonThanhToanService.updateHoaDonThanhToan(body.id, body).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.data) {
            this.searchForm.tenHoaDon = '';
            this.searchForm.nhanViens = '';
            this.searchForm.gioVao= '';
            this.searchForm.gioRa= '';
            // this.search();
            console.log(data);
            this.updateDonOrderStatus(data);

            
            // this.closeChiTiet();
            this.isChiTietHoaDonOpen = false;
            this.search();
            this.notification.create(
              'success',
              'Thông báo!',
              `Cập nhật thành công`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
          } else {
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

  updateDonOrderStatus(donOrderId: string): void {
    this.donOrderService.getDonOrderById(donOrderId).subscribe({
      next: (res: any) => {
        const item = res.data;
        console.log(item);
        this.Id = item.id;
        console.log(this.Id);  
      }
    });
    
    console.log(donOrderId);
    this.donOrderService.updateStatusDonOrder(donOrderId, this.Status).subscribe({
      next: (res: any) => {
        console.log(res);
        
        if (res.data) {
          //Cập nhật trạng thái bàn về trống
          if(res.data.ban.id){
            const banId = res.data.ban.id;
            console.log(res.data.ban.id);
            this.updateBanStatus(banId);
          }
          this.notification.create(
            'success',
            'Thông báo!',
            `Cập nhật trạng thái thành công`,
            {
              nzClass: 'notification-success',
              nzDuration: 2000
            }
          );
        }else {
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
        console.log(item);
        this.Id = item.id;
        console.log(this.Id);
        item.trangThai = 0;
        item.loaiBan = item.loaiBan.id;
        console.log(item);
        this.banAnService.updateBanAn(this.Id, item).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.data) {
              this.notification.create(
               'success',
                'Thông báo!',
                `Cập nhật trạng thái thành công`,
                {
                  nzClass: 'notification-success',
                }
              )
            }
            else {
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
    console.log(item);
    // console.log(this.formData);
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

  // up ảnh
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
        // Create object URL from blob
        const url = window.URL.createObjectURL(response);

        // Open preview in new tab
        window.open(url, '_blank');

        // Cleanup object URL after preview opens
        window.URL.revokeObjectURL(url);
      }
    );
  }

}


