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
   
  }
  @Input() formData: any;

  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

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


}
