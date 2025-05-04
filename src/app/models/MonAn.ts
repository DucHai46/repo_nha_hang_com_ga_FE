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
    giaTri: string;
  };
  moTa: string;
  hinhAnh: string;
  giaTien: string;
}