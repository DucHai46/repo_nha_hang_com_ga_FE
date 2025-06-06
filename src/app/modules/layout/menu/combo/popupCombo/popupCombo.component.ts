import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { LoaimonanService } from '../../loaimonan/services/loaimonan.service';
import { MonAnService } from '../../monan/services/monan.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { giamgiaService } from '../../giamgia/services/giamgia.service';
@Component({
  selector: 'app-popupCombo',
  templateUrl: './popupCombo.component.html',
  styleUrls: ['./popupCombo.component.scss']
})
export class PopupComboComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() formData: any = {
    tenCombo: '',
    monAns: [],
    moTa: '',
    hinhAnh: '',
    giaTien: 0.,
    giamGia: {
      id: '',
      name: '',
      giaTri: 0,
    },
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  monAn: any[]=[];
  loaiMonAn: any[]=[];
  giamGia: any[]=[];
  loaiSelections: any[] = [
    {
      selectedLoaiId: '',
      selectedLoaiName: '',
      selectedMonAnId: '',
      filteredMonAn: [],
      monAns: []
    }
  ];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private monAnService: MonAnService,
    private fileService: FileService,
    private loaiMonAnService: LoaimonanService,
    private notification: NzNotificationService,
    private giamgiaService: giamgiaService
  ) {}
  ngOnInit(): void {
    this.loaiMonAnService.getLoaiMonAn({}).subscribe({
      next: (res: any) => {
        this.loaiMonAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai
        }));
      },
      error: (err: any) => console.log(err)
    });
        this.giamgiaService.getGiamGia({}).subscribe({
      next: (res: any) => {
            this.giamGia = [
              {
                id: '',
                name: 'Không giảm giá',
                giaTri: 0
              },
              ...res.data.data.map((item: any) => ({
                id: item.id,
                name: item.tenGiamGia,
                giaTri: item.giaTri
              }))
            ];  
            if (this.isEditMode) {
              const selected = this.giamGia.find(x => x.id === this.formData.giamGia.id);
              if (selected) {
                this.formData.giamGia = selected;
              }
            }else {
              this.formData.giamGia = this.giamGia[0];
            }
      },
      error: (err: any) => console.log(err)
    });

    if (this.isEditMode && this.formData.loaiMonAns?.length) {
      this.updateData();

    }
  }
  updateData(): void {
    const loaiMonAnsFromForm = this.formData.loaiMonAns;    
    this.loaiSelections = loaiMonAnsFromForm.map((loai: any) => ({
      selectedLoaiId: loai.id,
      selectedLoaiName: loai.name,
      filteredMonAn: [], 
      monAns: loai.monAns.map((item: any) => ({
        monAn: {
          id: item.id,
          name: item.tenMonAn,
          hinhAnh: item.hinhAnh,
          giaTien: item.giaTien
        }
      }))
    }));  
    this.loaiSelections.forEach((loai, index) => {
        this.monAnService.getMonAn({ idLoaiMonAn: loai.selectedLoaiId }).subscribe({
          next: (res: any) => {
            const items = res?.data?.data || [];
            this.loaiSelections[index].filteredMonAn = items.map((nl: any) => ({
              id: nl.id,
              name: nl.tenMonAn,
              loaiMonAnId: nl.loaiMonAn?.id || null,
              hinhAnh: nl.hinhAnh,
              giaTien: nl.giaTien
            }));
          },
          error: err => {
            console.error('Lỗi khi lấy món ăn:', err);
          }
        });
    });

  }
  
  addLoaiSelection(): void {
    this.loaiSelections.push({
      selectedLoaiId: '',
      selectedLoaiName: '',
      selectedMonAnId: '',
      filteredMonAn: [],
      monAns: []
    });
  }
  addMonAnRow(index: number): void {
    const loai = this.loaiSelections[index];
    loai.monAns.push({
      monAn: {
        id: '',
        name: '',
        hinhAnh: '',
        giaTien: 0,
        soLuong: 1
      },  
    });
  }
  onLoaiMonAnChange(index: number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].selectedLoaiName = this.loaiMonAn.find(l => l.id === selectedLoaiId)?.name || '';
    this.monAnService.getMonAn({idLoaiMonAn: this.loaiSelections[index].selectedLoaiId}).subscribe({
      next: (res: any) => {
        this.loaiSelections[index].filteredMonAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenMonAn,
          loaiMonAnId: item.loaiMonAn.id,
          hinhAnh: item.hinhAnh,    
          giaTien: item.giaTien     
        }));
      },
      error: (err: any) => console.log(err)
    });
    this.loaiSelections[index].selectedMonAnId = '';
    this.loaiSelections[index].filteredMonAn = [];
    this.loaiSelections[index].monAns = [];
  }
  isLoaiDuplicate(selectedLoaiId: string, index: number): boolean {
    return this.loaiSelections.some((s, idx) => idx !== index && s.selectedLoaiId === selectedLoaiId);
  }
  isMonAnDuplicate(nl: any, loaiIndex: number, monAnIndex: number): boolean {
    const loai = this.loaiSelections[loaiIndex];
    return loai.monAns.some((x: any, idx: number) => 
      idx !== monAnIndex  && x.monAn.id === nl.id
    );
  }
  updateMonAnName(loai: any, item: any): void {
    const found = loai.filteredMonAn.find((nl: any) => nl.id === item.monAn.id);
    if (found) {
      item.monAn.name = found.name;
      item.monAn.hinhAnh = found.hinhAnh;
      item.monAn.giaTien = found.giaTien;
      item.monAn.soLuong = 1;
    } else {
      item.monAn.name = '';
      item.monAn.hinhAnh = '';
      item.monAn.giaTien = '';
    }
  }
  removeMonAnInLoai(loaiIndex: number, nlIndex: number): void {
    this.loaiSelections[loaiIndex].monAns.splice(nlIndex, 1);
  }

  removeLoaiSelection(index: number): void {
    this.loaiSelections.splice(index, 1);
  }
  onSave(): void {
    const allMonAns = this.loaiSelections.map(loai => ({
      id: loai.selectedLoaiId,
      monAns: loai.monAns.map((item: any) => ({
        id: item.monAn.id,
        tenMonAn: item.monAn.name,
        giaTien: item.monAn.giaTien,
        soLuong: item.monAn.soLuong
        
      }))
    }));

    const dataToSend = {
      id: this.formData.id,
      tenCombo:  this.formData.tenCombo,
      moTa: this.formData.moTa,
      giamGia: this.formData.giamGia?.id ? this.formData.giamGia.id : null,
      giaTien: this.formData.giaTien,
      hinhAnh: this.formData.hinhAnh
        ? JSON.stringify({
            id: this.formData.hinhAnh.id,
            name: this.formData.hinhAnh.name
          })
        : '',
      loaiMonAns: allMonAns
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
            `Lỗi upload file: ${err.message}`,
            {
              nzClass: 'notification-error',
              nzDuration: 2000
            }
          );
        }
      });
    }
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
        const url = window.URL.createObjectURL(response);
        
        window.open(url, '_blank');
        
        window.URL.revokeObjectURL(url);
      }
    );
  }


}
