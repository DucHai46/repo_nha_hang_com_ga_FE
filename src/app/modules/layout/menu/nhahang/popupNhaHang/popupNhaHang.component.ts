import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-popupNhaHang',
  templateUrl: './popupNhaHang.component.html',
  styleUrls: ['./popupNhaHang.component.scss']
})
export class PopupNhaHangComponent {
  @Input() formData: any = {
    tenNhaHang: '',
    diaChi: '',
    soDienThoai: '',
    email: '',
    website: '',
    logo: '',
    banner: '',
    moTa: '',
    isActive: false
  };
  @Input() isEditMode: boolean = false;
  @Input() isChiTietOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  constructor(
    private fileService: FileService,
    private notification: NzNotificationService
  ) { }

  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
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
            this.formData.logo = `{"id": "${fileId}", "name": "${fileName}"}`;
            this.notification.create(
              'success',
              'Thông báo!',
              `Upload file thành công`, {
              nzClass: 'notification-success',
              nzDuration: 2000
            });
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Upload file thất bại`, {
              nzClass: 'notification-error',
              nzDuration: 2000
            });
          }
        },
        error: (err: any) => {
          this.notification.create(
            'error',
            'Thông báo!',
            `Lỗi upload file: ${err}`, {
            nzClass: 'notification-error',
            nzDuration: 2000
          });
        }
      });
    }
  }

  toggleActive(formData: any): void {
    if (formData.isActive) {
      formData.isActive = false;
    } else {
      formData.isActive = true;
    }
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    if (filteredValue.length > 11) {
      filteredValue = filteredValue.substring(0, 11);
    }
    inputElement.value = filteredValue;
    this.formData.soDienThoai = filteredValue;
  }
}
