import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fileService } from '../../../../../fileService';
import { NguyenlieuService } from '../../nguyenlieu/services/nguyenlieu.service';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';

@Component({
  selector: 'app-addoreditCongThuc',
  templateUrl: './addoreditCongThuc.component.html',
  styleUrl: './addoreditCongThuc.component.scss'
})
export class AddoreditCongThucComponent implements OnInit {
  nguyenLieu: any[] = [];
  loaiNguyenLieu: any[] = [];
  filteredNguyenLieu: any[] = []; 
  selectedLoaiNguyenLieuId: string = '';
  selectedNguyenLieuId: string = '';

  ngOnInit(): void {

    this.loaiNguyenLieuService.getLoaiNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.loaiNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai
        }));

        // if (this.isEditMode) {
        //   const selected = this.loaiNguyenLieu.find(x => x.id === this.formData.loaiNguyenLieu.id);
        //   if (selected) {
        //     this.formData.loaiNguyenLieu = selected;
        //   }
        // }
      },
      error: (err: any) => console.log(err)
    });
    this.nguyenLieuService.getNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.nguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNguyenLieu,
          loaiNguyenLieuId: item.loaiNguyenLieu.id
        }));

      },
      error: (err: any) => console.log(err)
    });

  }
  formData: any = {
    tenCongThuc: '',
    nguyenLieus: [
      {
        nguyenLieu: {
          id: '',
          name: ''
        },
        soLuong: 0,
        ghiChu: ''
      }
    ],
    moTa: '',
    hinhAnh: ''
  };

  isEditMode: boolean = false; 

  constructor(
    private nguyenLieuService: NguyenlieuService,
    private fileService: fileService,
    private loaiNguyenLieuService: LoainguyenlieuService,
    public dialogRef: MatDialogRef<AddoreditCongThucComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.item) {
      this.isEditMode = true;
      this.formData={...data.item};
    }
  }

  onLoaiNguyenLieuChange(): void {
    this.filteredNguyenLieu = this.nguyenLieu.filter(
      (nl) => nl.loaiNguyenLieuId === this.selectedLoaiNguyenLieuId
    );
    this.selectedNguyenLieuId = ''; // reset lựa chọn nguyên liệu
  }
  
  // Khi chọn nguyên liệu -> thêm vào formData nếu chưa có
  onNguyenLieuSelected(): void {
    const nguyenLieu = this.nguyenLieu.find(nl => nl.id === this.selectedNguyenLieuId);
  
    const isAlreadySelected = this.formData.nguyenLieus.some((x:any) => x.nguyenLieu.id === nguyenLieu?.id);
    if (nguyenLieu && !isAlreadySelected) {
      this.formData.nguyenLieus.push({
        nguyenLieu: {
          id: nguyenLieu.id,
          name: nguyenLieu.name
        },
        soLuong: 0,
        ghiChu: ''
      });
    }
  }
  
  removeNguyenLieu(index: number) {
    this.formData.nguyenLieus.splice(index, 1);
  }
  onSave(): void {
    const validNguyenLieus = this.formData.nguyenLieus
      .filter((x: any) => x.nguyenLieu?.id)      // chỉ giữ những mục đã chọn nguyên liệu
      .map((x: any) => ({                        // rồi map ra đúng format API
        nguyenLieu: {
          id: x.nguyenLieu.id,
          name: x.nguyenLieu.name
        },
        soLuong: x.soLuong,
        ghiChu: x.ghiChu
      }));
  
    const dataToSend = {
      tenCongThuc: this.formData.tenCongThuc,
      moTa: this.formData.moTa,
      hinhAnh: this.formData.hinhAnh.name,
      nguyenLieus: validNguyenLieus
    };
  
    this.dialogRef.close(dataToSend);
  }
  
  onCancel(): void {
    this.dialogRef.close(); 
  }
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Tạo preview ảnh
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Upload file ngay sau khi chọn
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
            console.log('Uploaded:', this.formData.hinhAnh);
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
