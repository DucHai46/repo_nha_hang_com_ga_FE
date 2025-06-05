import { Component } from '@angular/core';
import { LichLamViecNhanVienStore } from './store/lich-lam-viec-nhan-vien.store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LichLamViecNhanVienService } from './services/lichlamviecnhanvien.service';

@Component({
  selector: 'app-lichlamviecnhanvien',
  templateUrl: './lichlamviecnhanvien.component.html',
  styleUrl: './lichlamviecnhanvien.component.scss'
})
export class LichlamviecnhanvienComponent {
  constructor(
    private store: LichLamViecNhanVienStore, 
    private notification: NzNotificationService,
    private lichLamViecService: LichLamViecNhanVienService,
  ) {}
  lichLamViecPaging: any[] = [];
  paging: any = {
    page: 1,
    size: 10,
    total: 0,
  };
  totalPages = 0;
  ngOnInit(): void {
    this.search();
    this.store.setItems$(this.lichLamViecPaging);
    
  }

  searchForm: any = {
    ngay: '',
  };
  search() {
   this.searchForm.isPaging = true;
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
    this.paging.page = 1;
    this.search();
  }

  reset(){
   this.searchForm.ngay = '';
   this.search(); 
  }

  isOpenChiTietPopup = false;
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}


  closePopup(): void {
    this.isPopupOpen = false;
    this.isOpenChiTietPopup = false;
    this.isEditMode = false;
  }

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
}
