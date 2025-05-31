import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NguyenlieuService } from '../../nguyenlieu/services/nguyenlieu.service';
import { LoainguyenlieuService } from '../../loainguyenlieu/services/loainguyenlieu.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
      selectedLoaiName: '',
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
    private loaiNguyenLieuService: LoainguyenlieuService,
    private notification: NzNotificationService
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

    if (this.isEditMode && this.formData.loaiNguyenLieus?.length) {
      this.updateData();
    }
  }
  updateData(): void {
    const loaiNguyenLieusFromForm = this.formData.loaiNguyenLieus;
  
    this.loaiSelections = loaiNguyenLieusFromForm.map((loai: any) => ({
      selectedLoaiId: loai.id,
      selectedLoaiName: loai.name,
      filteredNguyenLieu: [],
      nguyenLieus: loai.nguyenLieus.map((item: any) => ({
        nguyenLieu: {
          id: item.nguyenLieu.id,
          name: item.nguyenLieu.name
        },
        soLuong: item.soLuong,
        ghiChu: item.ghiChu
      }))
    }));
  
    // Gọi API để fill `filteredNguyenLieu` từng loại
    this.loaiSelections.forEach((loai, index) => {
      this.nguyenLieuService.getNguyenLieu({ loaiNguyenLieuId: loai.selectedLoaiId }).subscribe({
        next: (res: any) => {
          this.loaiSelections[index].filteredNguyenLieu = res.data.data.map((nl: any) => ({
            id: nl.id,
            name: nl.tenNguyenLieu,
            loaiNguyenLieuId: nl.loaiNguyenLieu.id
          }));
        },
        error: err => console.error('Lỗi khi lấy nguyên liệu:', err)
      });
    });
  }

  addLoaiSelection(): void {
    this.loaiSelections.push({
      selectedLoaiId: '',
      selectedLoaiName: '',
      selectedNguyenLieuId: '',
      filteredNguyenLieu: [],
      nguyenLieus: []
    });
  }

  addNguyenLieuRow(index: number): void {
    const loai = this.loaiSelections[index];
    loai.nguyenLieus.push({
      nguyenLieu: {
        id: '',
        name: ''
      },  // chưa chọn nguyên liệu
      soLuong: 0,
      ghiChu: ''
    });
  }
  onLoaiNguyenLieuChange(index: number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].selectedLoaiName = this.loaiNguyenLieu.find(l => l.id === selectedLoaiId)?.name || '';
    this.nguyenLieuService.getNguyenLieu({loaiNguyenLieuId: selectedLoaiId}).subscribe({
      next: (res: any) => {
        this.loaiSelections[index].filteredNguyenLieu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNguyenLieu,
          loaiNguyenLieuId: item.loaiNguyenLieu.id
        }));
      },
      error: (err: any) => console.log(err)
    });
    this.loaiSelections[index].selectedNguyenLieuId = '';
    this.loaiSelections[index].filteredNguyenLieu = [];
    this.loaiSelections[index].nguyenLieus = [];
  }

  isLoaiDuplicate(selectedLoaiId: string, index: number): boolean {
    return this.loaiSelections.some((s, idx) => idx !== index && s.selectedLoaiId === selectedLoaiId);
  }
  isNguyenLieuDuplicate(nl: any, loaiIndex: number, nguyenLieuIndex: number): boolean {
    const loai = this.loaiSelections[loaiIndex];
    return loai.nguyenLieus.some((x: any, idx: number) => 
      idx !== nguyenLieuIndex  && x.nguyenLieu.id === nl.id
    );
  }

  updateNguyenLieuName(loai: any, item: any) {
    const found = loai.filteredNguyenLieu.find((nl: any) => nl.id === item.nguyenLieu.id);
    item.nguyenLieu.name = found?.name || '';
  }
  

  removeNguyenLieuInLoai(loaiIndex: number, nlIndex: number): void {
    this.loaiSelections[loaiIndex].nguyenLieus.splice(nlIndex, 1);
  }

  removeLoaiSelection(index: number): void {
    this.loaiSelections.splice(index, 1);
  }

  onSave(): void {
    const allNguyenLieus = this.loaiSelections.map(loai => ({
      id: loai.selectedLoaiId,
      nguyenLieus: loai.nguyenLieus.map((item: {nguyenLieu: {id: string, name: string}, soLuong: number, ghiChu: string}) => ({
        nguyenLieu: item.nguyenLieu.id,
        soLuong: parseInt(item.soLuong.toString(), 10),
        ghiChu: item.ghiChu
      }))
    }));

    const dataToSend = {
      id: this.formData.id,
      tenCongThuc: this.formData.tenCongThuc,
      moTa: this.formData.moTa,
      hinhAnh: this.formData.hinhAnh
        ? JSON.stringify({
            id: this.formData.hinhAnh.id,
            name: this.formData.hinhAnh.name
          })
        : '',
      loaiNguyenLieus: allNguyenLieus
    };

    this.save.emit(dataToSend);
    // console.log(dataToSend);
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
            this.notification.create(
              'success',
              'Thông báo!',
              `Upload file thành công`,
              {
                nzClass: 'notification-success',
                nzDuration: 2000
              }
            );
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Upload file thất bại`,
              {
                nzClass: 'notification-error',
                nzDuration: 2000  
              }
            );
          }
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Thông báo!',
            `Upload file thất bại`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      });
    }
  }
}
