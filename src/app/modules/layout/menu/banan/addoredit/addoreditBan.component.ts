import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaiBanAnService } from '../../loaibanan/services/loaibanan.service';

@Component({
  selector: 'app-addoreditBan',
  templateUrl: './addoreditBan.component.html',
  styleUrl: './addoreditBan.component.scss'
})
export class AddoreditBanComponent implements OnInit {
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
  formData = {
    tenBan: '',
    trangThai: 0,
    loaiBan: {
      id: '',
      name: ''
    }
  };

  isEditMode: boolean = false; 

  constructor(
    private loaiBanAnService: LoaiBanAnService,
    public dialogRef: MatDialogRef<AddoreditBanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.item) {
      this.isEditMode = true;
  
      this.formData = {
        ...data.item,
        loaiBan: {
          id: data.item.loaiBan.id,
          name: data.item.loaiBan.tenLoai 
        }
      };
    }
  }


  onSave(): void {
    const dataToSend = {
      ...this.formData,
      loaiBan: {
        id: this.formData.loaiBan.id,
        name: this.formData.loaiBan.name 
      }
    };
    this.dialogRef.close(dataToSend); 
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
