import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NguyenLieuStore } from './store/nguyen-lieu.store';
import { AddoreditNguyenLieuComponent } from './addoredit/addoreditNguyenLieu.component';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { NguyenlieuService } from './services/nguyenlieu.service';
import { LoainguyenlieuService } from '../loainguyenlieu/services/loainguyenlieu.service';
import { LoaiNguyenLieu } from '../../../../models/LoaiNguyenLieu';
import {TuDo} from '../../../../models/TuDo';
import { TuDoService } from '../tudo/services/tudo.service';
import { DonViTinh } from '../../../../models/DonViTinh';
import { DonViTinhService } from '../donvitinh/services/donvitinh.service';
import { TrangThaiNguyenLieu } from '../../../../models/TrangThaiNguyenLieu';


@Component({
  selector: 'app-nguyenlieu',
  templateUrl: './nguyenlieu.component.html',
  styleUrl: './nguyenlieu.component.scss'
})
export class NguyenlieuComponent implements OnInit {
  constructor(private store: NguyenLieuStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private nguyenlieuService: NguyenlieuService,
    private loaiNguyenLieuService: LoainguyenlieuService,
    private tuDoService: TuDoService,
    private donViTinhService: DonViTinhService) {}
  nguyenLieuPaging: any[] = []; 
  itemsSearch: any[] = [];
  loaiNguyenLieu: LoaiNguyenLieu[] = [];
  tuDo: TuDo[] = [];
  donViTinh: DonViTinh[] = [];
  ngOnInit(): void {
    this.store.setItems$(this.nguyenLieuPaging);  
    this.loaiNguyenLieuService.getLoaiNguyenLieu({}).subscribe(
      {
        next: (res: any) => {
          this.loaiNguyenLieu = res.data.data;
        }
      }
    )
    this.tuDoService.getTuDo({}).subscribe(
      {
        next: (res: any) => {
          this.tuDo = res.data.data;
        }
      }
    )
    this.donViTinhService.getDonViTinh({}).subscribe(
      {
        next: (res: any) => {
          this.donViTinh = res.data.data;
        }
      }
    )
    this.search();
  }
  searchForm: any = {
    tenNguyenLieu: '',
    loaiNguyenLieuId: '',
    donViTinhId: '',
    tuDoId: '',
  };
  search(){
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = 1;
    this.searchForm.PageSize = 20;
    this.nguyenlieuService.getNguyenLieu(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.nguyenLieuPaging = res.data.data;
        },
        error: (err: any) => {
          alert('Lấy dữ liệu thất bại');
        }
      }
    )  
  }
  getTrangThaiName(trangThai: number): string {
    switch(trangThai) {
      case TrangThaiNguyenLieu.HangMoi: return 'Hàng mới';
      case TrangThaiNguyenLieu.DaQuaSuDung: return 'Đã qua sử dụng';
      case TrangThaiNguyenLieu.DangSuDung: return 'Đang sử dụng';
      default: return 'Không xác định';
    }
  }
  reset(){
    this.searchForm.tenNguyenLieu = '';
    this.searchForm.loaiNguyenLieuId = '';
    this.searchForm.tuDoId = '';
    this.searchForm.donViTinhId = '';
    this.search();
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenNguyenLieu}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.nguyenlieuService.deleteNguyenLieu(item.id).subscribe(
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
      openEditPopup(item: any): void {
        const dialogRef = this.dialog.open(AddoreditNguyenLieuComponent, {
          width: '400px',
          data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
          this.nguyenlieuService.updateNguyenLieu(item.id, result).subscribe(
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


}
