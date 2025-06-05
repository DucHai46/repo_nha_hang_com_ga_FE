import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DanhmucnguyenlieuService } from '../../danhmucnguyenlieu/services/danhmucnguyenlieu.service';

@Component({
  selector: 'app-popupLoaiNL',
  templateUrl: './popupLoaiNL.component.html',
  styleUrls: ['./popupLoaiNL.component.scss']
})
export class PopupLoaiNLComponent implements OnInit {
  danhMucNguyenLieu: any[] = [];  

  ngOnInit(): void {
    this.danhMucNguyenLieuService.getDanhMucNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.danhMucNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenDanhMuc
        }));

        if (this.isEditMode) {
          const categoryId = this.formData.danhMucNguyenLieu.id;
          const selectedCategory = this.danhMucNguyenLieu.find(
            (cat) => cat.id === categoryId
          );
          if (selectedCategory) {
            this.formData.danhMucNguyenLieu = selectedCategory;
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  @Input() formData = {
    tenLoai: '',
    moTa: '',
    danhMucNguyenLieu: {
      id: '',
      name: ''
    }
  };

  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

 constructor(
    private danhMucNguyenLieuService: DanhmucnguyenlieuService,
  ) {}
  loaiDanhMucInValid= false;

  onSave(): void {
    this.loaiDanhMucInValid = !this.formData.danhMucNguyenLieu || !this.formData.danhMucNguyenLieu.id;
    if (this.loaiDanhMucInValid) {
      return; 
    }
    const dataToSend = {
      ...this.formData,
      danhMucNguyenLieu: this.formData.danhMucNguyenLieu.id
    };
    this.save.emit(dataToSend);
  }
  onCancel(): void {
    this.close.emit(); 
  }
}
