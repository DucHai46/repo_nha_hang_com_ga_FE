import { CaLamViecService } from '../../calamviec/services/calamviec.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-popupChiTietLichLamViecNhanVien',
  templateUrl: './popupChiTietLichLamViecNhanVien.component.html',
  styleUrl: './popupChiTietLichLamViecNhanVien.component.scss'
})
export class PopupChiTietLichLamViecNhanVienComponent implements OnInit {
  ngOnInit(): void {
   this.caLamViecService.getCaLamViec({}).subscribe({
    next: (res: any) => {
      this.caLamViec = res.data.data.map((item: any) => ({
        id: item.id,
        name: item.tenCaLamViec,
        gioVao: item.gioVao,
        gioRa: item.gioRa
      }));
    }
   });
  }
  @Input() formData: any;

  caLamViec: any[] = [];
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(
    private caLamViecService: CaLamViecService,

  ) {}

  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }

  getCaGioVao(caIndex: number): string {
    const caId = this.formData.chiTietLichLamViec[caIndex].caLamViec.id;
    const ca = this.caLamViec.find(caItem => caItem.id === caId);
    return ca ? ca.gioVao : '';
  }

  getCaGioRa(caIndex: number): string {
    const caId = this.formData.chiTietLichLamViec[caIndex].caLamViec.id;
    const ca = this.caLamViec.find(caItem => caItem.id === caId);
    return ca ? ca.gioRa : '';
  }

}
