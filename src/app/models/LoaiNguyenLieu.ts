export interface LoaiNguyenLieu {
  id: string;
  tenLoai: string;
  moTa: string;
  danhMucNguyenLieu:{
    id: string;
    name: string;
  }
}