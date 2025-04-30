import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaimonanService } from '../../loaimonan/services/loaimonan.service';
import { giamgiaService } from '../../giamgia/services/giamgia.service';
import { CongthucService } from '../../congthuc/services/congthuc.service';
import { FileService } from '../../../../../core/services/file.service';




@Component({
  selector: 'app-popupMonAn',
  templateUrl: './popupMonAn.component.html',
  styleUrls: ['./popupMonAn.component.scss']
})
export class PopupMonAnComponent implements OnInit {
  loaiMonAn: any[] = [];
  giamGia: any[] = [];
  congThuc: any[] = [];
  @Input() formData: any = {
    tenMonAn: '',
    loaiMonAn: {
      id: '',
      name: ''
    },
    congThuc: {
      id: '',
      name: ''
    },
    giamGia: {
      id: '',
      name: '',
      giaTri: ''
    },
    moTa: '',
    hinhAnh: '',
    giaTien: ''
  };

  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  ngOnInit(): void {
    this.loaiMonAnService.getLoaiMonAn({}).subscribe({
      next: (res: any) => {
        this.loaiMonAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai
        }));

        if (this.isEditMode) {
          const selected = this.loaiMonAn.find(x => x.id === this.formData.loaiMonAn.id);
          if (selected) {
            this.formData.loaiMonAn = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    });

    this.giamgiaService.getGiamGia({}).subscribe({
      next: (res: any) => {
        this.giamGia = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenGiamGia,
          giaTri: item.giaTri
        }));

        if (this.isEditMode) {
          const selected = this.giamGia.find(x => x.id === this.formData.giamGia.id);
          if (selected) {
            this.formData.giamGia = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    });

    this.congthucService.getCongThuc({}).subscribe({
      next: (res: any) => {
        this.congThuc = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenCongThuc
        }));
        if (this.isEditMode) {
          const selected = this.congThuc.find(x => x.id === this.formData.congThuc.id);
          if (selected) {
            this.formData.congThuc = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    })      
  }
  constructor(
    private loaiMonAnService: LoaimonanService,
    private giamgiaService: giamgiaService,
    private congthucService: CongthucService,
    private fileService: FileService
  ) {}

  onSave() {
    const dataToSend = {
      ...this.formData,
      loaiMonAn: {
        id: this.formData.loaiMonAn.id,
        name: this.formData.loaiMonAn.name
      },
      giamGia: {
        id: this.formData.giamGia.id,
        name: this.formData.giamGia.name,
        giaTri: this.formData.giamGia.giaTri
      },
      congThuc: {
        id: this.formData.congThuc.id,
        name: this.formData.congThuc.name
      },
      hinhAnh: this.formData.hinhAnh
        ? JSON.stringify({
            id: this.formData.hinhAnh.id,
            name: this.formData.hinhAnh.name
          })
        : ''
    };
  
    this.save.emit(dataToSend);
  }
  onCancel(): void {
    this.close.emit(); // Đóng popup mà không trả về dữ liệu
  }
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);

      this.fileService.addFile(formData).subscribe({
        next: (res: any) => {
          const fileId = res?.id || res?.data?.id;
          const fileName = res?.fileName || res?.data?.fileName;
          if (fileId && fileName) {
            this.formData.hinhAnh = {
              id: fileId,
              name: fileName
            };
          } else {
            console.error('Upload failed', res);
          }
        },
        error: (err) => {
          console.error('Lỗi upload file:', err);
        }
      });
    }
  }

}
