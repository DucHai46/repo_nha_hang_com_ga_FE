import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChucVuService } from '../../chucvu/services/chucvu.service';
@Component({
  selector: 'app-popupNhanVien',
  templateUrl: './popupNhanVien.component.html',
  styleUrls: ['./popupNhanVien.component.scss']
})
export class PopupNhanVienComponent implements OnInit {
  chucVuList: any[] = [];
  searchForm: any = {
    isPaging: false,
    PageNumber: 1,
    PageSize: 100,
  };

  constructor(private chucVuService: ChucVuService) { }

  ngOnInit(): void {
    this.chucVuService.getChucVu(this.searchForm).subscribe((res: any) => {
      this.chucVuList = res.data.data;
    });
  }

  @Input() formData = {
    tenNhanVien: '',
    soDienThoai: '',
    email: '',
    diaChi: '',
    ngaySinh: '',
    chucVu: '',
  };
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  isChucVuInValid = false

  onSave(): void {
    this.isChucVuInValid = !this.formData.chucVu;
    if (this.isChucVuInValid) {
      return;
    }
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }
  phoneError: string = '';
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    if (filteredValue.length > 0 && !filteredValue.startsWith('0')) {
      filteredValue = '0' + filteredValue;
    }
    if (filteredValue.length > 10) {
      filteredValue = filteredValue.substring(0, 10);
    }
    if (filteredValue.length === 10) {
      inputElement.value = filteredValue;
      this.formData.soDienThoai = filteredValue;
      this.phoneError = '';
    } else {
      inputElement.value = filteredValue;
      this.formData.soDienThoai = '';
      if (filteredValue.length > 0) {
        this.phoneError = 'Số điện thoại phải có 10 chữ số';
      }
    }
  }
}
