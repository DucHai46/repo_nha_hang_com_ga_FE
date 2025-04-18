import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddoreditBanComponent } from './addoredit/addoreditBan.component';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { BanAnService } from './services/banan.service';
import { LoaiBanAnService } from '../loaibanan/services/loaibanan.service';
import { LoaiBanAn } from '../../../../models/LoaiBanAn';
import { BanAnStore } from './store/ban-an.store';
import { TrangThaiBan } from '../../../../models/TrangThaiBan';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-banan',
  templateUrl: './banan.component.html',
  styleUrl: './banan.component.scss'
})
export class BananComponent implements OnInit {
  constructor(private store: BanAnStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private banAnService: BanAnService, 
    private loaiBanAnService: LoaiBanAnService) {}
  banAnPaging: any[] = []; 
  itemsSearch: any[] = [];
  loaiBanAn: LoaiBanAn[] = [];
// Thêm vào component class
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.banAnPaging);  
    this.loaiBanAnService.getLoaiBanAn({}).subscribe({
      next: (res: any) => {
        this.loaiBanAn = res.data.data;
      }
    });
    this.search();
  }
  searchForm: any = {
    tenBan: '',
    idLoaiBan: ''
  };
  getTrangThaiName(trangThai: number): string {
    switch(trangThai) {
      case TrangThaiBan.ConTrong: return 'Còn trống';
      case TrangThaiBan.DatTruoc: return 'Đặt trước';
      case TrangThaiBan.DangSuDung: return 'Đang sử dụng';
      default: return 'Không xác định';
    }
  }
  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.banAnService.getBanAn(this.searchForm).subscribe({
      next: (res: any) => {
        this.banAnPaging = res.data.data; // Lưu toàn bộ dữ liệu
        this.paging.page = res.data.paging.currentPage;
        this.paging.size = res.data.paging.pageSize;
        this.paging.total = res.data.paging.totalRecords;
        this.totalPages = Math.ceil(this.paging.total / this.paging.size);
      },
      error: (err: any) => {
        this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
      }
    });  
  }

  // Thêm vào component class
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

  reset(){
    this.searchForm.tenBan = '';
    this.searchForm.loaiBanId = '';
    this.search();
  }
  openAddPopup(): void {
      const dialogRef = this.dialog.open(AddoreditBanComponent, {
        width: '400px',
        data: {}, // Không truyền dữ liệu vì là Thêm
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.banAnService.addBanAn(result).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                // alert('Thêm mới thành công');
                this.searchForm.tenBan = '';
                this.searchForm.loaiBanId = '';
                this.search();
              }
              else{
                alert('Thêm mới thất bại');
              }
            },
            error: (err: any) => {
              alert('Thêm mới thất bại');
            }
          }
        )
          // this.notification.success(
          //   'Thành công', // Tiêu đề
          //   'Thêm dữ liệu thành công', // Nội dung
          //   {
          //     nzDuration: 3000, // Thời gian hiển thị (ms)
          //     nzPlacement: 'topRight', // Đặt vị trí là góc trên phải
          //   }
          // );
        }
        else{
          // this.notification.error(
          //   'Thành công', // Tiêu đề
          //   'Thêm dữ liệu thất bại', // Nội dung
          //   {
          //     nzDuration: 3000, // Thời gian hiển thị (ms)
          //     nzPlacement: 'topRight', // Đặt vị trí là góc trên phải
          //   }
          // );
        }
      });
    }
    // Hàm mở popup Sửa
  openEditPopup(item: any): void {
    const dialogRef = this.dialog.open(AddoreditBanComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.banAnService.updateBanAn(item.id, result).subscribe(
        {
          next: (res: any) => {
            if(res.data){
              this.search();
            }
            else{
              alert('Sửa thất bại');
            }
          },
          error: (err: any) => {
            alert('Sửa thất bại');
          }
        }
        )
      }
    });
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenBan}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.banAnService.deleteBanAn(item.id).subscribe(
        {
          next: (res: any) => {
            this.search();
          }
        }
      )
        // this.notification.create(
        //   'success',
        //   'Thành công!',
        //   `Xóa dữ liệu thành công`, {
        //   nzClass: 'vnpt-qhkh-notification-success',
        // });
      } else {
        // this.notification.create(
        //   'error',
        //   'Thành công!',
        //   `Xóa dữ liệu thất bại`, {
        //   nzClass: 'vnpt-qhkh-notification-error',
        // });
      }
    });
  }
  
  

}
