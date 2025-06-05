import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BangGiaStore } from './store/bang-gia.store';
import { ConfirmationDialogComponent } from '../../../../core/confirmation-dialog/confirmation-dialog.component';
import { BangGiaService } from './services/banggia.service'; 
import { MonAnService } from '../monan/services/monan.service';
import { MonAn } from '../../../../models/MonAn';
@Component({
  selector: 'app-banggia',
  templateUrl: './banggia.component.html',
  styleUrl: './banggia.component.scss'
})
export class BanggiaComponent implements OnInit {
  constructor(
    private store: BangGiaStore,
    private bangGiaService: BangGiaService,
    private monAnService: MonAnService,
    private dialog: MatDialog,
    private notification: NzNotificationService
  ) {}
    bangGiaPaging: any[] = []; 
    itemsSearch: any[] = [];
    monAn: MonAn[] = [];
    paging: any = {
      page: 1,
      size: 10,
      total: 0
    };
  
    totalPages = 0;
  ngOnInit(): void {
    this.store.setItems$(this.bangGiaPaging);  
    this.monAnService.getMonAn({}).subscribe(
      {
        next: (res: any) => {
          this.monAn = res.data.data;
        }
      }
    )
    this.search();
  }
  searchForm: any = {

    idMonAn: ''
  };
  search(){
    this.searchForm.isPaging = true; 
    this.searchForm.PageNumber = this.paging.page;
    this.searchForm.PageSize = this.paging.size;
    this.bangGiaService.getBangGia(this.searchForm).subscribe(
      {
        next: (res: any) => {
          this.bangGiaPaging = res.data.data;
          console.log(this.bangGiaPaging);
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
    this.paging.page = 1;
    this.search();
  }
  reset(){

    this.searchForm.idMonAn = '';
    this.search();
  }
  isPopupOpen = false;
  isEditMode = false;
  formData: any = {}

}
