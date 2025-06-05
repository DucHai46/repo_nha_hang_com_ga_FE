import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';


@Component({
  selector: 'app-popupChiTietCB',
  templateUrl: './popupChiTietCB.component.html',
  styleUrls: ['./popupChiTietCB.component.scss']
})
export class PopupChiTietCBComponent  {
  @Input() formData: any;  
  @Output() close = new EventEmitter<void>(); 

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
        const url = window.URL.createObjectURL(response);
        
        window.open(url, '_blank');
        
        window.URL.revokeObjectURL(url);
      }
    );
  }

}
