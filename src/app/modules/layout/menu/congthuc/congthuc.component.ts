import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { CongthucService } from './services/congthuc.service';
import { NguyenlieuService } from '../nguyenlieu/services/nguyenlieu.service';
import { NguyenLieu } from '../../../../models/NguyenLieu';
import { CongThucStore } from './store/cong-thuc.store';
import { AddoreditCongThucComponent } from './addoredit/addoreditCongThuc.component';
import { FileService } from '../../../../core/services/file.service';



@Component({
  selector: 'app-congthuc',
  templateUrl: './congthuc.component.html',
  styleUrl: './congthuc.component.scss'
})
export class CongthucComponent implements OnInit {
  constructor(private store: CongThucStore, private dialog: MatDialog, 
    private notification: NzNotificationService, 
    private congThucService: CongthucService, 
    private fileService: FileService,
    private nguyenLieuService: NguyenlieuService) {}
  congThucPaging: any[] = []; 
  itemsSearch: any[] = [];
  nguyenLieu: NguyenLieu[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0
  };

  totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.congThucPaging);  
    this.nguyenLieuService.getNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.nguyenLieu = res.data.data;
      }
    });
    this.search();
  }
  searchForm: any = {
    tenCongThuc: '',
  };
  search() {
    this.searchForm.isPaging = true; // Lấy tất cả dữ liệu
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.congThucService.getCongThuc(this.searchForm).subscribe({
      next: (res: any) => {
        this.congThucPaging = res.data.data; // Lưu toàn bộ dữ liệu
        this.paging.page = res.data.paging.currentPage;
        this.paging.size = res.data.paging.pageSize;
        this.paging.total = res.data.paging.totalRecords;
        this.totalPages = Math.ceil(this.paging.total / this.paging.size);
      },
      error: (err: any) => {
        this.notification.error('Lỗi', 'Lấy dữ liệu thất bại');
      }
    });  
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
    this.searchForm.tenCongThuc = '';
    this.search();
  }
  openAddPopup(): void {
      const dialogRef = this.dialog.open(AddoreditCongThucComponent, {
        width: '800px',
        height: '600px',
        data: {}, // Không truyền dữ liệu vì là Thêm
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.congThucService.addCongThuc(result).subscribe(
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
  openEditPopup(item: any): void {
    const dialogRef = this.dialog.open(AddoreditCongThucComponent, {
      width: '400px',
      data: { item }, // Truyền dữ liệu của nguyên liệu cần sửa
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.congThucService.updateCongThuc(item.id, result).subscribe(
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
      data: { message: `Bạn có chắc chắn muốn xóa "${item.tenCongThuc}" không?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      this.congThucService.deleteCongThuc(item.id).subscribe(
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
}
