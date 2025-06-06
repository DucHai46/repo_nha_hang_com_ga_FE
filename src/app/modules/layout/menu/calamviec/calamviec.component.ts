import { Component } from '@angular/core';
import { CaLamViecStore } from './store/ca-lam-viec.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CaLamViecService } from './services/calamviec.service';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-calamviec',
  templateUrl: './calamviec.component.html',
  styleUrl: './calamviec.component.scss'
})
export class CalamviecComponent {
  constructor(
    private store: CaLamViecStore, 
    private dialog: MatDialog,
    private notification: NzNotificationService,
    private caLamViecService: CaLamViecService
  ) {}
  caLamViecPaging: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0,
  };
  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.caLamViecPaging);
    
  }

  searchForm: any = {
    tenCaLamViec: ''
  };
  search() {
   this.searchForm.isPaging = true; 
   this.searchForm.pageNumber = this.paging.page;
   this.searchForm.pageSize = this.paging.size;
   this.caLamViecService.getCaLamViec(this.searchForm).subscribe(
    {
     next: (res: any) => {
      this.caLamViecPaging = res.data.data;
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
    this.paging.page = 1; 
    this.search();
  }

  reset(){
   this.searchForm.tenCaLamViec = '';
   this.search(); 
  }

  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}

  
  openAddPopup(){
    this.isPopupOpen = true;
    this.isEditMode = false;
    this.formData = {};
  }

  
  closePopup(): void {
    this.isPopupOpen = false;
    this.isEditMode = false;
  }

  onSaveCongThuc(body: any): void {
    
    if(!body) return;

   
    if(this.isEditMode){
 
      this.caLamViecService.updateCaLamViec(body.id, body).subscribe(
        {
          next: (res: any) => {
            if(res.data) {
              this.searchForm.tenCaLamViec = '';
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

      this.caLamViecService.addCaLamViec(body).subscribe(
        {
          next: (res: any) => {
            if(res.data) {
              this.searchForm.tenCaLamViec = '';
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


  openEditPopup(item: any): void {
    this.isPopupOpen = true;
    this.isEditMode = true;
    this.formData = {
      tenCaLamViec: item.tenCaLamViec,
 
      gioVao: item.gioVao,
      gioRa: item.gioRa,
      id: item.id,
      moTa: item.moTa,
    };
  }

  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '400px',
     data: { message: `Bạn có chắc chắn muốn xóa "${item.tenCaLamViec}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
       this.caLamViecService.deleteCaLamViec(item.id).subscribe(
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
