import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { LoaimonanService } from '../../loaimonan/services/loaimonan.service';
import { MonAnService } from '../../monan/services/monan.service';
import { ComboService } from '../../combo/services/combo.service';
import { TrangThaiThucDon } from '../../../../../models/TrangThaiThucDon';
@Component({
  selector: 'app-popupThucDon',
  templateUrl: './popupThucDon.component.html',
  styleUrls: ['./popupThucDon.component.scss']
})
export class PopupThucDonComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() formData: any = {
    tenThucDon: '',
    monAns: [],
    combos: [],
    trangThai:''
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  monAn: any[]=[];
  loaiMonAn: any[]=[];
  combo: any[]=[];
  loaiSelections: any[] = [
    {
      selectedLoaiId: '',
      selectedLoaiName: '',
      selectedMonAnId: '',
      filteredMonAn: [],
      monAns: []
    }
  ];
  comboSelections:any[] = [
    {
      selectedComboId: '',
      selectedComboName: '',
      hinhAnh: '',
      giaTien: '',
      moTa: '',
    }
  ];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private monAnService: MonAnService,
    private fileService: FileService,
    private loaiMonAnService: LoaimonanService,
    private comboService: ComboService
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
    this.comboService.getCombo({}).subscribe({
      next: (res: any) => {
        this.combo = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenCombo
        }));
      },
      error: (err: any) => console.log(err)
    });

    if (this.isEditMode && this.formData.loaiMonAns?.length ) {
      this.updateData();

    }
  }
  updateData(): void {  
    const loaiMonAnsFromForm = this.formData.loaiMonAns;    
    this.loaiSelections = loaiMonAnsFromForm.map((loai: any) => ({
      selectedLoaiId: loai.id,
      selectedLoaiName: loai.name,
      filteredMonAn: [], // Dữ liệu món ăn sẽ được điền sau
      monAns: (loai.monAns || [])
        .filter((item: any) => item?.monAn) // Tránh item không có monAn
        .map((item: any) => ({
          monAn: {
            id: item.monAn.id,
            name: item.monAn.tenMonAn,
            hinhAnh: item.monAn.hinhAnh,
            giaTien: item.monAn.giaTien
          }
        }))
    }));  
    // console.log('Dữ liệu loaiSelections:', this.loaiSelections);
    this.loaiSelections.forEach((loai, index) => {
        this.monAnService.getMonAn({ tenLoaiMonAn: loai.selectedLoaiName }).subscribe({
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
    const comboFromForm = this.formData.combos;    
    this.comboSelections = comboFromForm.map((loai: any) => ({
      selectedComboId: loai.id,
      selectedComboName: loai.name,
      hinhAnh: loai.hinhAnh,
      giaTien: loai.giaTien,
      moTa: loai.moTa
    }));  

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
  addComboSelection(): void {
    this.comboSelections.push({
      selectedComboId: '',
      selectedComboName: '',
      hinhAnh: '',
      giaTien: '',
      moTa: '',
    });
  }
  addMonAnRow(index: number): void {
    const loai = this.loaiSelections[index];
    loai.monAns.push({
      monAn: {
        id: '',
        name: '',
        hinhAnh: '',
        giaTien: ''
      },  
    });
  }
  onLoaiMonAnChange(index: number): void {
    const selectedLoaiId = this.loaiSelections[index].selectedLoaiId;
    this.loaiSelections[index].selectedLoaiName = this.loaiMonAn.find(l => l.id === selectedLoaiId)?.name || '';
    this.monAnService.getMonAn({tenLoaiMonAn: this.loaiSelections[index].selectedLoaiName}).subscribe({
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
  onComboChange(index: number): void {
    const selectedComboId = this.comboSelections[index].selectedComboId;
    this.comboSelections[index].selectedComboName = this.combo.find(l => l.id === selectedComboId)?.name || '';
    this.comboSelections[index].hinhAnh = this.combo.find(l => l.id === selectedComboId)?.hinhAnh || '';
    this.comboSelections[index].giaTien = this.combo.find(l => l.id === selectedComboId)?.giaTien || '';
    this.comboSelections[index].moTa = this.combo.find(l => l.id === selectedComboId)?.moTa || '';
  }
  isLoaiDuplicate(selectedLoaiId: string, index: number): boolean {
    return this.loaiSelections.some((s, idx) => idx !== index && s.selectedLoaiId === selectedLoaiId);
  }
  isComboDuplicate(selectedComboId: string, index: number): boolean {
    return this.comboSelections.some((s, idx) => idx !== index && s.selectedComboId === selectedComboId);
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
  removeComboSelection(index: number): void {
    this.comboSelections.splice(index, 1);
  }
  onSave(): void {
    const allMonAns = this.loaiSelections.map(loai => ({
      id: loai.selectedLoaiId,
      name: loai.selectedLoaiName,
      monAns: loai.monAns.map((item: any) => ({
        monAn: {
          id: item.monAn.id,
          name: item.monAn.name,
          hinhAnh: item.monAn.hinhAnh,
          giaTien: item.monAn.giaTien
        },
      }))
    }));
    const allCombos = this.comboSelections.map(loai => ({
      id: loai.selectedLoaiId,
      name: loai.selectedLoaiName,
      hinhAnh: loai.hinhAnh,
      giaTien: loai.giaTien,
      moTa: loai.moTa
    }));

    const dataToSend = {
      id: this.formData.id,
      tenThucDon:  this.formData.tenThucDon,
      trangThai: this.formData.trangThai,
      loaiMonAns: allMonAns,
      combos:allCombos
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
