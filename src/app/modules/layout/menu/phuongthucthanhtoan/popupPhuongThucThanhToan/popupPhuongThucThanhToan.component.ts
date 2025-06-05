import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FileService } from '../../../../../core/services/file.service';

@Component({
  selector: 'app-popupPhuongThucThanhToan',
  templateUrl: './popupPhuongThucThanhToan.component.html',
  styleUrl: './popupPhuongThucThanhToan.component.scss'
})
export class PopupPhuongThucThanhToanComponent {
  @Input() formData: any = {
    tenPhuongThuc: '',
    qrCode: '',
    moTa: '',
  };

  @Input() isEditMode: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor( 
    private fileService: FileService,
    private notification: NzNotificationService
  ){}

  onSave(): void {
    const dataToSend = {
      ...this.formData,
      tenPhuongThuc: this.formData.tenPhuongThuc,
      moTa: this.formData.moTa,
      qrCode: this.formData.qrCode
        ? JSON.stringify({
            id: this.formData.qrCode.id,
            name: this.formData.qrCode.name
          })
        : ''
    };
  
    this.save.emit(dataToSend);
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
            this.formData.qrCode = {
              id: fileId,
              name: fileName
            };
            this.notification.create(
              'success',
              'Thông báo!',
              `Upload thành công`,
              {
                nzClass: 'notification-success',  
                nzDuration: 2000
              }
            );
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              `Upload thất bại`,
              {
                nzClass: 'notification-error',  
                nzDuration: 2000
              }
            );
          }
        },
        error: (err: any) => {
          console.error('Lỗi upload file:', err);
          this.notification.create(
            'error',
            'Thông báo!',
            `Upload thất bại`,
            {
              nzClass: 'notification-error',  
              nzDuration: 2000
            }
          );
        }
      });
    }
  }

}
