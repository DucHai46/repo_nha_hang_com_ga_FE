import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { LoaimonanService } from '../../loaimonan/services/loaimonan.service';
import { MonAnService } from '../../monan/services/monan.service';
import { ComboService } from '../../combo/services/combo.service';
import { ThucDonService } from '../services/thucdon.service';
import { TrangThaiThucDon } from '../../../../../models/TrangThaiThucDon';
import { forkJoin } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
      giaTien: 0,
      moTa: '',
    }
  ];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private monAnService: MonAnService,
    private fileService: FileService,
    private loaiMonAnService: LoaimonanService,
    private comboService: ComboService,
    private thucDonService: ThucDonService,
    private notification: NzNotificationService
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
          name: item.tenCombo,
          hinhAnh: item.hinhAnh,
          giaTien: item.giaTien
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
    // console.log('Dữ liệu loaiMonAnsFromForm:', loaiMonAnsFromForm);
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
    // console.log('Dữ liệu loaiSelections:', this.loaiSelections);
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
            // console.log(this.loaiSelections[index].monAns);
          },
          error: err => {
            console.error('Lỗi khi lấy món ăn:', err);
          }
        });
    });
    // console.log(this.loaiSelections);
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
      giaTien: 0,
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
  onComboChange(index: number): void {
    const selectedComboId = this.comboSelections[index].selectedComboId;
    this.comboSelections[index].selectedComboName = this.combo.find(l => l.id === selectedComboId)?.name || '';
    const selectedCombo = this.combo.find(l => l.id === selectedComboId);
    this.comboSelections[index].hinhAnh = this.combo.find(l => l.id === selectedComboId)?.hinhAnh || '';
    this.comboSelections[index].giaTien = this.combo.find(l => l.id === selectedComboId)?.giaTien || '';
    this.comboSelections[index].moTa = this.combo.find(l => l.id === selectedComboId)?.moTa || '';
    console.log(this.comboSelections[index]);
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
      item.monAn.giaTien = 0;
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
      monAns: loai.monAns.map((item: any) => ({
        id: item.monAn.id,
      }))
    }));
    const allCombos = this.comboSelections.map(loai => ({
      id: loai.selectedComboId,
      name: loai.selectedComboName,
      hinhAnh: loai.hinhAnh,
      giaTien: loai.giaTien,
      moTa: loai.moTa
    }));

    const dataToSend = {
      id: this.formData.id,
      tenThucDon:  this.formData.tenThucDon,
      trangThai: 0,
      loaiMonAns: allMonAns,
      combos:allCombos
    };
    // if (this.formData.trangThai == 1) {
    //   // Kiểm tra các thực đơn đang hoạt động
    //   this.thucDonService.getThucDon({ trangThai: 1 }).subscribe({
    //     next: (res: any) => {
    //         // Lọc danh sách thực đơn đang hoạt động và không phải là thực đơn hiện tại
    //         const activeThucDons = res.data.data.filter((td: any) => td.trangThai === 1 && td.id !== this.formData.id);
    //           // Cập nhật tất cả thực đơn khác về trạng thái "Không hoạt động"
    //         const updateObservables = activeThucDons.map((td: any) =>
    //           this.thucDonService.updateThucDon(td.id, { ...td, trangThai: 0 })
    //         );
    //         forkJoin(updateObservables).subscribe({
    //           next: () => {
    //               // Sau khi cập nhật trạng thái các thực đơn khác về "Không hoạt động", lưu thực đơn mới với trạng thái "Hoạt động"
    //             this.save.emit(dataToSend);
    //           },
    //           error: (err: any) => {
    //             console.log('Lỗi khi cập nhật trạng thái các thực đơn:', err);
    //           }
    //         });
    //         console.log("activeThucDons = ",activeThucDons);
    //         console.log("res = ",res.data.data);

    //     },
    //     error: (err: any) => {
    //       console.log('Lỗi khi lấy danh sách thực đơn:', err);
    //     }
    //   });
    // } else {
    //   // Nếu trạng thái không phải "Hoạt động", trực tiếp lưu thực đơn này
    //   this.save.emit(dataToSend);
    //   return;
    // }
    
    this.save.emit(dataToSend);


    // this.save.emit(dataToSend);
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
              `Upload thành công`, {
                nzClass: 'notification-success',  
                nzDuration: 2000
              } 
            );
          } else {
            console.error('Upload failed', res);
            this.notification.create(
              'error',
              'Thông báo!',
              `Upload thất bại`, {
                nzClass: 'notification-error',  
                nzDuration: 2000
              }
            );
          }
        },
        error: (err) => {
          console.error('Lỗi upload file:', err);
          this.notification.create(
            'error',
            'Thông báo!',
            `Upload thất bại`, {
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
