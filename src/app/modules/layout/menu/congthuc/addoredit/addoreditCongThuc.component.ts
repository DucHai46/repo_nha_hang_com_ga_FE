import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../../../../../core/services/file.service';
import { NguyenlieuService } from '../../nguyenlieu/services/nguyenlieu.service';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';

@Component({
  selector: 'app-addoreditCongThuc',
  templateUrl: './addoreditCongThuc.component.html',
  styleUrls: ['./addoreditCongThuc.component.scss']
})
export class AddoreditCongThucComponent implements OnInit {
  nguyenLieu: any[] = [];
  loaiNguyenLieu: any[] = [];

  loaiSelections: any[] = [
    {
      selectedLoaiId: '',
      selectedNguyenLieuId: '',
      filteredNguyenLieu: [],
      nguyenLieus: []
    }
  ];

  formData: any = {
    tenCongThuc: '',
    nguyenLieus: [],
    moTa: '',
    hinhAnh: ''
  };

  isEditMode: boolean = false;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private nguyenLieuService: NguyenlieuService,
    private fileService: FileService,
    private loaiNguyenLieuService: LoainguyenlieuService,
    public dialogRef: MatDialogRef<AddoreditCongThucComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.item) {
      this.isEditMode = true;
      this.formData = { ...data.item };
    }
  }

  ngOnInit(): void {
    this.loaiNguyenLieuService.getLoaiNguyenLieu({}).subscribe({
      next: (res: any) => {
        this.loaiNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai
        }));
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

  addLoaiSelection(): void {
    this.loaiSelections.push({
      selectedLoaiId: '',
      filteredNguyenLieu: [],
      selectedNguyenLieuId: '',
      nguyenLieus: []
    });
  }

  addNguyenLieuRow(index: number): void {
    const loai = this.loaiSelections[index];
    const availableNguyenLieus = loai.filteredNguyenLieu.filter(
      (nl: any) => !loai.nguyenLieus.some((x: any) => x.nguyenLieu.id === nl.id)
    );
    if (availableNguyenLieus.length > 0) {
      loai.nguyenLieus.push({
        nguyenLieu: availableNguyenLieus[0],
        soLuong: 0,
        ghiChu: ''
      });
    }
  }

  onLoaiNguyenLieuChange(index: number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].filteredNguyenLieu = this.nguyenLieu.filter(
      (nl) => nl.loaiNguyenLieuId === selectedLoaiId
    );
    this.loaiSelections[index].selectedNguyenLieuId = '';
    this.loaiSelections[index].nguyenLieus = [];
  }

  isLoaiDuplicate(selectedLoaiId: string, index: number): boolean {
    return this.loaiSelections.some((s, idx) => idx !== index && s.selectedLoaiId === selectedLoaiId);
  }

  removeNguyenLieuInLoai(loaiIndex: number, nlIndex: number): void {
    this.loaiSelections[loaiIndex].nguyenLieus.splice(nlIndex, 1);
  }

  removeLoaiSelection(index: number): void {
    this.loaiSelections.splice(index, 1);
  }

  onSave(): void {
    const allNguyenLieus = this.loaiSelections.flatMap((loai: any) =>
      loai.nguyenLieus.map((item: any) => ({
        nguyenLieu: {
          id: item.nguyenLieu.id,
          name: item.nguyenLieu.name
        },
        soLuong: item.soLuong,
        ghiChu: item.ghiChu
      }))
    );

    const dataToSend = {
      tenCongThuc: this.formData.tenCongThuc,
      moTa: this.formData.moTa,
      hinhAnh: JSON.stringify({
        id: this.formData.hinhAnh.id,
        name: this.formData.hinhAnh.name
      }),
      nguyenLieus: allNguyenLieus
    };

    this.dialogRef.close(dataToSend);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

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
