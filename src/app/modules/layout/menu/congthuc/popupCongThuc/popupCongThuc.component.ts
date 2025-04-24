import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NguyenlieuService } from '../../nguyenlieu/services/nguyenlieu.service';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';

@Component({
  selector: 'app-popupCongThuc',
  templateUrl: './popupCongThuc.component.html',
  styleUrls: ['./popupCongThuc.component.scss']
})
export class PopupCongThucComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() formData: any = {
    tenCongThuc: '',
    nguyenLieus: [],
    moTa: '',
    hinhAnh: ''
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

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

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private nguyenLieuService: NguyenlieuService,
    private fileService: FileService,
    private loaiNguyenLieuService: LoainguyenlieuService
  ) {}

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

    // Nếu là edit và đã có nguyên liệu, bạn cần xử lý fill loaiSelections (có thể thêm sau nếu cần)
  }

  addLoaiSelection(): void {
    this.loaiSelections.push({
      selectedLoaiId: '',
      selectedNguyenLieuId: '',
      filteredNguyenLieu: [],
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
      hinhAnh: this.formData.hinhAnh
        ? JSON.stringify({
            id: this.formData.hinhAnh.id,
            name: this.formData.hinhAnh.name
          })
        : '',
      nguyenLieus: allNguyenLieus
    };

    this.save.emit(dataToSend);
  }

  onCancel(): void {
    this.close.emit();
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
