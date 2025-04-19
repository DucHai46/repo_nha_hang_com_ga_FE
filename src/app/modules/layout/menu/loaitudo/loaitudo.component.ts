import { Component, OnInit } from '@angular/core';
import { LoaiTuDoStore } from './store/loai-tu-do.store';
import { AddoreditLoaiTuDoComponent } from './addoredit/addoreditLoaiTuDo.component';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { LoaiTuDoService } from './services/loaitudo.service';
import { LoaiTuDo } from '../../../../models/LoaiTuDo';


@Component({
  selector: 'app-loaitudo',
  templateUrl: './loaitudo.component.html',
  styleUrl: './loaitudo.component.scss'
})
export class LoaitudoComponent implements OnInit {
  constructor(private store: LoaiTuDoStore, 
    private dialog: MatDialog, private notification: NzNotificationService, 
    private loaitudoService: LoaiTuDoService) {}
  loaiTuDoPaging: LoaiTuDo[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;

  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.loaiTuDoPaging);
  }

  searchForm: any = {
    // ma: '',
    tenLoai: ''
  };
  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.loaitudoService.getLoaiTuDo(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.loaiTuDoPaging = res.data.data;
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
    this.paging.page = 1; // Reset về trang đầu khi thay đổi kích thước trang
    this.search();
  }

  reset() {
    this.searchForm.tenLoai = '';
    this.search()
  }
  openAddPopup(): void {
    const dialogRef = this.dialog.open(AddoreditLoaiTuDoComponent, {
      width: '400px',
      data: {}, // Không truyền dữ liệu vì là Thêm
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('Thêm mới:', result);
        this.loaitudoService.addLoaiTuDo(result).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                // alert('Thêm mới thành công');
                this.searchForm.tenLoai = '';
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
  openEditPopup(item: any): void {
    const dialogRef = this.dialog.open(AddoreditLoaiTuDoComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaitudoService.updateLoaiTuDo(item.id, result).subscribe(
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
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenLoai}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaitudoService.deleteLoaiTuDo(item.id).subscribe(
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
