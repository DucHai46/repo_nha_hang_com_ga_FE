import { ChucVuService } from './../../chucvu/services/chucvu.service';
import { NhanVienService } from './../../nhanvien/services/nhanvien.service';
import { CaLamViecService } from './../../calamviec/services/calamviec.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-popupLichLamViec',
  templateUrl: './popupLichLamViec.component.html',
  styleUrls: ['./popupLichLamViec.component.scss']
})
export class PopupLichLamViecComponent implements OnInit {
  @Input() formData: any;
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  nhanVien: any[] = [];
  caLamViec: any[] = [];
  chucVu: any[] = [];

  selectedChucVu: { [key: string]: string } = {};
  nhanVienTheoChucVu: { [key: string]: any[] } = {};

  constructor(
    private caLamViecService: CaLamViecService,
    private notification: NzNotificationService,
    private nhanVienService: NhanVienService,
    private chucVuService: ChucVuService,
  ) {}

  ngOnInit(): void {

    this.nhanVienService.getNhanVien({}).subscribe({
      next: (res: any) => {
        this.nhanVien = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNhanVien
        }));
      }
    });

    this.chucVuService.getChucVu({}).subscribe({
      next: (res: any) => {
        this.chucVu = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenChucVu
        }));
      }
    });

    this.caLamViecService.getCaLamViec({}).subscribe({
      next: (res: any) => {
        this.caLamViec = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenCaLamViec
        }));
      }
    });

    if (!this.isEditMode) {
      this.formData = {
        ngay: new Date(),
        chiTietLichLamViec: [
          {
            caLamViec: { id: '', name: '' },
            moTa: '',
            nhanVienCa: [
              {
                nhanVien: { id: '', name: '' },
                chucVuId: { id: '', name: '' }
              }
            ]
          }
        ],
        moTa: ''
      };
      this.formData.chiTietLichLamViec.forEach((ca: any, caIndex: number) => {
        ca.nhanVienCa.forEach((nv: any, nvIndex: number) => {
          const key = `${caIndex}_${nvIndex}`;
          this.selectedChucVu[key] = '';
        });
      });
    } else {
      this.formData.ngay = this.formatDate(this.formData.ngay); 
      if (this.formData && this.formData.chiTietLichLamViec) {
        this.formData.chiTietLichLamViec.forEach((ca: any, caIndex: number) => {
          if (ca.nhanVienCa) {
            ca.nhanVienCa.forEach((nv: any, nvIndex: number) => {
              const key = `${caIndex}_${nvIndex}`;
              if (nv.chucVuId && nv.chucVuId.id) {
                this.selectedChucVu[key] = nv.chucVuId.id;
                this.nhanVienService.getNhanVien({ chucVuId: nv.chucVuId.id }).subscribe({
                  next: (res: any) => {
                    this.nhanVienTheoChucVu[key] = res.data.data.map((item: any) => ({
                      id: item.id,
                      name: item.tenNhanVien
                    }));
                  }
                });
              }
            });
          }
        });
      }
    }  
  }

  onSave(): void {
    if (!this.formData.ngay) {
      this.notification.error('Lỗi', 'Vui lòng chọn ngày làm việc');
      return;
    }

    for (let i = 0; i < this.formData.chiTietLichLamViec.length; i++) {
      const ca = this.formData.chiTietLichLamViec[i];
      
      if (!ca.caLamViec || !ca.caLamViec.id) {
        this.notification.error('Lỗi', `Vui lòng chọn ca làm việc ở ca thứ ${i + 1}`);
        return;
      }
      
      for (let j = 0; j < ca.nhanVienCa.length; j++) {
        const nv = ca.nhanVienCa[j];
        const key = `${i}_${j}`;
        
        if (!this.selectedChucVu[key]) {
          this.notification.error('Lỗi', `Vui lòng chọn chức vụ cho nhân viên ${j + 1} ở ca thứ ${i + 1}`);
          return;
        }
        
        if (!nv.nhanVien || !nv.nhanVien.id) {
          this.notification.error('Lỗi', `Vui lòng chọn nhân viên ${j + 1} ở ca thứ ${i + 1}`);
          return;
        }
      }
    }

    const dataToSend = {
      id: this.formData.id,
      ngay: this.formData.ngay,
      moTa: this.formData.moTa,
      chiTietLichLamViec: this.formData.chiTietLichLamViec.map((item: any, caIndex: number) => ({
        caLamViec: item.caLamViec.id,
        moTa: item.moTa,
        nhanVienCa: item.nhanVienCa.map((nv: any, nvIndex: number) => ({
          nhanVien: nv.nhanVien.id,
          chucVuId: this.selectedChucVu[`${caIndex}_${nvIndex}`] || ''
        }))
      }))
    };
    this.save.emit(dataToSend);
  }

  searchNhanVienCa(caIndex: number, nvIndex: number) {
    const key = `${caIndex}_${nvIndex}`;
    const chucVuId = this.selectedChucVu[key] || '';

    if (!chucVuId) return;

    this.nhanVienService.getNhanVien({ chucVuId }).subscribe({
      next: (res: any) => {
        this.nhanVienTheoChucVu[key] = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenNhanVien
        }));
      },
      error: (err) => {
        this.notification.error('Lỗi', 'Không thể lấy danh sách nhân viên theo chức vụ');
      }
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  private formatDate(date: any): string {
  if (!date) return new Date().toISOString().split('T')[0];

  if (typeof date === 'string') {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split('T')[0];
    }
  }

  if (date.ticks) {
    const parsedDate = new Date(date.ticks / 10000);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split('T')[0];
    }
  }
  return new Date().toISOString().split('T')[0];
}

  addCa() {
    this.formData.chiTietLichLamViec = this.formData.chiTietLichLamViec || [];
    this.formData.chiTietLichLamViec.push({
      caLamViec: { id: '', name: '' },
      moTa: '',
      nhanVienCa: [
        {
          nhanVien: { id: '', name: '' },
          chucVuId: { id: '', name: '' }
        }
      ]
    });
    const caIndex = this.formData.chiTietLichLamViec.length - 1; 
    const nvIndex = 0; 
    const key = `${caIndex}_${nvIndex}`;
    this.selectedChucVu[key] = '';
  }

  removeCa(index: number) {
    if (this.formData.chiTietLichLamViec.length > 1) {
      this.formData.chiTietLichLamViec.splice(index, 1);
    } else {
      alert('Cần ít nhất một ca làm việc.');
    }
  }

  addNhanVien(caIndex: number) {
    const nvIndex = this.formData.chiTietLichLamViec[caIndex].nhanVienCa.length;
    const key = `${caIndex}_${nvIndex}`;
    this.selectedChucVu[key] = '';

    this.formData.chiTietLichLamViec[caIndex].nhanVienCa.push({
      nhanVien: { id: '', name: '' },
      chucVuId: { id: '', name: '' }
    });
  }

  removeNhanVien(caIndex: number, nvIndex: number) {
    const list = this.formData.chiTietLichLamViec[caIndex].nhanVienCa;
    if (list.length > 1) {
      list.splice(nvIndex, 1);
    } else {
      alert('Mỗi ca cần có ít nhất một nhân viên.');
    }
  }
}
