import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateUser, User } from '../../../../../models/User';
import { PhanQuyenService } from '../../phanquyen/services/phanquyen.service';

@Component({
  selector: 'app-popupPhanQuyenUser',
  templateUrl: './popupPhanQuyenUser.component.html',
  styleUrls: ['./popupPhanQuyenUser.component.scss']
})
export class PopupPhanQuyenUserComponent implements OnInit {
  phanQuyens: any[] = [];
  constructor(private phanQuyenService: PhanQuyenService) { }
  ngOnInit(): void {
    this.phanQuyenService.getPhanQuyen({ isPading: true, page: 1, size: 1000 }).subscribe((res: any) => {
      this.phanQuyens = res.data.data;
    });
  }

  @Input() formData: any = {
    id: '',
    phanQuyen: ''
  }


  @Input() isEditMode: boolean = false; // Biến kiểm tra xem là thêm hay sửa
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();


  // Hàm xử lý khi nhấn "Lưu"
  onSave(): void {
    this.save.emit(this.formData);

  }

  // Hàm xử lý khi nhấn "Hủy"
  onCancel(): void {
    this.close.emit();
  }
}
