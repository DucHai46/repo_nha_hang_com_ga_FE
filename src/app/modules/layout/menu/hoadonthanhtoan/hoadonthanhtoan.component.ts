import { DonOrder } from './../../../../models/DonOrder';
import { NhaHangService } from './../nhahang/services/nhahang.service';
import { khuyenmaiService } from './../khuyenmai/services/khuyenmai.service';
import { PhuPhiService } from './../phuphi/services/phuphi.service';
import { DonOrderAdminService } from './../donorder/services/donorderadmin.service';
import { NhanVienService } from './../nhanvien/services/nhanvien.service';
import { Component, OnInit } from '@angular/core';
import { HoaDonThanhToanStore } from './store/hoa-don-thanh-toan.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PhuongThucThanhToanService } from '../phuongthucthanhtoan/services/phuongthucthanhtoan.service';
import { HoaDonThanhToanService } from './services/hoadonthanhtoan.service';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { BanAnService } from '../banan/services/banan.service';

@Component({
  selector: 'app-hoadonthanhtoan',
  templateUrl: './hoadonthanhtoan.component.html',
  styleUrl: './hoadonthanhtoan.component.scss'
})
export class HoadonthanhtoanComponent implements OnInit {
  constructor(
    private store: HoaDonThanhToanStore,
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private hoaDonThanhToanService: HoaDonThanhToanService,
    private nhanVienService: NhanVienService,
    private donOrderAdminService: DonOrderAdminService,
    private phuPhiService: PhuPhiService,
    private khuyenmaiService: khuyenmaiService,
    private phuongThucThanhToanService: PhuongThucThanhToanService,
    private nhaHangService: NhaHangService,
    private banAnService: BanAnService,
  ) { }

  hoaDonPaging: any [] = [];

  paging: any = {
    page: 1,
    size: 10,
    toatl: 0,
  }

  totalPages = 0

  ngOnInit(): void {
    this.search();
  }

  searchForm: any = {
    tenHoaDon: '',
    nhanViens: '',
    donOrder: '',
    gioVao: '',
    gioRa: '',
  }
  searchNV: any = {
    tenNhanVien: '',
  }

  searchDonOrder: any = {
    tenDon: '',
  }

  search() {
    console.log('Search form:', this.searchForm);
    if (this.searchForm.nhanViens) {
      this.searchNV.isPaging = true; // Lấy tất cả dữ liệu
      this.searchNV.PageNumber = this.paging.page;
      this.searchNV.PageSize = this.paging.size;
      this.searchNV.tenNhanVien = this.searchForm.nhanViens;
      this.nhanVienService.getNhanVien(this.searchNV).subscribe({
        next: (res: any) => {
          const resData = res.data.data;
           this.searchForm.nhanVien = resData[0].id;
           console.log(this.searchForm.nhanVien);
          this.searchHoaDon();
        }
      });
    }
    else{
      this.searchForm.nhanVien = '';
      this.searchHoaDon();
    }
    
  }

  searchHoaDon() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    console.log(this.searchForm);
    this.hoaDonThanhToanService.getHoaDonThanhToan(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.hoaDonPaging = res.data.data;
          console.log(this.hoaDonPaging);
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
    this.searchForm.tenHoaDon = '';
    this.searchForm.nhanVien = '';
    this.searchForm.nhanViens = '';
    this.searchForm.gioVao= '';
    this.searchForm.gioRa= '';
    this.search();
  }

  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}
  isChiTietOpen = false;
  Status = {
    trangThai: 1,
  }
  Id: string = '';


  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true;
    this.isEditMode = true;
    this.formData = item;
    console.log(this.formData);
  }

  closeChiTiet(): void {
    this.isChiTietOpen = false;
    this.search(); // load lại dữ liệu sau khi đóng chi tiết
  }

  // change status don order
  updateDonOrderStatus(donOrderId: string): void {
    this.donOrderAdminService.getDonOrderById(donOrderId).subscribe({
      next: (res: any) => {
        const item = res.data;
        console.log(item);
        this.Id = item.id;
        console.log(this.Id);  
      }
    });
    
    console.log(donOrderId);
    this.donOrderAdminService.updateStatusDonOrder(donOrderId, this.Status).subscribe({
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

  // cập nhật trạng thái bàn về trống
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

  onSaveCongThuc(body: any): void {
    console.log(body);
    if (!body) return;
    console.log(body);
    console.log(body.id)
    console.log(this.isEditMode);
    const data = body.donOrder;
    console.log(data);

    if (this.isEditMode) {
      // Cập nhật trạng thái hóa đơn thanh toán
      this.hoaDonThanhToanService.updateHoaDonThanhToan(body.id, body).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.data) {
            this.searchForm.tenHoaDon = '';
            this.searchForm.nhanViens = '';
            this.searchForm.gioVao= '';
            this.searchForm.gioRa= '';
            this.search();
            console.log(data);
            this.updateDonOrderStatus(data);
            
            this.closeChiTiet();
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
    } else {
      // Trả về danh sách đơn order
      this.searchForm.tenHoaDon = '';
      this.searchForm.nhanViens = '';
      this.searchForm.gioVao= '';
      this.searchForm.gioRa= '';
      this.search();
    }
  }

  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = item;
    console.log(item);
    // console.log(this.formData);
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenHoaDon}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.hoaDonThanhToanService.deleteHoaDonThanhToan(item.id).subscribe(
          {
            next: (res: any) => {
              this.searchForm.tenHoaDon = '';
              this.searchForm.nhanViens = '';
              this.searchForm.gioVao= '';
              this.searchForm.gioRa= '';
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
}
