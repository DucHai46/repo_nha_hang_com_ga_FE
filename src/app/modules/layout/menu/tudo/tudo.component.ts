import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddoreditTuDoComponent } from './addoredit/addoreditTuDo.component';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { TuDoService } from './services/tudo.service';
import { LoaiTuDoService } from '../loaitudo/services/loaitudo.service';
import { LoaiTuDo } from '../../../../models/LoaiTuDo';
import { TuDoStore } from './store/tu-do.store';

@Component({
  selector: 'app-tudo',
  templateUrl: './tudo.component.html',
  styleUrl: './tudo.component.scss'
})
export class TudoComponent implements OnInit {
  constructor(private store: TuDoStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private tuDoService: TuDoService, 
    private loaiTuDoService: LoaiTuDoService) {}
  tuDoPaging: any[] = []; 
  itemsSearch: any[] = [];
  loaiTuDo: LoaiTuDo[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.tuDoPaging);  
    this.loaiTuDoService.getLoaiTuDo({}).subscribe(
      {
        next: (res: any) => {
          this.loaiTuDo = res.data.data;
        }
      }
    )
    this.search();
  }
  searchForm: any = {
    tenTuDo: '',
    loaiTuDoId: ''
  };
  search(){
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.tuDoService.getTuDo(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.tuDoPaging = res.data.data;
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

  reset(){
    this.searchForm.tenTuDo = '';
    this.searchForm.loaiTuDoId = '';
    this.search();
  }


  openAddPopup(): void 
  {
      const dialogRef = this.dialog.open(AddoreditTuDoComponent, {
        width: '400px',
        data: {}, // Không truyền dữ liệu vì là Thêm
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.tuDoService.addTuDo(result).subscribe(
          {
            next: (res: any) => {
              if (res.data) {
                // alert('Thêm mới thành công');
                this.searchForm.tenTuDo = '';
                this.searchForm.loaiTuDoId = '';
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
    const dialogRef = this.dialog.open(AddoreditTuDoComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tuDoService.updateTuDo(item.id, result).subscribe(
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
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenTuDo}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.tuDoService.deleteTuDo(item.id).subscribe(
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
