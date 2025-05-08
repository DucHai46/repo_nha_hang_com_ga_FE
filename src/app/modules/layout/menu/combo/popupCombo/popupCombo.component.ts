import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { LoaimonanService } from '../../loaimonan/services/loaimonan.service';
import { MonAnService } from '../../monan/services/monan.service';
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
    giaTien: 0
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  monAn: any[]=[];
  loaiMonAn: any[]=[];
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
    private loaiMonAnService: LoaimonanService
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

    if (this.isEditMode && this.formData.loaiMonAns?.length) {
      this.updateData();

    }
  }
  updateData(): void {
    const loaiMonAnsFromForm = this.formData.loaiMonAns;    
    console.log('Dữ liệu loaiMonAnsFromForm:', loaiMonAnsFromForm);
    this.loaiSelections = loaiMonAnsFromForm.map((loai: any) => ({
      selectedLoaiId: loai.id,
      selectedLoaiName: loai.name,
      filteredMonAn: [], // Dữ liệu món ăn sẽ được điền sau
      monAns: loai.monAns.map((item: any) => ({
        monAn: {
          id: item.id,
          name: item.tenMonAn,
          hinhAnh: item.hinhAnh,
          giaTien: item.giaTien
        }
      }))
    }));  
    console.log('Dữ liệu loaiSelections:', this.loaiSelections);
    // Gọi API để lấy danh sách món ăn cho mỗi loại
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
            console.log(this.loaiSelections[index].monAns);
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
        giaTien: 0
      },  
    });
  }
  onLoaiMonAnChange(index: number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].selectedLoaiName = this.loaiMonAn.find(l => l.id === selectedLoaiId)?.name || '';
    this.monAnService.getMonAn({idLoaiMonAn: this.loaiSelections[index].selectedLoaiId}).subscribe({
      next: (res: any) => {
        // console.log(res.data.data);
        this.loaiSelections[index].filteredMonAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenMonAn,
          loaiMonAnId: item.loaiMonAn.id,
          hinhAnh: item.hinhAnh,    
          giaTien: item.giaTien     
        }));
        // console.log(this.loaiSelections[index].filteredMonAn);
      },
      error: (err: any) => console.log(err)
    });
    this.loaiSelections[index].selectedMonAnId = '';
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

      }))
    }));

    const dataToSend = {
      id: this.formData.id,
      tenCombo:  this.formData.tenCombo,
      moTa: this.formData.moTa,
      giaTien: this.formData.giaTien,
      hinhAnh: this.formData.hinhAnh
        ? JSON.stringify({
            id: this.formData.hinhAnh.id,
            name: this.formData.hinhAnh.name
          })
        : '',
      loaiMonAns: allMonAns
    };
    console.log(dataToSend);

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
        // Create object URL from blob
        const url = window.URL.createObjectURL(response);
        
        // Open preview in new tab
        window.open(url, '_blank');
        
        // Cleanup object URL after preview opens
        window.URL.revokeObjectURL(url);
      }
    );
  }


}
