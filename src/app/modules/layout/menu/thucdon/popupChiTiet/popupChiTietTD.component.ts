import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';


@Component({
  selector: 'app-popupChiTietTD',
  templateUrl: './popupChiTietTD.component.html',
  styleUrls: ['./popupChiTietTD.component.scss']
})
export class PopupChiTietTDComponent  {
  @Input() formData: any;     // Nhận dữ liệu công thức từ bên ngoài
  @Output() close = new EventEmitter<void>(); // Khi bấm nút đóng

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  constructor(private fileService: FileService) {}
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
