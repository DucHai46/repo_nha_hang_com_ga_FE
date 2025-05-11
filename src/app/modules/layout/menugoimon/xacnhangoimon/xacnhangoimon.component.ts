import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { DonOrderService } from '../services/donorder.service';

@Component({
  selector: 'app-xacnhangoimon',
  templateUrl: './xacnhangoimon.component.html',
  styleUrl: './xacnhangoimon.component.scss'
})
export class XacnhangoimonComponent implements OnInit  {
  selectedItemsMA: any[] = [];
  donOrder: any[] = [];
  id: string = '';
  ngOnInit(): void {
      this.donOrderService.getDonOrder({}).subscribe(
        {
          next: (res: any) => {
            this.donOrder = res.data.data;
          }
        }
      )
  }

  constructor(public router: Router,private donOrderService: DonOrderService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['selectedItemsMA']) {
      this.selectedItemsMA = navigation.extras.state['selectedItemsMA'];
      this.id = navigation.extras.state['id'];
      console.log(this.id);
      console.log("Dữ liệu nhận được từ MenuGoiMonComponent:", this.selectedItemsMA);
    }

  }

  // Tăng số lượng món ăn
  tangSoLuong(ma: string) {
    const item = this.selectedItemsMA.find((mon) => mon.ma === ma);
    if (item) {
      item.soLuong += 1;
    }
    console.log(this.donOrder);
  }

  // Giảm số lượng món ăn (và xóa nếu số lượng <= 0)
  giamSoLuong(ma: string) {
    const item = this.selectedItemsMA.find((mon) => mon.ma === ma);
    if (item && item.soLuong > 0) {
      item.soLuong -= 1;
    }
    // Xóa món nếu số lượng về 0
    if (item?.soLuong === 0) {
      this.selectedItemsMA = this.selectedItemsMA.filter((mon) => mon.ma !== ma);
    }
  }

  // Xóa tất cả món ăn
  xoaTatCa() {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tất cả các món đã chọn?");
    if (confirmDelete) {
      this.selectedItemsMA = [];
    }
  }

  // Tính tổng tiền
  tinhTongTien(): number {
    return this.selectedItemsMA.reduce((tong, mon) => tong + (mon.gia - (mon.giamGia ? mon.gia * mon.giamGia / 100 : 0)) * mon.soLuong, 0);
  }
  troVeMenugoimon() {
    console.log("Dữ liệu trước khi truyền đi:", this.selectedItemsMA); // Kiểm tra dữ liệu đang truyền đi

    this.router.navigate(['/menugoimon/'+this.id], {
      state: { updatedSelectedItems: this.selectedItemsMA },
    });
  }

  loaiDon="681c59dcfb5b076f5440df92"
  xacNhanDonOrder(){
    if(this.id == '' || this.id == null){
      return;
    }
    console.log(this.selectedItemsMA);
    const don = this.donOrder.find((td: any) => td.trangThai === 0 && td.ban.id === this.id);
    const combo=this.selectedItemsMA.filter((td: any) => td.danhMuc === 'comboMonAn');
    const monAn=this.selectedItemsMA.filter((td: any) => td.danhMuc !== 'comboMonAn');
    console.log("MonAn: ",monAn);
    console.log("ComBo: ",combo);
    console.log("Gia trị ban đầu: ",this.donOrder);
    console.log("Gia trị ban 2: ",don);
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
      console.log("Chi tiết môi: ",chiTietMoi);
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
      console.log("Gia trị sau khi cập nhật: ",don);
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
      console.log("Update thanh cong",this.donOrder);

    }else{
      const newDonOrder = {
        tenDon: 'Đơn mới bàn số ' + this.id,
        loaiDon: '',                    
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
      console.log(newDonOrder);
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
      console.log("Them moi thanh cong",this.donOrder);

    }




  }

}
