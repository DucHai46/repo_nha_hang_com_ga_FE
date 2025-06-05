import { Component, OnInit } from '@angular/core';
import { UserStore } from './store/user.store';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { UserService } from './services/user.service';
import { User } from '../../../../models/User';
import { PhanQuyenService } from '../phanquyen/services/phanquyen.service';
import { NhanVienService } from '../nhanvien/services/nhanvien.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  constructor(private store: UserStore,
    private dialog: MatDialog, private notification: NzNotificationService,
    private phanQuyenService: PhanQuyenService,
    private userService: UserService,
    private nhanVienService: NhanVienService
  ) { }
  userPaging: User[] = [];
  itemsSearch: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  phanQuyen: any[] = [];
  nhanVien: any[] = [];
  ngOnInit(): void {
    this.phanQuyenService.getPhanQuyen({ isPaging: true, page: 1, size: 1000 }).subscribe(
      {
        next: (res: any) => {
          this.phanQuyen = res.data.data;
        }
      }
    )
    this.nhanVienService.getNhanVien({ isPaging: true, page: 1, size: 1000 }).subscribe(
      {
        next: (res: any) => {
          this.nhanVien = res.data.data;
        }
      }
    )
    this.search();
    this.store.setItems$(this.userPaging);
  }

  getPhanQuyen(id: string) {
    return this.phanQuyen.find(item => item.id === id)?.tenPhanQuyen;
  }
  getNhanVien(id: string) {
    return this.nhanVien.find(item => item.id === id)?.tenNhanVien;
  }

  searchForm: any = {
    searchFullName: ''
  };
  search() {
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.userService.getAllUser(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.userPaging = res.items;
          this.paging.page = res.currentPage;
          this.paging.size = res.pageSize;
          this.paging.total = res.totalItems;
          this.totalPages = res.totalPages;
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
    this.paging.page = 1; 
    this.search();
  }

  reset() {
    this.searchForm.searchFullName = '';
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
  onSaveUser(body: any): void {
    console.log(body);

    if (!body) return;

    if (this.isEditMode) {
      this.userService.updateUserInfo(body.id, body).subscribe({
        next: (res: any) => {
          if (res) {
            this.searchForm.searchFullName = '';
            this.closePopup();
            this.search();
            this.notification.create(
              'success',
              'Thông báo!',
              `Cập nhật thông tin thành công`,
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
          `Cập nhật thông tin thất bại`,
          {
            nzClass: 'notification-error',
            nzDuration: 2000
          }
        )
      });
    } else {
      this.userService.registerUser(body).subscribe({
        next: (res: any) => {
          if (res) {
            this.searchForm.searchFullName = '';
            this.closePopup();
            this.search();
            this.notification.create(
              'success',
              'Thông báo!',
              `Tạo tài khoản thành công`,
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
          `Tạo tài khoản thất bại`,
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
      id: item.id,
      fullName: item.fullName,
      isActive: item.isActive,
      phanQuyen: item.phanQuyen,
      nhanVienId: item.nhanVienId,
    };
  }
  openDeletePopup(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn xóa "${item.fullName}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(item.id).subscribe(
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

  isPopupChangePassword = false;
  openChangePasswordPopup(item: any): void {
    this.isPopupChangePassword = true;
    this.formData = {
      id: item.id,
      password: ''
    };
  }
  closePopupChangePassword(): void {
    this.isPopupChangePassword = false;
    this.formData = {};
  }

  onSaveChangePassword(body: any): void {
    console.log(body);
    this.userService.updateUserPassword(body.id, body).subscribe({
      next: (res: any) => {
        this.search();
        this.closePopupChangePassword();
        this.notification.create(
          'success',
          'Thông báo!',
          `Đổi mật khẩu thành công`,
          {
            nzClass: 'notification-success',
            nzDuration: 2000
          }
        );
      },
      error: () => this.notification.create(
        'error',
        'Thông báo!',
        `Đổi mật khẩu thất bại`,
        {
          nzClass: 'notification-error',
          nzDuration: 2000
        }
      )
    })
  }

  lockUser(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Bạn có chắc chắn muốn ${item.isActive ? 'khóa' : 'mở khóa'} tài khoản "${item.fullName}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.lockUser(item.id, !item.isActive).subscribe({
          next: (res: any) => {
            this.search();
            this.notification.create(
              'success',
              'Thông báo!',
              `${item.isActive ? 'Khóa' : 'Mở khóa'} tài khoản thành công`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
          },
          error: () => this.notification.create(
            'error',
            'Thông báo!',
            `${item.isActive ? 'Khóa' : 'Mở khóa'} tài khoản thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          )
        })
      }
    })
  }

  isPopupPhanQuyen = false;
  openPhanQuyenPopup(item: any): void {
    this.isPopupPhanQuyen = true;
    this.formData = {
      id: item.id,
      phanQuyen: item.phanQuyen,
    };
  }

  onSavePhanQuyen(body: any): void {
    console.log(body);
    this.userService.updateUserRole(body.id, body).subscribe({
      next: (res: any) => {
        this.search();
        this.closePopupPhanQuyen();
        this.notification.create(
          'success',
          'Thông báo!',
          `Cập nhật phân quyền thành công`,
          {
            nzClass: 'notification-success',
            nzDuration: 2000
          }
        );
      },
      error: () => this.notification.create(
        'error',
        'Thông báo!',
        `Cập nhật phân quyền thất bại`,
        {
          nzClass: 'notification-error',
          nzDuration: 2000
        }
      )
    })
  }

  closePopupPhanQuyen(): void {
    this.isPopupPhanQuyen = false;
    this.formData = {};
  }
}
