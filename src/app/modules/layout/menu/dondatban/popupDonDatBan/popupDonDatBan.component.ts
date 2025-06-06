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
          const selected = res.data.data.find((x: any) => x.id === this.formData.khachHang.id);
          if (selected) {
            this.formData.khachHang = {
              id: selected.id,
              name: selected.tenKhachHang,
            };
            this.khachHangTT = {
              tenKhachHang: selected.tenKhachHang || '',
              diaChi: selected.diaChi || '',
              email: selected.email || '',
              soDienThoai: selected.soDienThoai || '',
            };
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

  khachHangTT= {
    tenKhachHang: '',
    diaChi: '',
    email: '',
    soDienThoai: '',
  };



  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

 constructor(
  private banAnService: BanAnService,
  private khachHangService: KhachHangService,

  ) {}
  isKhachHangUnvalid=false;
  isSoDienThoaiUnvalid=false;


  onSave(): void {
    this.isKhachHangUnvalid= !this.khachHangTT.tenKhachHang
    this.isSoDienThoaiUnvalid=!this.khachHangTT.soDienThoai
    if(this.isKhachHangUnvalid || this.isSoDienThoaiUnvalid){
      return;
    }
    if(this.isEditMode){
      this.khachHangService.updateKhachHang(this.formData.khachHang.id,this.khachHangTT).subscribe({
        next: (res: any) => {
          const date = new Date(this.formData.khungGio);
          const formattedKhungGio = date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          const dataToSend = {
            ...this.formData,
            khungGio: formattedKhungGio,
            ban: this.formData.ban.id,
            khachHang: res.data.id,
          };
          this.save.emit(dataToSend);
        },
        error: (err: any) => console.log(err)
      }); 
    }else{
      this.khachHangService.addKhachHang(this.khachHangTT).subscribe({
        next: (res: any) => {
          const date = new Date(this.formData.khungGio);
          const formattedKhungGio = date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          const dataToSend = {
            ...this.formData,
            khungGio: formattedKhungGio,
            ban: this.formData.ban.id,
            khachHang: res.data.id,
          };
          this.save.emit(dataToSend);
        },
        error: (err: any) => console.log(err)
      });
  }

  }
  onCancel(): void {
    this.close.emit(); 
  }
}
