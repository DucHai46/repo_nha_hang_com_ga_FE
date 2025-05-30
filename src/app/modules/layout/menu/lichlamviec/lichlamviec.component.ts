import { CaLamViecService } from './../calamviec/services/calamviec.service';
import { Component } from '@angular/core';
import { LichLamViecStore } from './store/lich-lam-viec.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LichLamViecService } from './services/lichlamviec.service';
import { NhanVienService } from '../nhanvien/services/nhanvien.service';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-lichlamviec',
  templateUrl: './lichlamviec.component.html',
  styleUrl: './lichlamviec.component.scss'
})
export class LichlamviecComponent {
  constructor(
    private store: LichLamViecStore, 
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private lichLamViecService: LichLamViecService,
    private nhanVienService: NhanVienService,
    private caLamViecService: CaLamViecService,
  ) {}
  lichLamViecPaging: any[] = [];
  // itemsSearch: any [] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0,
  };
  totalPages = 0;
  ngOnInit(): void {
    // Khởi tạo component
    this.search();
    this.store.setItems$(this.lichLamViecPaging);
    
  }

  searchForm: any = {
    ngay: '',
    tuNgay: '',
    denNgay: '',

  };
  search() {
   this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
   this.searchForm.pageNumber = this.paging.page;
   this.searchForm.pageSize = this.paging.size;
   this.lichLamViecService.getLichLamViec(this.searchForm).subscribe(
    {
     next: (res: any) => {
      this.lichLamViecPaging = res.data.data;
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

  changePage(newPage: number){
    if(newPage < 1 || newPage > this.totalPages) return;
    this.paging.page = newPage;
    this.search();
  }

  changePageSize(newSize: number){
    this.paging.size = newSize;
    this.paging.page = 1; // Reset về trang đầu
    this.search();
  }

  reset(){
   this.searchForm.ngay = '';
   this.searchForm.tuNgay = '';
   this.searchForm.denNgay = '';
   this.search(); 
  }

  isOpenChiTietPopup = false;
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}

  // Hàm mở popup thêm mới
  openAddPopup(){
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }

  // Hàm đóng popup
  closePopup(): void {
    this.isPopupOpen = false;
    this.isOpenChiTietPopup = false;
    this.isEditMode = false;
  }

  //Hàm mở popup chi tiết lịch làm việc
  openChiTietPopup(item: any): void {
    this.isOpenChiTietPopup = true;
    this.isEditMode = true;
    this.formData = {
      ngay: item.ngay,
      chiTietLichLamViec: item.chiTietLichLamViec,
      id: item.id,
      moTa: item.moTa,
    };
  }

  onSaveCongThuc(body: any): void {
    console.log(body);
    
    if(!body) return;

    // Nếu true thì sửa lịch làm việc
    if(this.isEditMode){
      // Sửa lịch làm việc
      this.lichLamViecService.updateLichLamViec(body.id, body).subscribe(
        {
          next: (res: any) => {
            console.log(res);
            if(res.data) {
              this.searchForm.ngay = '';
              this.searchForm.tuNgay = '';
              this.searchForm.denNgay = '';
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
              )
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
        }
      );
    } else {
      // Thêm mới lịch làm việc
      this.lichLamViecService.addLichLamViec(body).subscribe(
        {
          next: (res: any) => {
            if(res.data) {
              this.searchForm.ngay = '';
              this.searchForm.tuNgay = '';
              this.searchForm.denNgay = '';
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

  // Hàm mở popup sửa
  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = {
      ngay: item.ngay,
      chiTietLichLamViec: item.chiTietLichLamViec,
      id: item.id,
      moTa: item.moTa,
    };
  }

  // Hàm mở popup xác nhận xóa
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '400px',
     data: { message: `Bạn có chắc chắn muốn xóa lịch làm việc ngày "${item.ngay}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
       this.lichLamViecService.deleteLichLamViec(item.id).subscribe(
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
        )
      }  
    });
  }
}
