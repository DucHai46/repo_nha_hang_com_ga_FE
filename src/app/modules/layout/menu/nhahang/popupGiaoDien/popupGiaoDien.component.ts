import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-popupGiaoDien',
  templateUrl: './popupGiaoDien.component.html',
  styleUrls: ['./popupGiaoDien.component.scss']
})
export class PopupGiaoDienComponent implements OnInit {
  @Input() formData: any = {};
  @Input() isEditMode: boolean = false;
  @Input() isChiTietOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  activeTab: string = 'header';

  constructor(
    private fileService: FileService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.initializeFormData();
  }

  private initializeFormData() {
    if (!this.formData.header) {
      this.formData.header = {
        logo: '',
        backgroundColor: '#3B82F6',
        imageSlider: []
      };
    }

    if (!this.formData.home) {
      this.formData.home = {
        title: '',
        content: '',
        image: '',
        content1: [],
        content2: []
      };
    }

    if (!this.formData.about) {
      this.formData.about = {
        content: []
      };
    }

    if (!this.formData.footer) {
      this.formData.footer = {
        title: '',
        content: '',
        logo: '',
        backgroundColor: '#3B82F6',
        address: [],
        phone: [],
        email: [],
        social: []
      };
    }
  }

  onSave(): void {
    this.save.emit(this.formData);
  }

  onCancel(): void {
    this.close.emit();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onHeaderLogoSelected(event: any): void {
    this.uploadFile(event, (fileData: string) => {
      this.formData.header.logo = fileData;
    });
  }

  addSliderImage(): void {
    this.formData.header.imageSlider.push('');
  }

  removeSliderImage(index: number): void {
    this.formData.header.imageSlider.splice(index, 1);
  }

  onSliderImageSelected(event: any, index: number): void {
    this.uploadFile(event, (fileData: string) => {
      this.formData.header.imageSlider[index] = fileData;
    });
  }

  onHomeImageSelected(event: any): void {
    this.uploadFile(event, (fileData: string) => {
      this.formData.home.image = fileData;
    });
  }

  addHomeContent1(): void {
    this.formData.home.content1.push({
      title: '',
      content: '',
      image: ''
    });
  }

  removeHomeContent1(index: number): void {
    this.formData.home.content1.splice(index, 1);
  }

  onHomeContent1ImageSelected(event: any, index: number): void {
    this.uploadFile(event, (fileData: string) => {
      this.formData.home.content1[index].image = fileData;
    });
  }

  addHomeContent2(): void {
    this.formData.home.content2.push({
      title: '',
      content: '',
      image: ''
    });
  }

  removeHomeContent2(index: number): void {
    this.formData.home.content2.splice(index, 1);
  }

  onHomeContent2ImageSelected(event: any, index: number): void {
    this.uploadFile(event, (fileData: string) => {
      this.formData.home.content2[index].image = fileData;
    });
  }

  addAboutContent(): void {
    this.formData.about.content.push({
      title: '',
      content: '',
      image: ''
    });
  }

  removeAboutContent(index: number): void {
    this.formData.about.content.splice(index, 1);
  }

  onAboutContentImageSelected(event: any, index: number): void {
    this.uploadFile(event, (fileData: string) => {
      this.formData.about.content[index].image = fileData;
    });
  }

  onFooterLogoSelected(event: any): void {
    this.uploadFile(event, (fileData: string) => {
      this.formData.footer.logo = fileData;
    });
  }

  addFooterAddress(): void {
    this.formData.footer.address.push('');
  }

  removeFooterAddress(index: number): void {
    this.formData.footer.address.splice(index, 1);
  }

  addFooterPhone(): void {
    this.formData.footer.phone.push('');
  }

  removeFooterPhone(index: number): void {
    this.formData.footer.phone.splice(index, 1);
  }

  addFooterEmail(): void {
    this.formData.footer.email.push('');
  }

  removeFooterEmail(index: number): void {
    this.formData.footer.email.splice(index, 1);
  }

  addFooterSocial(): void {
    this.formData.footer.social.push('');
  }

  removeFooterSocial(index: number): void {
    this.formData.footer.social.splice(index, 1);
  }

  private uploadFile(event: any, callback: (fileData: string) => void): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.fileService.addFile(formData).subscribe({
        next: (res: any) => {
          const fileId = res?.id || res?.data?.id;
          const fileName = res?.fileName || res?.data?.fileName;
          if (fileId && fileName) {
            const fileData = `{"id": "${fileId}", "name": "${fileName}"}`;
            callback(fileData);
            this.notification.create(
              'success',
              'Thông báo!',
              'Upload file thành công', {
              nzClass: 'notification-success',
              nzDuration: 2000
            });
          } else {
            this.notification.create(
              'error',
              'Thông báo!',
              'Upload file thất bại', {
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
}
