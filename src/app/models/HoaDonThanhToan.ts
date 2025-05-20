export interface HoaDonThanhToan {
  id: string;
  nhanVien: {
    id: string;
    name: string;
  };
  donOrder: {
    id: string;
    name: string;
  };
  phuongThucThanhToan: {
    id: string;
    name: string;
  };
  nhaHang: {
    id: string;
    name: string;
  };
  tenHoaDon: string;
  qrCode: string;
  gioVao: Date;
  gioRa: Date;
  soNguoi: number;
  khuyenMai: {
    id: string;
    name: string;
  };
  phuPhi: {
    id: string;
    name: string;
  };
  trangThai: number;

}