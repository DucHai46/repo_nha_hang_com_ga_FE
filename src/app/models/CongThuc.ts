export interface CongThuc {
  tenCongThuc: string;
  loaiNguyenLieus: {
    id: string;
    name: string;
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