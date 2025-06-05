import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MonAnStore } from './store/mon-an.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { MonAnService } from './services/monan.service';
import { LoaimonanService } from '../loaimonan/services/loaimonan.service';
import { LoaiMonAn } from '../../../../models/LoaiMonAn';
import {GiamGia} from '../../../../models/GiamGia';
import { giamgiaService } from '../giamgia/services/giamgia.service';
import { CongThuc } from '../../../../models/CongThuc';
import { CongthucService } from '../congthuc/services/congthuc.service'; 
import { FileService } from '../../../../core/services/file.service';
import { BangGia } from '../../../../models/BangGia';

import { BangGiaService } from '../banggia/services/banggia.service';


@Component({
  selector: 'app-monan',
  templateUrl: './monan.component.html',
  styleUrl: './monan.component.scss'
})
export class MonanComponent implements OnInit {
  constructor(private store: MonAnStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private monAnService: MonAnService,
    private fileService: FileService,
    private loaiMonAnService: LoaimonanService,
    private giamgiaService: giamgiaService,
    private bangGiaService: BangGiaService,
    private congthucService: CongthucService) {}
  monAnPaging: any[] = [];
  itemsSearch: any[] = [];
  loaiMonAn: LoaiMonAn[] = [];
  giamGia: GiamGia[] = [];
  congThuc: CongThuc[] = [];

  paging: any = {
    page: 1,
    size: 10,
    total: 0
  }
  totalPages = 0
  ngOnInit(): void {
      this.store.setItems$(this.monAnPaging);
      this.loaiMonAnService.getLoaiMonAn({}).subscribe(
        {
          next: (res: any) => {
            this.loaiMonAn = res.data.data;
          }
        }
      )
      this.giamgiaService.getGiamGia({}).subscribe(
        {
          next: (res: any) => {
            this.giamGia = res.data.data;
          }
        }
      )
      this.congthucService.getCongThuc({}).subscribe(
        {
          next: (res: any) => {
            this.congThuc = res.data.data;
          }
        }
      )
      this.search();  
  }
  searchForm: any={
    tenMonAn: '',
    idLoaiMonAn: '',
    giaTien: '',
  }
  search() {
    this.searchForm.isPaging = true;
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.monAnService.getMonAn(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.monAnPaging = res.data.data;
          console.log(this.monAnPaging);
          this.loadAllImages();
          this.paging.page = res.data.paging.currentPage;
          this.paging.size = res.data.paging.pageSize;
          this.paging.total = res.data.paging.totalRecords;
          this.totalPages = Math.ceil(this.paging.total / this.paging.size);
        },
        error: (err: any) => {
          this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
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
  reset(){
    this.searchForm.tenMonAn = '';
    this.searchForm.idLoaiMonAn='';
    this.searchForm.giaTien='';
    this.search();
  }
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}
  openAddPopup(): void {
          console.log(this.loaiMonAn);
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }
  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }
  onSaveCongThuc(body: any): void {
    console.log(body);

  
    if (!body) return;
  
    if (this.isEditMode) {
      this.monAnService.updateMonAn(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            const bangGia={
              monAn:res.data.id,
              giaTri:res.data.giaTien,
              tenGia:'Giá của món ' + res.data.tenMonAn,
            };
            console.log(bangGia);
            this.bangGiaService.addBangGia(bangGia).subscribe();
            console.log(bangGia);
            this.searchForm.tenMonAn = '';
            this.searchForm.idLoaiMonAn='';
            this.searchForm.giaTien='';
            this.search();
            this.closePopup();
            this.notification.create(
              'success',
              'Thông báo!',
              `Cập nhật thành công`,
              {
                nzClass: 'notification-success',  
                nzDuration: 2000
              }
            );
          } else {
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
        },
        error: () => this.notification.create(
          'error',
          'Thông báo!',
          `Cập nhật thất bại`,
          {
            nzClass: 'notification-error',  
            nzDuration: 2000
          }
        )
      });
    } else {
      console.log(body);
      this.monAnService.addMonAn(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            const bangGia={
              monAn:res.data.id,
              giaTri:res.data.giaTien,
              tenGia:'Giá của món ' + res.data.tenMonAn,
            };
            console.log(bangGia);
            this.bangGiaService.addBangGia(bangGia).subscribe();
            this.searchForm.tenMonAn = '';
            this.searchForm.idLoaiMonAn='';
            this.searchForm.giaTien='';
            this.search();
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
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Thêm mới thất bại`,
              {
                nzClass: 'notification-error',  
                nzDuration: 2000
              }
            );
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
    }
  }
  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = item;
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenMonAn}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.monAnService.deleteMonAn(item.id).subscribe(
        {
          next: (res: any) => {
            this.search();
            this.notification.create(
              'success',
              'Thông báo!',
              `Xóa thành công`,
              {
                nzClass: 'notification-success',      
                nzDuration: 2000
              }
            );
          },
          error: () => this.notification.create(
            'error',
            'Thông báo!',
            `Xóa thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          )
        }
      )
      } else {
        this.notification.create(
          'error',
          'Thông báo!',
          `Xóa thất bại`,
          {
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
  isChiTietOpen=false;
  chiTietCongThuc: any = {};
  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true; 
    const congThucId=item.congThuc.id;
    console.log(congThucId);
    this.congthucService.getCongThucById(congThucId).subscribe((response: any) => {
      this.chiTietCongThuc = response.data;
    });
    console.log(this.chiTietCongThuc);

  }
  closeChiTiet(): void {
    this.isChiTietOpen = false;
  }
  imageUrls: { [key: string]: string } = {};
  loadAllImages(): void {
    for (let item of this.monAnPaging) {
      const parsed = this.parseJSON(item.hinhAnh);
      if (parsed?.id && item.id) {
        this.fileService.downloadFile(parsed.id).subscribe(
          (blob: Blob) => {
            const url = URL.createObjectURL(blob);
            this.imageUrls[item.id] = url;
          },
          (error) => console.error('Lỗi tải ảnh cho', item.tenMonAn, error)
        );
      }
    }
  }
}
