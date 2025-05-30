import { CaLamViecService } from '../../calamviec/services/calamviec.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-popupChiTietLichLamViec',
  templateUrl: './popupChiTietLichLamViec.component.html',
  styleUrl: './popupChiTietLichLamViec.component.scss'
})
export class PopupChiTietLichLamViecComponent implements OnInit {
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

  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  caLamViec: any[] = [];

  constructor(
    private caLamViecService: CaLamViecService,
    private notification: NzNotificationService,

  ) {}

  //Hàm xử lý khi nhấn nút lưu
  onSave(): void {
    this.save.emit(this.formData);
  }

  //Hàm xử lý khi nhấn nút "Hủy" - Cancel
  onCancel(): void {
    this.close.emit();
  }

  // Get gioVao by caIndex
  getCaGioVao(caIndex: number): string {
    const caId = this.formData.chiTietLichLamViec[caIndex].caLamViec.id;
    const ca = this.caLamViec.find(caItem => caItem.id === caId);
    return ca ? ca.gioVao : '';
  }

  // Get gioRa by caIndex
  getCaGioRa(caIndex: number): string {
    const caId = this.formData.chiTietLichLamViec[caIndex].caLamViec.id;
    const ca = this.caLamViec.find(caItem => caItem.id === caId);
    return ca ? ca.gioRa : '';
  }


}
