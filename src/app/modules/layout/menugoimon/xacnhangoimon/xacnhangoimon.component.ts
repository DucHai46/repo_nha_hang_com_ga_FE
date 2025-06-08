import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { DonOrderService } from '../services/donorder.service';
import { FileService } from '../../../../core/services/file.service';
import { BanAnService } from '../../menu/banan/services/banan.service';

@Component({
  selector: 'app-xacnhangoimon',
  templateUrl: './xacnhangoimon.component.html',
  styleUrl: './xacnhangoimon.component.scss'
})
export class XacnhangoimonComponent implements OnInit  {
  selectedItemsMA: any[] = [];
  donOrder: any[] = [];
  id: string = '';
  tenBanAn: string = '';  

  ngOnInit(): void {
      this.donOrderService.getDonOrder({}).subscribe(
        {
          next: (res: any) => {
            this.donOrder = res.data.data;
          }
        }
      )
      // this.banAnService.getBanAn({}).subscribe(
      //   {
      //     next: (res: any) => {
      //       this.banAn = res.data.data;
      //     }
      //   }
      // )
      this.loadImagesForSelectedItems();
  }

  constructor(public router: Router,private donOrderService: DonOrderService, private fileService: FileService, private banAnService: BanAnService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['selectedItemsMA']) {
      this.selectedItemsMA = navigation.extras.state['selectedItemsMA'];
      this.id = navigation.extras.state['id'];
      this.tenBanAn=navigation.extras.state['tenBanAn'];
      console.log(this.tenBanAn);
    }

  }


  tangSoLuong(ma: string) {
    const item = this.selectedItemsMA.find((mon) => mon.ma === ma);
    if (item) {
      item.soLuong += 1;
    }
  }

  giamSoLuong(ma: string) {
    const item = this.selectedItemsMA.find((mon) => mon.ma === ma);
    if (item && item.soLuong > 0) {
      item.soLuong -= 1;
    }
    if (item?.soLuong === 0) {
      this.selectedItemsMA = this.selectedItemsMA.filter((mon) => mon.ma !== ma);
    }
  }

  xoaTatCa() {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tất cả các món đã chọn?");
    if (confirmDelete) {
      this.selectedItemsMA = [];
    }
  }

  tinhTongTien(): number {
    return this.selectedItemsMA.reduce((tong, mon) => tong + (mon.gia - (mon.giamGia ? mon.gia * mon.giamGia / 100 : 0)) * mon.soLuong, 0);
  }
  troVeMenugoimon() {
    this.router.navigate(['/menugoimon/'+this.id], {
      state: { updatedSelectedItems: this.selectedItemsMA },
    });
  }

  loaiDon="682c90d72046cb04ec849880"
  xacNhanDonOrder(){
    if(this.id == '' || this.id == null){
      return;
    }
    // const tenBanAn = this.banAn.find((td: any) => td.id === this.id)?.tenBan;
    const don = this.donOrder.find((td: any) => (td.trangThai === 0 || td.trangThai === 1) && td.ban.id === this.id);
    const combo=this.selectedItemsMA.filter((td: any) => td.danhMuc === 'comboMonAn');
    const monAn=this.selectedItemsMA.filter((td: any) => td.danhMuc !== 'comboMonAn');
    if(don){
      let loaiDon=don.loaiDon.id;
      let khachHang=don.khachHang.id;
      const chiTietMoi = {
        trangThai: 0,
        monAns: monAn.map((item: any) => ({
          monAn: item.ma,
          monAn_trangThai: 0,
          soLuong: item.soLuong,
          moTa: item.ghiChu
        })),
        combos: combo.map((item: any) => ({
          comBo: item.ma,
          comBo_trangThai: 0,
          soLuong: item.soLuong,
          moTa: item.ghiChu
        }))
      };
      don.chiTietDonOrder.forEach((chiTiet: any) => {
        chiTiet.monAns = chiTiet.monAns.map((item: any) => ({
          monAn: item.monAn.id ,  
          monAn_trangThai: item.monAn_trangThai,
          soLuong: item.soLuong,
          moTa: item.moTa

        }));

        chiTiet.comBos = chiTiet.comBos.map((item: any) => ({
          comBo: item.comBo.id ,
          comBo_trangThai: item.comBo_trangThai,
          soLuong: item.soLuong,
          moTa: item.moTa
        }));
      });
      don.chiTietDonOrder.push(chiTietMoi);
      don.tongTien=don.tongTien + this.tinhTongTien();
      don.ban=this.id;
      don.loaiDon=loaiDon;
      don.khachHang=khachHang;
      this.donOrderService.updateDonOrder(don.id,don).subscribe(
        {

          next: (res: any) => {
            if(res.data){
              this.selectedItemsMA = [];
              this.router.navigate(['/menugoimon/'+this.id], {
                state: { updatedSelectedItems: this.selectedItemsMA },
              });
            }else{
              alert('Thêm mới thất bại');
            }
          }
        }
      )

    }else{
      const newDonOrder = {
        tenDon: 'Đơn mới ' + this.tenBanAn,
        loaiDon: this.loaiDon,                    
        ban:  this.id ,
        khachHang: '',                 
        trangThai: 0,                          
        tongTien: this.tinhTongTien(),
        chiTietDonOrder: [
          {
            trangThai: 0,
            monAns: monAn.map((item: any) => ({
              monAn: item.ma,
              monAn_trangThai: 0,
              soLuong: item.soLuong ,
              moTa: item.ghiChu 
            })),
            combos: combo.map((item: any) => ({
              comBo: item.ma,
              comBo_trangThai: 0,
              soLuong: item.soLuong,
              moTa: item.ghiChu
            }))
          }
        ]
      };
      this.donOrderService.addDonOrder(newDonOrder).subscribe(
        {
          next: (res: any) => {
            if(res.data){
              this.selectedItemsMA = [];
              this.router.navigate(['/menugoimon/'+this.id], {
                state: { updatedSelectedItems: this.selectedItemsMA },
              });
            }else{
              alert('Thêm mới thất bại');
            }
          }
        }
      )

    }




  }

  imageUrls: { [key: string]: string } = {};
  parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }
  loadImagesForSelectedItems(): void {
  for (let item of this.selectedItemsMA) {
    const parsed = this.parseJSON(item.hinhAnh);
    if (parsed?.id && item.ma) {
      this.fileService.downloadFile(parsed.id).subscribe(
        (blob: Blob) => {
          const url = URL.createObjectURL(blob);
          this.imageUrls[item.ma] = url;
        },
        (err) => {
          console.error('Không tải được ảnh:', item.ten, err);
          this.imageUrls[item.ma] = 'assets/images/default-image.png'; 
        }
      );
    }
  }
}
}
