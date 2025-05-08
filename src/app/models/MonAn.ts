export interface MonAn {
  tenMonAn: string;
  loaiMonAn: {
    id: string;
    name: string;
  };
  congThuc: {
    id: string;
    name: string;
  };
  giamGia: {
    id: string;
    name: string;
    giaTri: number;
  };
  moTa: string;
  hinhAnh: string;
  giaTien: number;
}