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
    tenLoaiMonAn: '',
    giaTien: '',
  }
  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.monAnService.getMonAn(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.monAnPaging = res.data.data;
          console.log(this.monAnPaging);
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
    this.paging.page = 1; // Reset về trang đầu khi thay đổi kích thước trang
    this.search();
  }
  reset(){
    this.searchForm.tenMonAn = '';
    this.searchForm.tenLoaiMonAn='';
    this.searchForm.giaTien='';
    this.search();
  }
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}
  openAddPopup(): void {
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
      // Sửa bàn
      this.monAnService.updateMonAn(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenMonAn = '';
            this.searchForm.tenLoaiMonAn='';
            this.searchForm.giaTien='';
            this.search();
            this.closePopup();
          } else {
            alert('Cập nhật thất bại');
          }
        },
        error: () => alert('Cập nhật thất bại')
      });
    } else {
      // Thêm mới bàn
      this.monAnService.addMonAn(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenMonAn = '';
            this.searchForm.tenLoaiMonAn='';
            this.searchForm.giaTien='';
            this.search();
            this.closePopup();
          } else {
            alert('Thêm mới thất bại');
          }
        },
        error: () => alert('Thêm mới thất bại')
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
  isChiTietOpen=false;
  chiTietCongThuc: any = {};
  openChiTietPopup(item: any): void {
    this.isChiTietOpen = true; // mở popup ChiTiet
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



  





}
