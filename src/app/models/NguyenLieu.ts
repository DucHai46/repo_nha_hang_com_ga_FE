export interface NguyenLieu {
  tenNguyenLieu: string;
  moTa: string;
  soLuong: number;
  loaiNguyenLieu: {
    id: string;
    name: string;
  };
  donViTinh: {
    id: string;
    name: string;
  };
  tuDo: {
    id: string;
    name: string;
  };
  trangThai: number;
}