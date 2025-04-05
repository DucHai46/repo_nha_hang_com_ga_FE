import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddoreditBanComponent } from './addoredit/addoreditBan.component';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { BanAnService } from './services/banan.service';
import { LoaiBanAnService } from '../loaibanan/services/loaibanan.service';
import { LoaiBanAn } from '../../../../models/LoaiBanAn';
import { BanAnStore } from './store/ban-an.store';
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
  ngOnInit(): void {
    this.store.setItems$(this.banAnPaging);  
    this.loaiBanAnService.getLoaiBanAn({}).subscribe(
      {
        next: (res: any) => {
          this.loaiBanAn = res.data.data;
        }
      }
    )
    this.search();
  }
  searchForm: any = {
    tenBan: '',
    loaiBanId: ''
  };
  search(){
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = 1;
    this.searchForm.PageSize = 20;
    this.banAnService.getBanAn(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.banAnPaging = res.data.data;
        },
        error: (err: any) => {
          alert('Lấy dữ liệu thất bại');
        }
      }
    )  
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
