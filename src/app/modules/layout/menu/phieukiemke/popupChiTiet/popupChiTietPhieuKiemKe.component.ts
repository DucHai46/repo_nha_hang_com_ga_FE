import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '../../../../../core/services/file.service';
import { NhaHangService } from '../../nhahang/services/nhahang.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-popupChiTietPhieuKiemKe',
  templateUrl: './popupChiTietPhieuKiemKe.component.html',
  styleUrls: ['./popupChiTietPhieuKiemKe.component.scss']
})
export class PopupChiTietPhieuKiemKeComponent implements OnInit  {
  @Input() formData: any;     
  @Output() close = new EventEmitter<void>(); 
  nhaHang: any

  closePopup() {
    console.log(this.formData);
    this.close.emit();
  }
  constructor(private fileService: FileService
    , private nhaHangService: NhaHangService
  ) {}
  ngOnInit(): void {
    this.nhaHangService.getNhaHang({isActive: true}).subscribe({
      next: (res: any) => {
        this.nhaHang= res.data.data[0];
        console.log(this.nhaHang);
      },
      error: (err: any) => console.log(err)
    });
  }
    pdf(){
      const options = {
        filename: `HoaDon_${this.formData.id}_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'landscape',
          margins: { top: 10, right: 2, bottom: 10, left: 10 },
          pagebreak: { mode: ['css', 'legacy'] }
        },
        margin: [10, 2, 10, 2]  
      }
  
      const element: Element = document.getElementById('hoadon')!;
      html2pdf().from(element).set(options).save();
      this.closePopup();
    }

}
