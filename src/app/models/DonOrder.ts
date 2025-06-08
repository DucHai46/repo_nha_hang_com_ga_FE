export interface DonOrder {
    id: string;
    tenDon: string;
    loaiDon: {
      id: string;
      name: string;
    };
    ban: {
      id: string;
      name: string;
    };
    khachHang: {
      id: string;
      name: string;
    };
    trangThaiDonOrder: number;
    chiTietDonOrder: ChiTietDonOrder[];
    tongTien: number;
    createDate: Date;
    ngayTaoDon: Date;
}

interface ChiTietDonOrder {
   monAns: DonMonAn[];
   comBos: DonCombo[];
   trangThai: number; 
}

interface DonMonAn {
  monAn: {
    id: string;
    name: string;
  };
  monAn_trangThai: number;
  soluong: number;
  giaTien: number;
  moTa: string; 
}

interface DonCombo {
  combo: {
    id: string;
    name: string;
  };
  combo_trangThai: number;
  soluong: number; 
  giaTien: number;
  moTa: string;
}
