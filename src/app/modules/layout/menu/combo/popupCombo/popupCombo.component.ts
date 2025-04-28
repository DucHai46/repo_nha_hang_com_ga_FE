import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaiBanAnService } from '../../loaibanan/services/loaibanan.service';
@Component({
  selector: 'app-popupCombo',
  templateUrl: './popupCombo.component.html',
  styleUrls: ['./popupCombo.component.scss']
})
export class PopupComboComponent implements OnInit {
  loaiBanAn: any[] = [];  

  ngOnInit(): void {
    this.loaiBanAnService.getLoaiBanAn({}).subscribe({
      next: (res: any) => {
        this.loaiBanAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenLoai 
        }));
  
        if (this.isEditMode) {
          const categoryId = this.formData.loaiBan.id;
          const selectedCategory = this.loaiBanAn.find(
            (cat) => cat.id === categoryId
          );
          if (selectedCategory) {
            this.formData.loaiBan = selectedCategory; 
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  @Input() formData = {
    tenBan: '',
    trangThai: 0,
    loaiBan: {
      id: '',
      name: ''
    }
  };

  @Input() isEditMode: boolean = false; 
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(
    private loaiBanAnService: LoaiBanAnService
  ) {}


  onSave(): void {
    const dataToSend = {
      ...this.formData,
      loaiBan: {
        id: this.formData.loaiBan.id,
        name: this.formData.loaiBan.name 
      }
    };
    this.save.emit(dataToSend);
  }

  onCancel(): void {
    this.close.emit();
  }
}
