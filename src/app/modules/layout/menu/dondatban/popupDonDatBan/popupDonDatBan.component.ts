import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BanAnService } from '../../banan/services/banan.service'; 
import { KhachHangService } from '../../khachhang/services/khachhang.service';

@Component({
  selector: 'app-popupDonDatBan',
  templateUrl: './popupDonDatBan.component.html',
  styleUrls: ['./popupDonDatBan.component.scss']
})
export class PopupDonDatBanComponent implements OnInit {
  khachHang: any[] = [];
  banAn: any[] = [];


  ngOnInit(): void {
    this.banAnService.getBanAn({trangThai: 0}).subscribe({
      next: (res: any) => {
        this.banAn = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenBan
        }));

        if (this.isEditMode) {
          const selected = this.banAn.find(x => x.id === this.formData.ban.id);
          if (selected) {
            this.formData.ban = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    });

    this.khachHangService.getKhachHang({}).subscribe({
      next: (res: any) => {
        this.khachHang = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.tenKhachHang
        }));

        if (this.isEditMode) {
          const selected = this.khachHang.find(x => x.id === this.formData.khachHang.id);
          if (selected) {
            this.formData.khachHang = selected;
          }
        }
      },
      error: (err: any) => console.log(err)
    });
  }
  @Input() formData = {
    khungGio: '',
    ban: {
      id: '',
      name: ''
    },
    khachHang: {
      id: '',
      name: ''
    },


  };

  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

 constructor(
  private banAnService: BanAnService,
  private khachHangService: KhachHangService,

  ) {}

  onSave(): void {
    const dataToSend = {
      ...this.formData,
      ban: this.formData.ban.id,
      khachHang: this.formData.khachHang.id,
    };
    this.save.emit(dataToSend);
  }
  onCancel(): void {
    this.close.emit(); 
  }
}
