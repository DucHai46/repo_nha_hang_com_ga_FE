import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MenuDynamicStore } from './store/menu-dynamic.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { MenuDynamicService } from './services/menudynamic.service';
import { MenuDynamic } from '../../../../models/MenuDynamic';
@Component({
  selector: 'app-menudynamic',
  templateUrl: './menudynamic.component.html',
  styleUrl: './menudynamic.component.scss'
})
export class MenuDynamicComponent implements OnInit {
  constructor(private store: MenuDynamicStore, private dialog: MatDialog, private notification: NzNotificationService, private menuDynamicService: MenuDynamicService) {}
  menuDynamicPaging: MenuDynamic[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.menuDynamicPaging);  
  }

  searchForm: any = {
    label: '',
  }; 

  search(){
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.menuDynamicService.getMenuDynamic(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.menuDynamicPaging = res.data.data;
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
    this.searchForm.label = '';
    this.search()
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
  onSaveMenuDynamic(body: any): void {
    console.log(body);
  
    if (!body) return;
  
    if (this.isEditMode) {
      // Sửa bàn
      this.menuDynamicService.updateMenuDynamic(body.id, body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.label = '';
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
      // Thêm mới bàn
      this.menuDynamicService.addMenuDynamic(body).subscribe({
        next: (res: any) => {
          if (res.data) {
            this.searchForm.tenDanhMuc = '';
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
        data: { message: `Bạn có chắc chắn muốn xóa "${item.label}" không?` },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.menuDynamicService.deleteMenuDynamic(item.id).subscribe(
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
  toggleActive(item: any): void {
    const newStatus = !item.isActive;
    item.isActive = newStatus;
    item.parent = item.parent.id;
    this.menuDynamicService.updateMenuDynamic(item.id, item).subscribe({
      next: (res: any) => {
      if (res.data) {
        this.search();
      } else {}
    },
    error: () => this.notification.create(
      'error',
      'Thông báo!',
      `Cập nhật thất bại`, {
      nzClass: 'notification-error',
      nzDuration: 2000
    })
  });
  }
}
