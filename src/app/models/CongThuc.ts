export interface CongThuc {
  id: string;
  tenCongThuc: string;
  loaiNguyenLieus: {
    loaiNguyenLieu: {
      id: string;
      name: string;
    };
    nguyenLieus: {
      nguyenLieu: {
        id: string;
        name: string;
      };
      soLuong: number;
      ghiChu: string;
    }[];
    ghiChu: string;
  }[];
  moTa: string;
  hinhAnh: string;
}
